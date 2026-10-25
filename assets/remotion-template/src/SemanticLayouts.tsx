import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {cardMotionStyle, gold, goldSoft, green, InformationCard, ivory, muted, progress, red, STORYBOARD_LAYOUT} from './StoryboardTemplateV2';

export type TimedItem = {label: string; start: number; detail?: string};
type Window = {end?: number};
const zone: React.CSSProperties = {position: 'absolute', left: STORYBOARD_LAYOUT.contentLeft, top: 330, width: 1030, height: 230};
const ink: React.CSSProperties = {textShadow: '0 3px 16px rgba(0,0,0,.8)', boxSizing: 'border-box'};

// 组件接受场景局部帧；错误时间轴直接报错，避免悄悄提前显示内容。
const useDiagram = (starts: number[], end?: number) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const stop = end ?? durationInFrames;
  if (!starts.length || !Number.isInteger(stop) || stop <= 0 || stop > durationInFrames || starts.some((start, i) => !Number.isInteger(start) || start < 0 || start >= stop || (i > 0 && start <= starts[i - 1]))) {
    throw new Error('语义结构需要递增且位于场景内的整数起始帧，以及有效 end。');
  }
  const duration = Math.max(1, Math.round(.5 * fps));
  const motion = (start: number, kind: 'reveal' | 'slide' | 'focus' | 'stamp' | 'wipe-down' | 'none' = 'reveal') => cardMotionStyle(frame, start, stop, kind, duration, durationInFrames);
  const p = (start: number, seconds = .5) => progress(frame, start, Math.max(1, Math.round(seconds * fps)));
  return {frame, fps, stop, motion, p, visible: {opacity: frame < stop ? 1 : 0}};
};

const checkItems = (items: TimedItem[], min = 1, max = 3) => {
  if (items.length < min || items.length > max) throw new Error(`此结构支持 ${min}—${max} 项；更多内容请拆分状态。`);
};

/** A/B 关系：开放侧栏与括号两种轮廓，共用一条对照轴。 */
export const SplitCompare = ({left, right, end}: {left: TimedItem; right: TimedItem} & Window) => {
  const {motion, p, visible} = useDiagram([left.start, right.start], end);
  return <div style={{...zone, ...visible}}>
    <InformationCard title={left.label} sub={left.detail} start={left.start} end={end} variant="rail" motion="wipe-down" tone="ivory" style={{left: 0, top: 30, width: 465, minHeight: 166}} />
    <div style={{position: 'absolute', left: 512, top: 10, width: 1, height: 206 * p(right.start), background: 'rgba(247,241,231,.48)', ...motion(right.start, 'none')}} />
    <InformationCard title={right.label} sub={right.detail} start={right.start} end={end} variant="bracket" motion="reveal" style={{left: 555, top: 30, width: 475, minHeight: 166}} />
  </div>;
};

/** 顺序：线条先到达，再出现目标节点；未讲节点不占位。 */
export const StepRoute = ({items, end}: {items: TimedItem[]} & Window) => {
  checkItems(items, 2);
  const {frame, fps, motion, visible} = useDiagram(items.map(item => item.start), end);
  const spacing = 810 / (items.length - 1);
  const current = items.reduce((active, item, i) => frame >= item.start ? i : active, -1);
  return <div style={{...zone, ...visible}}>
    <svg width="1030" height="72" style={{position: 'absolute', top: 0}}>
      {items.slice(1).map((item, i) => {
        const lineStart = Math.max(items[i].start, item.start - Math.round(.35 * fps));
        return <path key={i} d={`M ${110 + i * spacing + 32} 32 H ${110 + (i + 1) * spacing - 32}`} pathLength={1} stroke={gold} strokeWidth={2} fill="none" strokeDasharray={1} strokeDashoffset={1 - progress(frame, lineStart, item.start - lineStart)} />;
      })}
    </svg>
    {items.map((item, i) => <div key={i} style={{position: 'absolute', left: i * spacing, top: 0, width: 220, textAlign: 'center', ...ink, ...motion(item.start, 'focus')}}>
      <div style={{margin: '0 auto', width: 64, height: 64, borderRadius: '50%', border: `2px solid ${gold}`, background: i === current ? gold : '#171a19', color: i === current ? '#171a19' : goldSoft, fontSize: 32, lineHeight: '60px'}}>{i + 1}</div>
      <div style={{marginTop: 28, fontSize: 38, color: i === current ? ivory : muted}}>{item.label}</div>
      {item.detail ? <div style={{marginTop: 12, fontSize: 24, color: muted}}>{item.detail}</div> : null}
    </div>)}
  </div>;
};

/** 预算：逐行入账并累计；条带长短来自输入金额，不编造比例。 */
export const BudgetStack = ({items, unit = '万', end}: {items: (TimedItem & {amount: number})[]; unit?: string} & Window) => {
  checkItems(items);
  const {frame, motion, p, visible} = useDiagram(items.map(item => item.start), end);
  if (items.some(item => !Number.isFinite(item.amount) || item.amount < 0)) throw new Error('预算金额需要非负有限数值。');
  const maximum = Math.max(1, ...items.map(item => item.amount));
  const sum = items.reduce((total, item) => total + item.amount * p(item.start), 0);
  const complete = items.every(item => p(item.start) === 1);
  const shown = complete ? items.reduce((total, item) => total + item.amount, 0) : sum;
  return <div style={{...zone, ...visible}}>
    {items.map((item, i) => <div key={i} style={{position: 'absolute', left: 0, top: i * 72, width: 700, height: 58, ...motion(item.start, 'reveal')}}>
      <div style={{position: 'absolute', inset: 0, width: 700 * item.amount / maximum * p(item.start), background: `rgba(217,170,99,${.22 - i * .04})`, borderLeft: `3px solid ${gold}`}} />
      <div style={{position: 'relative', display: 'flex', justifyContent: 'space-between', padding: '8px 18px', fontSize: 32, ...ink}}><span>{item.label}</span><span style={{fontVariantNumeric: 'tabular-nums', color: goldSoft}}>{item.amount}{unit}</span></div>
    </div>)}
    <div style={{position: 'absolute', left: 774, top: 0, width: 256, height: 216, borderLeft: '1px solid rgba(247,241,231,.3)', paddingLeft: 28, ...ink, ...motion(items[0].start, 'none')}}>
      <div style={{fontSize: 24, color: muted}}>已列预算</div>
      <div style={{marginTop: 18, fontSize: 66, color: goldSoft, fontVariantNumeric: 'tabular-nums'}}>{Number(shown.toFixed(1))}<span style={{fontSize: 30, marginLeft: 8}}>{unit}</span></div>
      <div style={{marginTop: 16, fontSize: 22, color: muted}}>{items.filter(item => frame >= item.start).length} 项已纳入</div>
    </div>
  </div>;
};

/** 一个核心数字占主位；数值与刻度同步抵达目标。 */
export const MetricScale = ({value, maximum, unit, label, start, end}: {value: number; maximum: number; unit: string; label: string; start: number} & Window) => {
  const {p, motion, visible} = useDiagram([start], end);
  if (!Number.isFinite(value) || !Number.isFinite(maximum) || value < 0 || maximum <= 0 || value > maximum) throw new Error('刻度需要 0 ≤ value ≤ maximum，且 maximum > 0。');
  const amount = p(start, .8);
  return <div style={{...zone, ...visible}}>
    <div style={{position: 'absolute', left: 0, top: -40, ...ink, ...motion(start, 'none')}}>
      <span style={{fontSize: 144, lineHeight: 1, fontWeight: 600, color: goldSoft, fontVariantNumeric: 'tabular-nums'}}>{Math.round(value * amount)}</span><span style={{fontSize: 44, marginLeft: 18}}>{unit}</span>
    </div>
    <div style={{position: 'absolute', left: 410, top: 6, width: 590, paddingLeft: 26, borderLeft: `3px solid ${gold}`, fontSize: 38, lineHeight: 1.35, ...ink, ...motion(start, 'reveal')}}>{label}</div>
    <svg width="1030" height="74" style={{position: 'absolute', left: 0, top: 136, ...motion(start, 'none')}}>
      <path d="M 0 18 H 1018" stroke="rgba(247,241,231,.26)" strokeWidth={2} />
      <path d={`M 0 18 H ${1018 * value / maximum * amount}`} stroke={gold} strokeWidth={4} />
      {Array.from({length: 5}, (_, i) => <g key={i}><path d={`M ${i * 254.5} 10 v 16`} stroke={muted} /><text x={i * 254.5} y={61} textAnchor={i === 0 ? 'start' : i === 4 ? 'end' : 'middle'} fill={muted} fontSize={24}>{Number((maximum * i / 4).toFixed(1))}</text></g>)}
      <circle cx={1018 * value / maximum * amount} cy={18} r={7} fill={goldSoft} />
    </svg>
  </div>;
};

/** 标注直接指向底图；rect 是当前安全区域内、经人工核对的证据位置。 */
export const EvidenceFocus = ({label, detail, start, labelStart, rect = {x: 560, y: 0, width: 450, height: 218}, end}: {label: string; detail?: string; start: number; labelStart: number; rect?: {x: number; y: number; width: number; height: number}} & Window) => {
  const {frame, fps, p, motion, visible} = useDiagram([start, labelStart], end);
  if (![rect.x, rect.y, rect.width, rect.height].every(Number.isFinite) || rect.x < 470 || rect.y < 0 || rect.width < 48 || rect.height < 48 || rect.x + rect.width > 1030 || rect.y + rect.height > 230) throw new Error('证据框须位于标注右侧与 MG 安全区内。');
  const corners = [[rect.x, rect.y, 1, 1], [rect.x + rect.width, rect.y, -1, 1], [rect.x, rect.y + rect.height, 1, -1], [rect.x + rect.width, rect.y + rect.height, -1, -1]];
  const draw = p(start);
  const lineStart = Math.max(start, labelStart - Math.round(.35 * fps));
  return <div style={{...zone, ...visible}}>
    <svg width="1030" height="230" style={{position: 'absolute', ...motion(start, 'none')}}>
      {corners.map(([x, y, dx, dy], i) => <path key={i} d={`M ${x} ${y + dy * 34 * draw} V ${y} H ${x + dx * 34 * draw}`} stroke={goldSoft} strokeWidth={3} fill="none" />)}
      <path d={`M 420 110 H ${rect.x}`} pathLength={1} stroke={gold} strokeWidth={2} strokeDasharray={1} strokeDashoffset={1 - progress(frame, lineStart, labelStart - lineStart)} />
    </svg>
    <InformationCard title={label} sub={detail} variant="bracket" start={labelStart} end={end} motion="reveal" style={{left: 0, top: 45, width: 420, minHeight: 145}} />
  </div>;
};

/** 空间或概念的包含关系；嵌套尺寸仅表示层级，不表示面积比例。 */
export const AreaLayers = ({items, end}: {items: TimedItem[]} & Window) => {
  checkItems(items, 2);
  const {frame, motion, visible} = useDiagram(items.map(item => item.start), end);
  const current = items.reduce((active, item, i) => frame >= item.start ? i : active, 0);
  return <div style={{...zone, ...visible}}>
    {items.map((item, i) => <div key={i} style={{position: 'absolute', left: i * 92, top: i * 66, width: 662 - i * 92, height: 224 - i * 66, border: `1px solid ${i === current ? goldSoft : muted}`, background: `rgba(217,170,99,${.06 + i * .06})`, padding: '12px 22px', color: i === current ? goldSoft : muted, fontSize: 32, ...ink, ...motion(item.start, 'wipe-down')}}>{item.label}</div>)}
    <div style={{position: 'absolute', left: 730, top: 40, width: 300, ...ink, ...motion(items[current].start, 'reveal')}}>
      <div style={{fontSize: 38, lineHeight: 1.35}}>{items[current].detail ?? items[current].label}</div>
      <div style={{marginTop: 18, width: 80, height: 3, background: gold}} />
    </div>
  </div>;
};

/** 同一条件的两个结果；分支文字分别门控，不能提前显示结论。 */
export const DecisionBranch = ({question, branches, end}: {question: TimedItem; branches: [TimedItem, TimedItem]} & Window) => {
  const {frame, fps, motion, visible} = useDiagram([question.start, ...branches.map(item => item.start)], end);
  return <div style={{...zone, ...visible}}>
    <InformationCard title={question.label} sub={question.detail} variant="outline" start={question.start} end={end} motion="reveal" style={{left: 0, top: 38, width: 326, minHeight: 154}} />
    <svg width="1030" height="230" style={{position: 'absolute'}}>
      {branches.map((item, i) => {
        const lineStart = Math.max(question.start, item.start - Math.round(.35 * fps));
        return <path key={i} d={`M 350 115 H 470 V ${i === 0 ? 38 : 178} H 625`} pathLength={1} stroke={i === 0 ? green : red} strokeWidth={2} fill="none" strokeDasharray={1} strokeDashoffset={1 - progress(frame, lineStart, item.start - lineStart)} style={motion(question.start, 'none')} />;
      })}
    </svg>
    {branches.map((item, i) => <div key={i} style={{position: 'absolute', left: 650, top: i * 140, width: 380, borderLeft: `4px solid ${i === 0 ? green : red}`, paddingLeft: 22, ...ink, ...motion(item.start, 'slide')}}>
      <div style={{fontSize: 38, color: i === 0 ? green : red}}>{item.label}</div>
      {item.detail ? <div style={{fontSize: 24, marginTop: 10, color: ivory}}>{item.detail}</div> : null}
    </div>)}
  </div>;
};

/** 批注式收束：划掉误区、揭示判断、盖章落定，各有独立时间。 */
export const VerdictMark = ({before, after, start, verdictStart, markStart, end}: {before: string; after: string; start: number; verdictStart: number; markStart: number} & Window) => {
  const {p, motion, visible} = useDiagram([start, verdictStart, markStart], end);
  return <div style={{...zone, ...visible}}>
    <div style={{position: 'absolute', left: 0, top: 0, fontSize: 32, color: muted, ...ink, ...motion(start, 'none')}}>
      {before}<div style={{position: 'absolute', left: -4, top: '50%', width: `${104 * p(verdictStart)}%`, height: 3, background: red}} />
    </div>
    <div style={{position: 'absolute', left: 0, top: 76, maxWidth: 725, fontSize: 54, fontWeight: 600, lineHeight: 1.25, ...ink, ...motion(verdictStart, 'reveal')}}>{after}
      <div style={{marginTop: 18, height: 4, width: `${100 * p(markStart)}%`, background: gold}} />
    </div>
    <div style={{position: 'absolute', left: 790, top: 24, width: 220, height: 150, border: `2px solid ${gold}`, display: 'grid', placeContent: 'center', textAlign: 'center', color: goldSoft, fontSize: 38, lineHeight: 1.4, ...ink, ...motion(markStart, 'stamp')}}>取舍<br />依据</div>
  </div>;
};
