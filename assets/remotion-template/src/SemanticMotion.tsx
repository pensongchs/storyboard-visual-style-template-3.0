import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {cardMotionStyle, gold, goldSoft, ivory, muted, red, STORYBOARD_LAYOUT} from './StoryboardTemplateV2';

// 独立实现的语义结构；不导入素材库中授权待确认的第三方网页代码。
const panel: React.CSSProperties = {
  position: 'absolute', left: STORYBOARD_LAYOUT.contentLeft, top: STORYBOARD_LAYOUT.mgTop,
  width: 820, height: 214, color: ivory, boxSizing: 'border-box',
};
const glass: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(18,22,22,.92), rgba(51,43,33,.86))',
  border: '1px solid rgba(247,241,231,.26)', borderRadius: 26,
};
const tween = (frame: number, from: number, duration = 18) => interpolate(frame, [from, from + duration], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const checkTimeline = (labels: string[], starts: number[], end: number) => {
  if (!labels.length || labels.length !== starts.length || starts.some((s, i) => !Number.isFinite(s) || s < 0 || s >= end || (i > 0 && s <= starts[i - 1]))) {
    throw new Error('每项文字须有对应的递增开始帧，且开始帧须早于结束帧。');
  }
};

export const FocusSelector = ({labels, starts, end}: {labels: string[]; starts: number[]; end: number}) => {
  checkTimeline(labels, starts, end);
  if (labels.length > 3) throw new Error('FocusSelector 每屏最多三项；更多内容请拆分状态。');
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const active = starts.reduce((last, start, i) => frame >= start ? i : last, -1);
  const width = 820 / labels.length;
  const current = Math.max(0, active);
  const focus = current === 0 ? 0 : current - 1 + tween(frame, starts[current]);
  return <div style={{...panel, ...glass, height: 112, ...cardMotionStyle(frame, starts[0], end, 'reveal', 18, durationInFrames)}}>
    <div style={{position: 'absolute', left: focus * width + 8, top: 8, width: width - 16, height: 94, borderRadius: 20, background: 'rgba(217,170,99,.24)', border: `1px solid ${gold}`}} />
    {labels.map((label, i) => <div key={i} style={{position: 'absolute', left: i * width, width, top: 0, height: 110, display: 'grid', placeItems: 'center', fontSize: 38, color: active === i ? goldSoft : muted, opacity: frame >= starts[i] ? 1 : 0}}>{label}</div>)}
  </div>;
};

export const CostLayers = ({labels, starts, end}: {labels: string[]; starts: number[]; end: number}) => {
  checkTimeline(labels, starts, end);
  if (labels.length > 3) throw new Error('CostLayers 每屏最多三层；更多费用请拆分状态。');
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const active = starts.reduce((last, start, i) => frame >= start ? i : last, -1);
  const current = Math.max(0, active);
  return <div style={{...panel, height: 214}}>
    <div style={{...glass, position: 'absolute', left: 0, top: 0, width: 450, height: 190, padding: '24px 28px', boxSizing: 'border-box', borderColor: gold, ...cardMotionStyle(frame, starts[current], end, 'reveal', 18, durationInFrames)}}>
      <div style={{fontSize: 24, color: muted}}>第 {current + 1} 项预算</div>
      <div style={{fontSize: 38, lineHeight: 1.2, color: goldSoft, marginTop: 26}}>{labels[current]}</div>
    </div>
    {labels.slice(0, Math.max(0, active)).map((label, i) => <div key={i} style={{...glass, position: 'absolute', left: 486, top: i * 100, width: 310, height: 76, borderRadius: 999, padding: '18px 26px', boxSizing: 'border-box', fontSize: 32, lineHeight: 1.1, color: muted, ...cardMotionStyle(frame, starts[i + 1], end, 'slide', 18, durationInFrames)}}>{label}</div>)}
  </div>;
};

export const NumberRelation = ({values, labels, starts, linkStart, end}: {values: [string, string]; labels: [string, string]; starts: [number, number]; linkStart: number; end: number}) => {
  checkTimeline(labels, starts, end);
  if (linkStart < starts[1] || linkStart >= end) throw new Error('数字关系线须在两个数字均讲到后、关系结束前出现。');
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const line = tween(frame, linkStart, 24);
  return <div style={{...panel, opacity: frame < end ? 1 : 0}}>
    {values.map((value, i) => <div key={i} style={{position: 'absolute', left: i * 470, top: 0, width: 320, height: 190, padding: '20px 26px', boxSizing: 'border-box', borderLeft: `4px solid ${gold}`, background: 'rgba(12,16,18,.72)', ...cardMotionStyle(frame, starts[i], end, 'focus', 18, durationInFrames)}}>
      <div style={{fontSize: 28, color: muted}}>{labels[i]}</div>
      <div style={{fontSize: 72, lineHeight: 1.1, color: goldSoft, marginTop: 12}}>{value}</div>
    </div>)}
    <svg width="130" height="40" style={{position: 'absolute', left: 330, top: 78, opacity: line}}>
      <path d="M 0 20 L 116 20 M 98 4 L 116 20 L 98 36" pathLength="1" stroke={gold} strokeWidth="4" fill="none" strokeDasharray="1" strokeDashoffset={1 - line} />
    </svg>
  </div>;
};

export const RiskReveal = ({before, after, start, revealStart, end}: {before: string; after: string; start: number; revealStart: number; end: number}) => {
  checkTimeline([before, after], [start, revealStart], end);
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const p = tween(frame, revealStart, 22);
  return <div style={{...panel, ...glass, overflow: 'hidden', ...cardMotionStyle(frame, start, end, 'reveal', 18, durationInFrames)}}>
    <div style={{position: 'absolute', inset: 0, background: 'rgba(145,45,34,.86)', clipPath: `circle(${p * 110}% at 0% 50%)`}} />
    <div style={{position: 'absolute', left: 30, top: 24, fontSize: 24, color: frame >= revealStart ? red : muted}}>{frame >= revealStart ? '风险出现' : '当前判断'}</div>
    <div style={{position: 'absolute', left: 30, right: 30, top: 82, fontSize: 44, lineHeight: 1.2, opacity: 1 - p}}>{before}</div>
    <div style={{position: 'absolute', left: 30, right: 30, top: 82, fontSize: 44, lineHeight: 1.2, opacity: p, clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`}}>{after}</div>
  </div>;
};
