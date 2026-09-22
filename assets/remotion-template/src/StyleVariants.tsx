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
const gold = '#e4b45e';
const goldBright = '#ffd47a';
const green = '#9ef1c5';
const red = '#ff7568';
const coal = '#090c0d';

const room = staticFile('storyboard-template-v3-assets/旧房客厅_无字背景.png');
const renovation = staticFile('storyboard-template-v3-assets/证据轨道_装修.png');
const community = staticFile('storyboard-template-v3-assets/证据轨道_小区.png');
const commute = staticFile('storyboard-template-v3-assets/证据轨道_通勤.png');
const oldCommunity = staticFile('storyboard-template-v3-assets/语义切分_旧小区_无字.png');

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const reveal = (frame: number, start: number, duration = 16) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });

const GlobalFonts = () => null;

const FullBleedPhoto = ({src, side}: {src: string; side?: 'left' | 'right'}) => {
  const frame = useCurrentFrame();
  return (
    <Img
      src={src}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: side === 'right' ? '54% center' : side === 'left' ? '44% center' : 'center',
        scale: interpolate(frame, [0, 149], [1.04, 1.09], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.linear,
        }),
      }}
    />
  );
};

const EvidenceCard = ({
  image,
  number,
  label,
  left,
  top,
  width,
  height,
  start,
  active,
}: {
  image: string;
  number: string;
  label: string;
  left: number;
  top: number;
  width: number;
  height: number;
  start: number;
  active: boolean;
}) => {
  const frame = useCurrentFrame();
  const show = reveal(frame, start, 18);
  const focus = active ? reveal(frame, 70, 24) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        opacity: show,
        translate: `0 ${interpolate(show, [0, 1], [34, 0])}px`,
        scale: active ? interpolate(focus, [0, 1], [0.95, 1.03]) : 1,
        zIndex: active ? 3 : 2,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 10,
          marginBottom: 12,
          color: active ? ivory : 'rgba(246,240,230,.66)',
          textShadow: '0 4px 20px rgba(0,0,0,.78)',
        }}
      >
        <span
          style={{
            color: active ? goldBright : 'rgba(246,240,230,.58)',
            fontFamily: 'PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif',
            fontSize: active ? 42 : 34,
            fontStyle: 'italic',
            lineHeight: 1,
          }}
        >
          {number}
        </span>
        <span style={{fontFamily: 'PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif', fontSize: active ? 32 : 28, fontWeight: 900}}>{label}</span>
      </div>

      <div
        style={{
          position: 'relative',
          width,
          height,
          overflow: 'hidden',
          borderRadius: active ? 28 : 22,
          border: `${active ? 3 : 2}px solid ${active ? goldBright : 'rgba(246,240,230,.52)'}`,
          boxShadow: active
            ? `0 0 ${interpolate(focus, [0, 1], [0, 30])}px rgba(255,197,87,.72), 0 22px 50px rgba(0,0,0,.42)`
            : '0 18px 38px rgba(0,0,0,.32)',
          filter: active
            ? `brightness(${interpolate(focus, [0, 1], [0.82, 1.08])}) saturate(${interpolate(focus, [0, 1], [0.72, 1.08])})`
            : 'brightness(.58) saturate(.54)',
        }}
      >
        <Img src={image} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        {active ? (
          <AbsoluteFill
            style={{
              background: 'linear-gradient(135deg, rgba(255,210,112,.14), transparent 48%)',
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export const StoryboardStyleV3EvidenceRail = () => {
  const frame = useCurrentFrame();
  const title = reveal(frame, 4, 18);
  const line = reveal(frame, 24, 58);
  const verdict = reveal(frame, 103, 22);

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: coal, color: ivory, fontFamily: 'PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif'}}>
      <GlobalFonts />
      <FullBleedPhoto src={room} />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(5,7,8,.38) 0%, rgba(5,7,8,.54) 43%, rgba(5,7,8,.66) 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 56,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: title,
          translate: `0 ${interpolate(title, [0, 1], [-20, 0])}px`,
          fontFamily: 'PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif',
          fontSize: 62,
          letterSpacing: -1,
          textShadow: '0 8px 28px rgba(0,0,0,.72)',
        }}
      >
        同样预算，<span style={{color: goldBright}}>先看不可逆</span>
        <div
          style={{
            width: 138 * title,
            height: 4,
            borderRadius: 4,
            background: goldBright,
            margin: '16px auto 0',
            boxShadow: '0 0 16px rgba(255,203,102,.5)',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 82,
          top: 415,
          width: 1116 * line,
          height: 3,
          borderRadius: 4,
          background: `linear-gradient(90deg, rgba(228,180,94,.12), ${goldBright}, rgba(228,180,94,.72))`,
          boxShadow: '0 0 12px rgba(255,202,99,.42)',
        }}
      />
      {[220, 640, 1060].map((x, index) => (
        <div
          key={x}
          style={{
            position: 'absolute',
            left: x - 9,
            top: 407,
            width: 18,
            height: 18,
            borderRadius: '50%',
            border: `3px solid ${goldBright}`,
            background: index === 1 ? goldBright : coal,
            opacity: reveal(frame, 36 + index * 15, 12),
            boxShadow: index === 1 ? '0 0 24px rgba(255,204,109,.92)' : '0 0 12px rgba(255,204,109,.45)',
            zIndex: 4,
          }}
        />
      ))}

      <EvidenceCard image={renovation} number="01" label="装修" left={72} top={268} width={296} height={176} start={22} active={false} />
      <EvidenceCard image={community} number="02" label="小区" left={430} top={232} width={420} height={240} start={38} active />
      <EvidenceCard image={commute} number="03" label="通勤" left={912} top={268} width={296} height={176} start={54} active={false} />

      <div
        style={{
          position: 'absolute',
          left: 410,
          top: 590,
          width: 460,
          height: 78,
          opacity: verdict,
          scale: interpolate(verdict, [0, 1], [0.86, 1]),
          clipPath: `polygon(1% 18%, 94% 4%, 100% 70%, 88% 88%, 4% 96%, 0 48%)`,
          background: 'linear-gradient(90deg, rgba(255,214,128,.95), rgba(255,238,179,.98), rgba(255,201,89,.9))',
          boxShadow: '0 18px 40px rgba(0,0,0,.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4a2509',
          fontFamily: 'PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif',
          fontSize: 37,
          letterSpacing: 1,
        }}
      >
        决定：外部条件
      </div>
    </AbsoluteFill>
  );
};

const VerdictPill = ({
  side,
  start,
  tone,
  symbol,
  title,
  detail,
}: {
  side: 'left' | 'right';
  start: number;
  tone: string;
  symbol: string;
  title: string;
  detail: string;
}) => {
  const frame = useCurrentFrame();
  const show = reveal(frame, start, 18);
  return (
    <div
      style={{
        position: 'absolute',
        left: side === 'left' ? 185 : 774,
        top: 462,
        width: 320,
        opacity: show,
        translate: `${interpolate(show, [0, 1], [side === 'left' ? -38 : 38, 0])}px 0`,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          height: 72,
          borderRadius: 999,
          border: `2px solid ${tone}`,
          background: 'rgba(7,10,11,.78)',
          boxShadow: `0 14px 38px rgba(0,0,0,.36), 0 0 24px ${tone}22`,
          color: tone,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 18,
          fontFamily: 'PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif',
          fontSize: 38,
        }}
      >
        <span style={{fontSize: 44, lineHeight: 1}}>{symbol}</span>
        {title}
      </div>
      <div
        style={{
          marginTop: 14,
          color: ivory,
          fontSize: 25,
          textShadow: '0 4px 16px rgba(0,0,0,.92)',
        }}
      >
        {detail}
      </div>
    </div>
  );
};

export const StoryboardStyleV3SemanticSplit = () => {
  const frame = useCurrentFrame();
  const split = reveal(frame, 10, 28);
  const title = reveal(frame, 28, 20);
  const chevrons = reveal(frame, 70, 12);

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: coal, color: ivory, fontFamily: 'PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif'}}>
      <GlobalFonts />

      <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, width: 1280}}>
          <FullBleedPhoto src={room} side="left" />
        </div>
        <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(5,7,8,.25), rgba(5,7,8,.48))'}} />
      </div>

      <div
        style={{
          position: 'absolute',
          inset: '0 0 0 50%',
          overflow: 'hidden',
          clipPath: `inset(0 ${100 - split * 100}% 0 0)`,
        }}
      >
        <Img
          src={oldCommunity}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            scale: interpolate(frame, [0, 149], [1.03, 1.085], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.linear,
            }),
          }}
        />
        <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(5,7,8,.5), rgba(5,7,8,.2))'}} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 636,
          top: 0,
          width: 8,
          height: 720 * split,
          background: `linear-gradient(180deg, rgba(255,217,138,.12), ${goldBright}, rgba(255,217,138,.22))`,
          boxShadow: '0 0 24px rgba(255,200,92,.62)',
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 92,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: title,
          translate: `0 ${interpolate(title, [0, 1], [-22, 0])}px`,
          fontFamily: 'PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif',
          fontSize: 66,
          lineHeight: 1.12,
          letterSpacing: -1,
          textShadow: '0 8px 30px rgba(0,0,0,.88)',
          zIndex: 5,
        }}
      >
        房子旧，<br />
        <span style={{color: goldBright}}>不等于都能改</span>
        <div
          style={{
            width: 132 * title,
            height: 4,
            borderRadius: 3,
            background: goldBright,
            margin: '14px auto 0',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          top: 377,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 20,
          color: 'rgba(246,240,230,.74)',
          fontSize: 48,
          opacity: chevrons,
          textShadow: '0 4px 20px rgba(0,0,0,.75)',
          zIndex: 5,
        }}
      >
        <span>‹</span><span>›</span>
      </div>

      <VerdictPill side="left" start={55} tone={green} symbol="✓" title="能改" detail="装修" />
      <VerdictPill side="right" start={78} tone={red} symbol="⊘" title="不能改" detail="通勤 · 楼间距 · 物业" />
    </AbsoluteFill>
  );
};

export const storyboardStyleV3VariantDuration = 150;
