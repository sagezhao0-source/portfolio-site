import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const portalCover = require('./assets/course-portals/xingxiangsiwei-cover.png');

type PageKey = 'home' | 'courses' | 'agents';

type SectionCard = {
  key: PageKey;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  color: string;
  bg: string;
  border: string;
};

const palette = {
  bg: '#f7f0dc',
  bgDeep: '#ede3c5',
  paper: '#faf6ec',
  paperSoft: 'rgba(250, 246, 236, 0.78)',
  ink: '#1a1008',
  muted: '#8a7255',
  accent: '#9a6b30',
  accentLight: 'rgba(184,130,74,0.13)',
  accentBorder: 'rgba(184,130,74,0.28)',
  dark: '#241808',
  green: '#3d5a4c',
  greenBg: 'rgba(61,90,76,0.08)',
  greenBorder: 'rgba(61,90,76,0.2)',
  red: '#7a3b3b',
  redBg: 'rgba(122,59,59,0.08)',
  redBorder: 'rgba(122,59,59,0.2)',
};

const sections: SectionCard[] = [
  {
    key: 'courses',
    title: '课程门户设计',
    subtitle: 'COURSE PORTAL',
    description:
      '为课程设计 AI 辅助视觉方案，从封面到配套视频，每一张图与每一段画面背后都记录完整的创作思路与工具测试过程。',
    tag: '可灵 · Gemini · DeepSeek',
    color: palette.green,
    bg: palette.greenBg,
    border: palette.greenBorder,
  },
  {
    key: 'agents',
    title: 'AI 智能体案例',
    subtitle: 'AGENTS',
    description:
      '基于 Dify、Coze、LangChain 等平台构建的智能体实践。这里会继续整理客服、内容与效率类场景的搭建逻辑与落地记录。',
    tag: 'Dify · Coze · LangChain',
    color: palette.red,
    bg: palette.redBg,
    border: palette.redBorder,
  },
];

const tickerItems = [
  '课程门户设计',
  'AI 图像生成',
  '可灵 · Kling',
  'Gemini',
  '智能体构建',
  'Dify · Coze',
  'LangChain',
  '创作思路记录',
  '视觉封面设计',
  'AI 辅助创作',
];

const coursePortal = {
  title: '形象思维与工程语言',
  tools: '可灵 / Gemini / DeepSeek',
  link: 'https://mooc1.chaoxing.com/course-ans/courseportal/258585261.html',
  summary:
    '先搜索课程相关信息，再观察其他已上线课程页面的视觉语言，发现整体偏艺术与文艺，于是尝试把工程结构和人文草图感结合起来。',
  process: [
    '看到课程后先做资料搜索，并对同系列门户页面做风格观察，确认需要一个更有艺术气质的方向。',
    '联想到达芬奇人体解剖图的结构感，用它去借力工程语言和手稿气息之间的联系。',
    '先让 DeepSeek 帮忙写提示词，在不同平台测试画面，再最终选择可灵输出更贴近目标的主视觉。',
    '接着用 Gemini 讨论课程标题的排版方向，最终形成现在这种黑色块面与线稿底图相互压住的版式。',
  ],
  videoNote:
    '视频同样沿用了这条视觉线索。在线版后续可以改成真正的视频弹层或独立播放页，现在先保留醒目的展示入口。',
};

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < 920;
  const [page, setPage] = useState<PageKey>('home');
  const fade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fade.setValue(0);
    Animated.timing(fade, {
      toValue: 1,
      duration: 320,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [fade, page]);

  const repeatedTicker = useMemo(
    () => [...tickerItems, ...tickerItems, ...tickerItems].join('  ◆  '),
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.page}>
          <DecorativeBlobs />
          <TopNav page={page} onNavigate={setPage} isMobile={isMobile} />

          <Animated.View style={{ opacity: fade }}>
            {page === 'home' && (
              <>
                <HomeHero isMobile={isMobile} onNavigate={setPage} />
                <Ticker text={repeatedTicker} />
                <DirectorySection isMobile={isMobile} onNavigate={setPage} />
                <StatsStrip isMobile={isMobile} />
                <QuoteSection />
              </>
            )}

            {page === 'courses' && <CoursesPage isMobile={isMobile} onNavigate={setPage} />}
            {page === 'agents' && <AgentsPage isMobile={isMobile} onNavigate={setPage} />}
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TopNav({
  page,
  onNavigate,
  isMobile,
}: {
  page: PageKey;
  onNavigate: (page: PageKey) => void;
  isMobile: boolean;
}) {
  const items: { key: PageKey; label: string }[] = [
    { key: 'home', label: '首页' },
    { key: 'courses', label: '课程门户设计' },
    { key: 'agents', label: '智能体' },
  ];

  return (
    <View style={[styles.nav, isMobile && styles.navMobile]}>
      <Pressable onPress={() => onNavigate('home')}>
        <Text style={styles.brand}>AI 创作者手记</Text>
      </Pressable>

      <View style={[styles.navItems, isMobile && styles.navItemsMobile]}>
        {items.map((item) => {
          const active = page === item.key;
          return (
            <Pressable
              key={item.key}
              onPress={() => onNavigate(item.key)}
              style={[styles.navPill, active && styles.navPillActive]}
            >
              <Text style={[styles.navPillText, active && styles.navPillTextActive]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function HomeHero({
  isMobile,
  onNavigate,
}: {
  isMobile: boolean;
  onNavigate: (page: PageKey) => void;
}) {
  return (
    <View style={[styles.hero, isMobile && styles.heroMobile]}>
      <View style={styles.heroInner}>
        <View style={styles.eyebrowPill}>
          <View style={styles.eyebrowDot} />
          <Text style={styles.eyebrowText}>AI 创作者手记</Text>
        </View>

        <Text style={[styles.heroTitle, isMobile && styles.heroTitleMobile]}>
          用 AI 重新诠释{'\n'}
          <Text style={styles.heroAccent}>创作的每一步</Text>
        </Text>

        <Text style={styles.heroDescription}>
          这里收录了我在 AI 辅助创作领域的实践: 为课程设计视觉封面与视频，构建能够自主完成任务的智能体。
          每件作品都附有完整的创作思路，并会逐步扩展为更系统的作品网站。
        </Text>

        <View style={[styles.heroActions, isMobile && styles.heroActionsMobile]}>
          <ActionButton label="浏览课程门户" kind="dark" onPress={() => onNavigate('courses')} />
          <ActionButton label="查看智能体案例" kind="light" onPress={() => onNavigate('agents')} />
        </View>
      </View>
    </View>
  );
}

function Ticker({ text }: { text: string }) {
  return (
    <View style={styles.tickerWrap}>
      <Text numberOfLines={1} style={styles.tickerText}>
        {text}
      </Text>
    </View>
  );
}

function DirectorySection({
  isMobile,
  onNavigate,
}: {
  isMobile: boolean;
  onNavigate: (page: PageKey) => void;
}) {
  return (
    <View style={styles.sectionBlock}>
      <SectionLabel label="作品目录" />

      <View style={[styles.cardGrid, isMobile && styles.cardGridMobile]}>
        {sections.map((section) => (
          <Pressable
            key={section.key}
            onPress={() => onNavigate(section.key)}
            style={({ pressed }) => [
              styles.directoryCard,
              { borderColor: section.border },
              pressed && styles.directoryCardPressed,
              isMobile && styles.fullWidth,
            ]}
          >
            <View style={[styles.cardTopBar, { backgroundColor: section.color }]} />

            <View style={styles.directoryCardBody}>
              <View style={styles.directoryHead}>
                <View style={[styles.iconBox, { backgroundColor: section.bg, borderColor: section.border }]}>
                  <Text style={[styles.iconGlyph, { color: section.color }]}>
                    {section.key === 'courses' ? '◫' : '◌'}
                  </Text>
                </View>
                <Text style={[styles.directorySubtitle, { color: section.color }]}>{section.subtitle}</Text>
              </View>

              <Text style={styles.directoryTitle}>{section.title}</Text>
              <Text style={styles.directoryDescription}>{section.description}</Text>

              <View style={styles.directoryFooter}>
                <View style={[styles.tagPill, { backgroundColor: section.bg, borderColor: section.border }]}>
                  <Text style={[styles.tagText, { color: section.color }]}>{section.tag}</Text>
                </View>
                <Text style={[styles.enterText, { color: section.color }]}>进入 →</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function StatsStrip({ isMobile }: { isMobile: boolean }) {
  const stats = [
    { num: '6+', label: 'AI 工具实践', sub: '可灵 · Gemini · DeepSeek …' },
    { num: '1', label: '课程封面已完成', sub: '持续更新中' },
    { num: '∞', label: '创作思路记录', sub: '每件作品完整存档' },
  ];

  return (
    <View style={styles.statsWrap}>
      <View style={[styles.statsGrid, isMobile && styles.statsGridMobile]}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statItem}>
            <Text style={styles.statNum}>{stat.num}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statSub}>{stat.sub}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function QuoteSection() {
  return (
    <View style={styles.quoteSection}>
      <Text style={styles.quoteBackground}>CREATE</Text>
      <View style={styles.quoteContent}>
        <Text style={styles.quoteMark}>"</Text>
        <Text style={styles.quoteText}>
          工具是时代给予创作者的语言，{'\n'}而 AI 正在成为这个时代最强大的笔。
        </Text>
        <View style={styles.quoteLine} />
      </View>
    </View>
  );
}

function CoursesPage({
  isMobile,
  onNavigate,
}: {
  isMobile: boolean;
  onNavigate: (page: PageKey) => void;
}) {
  return (
    <View style={styles.subPage}>
      <PageHeader
        eyebrow="COURSE PORTAL"
        title="课程门户设计"
        text="按课程拆分展示，每门课程都能放封面图、创作思路、门户链接，以及后续的视频播放入口。"
        backLabel="返回首页"
        onBack={() => onNavigate('home')}
      />

      <View style={[styles.courseLayout, isMobile && styles.courseLayoutMobile]}>
        <View style={[styles.courseMain, isMobile && styles.fullWidth]}>
          <View style={styles.courseImageWrap}>
            <Image source={portalCover} style={styles.courseImage} resizeMode="cover" />
            <View style={styles.courseOverlay}>
              <Text style={styles.courseOverlayTag}>课程门户设计 / 已完成封面</Text>
              <Text style={styles.courseOverlayTitle}>{coursePortal.title}</Text>
              <Text style={styles.courseOverlayTools}>{coursePortal.tools}</Text>
            </View>
          </View>

          <View style={[styles.courseActionRow, isMobile && styles.courseActionRowMobile]}>
            <Panel style={styles.videoPanel}>
              <Text style={styles.panelEyebrow}>背景视频位</Text>
              <Text style={styles.videoPanelTitle}>后续可升级为真实视频弹层</Text>
              <Text style={styles.panelText}>{coursePortal.videoNote}</Text>
            </Panel>

            <Panel style={styles.portalLinkPanel}>
              <Text style={styles.panelEyebrow}>课程入口</Text>
              <Text style={styles.portalLinkTitle}>在线查看课程门户</Text>
              <ActionButton label="打开课程门户" kind="dark" onPress={() => Linking.openURL(coursePortal.link)} />
            </Panel>
          </View>
        </View>

        <View style={[styles.courseSidebar, isMobile && styles.fullWidth]}>
          <Panel>
            <Text style={styles.panelEyebrow}>课程概述</Text>
            <Text style={styles.panelTitle}>{coursePortal.title}</Text>
            <Text style={styles.panelText}>{coursePortal.summary}</Text>
          </Panel>

          <Panel>
            <Text style={styles.panelEyebrow}>创作思路</Text>
            {coursePortal.process.map((item) => (
              <View key={item} style={styles.bulletRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </Panel>
        </View>
      </View>
    </View>
  );
}

function AgentsPage({
  isMobile,
  onNavigate,
}: {
  isMobile: boolean;
  onNavigate: (page: PageKey) => void;
}) {
  const agentCards = [
    {
      title: '智能体项目展示',
      text: '这里后续可以按具体项目分卡片，例如客服、内容生成、知识库问答等，每个项目都保留产品描述和构建流程。',
    },
    {
      title: '工作流与平台',
      text: '可以继续补充 Dify、Coze、LangChain 等平台的分工方式，以及每个智能体从需求到落地的链路图。',
    },
  ];

  return (
    <View style={styles.subPage}>
      <PageHeader
        eyebrow="AGENTS"
        title="AI 智能体案例"
        text="这个板块现在先做成真正可点击进入的二级页面，方便后续继续往里加真实案例。"
        backLabel="返回首页"
        onBack={() => onNavigate('home')}
      />

      <View style={[styles.cardGrid, isMobile && styles.cardGridMobile]}>
        {agentCards.map((card, index) => (
          <Panel key={card.title} style={[styles.agentPageCard, isMobile && styles.fullWidth]}>
            <Text style={styles.agentPageIndex}>0{index + 1}</Text>
            <Text style={styles.agentPageTitle}>{card.title}</Text>
            <Text style={styles.agentPageText}>{card.text}</Text>
          </Panel>
        ))}
      </View>
    </View>
  );
}

function PageHeader({
  eyebrow,
  title,
  text,
  backLabel,
  onBack,
}: {
  eyebrow: string;
  title: string;
  text: string;
  backLabel: string;
  onBack: () => void;
}) {
  return (
    <View style={styles.pageHeader}>
      <Pressable onPress={onBack} style={styles.backLink}>
        <Text style={styles.backLinkText}>← {backLabel}</Text>
      </Pressable>
      <Text style={styles.sectionEyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionText}>{text}</Text>
    </View>
  );
}

function DecorativeBlobs() {
  return (
    <>
      <View style={styles.blobTopRight} />
      <View style={styles.blobBottomLeft} />
      <View style={styles.blobMiddleRight} />
      <View style={[styles.dot, { top: '18%', left: '8%', backgroundColor: 'rgba(232,149,109,0.5)' }]} />
      <View style={[styles.dot, { top: '28%', left: '14%', width: 6, height: 6, backgroundColor: 'rgba(125,200,160,0.6)' }]} />
      <View style={[styles.dot, { top: '22%', right: '18%', width: 8, height: 8, backgroundColor: 'rgba(154,107,48,0.35)' }]} />
      <View style={[styles.dot, { top: '55%', left: '6%', width: 7, height: 7, backgroundColor: 'rgba(61,90,76,0.3)' }]} />
    </>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <View style={styles.sectionLabelWrap}>
      <View style={styles.sectionLine} />
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={styles.sectionLine} />
    </View>
  );
}

function Panel({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.panel, style]}>{children}</View>;
}

function ActionButton({
  label,
  kind,
  onPress,
}: {
  label: string;
  kind: 'dark' | 'light';
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        kind === 'dark' ? styles.actionButtonDark : styles.actionButtonLight,
        pressed && styles.actionButtonPressed,
      ]}
    >
      <Text style={kind === 'dark' ? styles.actionButtonDarkText : styles.actionButtonLightText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.bg },
  scroll: { flex: 1, backgroundColor: palette.bg },
  scrollContent: { flexGrow: 1 },
  page: {
    flex: 1,
    backgroundColor: palette.bg,
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 56,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
    zIndex: 2,
  },
  navMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 14,
  },
  brand: {
    color: palette.ink,
    fontSize: 24,
    fontFamily: 'Georgia',
    fontWeight: '700',
  },
  navItems: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  navItemsMobile: {
    width: '100%',
  },
  navPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  navPillActive: {
    backgroundColor: palette.dark,
  },
  navPillText: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  navPillTextActive: {
    color: '#f3ecd7',
  },
  hero: {
    minHeight: 560,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    zIndex: 1,
  },
  heroMobile: {
    minHeight: 480,
  },
  heroInner: {
    maxWidth: 820,
    width: '100%',
    alignItems: 'center',
  },
  eyebrowPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: palette.dark,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: 28,
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: palette.accent,
  },
  eyebrowText: {
    color: '#f3ecd7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontSize: 11,
    fontWeight: '700',
  },
  heroTitle: {
    textAlign: 'center',
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 68,
    lineHeight: 76,
    fontWeight: '700',
    marginBottom: 18,
  },
  heroTitleMobile: {
    fontSize: 42,
    lineHeight: 50,
  },
  heroAccent: {
    color: palette.accent,
    fontStyle: 'italic',
  },
  heroDescription: {
    maxWidth: 560,
    textAlign: 'center',
    color: palette.muted,
    fontSize: 16,
    lineHeight: 30,
    marginBottom: 28,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  heroActionsMobile: {
    flexDirection: 'column',
    width: '100%',
  },
  actionButton: {
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 999,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonDark: {
    backgroundColor: palette.dark,
    borderColor: palette.dark,
  },
  actionButtonLight: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(154,107,48,0.45)',
  },
  actionButtonPressed: {
    opacity: 0.86,
  },
  actionButtonDarkText: {
    color: '#f3ecd7',
    fontWeight: '700',
    fontSize: 14,
  },
  actionButtonLightText: {
    color: '#5a3a10',
    fontWeight: '700',
    fontSize: 14,
  },
  tickerWrap: {
    backgroundColor: palette.dark,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#3d2a10',
    paddingVertical: 10,
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  tickerText: {
    color: '#f3ecd7',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  sectionBlock: {
    backgroundColor: '#f3ecd7',
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingVertical: 56,
  },
  sectionLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 36,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(154,107,48,0.2)',
  },
  sectionLabel: {
    color: '#b8964a',
    fontSize: 11,
    letterSpacing: 1.6,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardGrid: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
  },
  cardGridMobile: {
    flexDirection: 'column',
  },
  directoryCard: {
    flexBasis: '48%',
    backgroundColor: palette.paper,
    borderRadius: 20,
    borderWidth: 1.5,
    overflow: 'hidden',
    minWidth: 320,
  },
  directoryCardPressed: {
    transform: [{ translateY: -2 }],
  },
  cardTopBar: {
    height: 6,
  },
  directoryCardBody: {
    padding: 24,
  },
  directoryHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGlyph: {
    fontSize: 22,
    fontWeight: '700',
  },
  directorySubtitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  directoryTitle: {
    color: palette.ink,
    fontSize: 28,
    lineHeight: 34,
    fontFamily: 'Georgia',
    fontWeight: '700',
    marginBottom: 12,
  },
  directoryDescription: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 26,
    marginBottom: 18,
  },
  directoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  tagPill: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  enterText: {
    fontSize: 14,
    fontWeight: '700',
  },
  statsWrap: {
    backgroundColor: palette.paper,
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingVertical: 44,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(154,107,48,0.12)',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,
  },
  statsGridMobile: {
    flexDirection: 'column',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    color: palette.accent,
    fontSize: 44,
    lineHeight: 52,
    fontFamily: 'Georgia',
    fontWeight: '700',
  },
  statLabel: {
    color: palette.ink,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 4,
  },
  statSub: {
    color: '#b09070',
    fontSize: 12,
  },
  quoteSection: {
    backgroundColor: palette.bgDeep,
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingVertical: 72,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  quoteBackground: {
    position: 'absolute',
    color: 'rgba(154,107,48,0.05)',
    fontSize: 110,
    fontFamily: 'Georgia',
    fontWeight: '700',
    letterSpacing: -2,
  },
  quoteContent: {
    maxWidth: 700,
    alignItems: 'center',
    zIndex: 1,
  },
  quoteMark: {
    color: 'rgba(154,107,48,0.2)',
    fontFamily: 'Georgia',
    fontSize: 72,
    lineHeight: 72,
    marginBottom: 14,
  },
  quoteText: {
    textAlign: 'center',
    color: '#4a2e0a',
    fontFamily: 'Georgia',
    fontSize: 28,
    lineHeight: 44,
    fontStyle: 'italic',
  },
  quoteLine: {
    width: 60,
    height: 2,
    backgroundColor: palette.accent,
    marginTop: 28,
  },
  subPage: {
    paddingTop: 12,
    paddingBottom: 28,
  },
  pageHeader: {
    maxWidth: 840,
    marginBottom: 28,
  },
  backLink: {
    alignSelf: 'flex-start',
    marginBottom: 18,
  },
  backLinkText: {
    color: palette.accent,
    fontSize: 14,
    fontWeight: '700',
  },
  sectionEyebrow: {
    color: palette.muted,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  sectionTitle: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 46,
    lineHeight: 54,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionText: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 28,
  },
  courseLayout: {
    flexDirection: 'row',
    gap: 22,
    alignItems: 'flex-start',
  },
  courseLayoutMobile: {
    flexDirection: 'column',
  },
  courseMain: {
    flex: 1.18,
    gap: 18,
  },
  courseSidebar: {
    flex: 0.82,
    gap: 18,
  },
  courseImageWrap: {
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.accentBorder,
    backgroundColor: palette.paper,
  },
  courseImage: {
    width: '100%',
    height: 560,
  },
  courseOverlay: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
    backgroundColor: 'rgba(250, 246, 236, 0.82)',
    borderRadius: 20,
    padding: 18,
  },
  courseOverlayTag: {
    color: palette.muted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  courseOverlayTitle: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    marginBottom: 8,
  },
  courseOverlayTools: {
    color: palette.muted,
    fontSize: 14,
  },
  courseActionRow: {
    flexDirection: 'row',
    gap: 18,
  },
  courseActionRowMobile: {
    flexDirection: 'column',
  },
  panel: {
    backgroundColor: palette.paperSoft,
    borderWidth: 1,
    borderColor: palette.accentBorder,
    borderRadius: 24,
    padding: 22,
  },
  videoPanel: {
    flex: 1,
  },
  portalLinkPanel: {
    flex: 0.78,
    justifyContent: 'space-between',
    gap: 14,
  },
  panelEyebrow: {
    color: palette.muted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: '700',
    marginBottom: 10,
  },
  panelTitle: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    marginBottom: 12,
  },
  panelText: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 26,
  },
  videoPanelTitle: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    marginBottom: 10,
  },
  portalLinkTitle: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    marginTop: 8,
    backgroundColor: palette.ink,
  },
  bulletText: {
    flex: 1,
    color: palette.muted,
    fontSize: 15,
    lineHeight: 26,
  },
  agentPageCard: {
    flexBasis: '48%',
    minWidth: 320,
    minHeight: 240,
  },
  agentPageIndex: {
    color: palette.accent,
    fontFamily: 'Georgia',
    fontSize: 38,
    lineHeight: 44,
    marginBottom: 16,
  },
  agentPageTitle: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    marginBottom: 12,
  },
  agentPageText: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 26,
  },
  fullWidth: {
    width: '100%',
    minWidth: 0,
  },
  blobTopRight: {
    position: 'absolute',
    top: -60,
    right: -80,
    width: 420,
    height: 420,
    backgroundColor: 'rgba(125,200,160,0.22)',
    borderRadius: 999,
  },
  blobBottomLeft: {
    position: 'absolute',
    bottom: 60,
    left: -60,
    width: 280,
    height: 260,
    backgroundColor: 'rgba(232,149,109,0.18)',
    borderRadius: 999,
  },
  blobMiddleRight: {
    position: 'absolute',
    top: '35%',
    right: '5%',
    width: 120,
    height: 120,
    backgroundColor: 'rgba(46,62,80,0.07)',
    borderRadius: 999,
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 99,
  },
});
