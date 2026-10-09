import {Series, useVideoConfig} from 'remotion';
import {BackgroundSequence, Headline, InformationCard, Shell} from './StoryboardTemplateV2';
import {CostLayers, FocusSelector, NumberRelation, RiskReveal} from './SemanticMotion';

// 仅用于运行验证；正式制作须替换素材、文案和字幕帧。
export const SemanticSelectionScene = () => {
  const {fps, durationInFrames} = useVideoConfig();
  return <Shell label="选房判断｜逐项聚焦">
    <BackgroundSequence shots={[{src: 'sample-assets/03_社区环境.png', start: 0, end: durationInFrames}]} />
    <Headline start={0} end={durationInFrames} enter="slide">三项条件，依次核对</Headline>
    <FocusSelector labels={['通勤', '采光', '噪声']} starts={[Math.round(.6 * fps), 2 * fps, Math.round(3.4 * fps)]} end={durationInFrames} />
    <InformationCard start={4 * fps} end={durationInFrames} title="当前项决定检查重点" variant="pill" motion="reveal" style={{left: 58, top: 474}} />
  </Shell>;
};

export const SemanticCostScene = () => {
  const {fps, durationInFrames} = useVideoConfig();
  return <Shell label="家庭预算｜费用分层">
    <BackgroundSequence shots={[{src: 'sample-assets/04_装修空间.png', start: 0, end: durationInFrames}]} />
    <Headline start={0} end={durationInFrames} enter="reveal">预算要一层层算</Headline>
    <CostLayers labels={['首付', '税费与装修', '应急备用金']} starts={[Math.round(.6 * fps), 2 * fps, Math.round(3.4 * fps)]} end={durationInFrames} />
  </Shell>;
};

export const SemanticNumberScene = () => {
  const {fps, durationInFrames} = useVideoConfig();
  return <Shell label="楼层关系｜数字揭示">
    <BackgroundSequence shots={[{src: 'sample-assets/02_旧小区.png', start: 0, end: durationInFrames}]} />
    <Headline start={0} end={durationInFrames} enter="settle">楼层要结合总高看</Headline>
    <NumberRelation values={['8层', '18层']} labels={['所在楼层', '楼栋总高']} starts={[Math.round(.6 * fps), 2 * fps]} linkStart={3 * fps} end={durationInFrames} />
  </Shell>;
};

export const SemanticRiskScene = () => {
  const {fps, durationInFrames} = useVideoConfig();
  return <Shell label="价格转折｜风险揭示">
    <BackgroundSequence shots={[{src: 'sample-assets/01_旧房客厅.png', start: 0, end: durationInFrames}]} />
    <Headline start={0} end={durationInFrames} enter="sweep">价格之外还有代价</Headline>
    <RiskReveal before="总价看起来更低" after="但维修支出也要算" start={Math.round(.6 * fps)} revealStart={Math.round(2.5 * fps)} end={durationInFrames} />
  </Shell>;
};

export const SemanticMotionShowcase = () => {
  const {fps} = useVideoConfig();
  return <Series>
    <Series.Sequence durationInFrames={5 * fps} premountFor={fps}><SemanticSelectionScene /></Series.Sequence>
    <Series.Sequence durationInFrames={5 * fps} premountFor={fps}><SemanticCostScene /></Series.Sequence>
    <Series.Sequence durationInFrames={5 * fps} premountFor={fps}><SemanticNumberScene /></Series.Sequence>
    <Series.Sequence durationInFrames={5 * fps} premountFor={fps}><SemanticRiskScene /></Series.Sequence>
  </Series>;
};
