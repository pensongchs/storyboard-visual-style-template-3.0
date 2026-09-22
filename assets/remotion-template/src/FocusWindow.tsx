import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const ivory = '#f6f0e6';
const muted = 'rgba(246, 240, 230, 0.72)';
const gold = '#d9aa63';
const goldSoft = '#f1d29d';
const red = '#ef7465';
const green = '#9bcbae';
const coal = '#0c1012';

const background = staticFile('storyboard-template-v3-assets/旧房客厅_无字背景.png');

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const enter = (frame: number, start: number, duration = 16) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });

const GlobalFonts = () => null;

const LeaderLabel = ({
  start,
  left,
  top,
  label,
  tone,
  lineWidth,
  align = 'left',
}: {
  start: number;
  left: number;
  top: number;
  label: string;
  tone: string;
  lineWidth: number;
  align?: 'left' | 'right';
}) => {
  const frame = useCurrentFrame();
  const line = enter(frame, start, 18);
  const text = enter(frame, start + 8, 14);
  const lineLeft = align === 'left' ? 0 : 178 - lineWidth;

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: 178,
        height: 84,
        opacity: line,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: lineLeft,
          top: 58,
          width: lineWidth * line,
          height: 2,
          borderRadius: 2,
          background: tone,
          boxShadow: `0 0 18px ${tone}66`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: align === 'left' ? Math.max(0, lineWidth - 6) : Math.max(0, 172 - lineWidth),
          top: 53,
          width: 12,
          height: 12,
          borderRadius: '50%',
          border: `2px solid ${tone}`,
          background: coal,
          boxSizing: 'border-box',
          scale: 0.72 + line * 0.28,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: align === 'left' ? 0 : undefined,
          right: align === 'right' ? 0 : undefined,
          top: 0,
          padding: '10px 18px',
          borderRadius: 999,
          border: `1px solid ${tone}a8`,
          background: 'rgba(10, 13, 14, 0.78)',
          boxShadow: '0 12px 28px rgba(0,0,0,.28)',
          color: tone,
          fontSize: 28,
          lineHeight: 1,
          opacity: text,
          translate: `${align === 'left' ? (1 - text) * -12 : (1 - text) * 12}px 0`,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const StoryboardStyleV3FocusWindow = () => {
  const frame = useCurrentFrame();
  const title = enter(frame, 7, 18);
  const focus = enter(frame, 38, 42);
  const conclusion = enter(frame, 214, 20);
  const focusTop = interpolate(focus, [0, 1], [48, 35]);
  const focusRight = interpolate(focus, [0, 1], [50, 35]);
  const focusBottom = interpolate(focus, [0, 1], [48, 20]);
  const focusLeft = interpolate(focus, [0, 1], [50, 12]);
  const backgroundScale = interpolate(frame, [0, 299], [1.035, 1.075], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.linear,
  });
  const dashOffset = interpolate(focus, [0, 1], [2440, 0]);

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        background: coal,
        color: ivory,
        fontFamily: 'PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif',
      }}
    >
      <GlobalFonts />

      <Img
        src={background}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          scale: backgroundScale,
          filter: 'brightness(.74) saturate(.78) contrast(1.04)',
        }}
      />

      <AbsoluteFill
        style={{
          background:
            'linear-gradient(90deg, rgba(7,9,10,.58) 0%, rgba(7,9,10,.18) 38%, rgba(7,9,10,.06) 68%, rgba(7,9,10,.24) 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(${focusTop}% ${focusRight}% ${focusBottom}% ${focusLeft}% round 48px)`,
          opacity: focus,
        }}
      >
        <Img
          src={background}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            scale: backgroundScale,
            filter: 'brightness(1.06) saturate(.98) contrast(1.02)',
          }}
        />
        <AbsoluteFill
          style={{
            background:
              'radial-gradient(circle at 48% 58%, rgba(255,221,156,.16), transparent 58%)',
          }}
        />
      </div>

      <svg
        width="1280"
        height="720"
        viewBox="0 0 1280 720"
        style={{position: 'absolute', inset: 0, opacity: focus}}
      >
        <rect
          x="154"
          y="250"
          width="678"
          height="326"
          rx="48"
          fill="none"
          stroke={gold}
          strokeWidth="3"
          strokeDasharray="2440"
          strokeDashoffset={dashOffset}
          style={{filter: 'drop-shadow(0 0 10px rgba(217,170,99,.42))'}}
        />
      </svg>

      <div
        style={{
          position: 'absolute',
          left: 58,
          top: 42,
          display: 'flex',
          alignItems: 'center',
          gap: 13,
          color: muted,
          fontSize: 18,
          letterSpacing: 2.2,
          textShadow: '0 3px 16px rgba(0,0,0,.72)',
          opacity: title,
        }}
      >
        <span style={{display: 'block', width: 34, height: 3, borderRadius: 3, background: gold}} />
        新房还是二手房｜判断顺序
      </div>

      <div
        style={{
          position: 'absolute',
          left: 58,
          top: 92,
          width: 690,
          opacity: title,
          translate: `0 ${(1 - title) * 20}px`,
          clipPath: `inset(0 ${100 - title * 100}% 0 0)`,
          textShadow: '0 8px 32px rgba(0,0,0,.78)',
        }}
      >
        <div
          style={{
            fontFamily: 'PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif',
            fontSize: 58,
            lineHeight: 1.08,
            fontWeight: 900,
            letterSpacing: -0.8,
          }}
        >
          先分清：哪些能改
          <br />
          <span style={{color: goldSoft}}>哪些不能改</span>
        </div>
        <div
          style={{
            width: 118 * title,
            height: 5,
            marginTop: 15,
            borderRadius: 4,
            background: gold,
          }}
        />
      </div>

      <LeaderLabel
        start={88}
        left={528}
        top={398}
        label="室内能改"
        tone={green}
        lineWidth={92}
      />
      <LeaderLabel
        start={142}
        left={870}
        top={190}
        label="外部难改"
        tone={red}
        lineWidth={108}
        align="right"
      />

      <div
        style={{
          position: 'absolute',
          left: 290,
          top: 500,
          width: 670,
          height: 58,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          padding: '0 24px',
          boxSizing: 'border-box',
          borderTop: '1px solid rgba(217,170,99,.66)',
          borderBottom: '1px solid rgba(217,170,99,.28)',
          background: 'linear-gradient(90deg, rgba(11,14,15,.72), rgba(11,14,15,.38))',
          color: ivory,
          opacity: conclusion,
          translate: `0 ${(1 - conclusion) * 16}px`,
        }}
      >
        <span style={{fontSize: 17, letterSpacing: 3, color: gold}}>判断</span>
        <span style={{fontFamily: 'PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif', fontSize: 29, fontWeight: 900}}>
          装修能改，位置和通勤改不了
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const storyboardStyleV3FocusWindowDuration = 300;
