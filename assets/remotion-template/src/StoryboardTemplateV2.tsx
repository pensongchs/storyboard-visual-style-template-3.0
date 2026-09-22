import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Series,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const FPS = 30;
export const ivory = '#f7f1e7';
export const muted = 'rgba(247,241,231,.74)';
export const gold = '#d9aa63';
export const goldSoft = '#f0d19c';
export const red = '#ff7b66';
export const green = '#9fd2b2';
export const coal = '#0c1012';

/**
 * 1280×720 横版分镜的固定排版基线。
 * 业务组件优先引用这些值，不再为每一期重新目测安全区。
 */
export const STORYBOARD_LAYOUT = {
  canvasWidth: 1280,
  canvasHeight: 720,
  contentLeft: 58,
  contentRight: 1088,
  labelTop: 42,
  titleTop: 108,
  mgTop: 330,
  mgBottom: 560,
  subtitleTop: 576,
  minVerticalGap: 24,
} as const;

export const STORYBOARD_TYPE_SCALE = {
  headline: 64,
  headlineMin: 56,
  cardTitle: 38,
  pill: 32,
  supporting: 24,
  supportingMin: 22,
  label: 20,
} as const;
const demoImages = [
  'sample-assets/01_旧房客厅.png',
  'sample-assets/02_旧小区.png',
  'sample-assets/03_社区环境.png',
  'sample-assets/04_装修空间.png',
  'sample-assets/05_通勤场景.png',
].map((file) => staticFile(file));

export const progress = (frame: number, start: number, duration = 16) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

const fadeWindow = (frame: number, start: number, end: number, fade = 14) => {
  const entrance = progress(frame, start, fade);
  const exit = interpolate(frame, [end - fade, end], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });
  return Math.min(entrance, exit);
};

const exitOpacity = (frame: number, end?: number, fade = 12) => end === undefined
  ? 1
  : interpolate(frame, [Math.max(0, end - fade), end], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.55, 0, 1, 0.45),
  });

const glass: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(14,18,19,.84), rgba(43,36,29,.66))',
  border: '1px solid rgba(247,241,231,.20)',
  boxShadow: '0 22px 58px rgba(0,0,0,.34), inset 0 1px rgba(255,255,255,.08)',
  backdropFilter: 'blur(15px)',
};

export const Shell = ({children, label}: {children: React.ReactNode; label: string}) => (
  <AbsoluteFill
    style={{
      overflow: 'hidden',
      background: coal,
      color: ivory,
      fontFamily: 'PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif',
    }}
  >
    {children}
    <div
      style={{
        position: 'absolute',
        left: STORYBOARD_LAYOUT.contentLeft,
        top: STORYBOARD_LAYOUT.labelTop,
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        color: muted,
        fontSize: STORYBOARD_TYPE_SCALE.label,
        letterSpacing: 2.5,
        textShadow: '0 4px 18px rgba(0,0,0,.72)',
      }}
    >
      <span style={{display: 'block', width: 32, height: 3, borderRadius: 4, background: gold}} />
      {label}
    </div>
  </AbsoluteFill>
);

/** 仅用于静帧审片，正式成片不要挂载。 */
export const StoryboardSafeGuides = () => (
  <AbsoluteFill style={{pointerEvents: 'none', zIndex: 999}}>
    <div style={{position: 'absolute', left: STORYBOARD_LAYOUT.contentLeft, top: 0, bottom: 0, width: 1, background: 'rgba(159,210,178,.65)'}} />
    <div style={{position: 'absolute', left: STORYBOARD_LAYOUT.contentRight, top: 0, bottom: 0, width: 1, background: 'rgba(255,123,102,.70)'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: STORYBOARD_LAYOUT.subtitleTop, height: 1, background: 'rgba(255,123,102,.70)'}} />
    <div style={{position: 'absolute', left: STORYBOARD_LAYOUT.contentLeft, right: STORYBOARD_LAYOUT.canvasWidth - STORYBOARD_LAYOUT.contentRight, top: STORYBOARD_LAYOUT.mgTop, bottom: STORYBOARD_LAYOUT.canvasHeight - STORYBOARD_LAYOUT.mgBottom, border: '1px dashed rgba(217,170,99,.70)'}} />
  </AbsoluteFill>
);

export const easeBetween = (
  frame: number,
  start: number,
  end: number,
  from = 0,
  to = 1,
  easing = Easing.bezier(0.16, 1, 0.3, 1),
) => interpolate(frame, [start, end], [from, to], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
  easing,
});

export type BackgroundShot = {
  src: string;
  start: number;
  end: number;
  position?: string;
  direction?: 'left' | 'right' | 'up';
  shade?: number;
};

export const BackgroundSequence = ({
  shots,
  assetRoot = '',
}: {
  shots: BackgroundShot[];
  assetRoot?: string;
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{zIndex: 0, isolation: 'isolate'}}>
      {shots.map((shot, index) => {
        const fade = shot.start === 0
          ? 1
          : easeBetween(frame, shot.start, shot.start + 22, 0, 1, Easing.bezier(0.45, 0, 0.55, 1));
        const move = interpolate(frame, [shot.start, shot.end], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const driftX = (index % 2 === 0 ? -7 : 7) + (index % 2 === 0 ? 14 : -14) * move;
        const driftY = index % 2 === 0 ? 3 - move * 6 : -3 + move * 6;
        const source = /^(https?:|data:)/.test(shot.src)
          ? shot.src
          : staticFile(assetRoot ? `${assetRoot}/${shot.src}` : shot.src);
        return (
          <AbsoluteFill key={`${shot.src}-${shot.start}`} style={{zIndex: index, opacity: fade}}>
            <Img
              src={source}
              style={{
                position: 'absolute',
                inset: -18,
                width: 'calc(100% + 36px)',
                height: 'calc(100% + 36px)',
                objectFit: 'cover',
                objectPosition: shot.position ?? 'center',
                transform: `translate(${driftX}px, ${driftY}px) scale(${1.035 + move * 0.035})`,
              }}
            />
            <AbsoluteFill style={{background: `rgba(6,9,10,${shot.shade ?? 0.10})`}} />
          </AbsoluteFill>
        );
      })}
      <AbsoluteFill style={{zIndex: 30, background: 'linear-gradient(90deg, rgba(7,10,11,.88) 0%, rgba(7,10,11,.54) 43%, rgba(7,10,11,.16) 72%, rgba(7,10,11,.36) 100%)'}} />
      <AbsoluteFill style={{zIndex: 31, background: 'linear-gradient(0deg, rgba(7,9,10,.72) 0%, transparent 36%, rgba(7,9,10,.10) 100%)'}} />
    </AbsoluteFill>
  );
};

export type EnterKind = 'reveal' | 'slide' | 'settle' | 'sweep';

export const MotionGroup = ({
  start,
  end,
  enter = 'reveal',
  children,
  style,
}: {
  start: number;
  end: number;
  enter?: EnterKind;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const enterP = easeBetween(frame, start, start + 18);
  const exitP = end >= durationInFrames
    ? 0
    : easeBetween(frame, Math.max(start + 20, end - 12), end, 0, 1, Easing.bezier(0.55, 0, 1, 0.45));
  const baseX = enter === 'slide' ? 48 : enter === 'sweep' ? -34 : 0;
  const baseY = enter === 'settle' ? 30 : enter === 'reveal' ? 18 : 0;
  const clipPath = enter === 'reveal'
    ? `inset(0 ${100 - enterP * 100}% 0 0)`
    : enter === 'sweep'
      ? `inset(0 0 0 ${100 - enterP * 100}%)`
      : undefined;
  return (
    <div
      style={{
        position: 'absolute',
        opacity: Math.max(0, Math.min(1, enterP * 1.25)) * (1 - exitP),
        transform: `translate(${baseX * (1 - enterP)}px, ${baseY * (1 - enterP) - exitP * 20}px) scale(${0.96 + enterP * 0.04 - exitP * 0.025})`,
        filter: `blur(${exitP * 5}px)`,
        clipPath,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Headline = ({
  start,
  end,
  children,
  accent,
  enter = 'reveal',
  top = STORYBOARD_LAYOUT.titleTop,
  size = STORYBOARD_TYPE_SCALE.headline,
  width = 760,
}: {
  start: number;
  end: number;
  children: React.ReactNode;
  accent?: string;
  enter?: EnterKind;
  top?: number;
  size?: number;
  width?: number;
}) => {
  const frame = useCurrentFrame();
  const line = easeBetween(frame, start + 8, start + 30);
  return (
    <MotionGroup start={start} end={end} enter={enter} style={{left: STORYBOARD_LAYOUT.contentLeft, top, width}}>
      <div style={{fontSize: size, lineHeight: 1.08, fontWeight: 650, letterSpacing: -1.5, textShadow: '0 8px 34px rgba(0,0,0,.78)'}}>
        {children}
      </div>
      {accent ? <div style={{fontSize: 30, marginTop: 18, color: goldSoft}}>{accent}</div> : null}
      <div style={{width: 132 * line, height: 5, marginTop: 19, borderRadius: 5, background: gold, boxShadow: '0 0 20px rgba(217,170,99,.35)'}} />
    </MotionGroup>
  );
};

const largePill: React.CSSProperties = {
  minWidth: 150,
  minHeight: 66,
  borderRadius: 999,
  padding: '15px 26px',
  boxSizing: 'border-box',
  display: 'grid',
  placeItems: 'center',
  fontSize: STORYBOARD_TYPE_SCALE.pill,
  lineHeight: 1.1,
  whiteSpace: 'nowrap',
  border: '1px solid rgba(247,241,231,.22)',
  background: 'linear-gradient(135deg, rgba(14,18,19,.90), rgba(43,36,29,.76))',
  boxShadow: '0 18px 46px rgba(0,0,0,.32), inset 0 1px rgba(255,255,255,.08)',
};

export const AnimatedPill = ({
  label,
  start,
  end,
  active,
  tone = 'gold',
  style,
}: {
  label: string;
  start: number;
  end?: number;
  active?: boolean;
  tone?: 'gold' | 'green' | 'red' | 'ivory';
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const p = easeBetween(frame, start, start + 16);
  const color = tone === 'green' ? green : tone === 'red' ? red : tone === 'ivory' ? ivory : goldSoft;
  return (
    <div style={{
      ...largePill,
      color: active ? color : 'rgba(247,241,231,.58)',
      borderColor: active ? `${color}99` : 'rgba(247,241,231,.18)',
      opacity: p * (active ? 1 : 0.76) * exitOpacity(frame, end),
      transform: `translateY(${(1 - p) * 22}px) scale(${0.92 + p * 0.08 + (active ? 0.035 : 0)})`,
      boxShadow: active ? `0 20px 52px rgba(0,0,0,.34), 0 0 28px ${color}33` : largePill.boxShadow,
      ...style,
    }}>
      {label}
    </div>
  );
};

export const PillGrid = ({
  labels,
  starts,
  end,
  activeIndex,
  columns = 2,
  top = STORYBOARD_LAYOUT.mgTop,
  width = 650,
  left = 62,
}: {
  labels: string[];
  starts: number[];
  end?: number;
  activeIndex: number;
  columns?: number;
  top?: number;
  width?: number;
  left?: number;
}) => (
  <div style={{position: 'absolute', left, top, width, display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 16}}>
    {labels.map((label, index) => (
      <AnimatedPill key={label} label={label} start={starts[index]} end={end} active={activeIndex === index} />
    ))}
  </div>
);

export const FlowNode = ({label, start, active, style}: {label: React.ReactNode; start: number; active?: boolean; style?: React.CSSProperties}) => {
  const frame = useCurrentFrame();
  const p = easeBetween(frame, start, start + 18);
  return (
    <div style={{
      position: 'absolute',
      width: 210,
      height: 142,
      borderRadius: 999,
      display: 'grid',
      placeItems: 'center',
      textAlign: 'center',
      fontSize: 34,
      lineHeight: 1.08,
      color: active ? goldSoft : ivory,
      background: 'radial-gradient(circle at 34% 28%, rgba(217,170,99,.24), rgba(12,16,18,.90) 70%)',
      border: `2px solid ${active ? 'rgba(217,170,99,.72)' : 'rgba(247,241,231,.24)'}`,
      boxShadow: active ? '0 24px 62px rgba(0,0,0,.38), 0 0 32px rgba(217,170,99,.20)' : '0 24px 58px rgba(0,0,0,.34)',
      opacity: p,
      transform: `translateY(${(1 - p) * 26}px) scale(${0.78 + p * 0.22})`,
      ...style,
    }}>
      {label}
    </div>
  );
};

export const DrawLine = ({start, width, style}: {start: number; width: number; style?: React.CSSProperties}) => {
  const frame = useCurrentFrame();
  const p = easeBetween(frame, start, start + 24);
  return <div style={{position: 'absolute', height: 4, width: width * p, borderRadius: 4, background: gold, boxShadow: '0 0 18px rgba(217,170,99,.42)', transformOrigin: 'left center', ...style}} />;
};

export const AnimatedArrow = ({start, width = 176}: {start: number; width?: number}) => {
  const frame = useCurrentFrame();
  const p = easeBetween(frame, start, start + 22);
  const headP = easeBetween(frame, start + 10, start + 22);
  return (
    <div style={{position: 'relative', width, height: 34, flex: `0 0 ${width}px`}}>
      <div style={{position: 'absolute', left: 0, top: 15, width: Math.max(0, width * p - 10), height: 4, borderRadius: 4, background: gold, boxShadow: '0 0 18px rgba(217,170,99,.42)'}} />
      <div style={{position: 'absolute', left: Math.max(0, width * p - 24), top: 7, width: 18, height: 18, borderTop: `4px solid ${gold}`, borderRight: `4px solid ${gold}`, transform: 'rotate(45deg)', opacity: headP}} />
    </div>
  );
};

export const DelayedText = ({start, children, style}: {start: number; children: React.ReactNode; style?: React.CSSProperties}) => {
  const frame = useCurrentFrame();
  const p = easeBetween(frame, start, start + 16);
  return (
    <span style={{display: 'inline-block', opacity: p, transform: `translateX(${(1 - p) * 24}px)`, ...style}}>
      {children}
    </span>
  );
};

export const ChoiceCard = ({label, sub, start, end, active, style}: {label: string; sub: string; start: number; end?: number; active?: boolean; style?: React.CSSProperties}) => {
  const frame = useCurrentFrame();
  const p = easeBetween(frame, start, start + 18);
  return (
    <div style={{
      position: 'absolute',
      width: 390,
      minHeight: 176,
      borderRadius: 30,
      padding: '30px 34px',
      boxSizing: 'border-box',
      background: active ? 'linear-gradient(135deg, rgba(62,47,29,.92), rgba(16,19,19,.88))' : 'linear-gradient(135deg, rgba(15,19,20,.92), rgba(39,35,31,.78))',
      border: `2px solid ${active ? 'rgba(217,170,99,.68)' : 'rgba(247,241,231,.22)'}`,
      boxShadow: active ? '0 26px 68px rgba(0,0,0,.40), 0 0 34px rgba(217,170,99,.16)' : '0 26px 62px rgba(0,0,0,.36)',
      opacity: p * exitOpacity(frame, end),
      transform: `translateX(${(1 - p) * (active ? 44 : -44)}px) scale(${0.94 + p * 0.06})`,
      ...style,
    }}>
      <div style={{fontSize: 37, color: active ? goldSoft : ivory}}>{label}</div>
      <div style={{fontSize: 27, color: muted, marginTop: 14}}>{sub}</div>
    </div>
  );
};

export type InformationCardTone = 'gold' | 'green' | 'red' | 'ivory';
export type InformationCardVariant = 'dark' | 'pearl' | 'pill';

export const InformationCard = ({
  start,
  end,
  title,
  sub,
  tone = 'gold',
  variant = 'dark',
  style,
}: {
  start: number;
  end?: number;
  title: string;
  sub?: string;
  tone?: InformationCardTone;
  variant?: InformationCardVariant;
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const enter = progress(frame, start, 16);
  const color = tone === 'green' ? green : tone === 'red' ? red : tone === 'ivory' ? ivory : goldSoft;
  const pearl = variant === 'pearl';
  const pill = variant === 'pill';
  return (
    <div style={{
      position: 'absolute',
      minWidth: pill ? 190 : 280,
      minHeight: pill ? 72 : 126,
      padding: pill ? '17px 26px 19px' : '23px 28px 25px',
      borderRadius: pill ? 999 : 26,
      background: pearl
        ? 'linear-gradient(150deg, rgba(255,253,247,.96), rgba(226,220,207,.90))'
        : 'linear-gradient(135deg, rgba(17,21,21,.91), rgba(54,46,35,.78))',
      border: `2px solid ${pearl ? 'rgba(255,255,255,.82)' : `${color}99`}`,
      boxShadow: `0 22px 58px rgba(0,0,0,.36), 0 0 28px ${color}22`,
      backdropFilter: 'blur(14px)',
      color: pearl ? '#24231f' : color,
      opacity: enter * exitOpacity(frame, end),
      transform: `translateY(${(1 - enter) * 22}px) scale(${0.94 + enter * 0.06})`,
      boxSizing: 'border-box',
      ...style,
    }}>
      <div style={{fontSize: pill ? STORYBOARD_TYPE_SCALE.pill : STORYBOARD_TYPE_SCALE.cardTitle, lineHeight: 1.1, wordBreak: 'keep-all', overflowWrap: 'break-word'}}>{title}</div>
      {sub ? (
        <div style={{fontSize: STORYBOARD_TYPE_SCALE.supporting, color: pearl ? '#6d6659' : muted, marginTop: 11, lineHeight: 1.28, wordBreak: 'keep-all', overflowWrap: 'break-word'}}>
          {sub}
        </div>
      ) : null}
    </div>
  );
};

export const PearlInfoCard = ({
  start,
  end,
  title,
  sub,
  icon,
  label = '房地产开发观察',
  tone = 'gold',
  style,
}: {
  start: number;
  end?: number;
  title: string;
  sub: string;
  icon: string;
  label?: string;
  tone?: 'gold' | 'green' | 'red';
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const enter = progress(frame, start, 20);
  const color = tone === 'green' ? green : tone === 'red' ? red : goldSoft;
  return (
    <div style={{
      position: 'absolute',
      width: 420,
      minHeight: 205,
      padding: '26px 30px',
      borderRadius: 31,
      color: '#20201d',
      background: 'linear-gradient(150deg, rgba(255,253,247,.95), rgba(226,220,207,.88))',
      border: '1px solid rgba(255,255,255,.82)',
      boxShadow: '0 24px 70px rgba(0,0,0,.32), inset 0 1px white',
      opacity: enter * exitOpacity(frame, end),
      transform: `translateY(${(1 - enter) * 42}px) scale(${0.93 + enter * 0.07})`,
      boxSizing: 'border-box',
      ...style,
    }}>
      <div style={{display: 'flex', alignItems: 'center', gap: 13, color: '#615b50', fontSize: 21}}>
        <span style={{width: 42, height: 42, borderRadius: 14, display: 'grid', placeItems: 'center', background: color, color: '#171714', fontSize: 25}}>{icon}</span>
        {label}
      </div>
      <div style={{fontSize: 43, marginTop: 20, lineHeight: 1.1, wordBreak: 'keep-all', overflowWrap: 'break-word'}}>{title}</div>
      <div style={{fontSize: 26, color: '#6d6659', marginTop: 13, lineHeight: 1.3, wordBreak: 'keep-all', overflowWrap: 'break-word'}}>{sub}</div>
    </div>
  );
};

export const TimedStage = ({start, end, children}: {start: number; end: number; children: React.ReactNode}) => {
  const frame = useCurrentFrame();
  const enter = progress(frame, start, 16);
  const exit = interpolate(frame, [Math.max(start + 20, end - 12), end], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div style={{position: 'absolute', inset: 0, opacity: Math.min(enter, exit), transform: `translateY(${(1 - enter) * 18}px)`}}>
      {children}
    </div>
  );
};

type PhotoShape = 'landscape' | 'portrait' | 'arch' | 'circle' | 'cut';
type MotionKind = 'rise' | 'slide' | 'zoom' | 'swing' | 'reveal';

const shapeStyle = (shape: PhotoShape): React.CSSProperties => {
  if (shape === 'portrait') return {borderRadius: 30};
  if (shape === 'arch') return {borderRadius: '180px 180px 28px 28px'};
  if (shape === 'circle') return {borderRadius: '50%'};
  if (shape === 'cut') return {clipPath: 'polygon(0 0, 92% 0, 100% 14%, 100% 100%, 8% 100%, 0 86%)'};
  return {borderRadius: 26};
};

const AtlasImage = ({
  index,
  style,
  position = 'center',
}: {
  index: number;
  style?: React.CSSProperties;
  position?: string;
}) => {
  return (
    <div style={{position: 'relative', overflow: 'hidden', background: '#121719', ...style}}>
      <Img
        src={demoImages[index % demoImages.length]}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: position,
        }}
      />
    </div>
  );
};

const MovingBackground = ({
  images,
  cuts,
  shade = 0.42,
  frostFrom,
}: {
  images: number[];
  cuts: number[];
  shade?: number;
  frostFrom?: number;
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const frost = frostFrom === undefined ? 0 : progress(frame, frostFrom, 18);
  return (
    <AbsoluteFill>
      {images.map((image, index) => {
        const start = cuts[index] ?? 0;
        const end = cuts[index + 1] ?? durationInFrames;
        const opacity = fadeWindow(frame, start, end, 16);
        const drift = interpolate(frame, [start, end], [index % 2 === 0 ? -10 : 10, index % 2 === 0 ? 12 : -12], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <AtlasImage
            key={`${image}-${start}`}
            index={image}
            style={{
              position: 'absolute',
              inset: -18,
              opacity,
              scale: 1.04 + frost * 0.035,
              translate: `${drift}px 0`,
              filter: `blur(${frost * 13}px) saturate(${1 - frost * 0.28}) contrast(${1 - frost * 0.12}) brightness(${1 - frost * 0.12})`,
            }}
          />
        );
      })}
      <AbsoluteFill style={{background: `rgba(16,20,21,${frost * 0.24})`}} />
      <AbsoluteFill style={{background: `linear-gradient(90deg, rgba(7,10,11,${Math.min(.92, shade + .30)}) 0%, rgba(7,10,11,${shade * .44}) 56%, rgba(7,10,11,${shade * .74}) 100%)`}} />
      <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(7,9,10,.68) 0%, transparent 34%, rgba(7,9,10,.08) 100%)'}} />
    </AbsoluteFill>
  );
};

export const Title = ({
  children,
  start,
  left = STORYBOARD_LAYOUT.contentLeft,
  top = STORYBOARD_LAYOUT.titleTop,
  width = 760,
  size = STORYBOARD_TYPE_SCALE.headline,
  accentLine = true,
}: {
  children: React.ReactNode;
  start: number;
  left?: number;
  top?: number;
  width?: number;
  size?: number;
  accentLine?: boolean;
}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, start, 18);
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        opacity: p,
        translate: `0 ${(1 - p) * 26}px`,
        clipPath: `inset(0 ${100 - p * 100}% 0 0)`,
      }}
    >
      <div style={{fontSize: size, lineHeight: 1.08, fontWeight: 650, textShadow: '0 8px 34px rgba(0,0,0,.76)'}}>{children}</div>
      {accentLine ? (
        <div style={{width: 112 * p, height: 5, marginTop: 18, borderRadius: 5, background: gold, boxShadow: '0 0 22px rgba(217,170,99,.45)'}} />
      ) : null}
    </div>
  );
};

const PhotoCard = ({
  index,
  label,
  start,
  shape = 'landscape',
  motion = 'rise',
  style,
  active = false,
}: {
  index: number;
  label: string;
  start: number;
  shape?: PhotoShape;
  motion?: MotionKind;
  style: React.CSSProperties;
  active?: boolean;
}) => {
  const frame = useCurrentFrame();
  const isCircle = shape === 'circle';
  const p = progress(frame, start, 18);
  const translate = motion === 'slide'
    ? `${(1 - p) * 42}px 0`
    : motion === 'rise'
      ? `0 ${(1 - p) * 34}px`
      : '0 0';
  const rotate = motion === 'swing' ? `${(1 - p) * 6 - 2}deg` : '0deg';
  const scale = motion === 'zoom' ? 0.82 + p * 0.18 : 0.96 + p * 0.04;
  const clipPath = motion === 'reveal' ? `inset(0 ${100 - p * 100}% 0 0 round 26px)` : undefined;
  return (
    <div
      style={{
        ...glass,
        ...shapeStyle(shape),
        position: 'absolute',
        overflow: 'hidden',
        opacity: p,
        translate,
        rotate,
        scale,
        clipPath: clipPath ?? shapeStyle(shape).clipPath,
        borderColor: active ? 'rgba(217,170,99,.66)' : 'rgba(247,241,231,.20)',
        ...style,
      }}
    >
      <AtlasImage index={index} style={{position: 'absolute', inset: 0}} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isCircle
          ? 'linear-gradient(0deg, rgba(7,9,10,.96) 0%, rgba(7,9,10,.64) 40%, transparent 68%)'
          : 'linear-gradient(0deg, rgba(7,9,10,.92) 0%, transparent 62%)',
      }} />
      <div style={{
        position: 'absolute',
        left: isCircle ? 14 : 22,
        right: isCircle ? 14 : 22,
        bottom: isCircle ? 38 : 18,
        fontSize: isCircle ? 27 : 30,
        lineHeight: 1.15,
        textAlign: isCircle ? 'center' : 'left',
        whiteSpace: 'nowrap',
        color: ivory,
        textShadow: '0 4px 18px rgba(0,0,0,.8)',
      }}>
        {label}
      </div>
    </div>
  );
};

type NoteShape = 'pill' | 'bubble' | 'flag' | 'ticket';

export const Note = ({
  children,
  start,
  end,
  shape = 'pill',
  tone = 'gold',
  motion = 'rise',
  style,
}: {
  children: React.ReactNode;
  start: number;
  end?: number;
  shape?: NoteShape;
  tone?: 'gold' | 'red' | 'green' | 'ivory';
  motion?: MotionKind;
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, start, 15);
  const color = tone === 'red' ? red : tone === 'green' ? green : tone === 'ivory' ? ivory : goldSoft;
  const shapeCss: React.CSSProperties = shape === 'bubble'
    ? {borderRadius: '30px 30px 30px 8px'}
    : shape === 'flag'
      ? {clipPath: 'polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%, 7% 50%)'}
      : shape === 'ticket'
        ? {clipPath: 'polygon(0 0, 94% 0, 100% 22%, 100% 100%, 6% 100%, 0 78%)'}
        : {borderRadius: 999};
  const translate = motion === 'slide' ? `${(1 - p) * -42}px 0` : `0 ${(1 - p) * 22}px`;
  return (
    <div
      style={{
        ...glass,
        ...shapeCss,
        position: 'absolute',
        padding: shape === 'flag' ? '16px 34px' : '15px 24px',
        minWidth: 150,
        minHeight: 64,
        boxSizing: 'border-box',
        fontSize: STORYBOARD_TYPE_SCALE.pill,
        lineHeight: 1.15,
        color,
        opacity: p * exitOpacity(frame, end),
        translate,
        scale: motion === 'zoom' ? 0.78 + p * 0.22 : 0.97 + p * 0.03,
        rotate: motion === 'swing' ? `${(1 - p) * -7}deg` : '0deg',
        borderColor: tone === 'red' ? 'rgba(255,123,102,.52)' : tone === 'green' ? 'rgba(159,210,178,.50)' : 'rgba(217,170,99,.42)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const NumberDisc = ({number, label, start, style}: {number: string; label: string; start: number; style?: React.CSSProperties}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, start, 18);
  return (
    <div
      style={{
        position: 'absolute',
        width: 190,
        height: 190,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        background: 'radial-gradient(circle at 36% 30%, rgba(240,209,156,.32), rgba(19,22,22,.88) 62%)',
        border: '2px solid rgba(217,170,99,.58)',
        boxShadow: '0 26px 60px rgba(0,0,0,.38), 0 0 42px rgba(217,170,99,.12)',
        opacity: p,
        scale: 0.7 + p * 0.3,
        rotate: `${(1 - p) * -10}deg`,
        ...style,
      }}
    >
      <div>
        <div style={{fontSize: 66, lineHeight: .9, color: gold}}>{number}</div>
        <div style={{fontSize: 26, marginTop: 13, color: ivory}}>{label}</div>
      </div>
    </div>
  );
};

export const StoryboardTemplateV2Scene1 = () => {
  const frame = useCurrentFrame();
  const active = frame < 82 ? 0 : frame < 154 ? 1 : 2;
  const items = ['固定噪声', '采光遮挡', '车库动线'];
  return (
    <Shell label="楼栋判断｜长期居住影响">
      <MovingBackground images={[0, 3, 2]} cuts={[0, 80, 152]} shade={0.38} />
      <Title start={0}>每天面对的<br/><span style={{color: gold}}>居住代价</span></Title>
      {items.map((item, index) => (
        <Note
          key={item}
          start={8 + index * 72}
          shape="flag"
          tone={index === active ? 'red' : 'ivory'}
          motion="slide"
          style={{left: 62, top: 312 + index * 72, opacity: index <= active ? 1 : 0}}
        >
          {item}
        </Note>
      ))}
      <div style={{position: 'absolute', right: 212, top: 408, fontSize: 35, color: ivory, opacity: progress(frame, 168, 18), textShadow: '0 6px 24px rgba(0,0,0,.78)'}}>
        画面跟着台词<span style={{color: gold}}>换实景</span>
        <div style={{width: 258 * progress(frame, 176, 24), height: 5, marginTop: 10, background: red, borderRadius: 4}} />
      </div>
    </Shell>
  );
};

export const StoryboardTemplateV2Scene2 = () => (
  <Shell label="实景解释｜图片卡片优先">
    <MovingBackground images={[1]} cuts={[0]} shade={0.62} frostFrom={4} />
    <Title start={0} size={58}>能用实景说明的<br/><span style={{color: gold}}>不要只放文字框</span></Title>
    <PhotoCard index={1} label="样板间体验" start={8} shape="landscape" motion="reveal" active style={{left: 62, top: 278, width: 390, height: 270}} />
    <PhotoCard index={4} label="真实交付空间" start={34} shape="landscape" motion="reveal" style={{left: 478, top: 278, width: 270, height: 270}} />
    <PhotoCard index={5} label="总平图核验" start={62} shape="landscape" motion="reveal" style={{left: 774, top: 278, width: 282, height: 270}} />
  </Shell>
);

export const StoryboardTemplateV2Scene3 = () => (
  <Shell label="语义卡片｜形状跟内容变化">
    <MovingBackground images={[3, 0]} cuts={[0, 90]} shade={0.70} />
    <Title start={0} size={58}>不同信息<br/><span style={{color: gold}}>不再都装进矩形</span></Title>
    <NumberDisc number="01" label="判断顺序" start={5} style={{left: 62, top: 315}} />
    <Note start={28} shape="pill" tone="red" motion="slide" style={{left: 300, top: 338}}>固定噪声｜风险</Note>
    <Note start={54} shape="pill" tone="green" motion="slide" style={{left: 300, top: 432}}>可改善｜保留判断</Note>
    <div style={{position: 'absolute', left: 760, top: 356, fontSize: 38, color: goldSoft}}>结论：先排除</div>
  </Shell>
);

export const StoryboardTemplateV2Scene4 = () => {
  const frame = useCurrentFrame();
  const cardOneStart = 52;
  const cardTwoStart = 88;
  const cardThreeStart = 122;
  const nodeOne = progress(frame, cardOneStart, 16);
  const firstLink = progress(frame, cardOneStart + 16, cardTwoStart - cardOneStart - 16);
  const nodeTwo = progress(frame, cardTwoStart, 16);
  const secondLink = progress(frame, cardTwoStart + 16, cardThreeStart - cardTwoStart - 16);
  const nodeThree = progress(frame, cardThreeStart, 16);
  return (
    <Shell label="判断路径｜动效按语义匹配">
      <MovingBackground images={[5]} cuts={[0]} shade={0.70} frostFrom={44} />
      <Title start={0} size={58}>不是一起淡入<br/><span style={{color: gold}}>而是逐步推进</span></Title>
      <svg width="790" height="260" viewBox="0 0 790 260" style={{position: 'absolute', left: 72, top: 290}}>
        <path pathLength="1" d="M50 205 C180 180 176 72 340 95" fill="none" stroke="rgba(247,241,231,.18)" strokeWidth="14" strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1 - firstLink} />
        <path pathLength="1" d="M50 205 C180 180 176 72 340 95" fill="none" stroke={gold} strokeWidth="6" strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1 - firstLink} />
        <path pathLength="1" d="M340 95 C504 118 535 222 730 52" fill="none" stroke="rgba(247,241,231,.18)" strokeWidth="14" strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1 - secondLink} />
        <path pathLength="1" d="M340 95 C504 118 535 222 730 52" fill="none" stroke={gold} strokeWidth="6" strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1 - secondLink} />
        <circle cx="50" cy="205" r={14 * nodeOne} fill={gold} />
        <circle cx="340" cy="95" r={14 * nodeTwo} fill={gold} />
        <circle cx="730" cy="52" r={14 * nodeThree} fill={gold} />
      </svg>
      <PhotoCard index={2} label="先看楼栋" start={cardOneStart} shape="circle" motion="zoom" style={{left: 62, top: 405, width: 180, height: 180}} />
      <PhotoCard index={3} label="排除硬伤" start={cardTwoStart} shape="circle" motion="zoom" style={{left: 455, top: 300, width: 210, height: 210}} />
      <PhotoCard index={4} label="再选户型" start={cardThreeStart} shape="circle" motion="zoom" active style={{left: 812, top: 292, width: 220, height: 220}} />
    </Shell>
  );
};

export const StoryboardTemplateV2Scene5 = () => {
  const frame = useCurrentFrame();
  const underline = progress(frame, 102, 28);
  return (
    <Shell label="最终结论｜减少卡片干扰">
      <AtlasImage index={2} style={{position: 'absolute', left: 0, top: 0, width: 640, height: 720, opacity: .72, scale: 1.03}} />
      <AtlasImage index={1} style={{position: 'absolute', right: 0, top: 0, width: 640, height: 720, opacity: .74, scale: 1.03}} />
      <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(7,10,11,.66), rgba(7,10,11,.24) 46%, rgba(7,10,11,.56))'}} />
      <Title start={0} top={132} size={61} width={960} accentLine={false}>楼栋负责<span style={{color: red}}>排除</span><br/>户型负责<span style={{color: gold}}>选择</span></Title>
      <div style={{position: 'absolute', left: 62, top: 360, fontSize: 34, color: ivory, opacity: progress(frame, 66, 18)}}>
        结论可以直接落在实景上
        <div style={{height: 7, width: 420 * underline, marginTop: 14, borderRadius: 8, background: `linear-gradient(90deg, ${gold}, ${red})`, rotate: '-1deg'}} />
      </div>
      <Note start={132} shape="pill" tone="ivory" motion="zoom" style={{left: 62, top: 470}}>文字更大　卡片更少</Note>
    </Shell>
  );
};

export const storyboardTemplateV2Durations = {
  one: 8 * FPS,
  two: 6 * FPS,
  three: 6 * FPS,
  four: 7 * FPS,
  five: 6 * FPS,
};

export const StoryboardTemplateV2Showcase = () => (
  <Series>
    <Series.Sequence durationInFrames={storyboardTemplateV2Durations.one}>
      <StoryboardTemplateV2Scene1 />
    </Series.Sequence>
    <Series.Sequence durationInFrames={storyboardTemplateV2Durations.two}>
      <StoryboardTemplateV2Scene2 />
    </Series.Sequence>
    <Series.Sequence durationInFrames={storyboardTemplateV2Durations.three}>
      <StoryboardTemplateV2Scene3 />
    </Series.Sequence>
    <Series.Sequence durationInFrames={storyboardTemplateV2Durations.four}>
      <StoryboardTemplateV2Scene4 />
    </Series.Sequence>
    <Series.Sequence durationInFrames={storyboardTemplateV2Durations.five}>
      <StoryboardTemplateV2Scene5 />
    </Series.Sequence>
  </Series>
);

export const storyboardTemplateV2ShowcaseDuration = Object.values(storyboardTemplateV2Durations).reduce(
  (sum, duration) => sum + duration,
  0,
);
