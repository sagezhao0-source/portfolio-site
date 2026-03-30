import React from 'react';
import {
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

const palette = {
  bg: '#f6f0e7',
  paper: '#fbf6ee',
  paperSoft: 'rgba(251, 246, 238, 0.78)',
  ink: '#2f241d',
  muted: '#736456',
  line: 'rgba(88, 67, 49, 0.18)',
  warm: '#d7b38d',
  olive: '#9dab92',
  stone: '#9aa3a8',
  smoke: '#d7d0c4',
  charcoal: '#251d18',
};

const coursePortal = {
  title: '形象思维与工程语言',
  subtitle: '课程门户设计',
  tools: '可灵 / Gemini / DeepSeek',
  link: 'https://mooc1.chaoxing.com/course-ans/courseportal/258585261.html',
  videoPath: 'd:\\超星工作内容\\日志\\上海交大 形象思维与工程语言\\vidu-video-3059543692015756.mp4',
  summary:
    '先根据课程名称搜索信息，再观察同系列课程已上线页面，发现整体风格偏艺术、文艺，于是转向更具草图感和人文气息的视觉方向。',
  process: [
    '从课程气质出发，决定参考达芬奇人体解剖图与工程草图的结合感，让工程结构拥有更有人文温度的图像语言。',
    '先让 DeepSeek 帮忙整理提示词，在多个平台测试画面气质，最后选定可灵生成更贴近课程氛围的主视觉。',
    '再用 Gemini 讨论课程标题的排版方向，让黑体块面和底图线稿形成张力，最后确定目前这版封面。',
    '视频也沿用了同样的参考方向，所以网站里会预留一个不遮挡主图的背景视频位置。',
  ],
};

const agentTracks = [
  {
    title: '智能体项目展示',
    note:
      '这里先作为第二板块的结构占位，后面可以按智能体名称、能力、工作流、界面截图继续往里填。',
  },
  {
    title: '能力拆解',
    note:
      '建议后续放成 3 列：任务理解、生成协作、交互设计。这样和课程门户形成内容层次上的区分。',
  },
];

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < 980;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.page}>
          <View style={styles.washTop} />
          <View style={styles.washLeft} />
          <View style={styles.washRight} />

          <View style={[styles.nav, isMobile && styles.navMobile]}>
            <Text style={styles.brand}>Portfolio Draft</Text>
            <View style={[styles.navLinks, isMobile && styles.navLinksMobile]}>
              <Text style={styles.navLink}>课程门户设计</Text>
              <Text style={styles.navLink}>智能体</Text>
              <Text style={styles.navLink}>创作方法</Text>
            </View>
          </View>

          <View style={[styles.hero, isMobile && styles.heroMobile]}>
            <View style={styles.heroCopy}>
              <Text style={styles.eyebrow}>个人作品网站 / 第一版结构预览</Text>
              <Text style={[styles.heroTitle, isMobile && styles.heroTitleMobile]}>
                把课程门户设计和智能体项目，整理成一个方便分享的作品网站。
              </Text>
              <Text style={styles.heroText}>
                这版先优先搭出网站样子和叙事顺序。页面分成两个主板块，课程门户设计会按课程继续扩展，
                每门课都可以带封面图、视频和创作思路；智能体板块会单独保留展示区，不和课程项目混在一起。
              </Text>

              <View style={[styles.heroActions, isMobile && styles.heroActionsMobile]}>
                <ActionButton
                  label="打开课程门户"
                  onPress={() => Linking.openURL(coursePortal.link)}
                  kind="dark"
                />
                <ActionButton
                  label="查看本地视频位置"
                  onPress={() => {}}
                  kind="light"
                />
              </View>
            </View>

            <View style={styles.heroPanel}>
              <Text style={styles.heroPanelLabel}>当前已接入素材</Text>
              <Text style={styles.heroPanelTitle}>1 张课程封面图 + 1 个课程视频</Text>
              <Text style={styles.heroPanelText}>
                现在先把“形象思维与工程语言”放成首个课程案例。后续你再给我更多课程资料，我就能按同样方式继续加卡片。
              </Text>
            </View>
          </View>

          <SectionIntro
            eyebrow="Part 01"
            title="课程门户设计"
            text="按课程拆分展示。每门课程是一张大卡片，主图可完整查看，创作思路放在旁边，不会遮挡图片。"
          />

          <View style={[styles.portalSection, isMobile && styles.portalSectionMobile]}>
            <View style={[styles.portalVisualColumn, isMobile && styles.fullWidth]}>
              <View style={styles.portalImageCard}>
                <Image source={portalCover} style={styles.portalImage} resizeMode="cover" />
                <View style={styles.portalImageOverlay}>
                  <Text style={styles.portalTag}>{coursePortal.subtitle}</Text>
                  <Text style={styles.portalImageTitle}>{coursePortal.title}</Text>
                  <Text style={styles.portalTools}>{coursePortal.tools}</Text>
                </View>
              </View>

              <View style={[styles.mediaStrip, isMobile && styles.mediaStripMobile]}>
                <View style={styles.videoSlot}>
                  <Text style={styles.videoSlotLabel}>门户背景视频位</Text>
                  <Text style={styles.videoSlotTitle}>保留给课程视频，不遮挡主图</Text>
                  <Text style={styles.videoSlotText}>
                    当前先展示结构和位置。后面我们可以把这块改成真正可播放的视频区域，或点击后弹出播放。
                  </Text>
                </View>

                <View style={styles.quickLinksCard}>
                  <Text style={styles.quickLinksTitle}>快速入口</Text>
                  <ActionButton
                    label="进入课程门户"
                    onPress={() => Linking.openURL(coursePortal.link)}
                    kind="dark"
                  />
                  <View style={styles.quickMeta}>
                    <Text style={styles.quickMetaText}>视频素材路径已记录</Text>
                    <Text style={styles.quickMetaPath}>{coursePortal.videoPath}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.portalTextColumn, isMobile && styles.fullWidth]}>
              <Panel>
                <Text style={styles.panelEyebrow}>课程概述</Text>
                <Text style={styles.panelTitle}>{coursePortal.title}</Text>
                <Text style={styles.panelText}>{coursePortal.summary}</Text>
              </Panel>

              <Panel>
                <Text style={styles.panelEyebrow}>创作思路</Text>
                {coursePortal.process.map((item) => (
                  <View key={item} style={styles.processRow}>
                    <View style={styles.processDot} />
                    <Text style={styles.processText}>{item}</Text>
                  </View>
                ))}
              </Panel>
            </View>
          </View>

          <View style={styles.portalFooterNote}>
            <Text style={styles.portalFooterNoteText}>
              这一块后面可以继续扩成课程列表，每个课程都统一为：封面图、视频位、创作思路、门户链接。
            </Text>
          </View>

          <SectionIntro
            eyebrow="Part 02"
            title="智能体"
            text="先把第二主板块留出来，和课程门户设计分开展示。后续可以根据你的智能体项目数量继续扩展。"
          />

          <View style={[styles.agentGrid, isMobile && styles.agentGridMobile]}>
            {agentTracks.map((item, index) => (
              <Panel key={item.title} style={[styles.agentCard, isMobile && styles.fullWidth]}>
                <Text style={styles.agentIndex}>0{index + 1}</Text>
                <Text style={styles.agentTitle}>{item.title}</Text>
                <Text style={styles.agentText}>{item.note}</Text>
              </Panel>
            ))}
          </View>

          <View style={[styles.bottomBand, isMobile && styles.bottomBandMobile]}>
            <View style={[styles.quoteCard, isMobile && styles.fullWidth]}>
              <Text style={styles.quoteMark}>"</Text>
              <Text style={styles.quoteText}>
                这一版先解决结构和气质，再逐步把每门课程和每个智能体的真实内容填进去。
              </Text>
            </View>

            <View style={[styles.nextCard, isMobile && styles.fullWidth]}>
              <Text style={styles.panelEyebrow}>下一步建议</Text>
              <Text style={styles.nextTitle}>继续补充第二门课程，或者开始填智能体项目。</Text>
              <Text style={styles.nextText}>
                你现在已经给了第一门课的图和视频，我们已经能看到网站的基本样子。后面每多给一门课，
                这个网站就会更完整。
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <View style={styles.sectionIntro}>
      <Text style={styles.sectionEyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionText}>{text}</Text>
    </View>
  );
}

function Panel({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.panel, style]}>{children}</View>;
}

function ActionButton({
  label,
  onPress,
  kind,
}: {
  label: string;
  onPress: () => void;
  kind: 'dark' | 'light';
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        kind === 'dark' ? styles.buttonDark : styles.buttonLight,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={kind === 'dark' ? styles.buttonDarkText : styles.buttonLightText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  scrollView: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  scrollContent: {
    flexGrow: 1,
  },
  page: {
    flex: 1,
    backgroundColor: palette.bg,
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 64,
    overflow: 'hidden',
  },
  washTop: {
    position: 'absolute',
    top: -80,
    left: '15%',
    width: 420,
    height: 220,
    borderRadius: 999,
    backgroundColor: 'rgba(215, 179, 141, 0.18)',
    transform: [{ rotate: '-8deg' }],
  },
  washLeft: {
    position: 'absolute',
    top: 460,
    left: -80,
    width: 230,
    height: 540,
    borderRadius: 999,
    backgroundColor: 'rgba(157, 171, 146, 0.16)',
    transform: [{ rotate: '12deg' }],
  },
  washRight: {
    position: 'absolute',
    top: 1020,
    right: -90,
    width: 240,
    height: 420,
    borderRadius: 999,
    backgroundColor: 'rgba(154, 163, 168, 0.14)',
    transform: [{ rotate: '-18deg' }],
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    zIndex: 2,
  },
  navMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 14,
  },
  brand: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 22,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 22,
  },
  navLinksMobile: {
    flexWrap: 'wrap',
    rowGap: 10,
  },
  navLink: {
    color: palette.muted,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  hero: {
    flexDirection: 'row',
    gap: 22,
    marginBottom: 48,
    zIndex: 2,
  },
  heroMobile: {
    flexDirection: 'column',
  },
  heroCopy: {
    flex: 1.2,
    backgroundColor: palette.paperSoft,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: palette.line,
    padding: 30,
  },
  eyebrow: {
    color: palette.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 11,
    marginBottom: 14,
  },
  heroTitle: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 56,
    lineHeight: 68,
    marginBottom: 18,
  },
  heroTitleMobile: {
    fontSize: 38,
    lineHeight: 47,
  },
  heroText: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 28,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 26,
  },
  heroActionsMobile: {
    flexDirection: 'column',
  },
  heroPanel: {
    flex: 0.8,
    borderRadius: 32,
    padding: 28,
    backgroundColor: palette.charcoal,
    justifyContent: 'center',
  },
  heroPanelLabel: {
    color: '#d9cdbf',
    textTransform: 'uppercase',
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 10,
  },
  heroPanelTitle: {
    color: '#fff8ef',
    fontFamily: 'Georgia',
    fontSize: 34,
    lineHeight: 42,
    marginBottom: 14,
  },
  heroPanelText: {
    color: '#e5d9ca',
    fontSize: 15,
    lineHeight: 26,
  },
  button: {
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDark: {
    backgroundColor: palette.ink,
    borderColor: palette.ink,
  },
  buttonLight: {
    backgroundColor: 'transparent',
    borderColor: palette.line,
  },
  buttonPressed: {
    opacity: 0.86,
  },
  buttonDarkText: {
    color: '#fff8ef',
    fontSize: 14,
  },
  buttonLightText: {
    color: palette.ink,
    fontSize: 14,
  },
  sectionIntro: {
    marginBottom: 22,
    maxWidth: 860,
    zIndex: 2,
  },
  sectionEyebrow: {
    color: palette.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 11,
    marginBottom: 10,
  },
  sectionTitle: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 42,
    lineHeight: 52,
    marginBottom: 12,
  },
  sectionText: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 28,
  },
  portalSection: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'flex-start',
    marginBottom: 18,
    zIndex: 2,
  },
  portalSectionMobile: {
    flexDirection: 'column',
  },
  portalVisualColumn: {
    flex: 1.15,
    gap: 18,
  },
  portalTextColumn: {
    flex: 0.85,
    gap: 18,
  },
  portalImageCard: {
    overflow: 'hidden',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
  },
  portalImage: {
    width: '100%',
    height: 520,
  },
  portalImageOverlay: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 24,
    backgroundColor: 'rgba(251, 246, 238, 0.76)',
    borderRadius: 22,
    padding: 18,
  },
  portalTag: {
    color: palette.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 11,
    marginBottom: 8,
  },
  portalImageTitle: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 28,
    lineHeight: 35,
    marginBottom: 8,
  },
  portalTools: {
    color: palette.muted,
    fontSize: 14,
  },
  mediaStrip: {
    flexDirection: 'row',
    gap: 18,
  },
  mediaStripMobile: {
    flexDirection: 'column',
  },
  videoSlot: {
    flex: 1,
    minHeight: 210,
    borderRadius: 28,
    padding: 22,
    backgroundColor: '#e4dbd0',
    borderWidth: 1,
    borderColor: palette.line,
    justifyContent: 'flex-end',
  },
  videoSlotLabel: {
    color: palette.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 11,
    marginBottom: 8,
  },
  videoSlotTitle: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 28,
    lineHeight: 35,
    marginBottom: 10,
  },
  videoSlotText: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 24,
  },
  quickLinksCard: {
    flex: 0.8,
    borderRadius: 28,
    padding: 22,
    backgroundColor: palette.paperSoft,
    borderWidth: 1,
    borderColor: palette.line,
    justifyContent: 'space-between',
    gap: 16,
  },
  quickLinksTitle: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 24,
  },
  quickMeta: {
    gap: 6,
  },
  quickMetaText: {
    color: palette.muted,
    fontSize: 13,
  },
  quickMetaPath: {
    color: palette.ink,
    fontSize: 12,
    lineHeight: 20,
  },
  panel: {
    backgroundColor: palette.paperSoft,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: palette.line,
  },
  panelEyebrow: {
    color: palette.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 11,
    marginBottom: 10,
  },
  panelTitle: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 32,
    lineHeight: 40,
    marginBottom: 12,
  },
  panelText: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 27,
  },
  processRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  processDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: palette.ink,
    marginTop: 8,
  },
  processText: {
    flex: 1,
    color: palette.muted,
    fontSize: 15,
    lineHeight: 25,
  },
  portalFooterNote: {
    marginBottom: 58,
    borderTopWidth: 1,
    borderTopColor: palette.line,
    paddingTop: 16,
    zIndex: 2,
  },
  portalFooterNoteText: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 24,
  },
  agentGrid: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 54,
    zIndex: 2,
  },
  agentGridMobile: {
    flexDirection: 'column',
  },
  agentCard: {
    flex: 1,
    minHeight: 220,
  },
  agentIndex: {
    color: palette.muted,
    fontSize: 36,
    fontFamily: 'Georgia',
    marginBottom: 18,
  },
  agentTitle: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 28,
    lineHeight: 34,
    marginBottom: 12,
  },
  agentText: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 25,
  },
  bottomBand: {
    flexDirection: 'row',
    gap: 20,
    zIndex: 2,
  },
  bottomBandMobile: {
    flexDirection: 'column',
  },
  quoteCard: {
    flex: 0.95,
    backgroundColor: '#eadfd1',
    borderRadius: 28,
    padding: 26,
    justifyContent: 'center',
  },
  quoteMark: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 72,
    lineHeight: 72,
    marginBottom: 8,
  },
  quoteText: {
    color: palette.ink,
    fontFamily: 'Georgia',
    fontSize: 28,
    lineHeight: 40,
  },
  nextCard: {
    flex: 1.05,
    borderRadius: 28,
    padding: 26,
    backgroundColor: palette.charcoal,
    justifyContent: 'center',
  },
  nextTitle: {
    color: '#fff8ef',
    fontFamily: 'Georgia',
    fontSize: 34,
    lineHeight: 42,
    marginBottom: 12,
  },
  nextText: {
    color: '#e5d9ca',
    fontSize: 16,
    lineHeight: 27,
  },
  fullWidth: {
    width: '100%',
  },
});
