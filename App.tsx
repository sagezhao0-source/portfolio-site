import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Linking,
  Modal,
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

type CourseStep = {
  step: number;
  title: string;
  content: string;
  imageCaption?: string;
};

type CourseItem = {
  id: number;
  title: string;
  subtitle: string;
  tools: string[];
  tags: string[];
  brief: string;
  portalUrl?: string;
  hasVideo: boolean;
  videoNote?: string;
  coverType: 'image' | 'abstract';
  coverSource?: any;
  coverPalette: {
    base: string;
    accent: string;
    text: string;
  };
  story: {
    intro: string;
    steps: CourseStep[];
    reflection?: string;
  };
};

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

const courses: CourseItem[] = [
  {
    id: 1,
    title: '形象思维与工程语言',
    subtitle: '课程封面设计 · AI 图像生成',
    tools: ['可灵 Kling', 'Gemini', 'DeepSeek'],
    tags: ['课程封面', '达芬奇风格', '工程制图', '文艺理工'],
    brief:
      '借鉴达芬奇人体解剖图的手稿美学，为《形象思维与工程语言》课程设计兼具理性与艺术气质的封面与配套视频。',
    portalUrl: 'https://mooc1.chaoxing.com/course-ans/courseportal/258585261.html',
    hasVideo: true,
    videoNote: '视频采用与封面相同的手稿风格，后续可继续接入真实播放或弹层观看。',
    coverType: 'image',
    coverSource: portalCover,
    coverPalette: {
      base: '#e8dfd1',
      accent: '#5a7248',
      text: '#1c2414',
    },
    story: {
      intro:
        '这次创作起源于看到《形象思维与工程语言》这门课程。作为一门融合理性思维与艺术感知的工科课程，它的视觉呈现方式本身就应该有所讲究。',
      steps: [
        {
          step: 1,
          title: '发现契机',
          content:
            '先搜索课程相关信息，并观察同系列课程已上线页面。整体风格偏艺术与文艺，这与常规工科课程形成对比，也让我意识到这门课值得有一个更讲究的视觉方向。',
        },
        {
          step: 2,
          title: '灵感碰撞',
          content:
            '在思考什么样的视觉语言能同时承载工程的严谨与形象思维的感性时，我联想到达芬奇的人体解剖图手稿，那种科学精度和艺术张力并存的状态非常契合这个命题。',
        },
        {
          step: 3,
          title: '提示词创作',
          content:
            '确定方向后，让 DeepSeek 协助生成和润色提示词，反复强调手稿质感、工程制图线条、复古羊皮纸底色和机械零件多视角结构，让画面具备手稿与蓝图叠合的感觉。',
        },
        {
          step: 4,
          title: '多平台测试',
          content:
            '把提示词分别放到不同平台测试，对比它们在工程线图精准度与复古手稿气质上的表现。最终可灵更接近我想要的线条力度和整体质感，因此成为最终出图平台。',
        },
        {
          step: 5,
          title: '排版定稿',
          content:
            '图像生成完成后，再用 Gemini 探索课程标题的排版方式。最终确定了右侧半透明灰底加粗黑字的方案，让标题与底图形成明显对比，同时不破坏整张画面的手稿感。',
        },
        {
          step: 6,
          title: '视频延伸',
          content:
            '封面定稿后，我继续为课程制作配套视频，让线条像被逐步描绘出来一样，让静止的工程手稿拥有动态生成的过程感。',
        },
      ],
      reflection:
        '这次创作最大的收获，是找到了一种把 AI 工具与历史视觉语言结合的方法。达芬奇留下的不只是画作，也是一种兼顾科学与美学的观察方式。',
    },
  },
  {
    id: 2,
    title: '跨境电子商务',
    subtitle: '课程封面设计 · 科技风格迭代',
    tools: ['即梦 Jimeng', 'DeepSeek'],
    tags: ['课程封面', '科技感', '全球电商', '风格迭代'],
    brief:
      '以 DeepSeek 生成提示词、即梦平台出图，历经两轮风格迭代，从基础电商元素逐步推进到更现代的 AI 与全球网络叙事。',
    portalUrl: 'https://mooc1.chaoxing.com/course-ans/courseportal/258113344.html',
    hasVideo: false,
    coverType: 'abstract',
    coverPalette: {
      base: '#dde7f7',
      accent: '#49639b',
      text: '#21324f',
    },
    story: {
      intro:
        '《跨境电子商务》是一门自带全球互联感的课程。它涉及国际贸易、数字营销、平台运营与供应链，本身就非常适合做更具当代感的科技视觉。',
      steps: [
        {
          step: 1,
          title: '定位课程调性',
          content:
            '先从课程名称出发梳理视觉关键词: 全球视野、数字平台、物流网络、交易流转。风格需要同时体现专业感和行业速度感。',
        },
        {
          step: 2,
          title: '生成初版提示词',
          content:
            '用 DeepSeek 辅助生成第一版图像提示词，聚焦蓝色地球仪、购物车、包裹和科技线条等基础电商视觉元素。',
        },
        {
          step: 3,
          title: '第一次出图与问题',
          content:
            '第一轮在即梦平台出图后，画面偏向图标堆叠，虽然解释了电商元素，但缺乏行业升级感，也没有把 AI 与全球网络的语境带进去。',
        },
        {
          step: 4,
          title: '调整方向',
          content:
            '于是改成更强调场景叙事的提示词，加入 AI 机器人助手、全球节点、悬浮 UI 和数据流，把叙事从静态图解推进到当代科技环境。',
        },
        {
          step: 5,
          title: '第二轮成型',
          content:
            '第二轮画面的蓝紫渐变、发光网络与平台元素明显更有“AI + 全球电商”的现代感，也更贴近课程的时代语境。',
        },
        {
          step: 6,
          title: '复盘',
          content:
            '这次让我更明确一件事: 课程封面不该只是关键词图解，而应该讲述一个行业正在发生的故事，视觉叙事要跟上课程背后的时代背景。',
        },
      ],
      reflection:
        '第一版不是失败，而是给第二版提供了判断依据。AI 生成的价值之一，就是允许我低成本快速试错，直到找到真正贴题的方向。',
    },
  },
  {
    id: 3,
    title: '天然药物化学',
    subtitle: '课程封面设计 · 中药文化与地域特色',
    tools: ['即梦 Jimeng', 'Gemini', 'GPT-4'],
    tags: ['课程封面', '中药', '云南扎染', '水彩风格'],
    brief:
      '尝试把云南扎染工艺与天然药物元素结合起来，通过多平台迭代，让课程封面同时拥有地域文化与学科专业性的表达。',
    hasVideo: false,
    coverType: 'abstract',
    coverPalette: {
      base: '#dce8ee',
      accent: '#547789',
      text: '#234352',
    },
    story: {
      intro:
        '《天然药物化学》的封面设计来自一次“地域文化 + 学科特色”的融合尝试。教师希望画面带出云南特色，而不是只停留在传统化学课程的常见视觉上。',
      steps: [
        {
          step: 1,
          title: '文化溯源',
          content:
            '想到云南特色时，我先联想到扎染。它的蓝色调、晕染肌理和植物纹样都能和天然药物的气质形成很自然的联系。',
        },
        {
          step: 2,
          title: '提示词构思',
          content:
            '接着让 GPT 协助整理提示词，把云南扎染纹理、药用植物、化学分子结构、水彩笔触等关键词组合起来，形成既传统又现代的描述框架。',
        },
        {
          step: 3,
          title: '背景图探索',
          content:
            '先专门做扎染背景图，在即梦和 Gemini 之间对比“渐变晕染”和“传统工艺肌理”的表现，找到既有文化味道又能为主体留空间的版本。',
          imageCaption: '这里后续可以补上扎染背景图的过程图。',
        },
        {
          step: 4,
          title: '主体图测试',
          content:
            '背景确定后，再把药用植物、切片、中药材和化学结构式结合到主体设计里，比较不同平台在植物细节、色调与构图上的优缺点。',
        },
        {
          step: 5,
          title: '风格融合',
          content:
            '最终形成水彩笔触和扎染底色并置的方案: 前景是暖色药材，背景是蓝色扎染纹理，右上角保留结构式，让传统文化和专业属性一起出现。',
        },
        {
          step: 6,
          title: '定稿复盘',
          content:
            '这次最难的是如何让文化感和专业感保持平衡。最终找到的答案是: 文化作为底色，专业作为主体，让两者自然共生。',
        },
      ],
      reflection:
        'AI 工具在这里不只是执行者，更像创作过程中的对话伙伴。从提示词构思到跨平台对比，每一步都帮助我逼近更合适的表达方式。',
    },
  },
];

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
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [courseTab, setCourseTab] = useState<'story' | 'video'>('story');

  useEffect(() => {
    if (!selectedCourse) setCourseTab('story');
  }, [selectedCourse]);

  return (
    <View style={styles.subPage}>
      <PageHeader
        eyebrow="COURSE PORTAL"
        title="课程门户设计"
        text="按课程拆分展示，每门课程都能放封面图、创作思路、门户链接，以及后续的视频播放入口。"
        backLabel="返回首页"
        onBack={() => onNavigate('home')}
      />

      <View style={[styles.courseGrid, isMobile && styles.courseGridMobile]}>
        {courses.map((course) => (
          <Pressable
            key={course.id}
            onPress={() => setSelectedCourse(course)}
            style={({ pressed }) => [
              styles.courseCard,
              pressed && styles.directoryCardPressed,
              isMobile && styles.fullWidth,
            ]}
          >
            <CourseCover course={course} compact />
            <View style={styles.courseCardBody}>
              <Text style={styles.courseCardTitle}>{course.title}</Text>
              <Text style={styles.courseCardSubtitle}>{course.subtitle}</Text>
              <Text style={styles.courseCardBrief}>{course.brief}</Text>

              <View style={styles.courseCardTags}>
                {course.tools.slice(0, 2).map((tool) => (
                  <View key={tool} style={styles.courseToolPill}>
                    <Text style={styles.courseToolPillText}>{tool}</Text>
                  </View>
                ))}
                {course.hasVideo && (
                  <View style={styles.courseVideoPill}>
                    <Text style={styles.courseVideoPillText}>视频</Text>
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        ))}

        <View style={[styles.courseCard, styles.coursePlaceholderCard, isMobile && styles.fullWidth]}>
          <View style={styles.coursePlaceholderIcon}>
            <Text style={styles.coursePlaceholderIconText}>+</Text>
          </View>
          <Text style={styles.coursePlaceholderTitle}>更多课程</Text>
          <Text style={styles.coursePlaceholderText}>继续把新的课程封面、配套视频与创作思路加进来。</Text>
        </View>
      </View>

      <Modal
        visible={!!selectedCourse}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedCourse(null)}
      >
        {selectedCourse ? (
          <Pressable style={styles.modalBackdrop} onPress={() => setSelectedCourse(null)}>
            <Pressable
              onPress={(event) => event.stopPropagation()}
              style={[styles.courseModalCard, isMobile && styles.courseModalCardMobile]}
            >
              <View style={[styles.courseModalVisual, isMobile && styles.courseModalVisualMobile]}>
                <Pressable style={styles.courseModalCoverWrap}>
                  <CourseCover course={selectedCourse} />
                </Pressable>

                <View style={styles.courseModalBottom}>
                  <View style={styles.courseModalToolWrap}>
                    {selectedCourse.tools.map((tool) => (
                      <View key={tool} style={styles.courseModalToolPill}>
                        <Text style={styles.courseModalToolText}>{tool}</Text>
                      </View>
                    ))}
                  </View>

                  {selectedCourse.portalUrl ? (
                    <ActionButton
                      label="进入课程门户"
                      kind="dark"
                      onPress={() => Linking.openURL(selectedCourse.portalUrl!)}
                    />
                  ) : null}
                </View>
              </View>

              <View style={styles.courseModalContent}>
                <Pressable onPress={() => setSelectedCourse(null)} style={styles.modalClose}>
                  <Text style={styles.modalCloseText}>×</Text>
                </Pressable>

                <Text style={styles.modalTitle}>{selectedCourse.title}</Text>
                <Text style={styles.modalSubtitle}>{selectedCourse.subtitle}</Text>
                <Text style={styles.modalBrief}>{selectedCourse.brief}</Text>

                <View style={styles.modalTagWrap}>
                  {selectedCourse.tags.map((tag) => (
                    <View key={tag} style={styles.modalTag}>
                      <Text style={styles.modalTagText}>#{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.modalTabs}>
                  <Pressable
                    onPress={() => setCourseTab('story')}
                    style={[styles.modalTab, courseTab === 'story' && styles.modalTabActive]}
                  >
                    <Text style={[styles.modalTabText, courseTab === 'story' && styles.modalTabTextActive]}>
                      创作思路
                    </Text>
                  </Pressable>
                  {selectedCourse.hasVideo ? (
                    <Pressable
                      onPress={() => setCourseTab('video')}
                      style={[styles.modalTab, courseTab === 'video' && styles.modalTabActive]}
                    >
                      <Text style={[styles.modalTabText, courseTab === 'video' && styles.modalTabTextActive]}>
                        配套视频
                      </Text>
                    </Pressable>
                  ) : null}
                </View>

                <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalScrollContent}>
                  {courseTab === 'story' ? (
                    <>
                      <Text style={styles.modalIntro}>{selectedCourse.story.intro}</Text>
                      {selectedCourse.story.steps.map((step, index) => (
                        <View key={`${selectedCourse.id}-${step.step}`} style={styles.stepRow}>
                          <View style={styles.stepColumn}>
                            <View style={styles.stepCircle}>
                              <Text style={styles.stepCircleText}>{step.step}</Text>
                            </View>
                            {index < selectedCourse.story.steps.length - 1 ? <View style={styles.stepLine} /> : null}
                          </View>
                          <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>{step.title}</Text>
                            <Text style={styles.stepText}>{step.content}</Text>
                            {step.imageCaption ? <Text style={styles.stepCaption}>{step.imageCaption}</Text> : null}
                          </View>
                        </View>
                      ))}

                      {selectedCourse.story.reflection ? (
                        <View style={styles.reflectionBox}>
                          <Text style={styles.reflectionText}>{selectedCourse.story.reflection}</Text>
                        </View>
                      ) : null}
                    </>
                  ) : (
                    <View style={styles.videoPlaceholderBox}>
                      <View style={styles.videoPlaceholderRing}>
                        <Text style={styles.videoPlaceholderPlay}>▶</Text>
                      </View>
                      <Text style={styles.videoPlaceholderTitle}>视频即将接入</Text>
                      <Text style={styles.videoPlaceholderText}>{selectedCourse.videoNote}</Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            </Pressable>
          </Pressable>
        ) : null}
      </Modal>
    </View>
  );
}

function CourseCover({ course, compact = false }: { course: CourseItem; compact?: boolean }) {
  if (course.coverType === 'image' && course.coverSource) {
    return (
      <View style={[styles.courseCoverWrap, compact && styles.courseCoverWrapCompact]}>
        <Image source={course.coverSource} style={styles.courseCoverImage} resizeMode="cover" />
        <View style={styles.courseCoverOverlay}>
          <Text style={styles.courseCoverOverlayTag}>{course.subtitle}</Text>
          <Text style={styles.courseCoverOverlayTitle}>{course.title}</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.courseCoverWrap,
        compact && styles.courseCoverWrapCompact,
        { backgroundColor: course.coverPalette.base },
      ]}
    >
      <View
        style={[
          styles.abstractOrbLarge,
          { backgroundColor: `${course.coverPalette.accent}22`, borderColor: `${course.coverPalette.accent}33` },
        ]}
      />
      <View
        style={[
          styles.abstractOrbSmall,
          { backgroundColor: `${course.coverPalette.accent}1A`, borderColor: `${course.coverPalette.accent}2B` },
        ]}
      />
      <View style={styles.abstractCoverTextWrap}>
        <Text style={[styles.abstractCoverTag, { color: course.coverPalette.accent }]}>{course.subtitle}</Text>
        <Text style={[styles.abstractCoverTitle, { color: course.coverPalette.text }]}>{course.title}</Text>
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
  courseGrid: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  courseGridMobile: {
    flexDirection: 'column',
  },
  courseCard: {
    flexBasis: '31%',
    minWidth: 280,
    backgroundColor: '#faf8f2',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(90,114,72,0.14)',
  },
  coursePlaceholderCard: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
    minHeight: 280,
    borderStyle: 'dashed',
    backgroundColor: 'rgba(90,114,72,0.03)',
  },
  courseCardBody: {
    padding: 16,
  },
  courseCardTitle: {
    color: '#1c2414',
    fontFamily: 'Georgia',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    marginBottom: 6,
  },
  courseCardSubtitle: {
    color: '#8a9a78',
    fontSize: 12,
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  courseCardBrief: {
    color: '#6a7a58',
    fontSize: 13,
    lineHeight: 22,
    marginBottom: 14,
  },
  courseCardTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  courseToolPill: {
    backgroundColor: 'rgba(90,114,72,0.08)',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(90,114,72,0.14)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  courseToolPillText: {
    color: palette.accent,
    fontSize: 11,
    fontWeight: '600',
  },
  courseVideoPill: {
    backgroundColor: 'rgba(154,107,48,0.1)',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(154,107,48,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  courseVideoPillText: {
    color: '#9a6b30',
    fontSize: 11,
    fontWeight: '700',
  },
  coursePlaceholderIcon: {
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(90,114,72,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(90,114,72,0.16)',
    marginBottom: 14,
  },
  coursePlaceholderIconText: {
    color: palette.accent,
    fontSize: 24,
    lineHeight: 24,
  },
  coursePlaceholderTitle: {
    color: '#1c2414',
    fontFamily: 'Georgia',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  coursePlaceholderText: {
    color: '#8a9a78',
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 13,
  },
  courseCoverWrap: {
    height: 360,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  courseCoverWrapCompact: {
    height: 220,
  },
  courseCoverImage: {
    width: '100%',
    height: '100%',
  },
  courseCoverOverlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: 'rgba(250,248,242,0.9)',
    borderRadius: 18,
    padding: 14,
  },
  courseCoverOverlayTag: {
    color: '#8a9a78',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  courseCoverOverlayTitle: {
    color: '#1c2414',
    fontFamily: 'Georgia',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  abstractOrbLarge: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 999,
    top: 22,
    right: -30,
    borderWidth: 1,
  },
  abstractOrbSmall: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 999,
    bottom: 28,
    left: -20,
    borderWidth: 1,
  },
  abstractCoverTextWrap: {
    padding: 22,
  },
  abstractCoverTag: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  abstractCoverTitle: {
    fontFamily: 'Georgia',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    maxWidth: '76%',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(16,20,12,0.58)',
    padding: 18,
    justifyContent: 'center',
  },
  courseModalCard: {
    maxHeight: '92%',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#faf8f2',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(90,114,72,0.18)',
  },
  courseModalCardMobile: {
    flexDirection: 'column',
  },
  courseModalVisual: {
    width: '40%',
    backgroundColor: '#141c0e',
    padding: 14,
    justifyContent: 'space-between',
  },
  courseModalVisualMobile: {
    width: '100%',
    minHeight: 300,
  },
  courseModalCoverWrap: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  courseModalBottom: {
    gap: 14,
    marginTop: 14,
  },
  courseModalToolWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  courseModalToolPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(200,220,180,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(200,220,180,0.2)',
  },
  courseModalToolText: {
    color: '#d8ecc8',
    fontSize: 11,
    fontWeight: '600',
  },
  courseModalContent: {
    flex: 1,
    padding: 22,
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(250,248,242,0.95)',
    borderWidth: 1,
    borderColor: 'rgba(90,114,72,0.18)',
    zIndex: 2,
  },
  modalCloseText: {
    color: palette.accent,
    fontSize: 18,
    lineHeight: 18,
  },
  modalTitle: {
    color: '#1c2414',
    fontFamily: 'Georgia',
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '700',
    marginBottom: 4,
    paddingRight: 36,
  },
  modalSubtitle: {
    color: '#8a9a78',
    fontSize: 13,
    marginBottom: 10,
  },
  modalBrief: {
    color: '#4a5a3a',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 14,
  },
  modalTagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  modalTag: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(90,114,72,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(90,114,72,0.14)',
  },
  modalTagText: {
    color: palette.accent,
    fontSize: 11,
  },
  modalTabs: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: 4,
    padding: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(90,114,72,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(90,114,72,0.12)',
    marginBottom: 14,
  },
  modalTab: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 999,
  },
  modalTabActive: {
    backgroundColor: '#faf8f2',
  },
  modalTabText: {
    color: '#8a9a78',
    fontSize: 13,
  },
  modalTabTextActive: {
    color: palette.accent,
    fontWeight: '700',
  },
  modalScroll: {
    flex: 1,
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  modalIntro: {
    color: '#4a5a3a',
    fontSize: 14,
    lineHeight: 26,
    paddingBottom: 16,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(90,114,72,0.1)',
  },
  stepRow: {
    flexDirection: 'row',
    gap: 14,
    paddingBottom: 16,
    marginBottom: 4,
  },
  stepColumn: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(90,114,72,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(90,114,72,0.22)',
  },
  stepCircleText: {
    color: palette.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  stepLine: {
    width: 1,
    flex: 1,
    minHeight: 14,
    backgroundColor: 'rgba(90,114,72,0.18)',
    marginTop: 6,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    color: '#1c2414',
    fontFamily: 'Georgia',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    marginBottom: 6,
  },
  stepText: {
    color: '#5a6a4a',
    fontSize: 13,
    lineHeight: 24,
  },
  stepCaption: {
    marginTop: 10,
    color: '#6b7a5a',
    fontSize: 12,
    lineHeight: 20,
    fontStyle: 'italic',
    backgroundColor: 'rgba(90,114,72,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(90,114,72,0.12)',
    padding: 12,
    borderRadius: 14,
  },
  reflectionBox: {
    marginTop: 10,
    backgroundColor: 'rgba(90,114,72,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(90,114,72,0.15)',
    borderLeftWidth: 3,
    borderLeftColor: 'rgba(90,114,72,0.35)',
    borderRadius: 16,
    padding: 14,
  },
  reflectionText: {
    color: '#4a5a3a',
    fontSize: 13,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  videoPlaceholderBox: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    minHeight: 260,
    backgroundColor: 'rgba(90,114,72,0.05)',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(90,114,72,0.22)',
    borderRadius: 18,
    padding: 24,
  },
  videoPlaceholderRing: {
    width: 52,
    height: 52,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(90,114,72,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(90,114,72,0.25)',
  },
  videoPlaceholderPlay: {
    color: palette.accent,
    fontSize: 18,
    marginLeft: 2,
  },
  videoPlaceholderTitle: {
    color: '#7a9068',
    fontSize: 16,
    fontWeight: '700',
  },
  videoPlaceholderText: {
    color: '#6b7a5a',
    fontSize: 13,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 380,
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
