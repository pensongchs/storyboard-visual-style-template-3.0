import React from 'react';
import {Series, useVideoConfig} from 'remotion';
import {AreaLayers, BudgetStack, DecisionBranch, EvidenceFocus, MetricScale, SplitCompare, StepRoute, VerdictMark} from './SemanticLayouts';
import {BackgroundSequence, Headline, InformationCard, InformationCardVariant, Shell} from './StoryboardTemplateV2';

// 组件演示共用 5 张仓库样图；数字均为演示值，没有配音。
// 正式项目须替换当期素材、来源与字幕触发帧，不能把这里的 5 秒节拍套到台词上。
const Demo = ({label, title, image, children}: {label: string; title: string; image: string; children: React.ReactNode}) => {
  const {durationInFrames} = useVideoConfig();
  return <Shell label={label}>
    <BackgroundSequence shots={[{src: `sample-assets/${image}`, start: 0, end: durationInFrames}]} />
    <Headline start={0} end={durationInFrames} width={1030}>{title}</Headline>
    {children}
  </Shell>;
};
const useAt = () => {
  const {fps} = useVideoConfig();
  return (seconds: number) => Math.round(seconds * fps);
};

export const LayoutCompare = () => {
  const at = useAt();
  return <Demo label="选择比较｜双栏对照" title="两种房，各有代价" image="02_旧小区.png">
    <SplitCompare left={{label: '新房', detail: '核对交付与兑现', start: at(.5)}} right={{label: '二手房', detail: '核对房况与维护', start: at(2.1)}} />
  </Demo>;
};
export const LayoutRoute = () => {
  const at = useAt();
  return <Demo label="判断顺序｜路径接力" title="选房顺序别颠倒" image="03_社区环境.png">
    <StepRoute items={[{label: '先看楼栋', detail: '确认位置', start: at(.5)}, {label: '再排硬伤', detail: '核对现场', start: at(1.9)}, {label: '最后选户型', detail: '比较取舍', start: at(3.3)}]} />
  </Demo>;
};
export const LayoutBudget = () => {
  const at = useAt();
  return <Demo label="预算拆解｜演示金额，单位万元" title="首付之外，还要留钱" image="04_装修空间.png">
    <BudgetStack items={[{label: '首付', amount: 60, start: at(.5)}, {label: '税费与装修', amount: 12, start: at(1.9)}, {label: '备用金', amount: 18, start: at(3.3)}]} />
  </Demo>;
};
export const LayoutMetric = () => {
  const at = useAt();
  return <Demo label="通勤刻度｜演示数据，实际以路线测试为准" title="通勤，算门到门" image="05_通勤场景.png">
    <MetricScale value={35} maximum={60} unit="分钟" label="从家门到工作地点" start={at(.7)} />
  </Demo>;
};
export const LayoutEvidence = () => {
  const at = useAt();
  return <Demo label="现场核验｜证据框定位演示" title="判断要落到现场" image="01_旧房客厅.png">
    <EvidenceFocus label="定位核验区域" detail="再核对具体细节" start={at(.6)} labelStart={at(2)} />
  </Demo>;
};
export const LayoutArea = () => {
  const at = useAt();
  return <Demo label="面积口径｜概念层级示意，非比例图" title="面积口径，要分开看" image="04_装修空间.png">
    <AreaLayers items={[{label: '建筑面积', detail: '先核对证载口径', start: at(.5)}, {label: '套内面积', detail: '再核对套内空间', start: at(1.9)}, {label: '套内使用面积', detail: '再区分墙体', start: at(3.3)}]} />
  </Demo>;
};
export const LayoutDecision = () => {
  const at = useAt();
  return <Demo label="条件判断｜分支展开" title="先问：能不能改？" image="01_旧房客厅.png">
    <DecisionBranch question={{label: '发现问题', detail: '先判断能否改善', start: at(.5)}} branches={[{label: '可以改善', detail: '再测算成本', start: at(1.9)}, {label: '无法改善', detail: '按接受程度取舍', start: at(3.3)}]} />
  </Demo>;
};
export const LayoutVerdict = () => {
  const at = useAt();
  return <Demo label="结论收束｜划线与批注" title="便宜，要算完整" image="02_旧小区.png">
    <VerdictMark before="只看单价" after="先算长期代价" start={at(.5)} verdictStart={at(2)} markStart={at(3.3)} />
  </Demo>;
};

export const layoutScenes = [
  {id: 'Layout-Compare', component: LayoutCompare},
  {id: 'Layout-Route', component: LayoutRoute},
  {id: 'Layout-Budget', component: LayoutBudget},
  {id: 'Layout-Metric', component: LayoutMetric},
  {id: 'Layout-Evidence', component: LayoutEvidence},
  {id: 'Layout-Area', component: LayoutArea},
  {id: 'Layout-Decision', component: LayoutDecision},
  {id: 'Layout-Verdict', component: LayoutVerdict},
];

export const LayoutShowcase = () => {
  const {fps} = useVideoConfig();
  return <Series>{layoutScenes.map(({id, component: Scene}) => <Series.Sequence key={id} durationInFrames={5 * fps} premountFor={fps}><Scene /></Series.Sequence>)}</Series>;
};

export const surfaceGroups: {label: string; variants: {variant: InformationCardVariant; title: string; sub: string}[]}[] = [
  {label: '卡片材质｜深色、珍珠白、胶囊', variants: [{variant: 'dark', title: '深色玻璃', sub: '承载状态说明'}, {variant: 'pearl', title: '珍珠白卡', sub: '强调主要信息'}, {variant: 'pill', title: '结论胶囊', sub: '一句话落定'}]},
  {label: '开放标注｜侧栏、括号、下划线', variants: [{variant: 'rail', title: '侧栏批注', sub: '解释现场细节'}, {variant: 'bracket', title: '括号标注', sub: '框定一个概念'}, {variant: 'underline', title: '下划线结论', sub: '文字直接落在实景'}]},
  {label: '边界变化｜线框、纸签、页签', variants: [{variant: 'outline', title: '轻量线框', sub: '提示条件边界'}, {variant: 'paper', title: '纸签说明', sub: '承载证据摘要'}, {variant: 'tab', title: '侧边页签', sub: '标记当前阶段'}]},
];
export const SurfaceScene = ({group = 0}: {group?: number}) => {
  const at = useAt();
  const item = surfaceGroups[group];
  return <Demo label={item.label} title="容器随信息关系变化" image="03_社区环境.png">
    {item.variants.map(({variant, title, sub}, i) => <InformationCard key={variant} title={title} sub={variant === 'pill' ? undefined : sub} variant={variant} start={at(.4 + i * 1.3)} motion={i === 0 ? 'wipe-down' : i === 1 ? 'reveal' : 'stamp'} style={{left: 58 + i * 350, top: variant === 'pill' ? 382 : 340, width: 324, minHeight: variant === 'pill' ? 86 : 170}} />)}
  </Demo>;
};
export const SurfaceShowcase = () => {
  const {fps} = useVideoConfig();
  return <Series>{surfaceGroups.map((item, group) => <Series.Sequence key={item.label} durationInFrames={5 * fps}><SurfaceScene group={group} /></Series.Sequence>)}</Series>;
};
