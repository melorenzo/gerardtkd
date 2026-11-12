import { useEffect, useRef } from 'react';
import { createTimeline, stagger } from 'animejs';

/**
 * Animación marcial (Anime.js): luchador estilizado con cinta al viento
 * y puño cerrado haciendo "shake" (guardia que amaga golpear).
 * Estética inspirada en clásicos de pelea (sin copiar personajes).
 * Respeta prefers-reduced-motion.
 */
export default function KickAnimation() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduce) return;

    const q = (sel: string) => root.current!.querySelector(sel);
    const tails = root.current!.querySelectorAll('.band-tail');
    const lines = root.current!.querySelectorAll('.hit-line');

    // 1) cinta de la cabeza ondeando fuerte (bucle continuo)
    createTimeline({ loop: true, defaults: { ease: 'inOutSine' } })
      .add(tails[0], { rotate: [0, 26, -12, 18, 0], skewY: [0, 10, -5, 7, 0], duration: 1100 }, 0)
      .add(tails[1], { rotate: [0, 34, -16, 24, 0], skewY: [0, 14, -7, 10, 0], duration: 1100 }, 70)
      .add(tails[2], { rotate: [0, 18, -10, 14, 0], skewY: [0, 7, -4, 5, 0], duration: 1100 }, 130);

    // 2) cuerpo: respiración + balanceo de guardia
    createTimeline({ loop: true, defaults: { ease: 'inOutSine' } })
      .add(q('.fighter'), { translateY: [0, -4, 0], duration: 1400 }, 0)
      .add(q('.fighter'), { rotate: [0, -2, 0, 2, 0], duration: 2800, ease: 'inOutQuad' }, 0);

    // 3) puño cerrado: amague + "shake" (golpe corto repetido)
    const tl = createTimeline({ loop: true, defaults: { ease: 'outQuad' } });
    tl
      .add(q('.fist'), { translateX: [0, 4, -2, 3, 0], rotate: [0, -5, 4, -3, 0], duration: 700, ease: 'inOutQuad' }, 0)
      .add(q('.arm-front'), { translateX: [0, 2, 0], duration: 700, ease: 'inOutQuad' }, 0)
      .add(q('.fist'), { translateX: [0, 16, 0], rotate: [0, 10, 0], duration: 260, ease: 'outExpo' }, 900)
      .add(q('.arm-front'), { translateX: [0, 12, 0], duration: 260, ease: 'outExpo' }, 900)
      .add(q('.fist-glow'), { opacity: [0, 0.9, 0], scale: [0.5, 1.6, 0.5], duration: 420, ease: 'outQuad' }, 900)
      .add(lines, {
        opacity: [0, 1, 0],
        translateX: [0, 14],
        scale: [0.7, 1.1],
        delay: stagger(50),
        duration: 340,
        ease: 'outQuad',
      }, 930)
      .add(q('.fist'), { translateX: [0, 12, 0], rotate: [0, 8, 0], duration: 220, ease: 'outExpo' }, 1450)
      .add(q('.arm-front'), { translateX: [0, 9, 0], duration: 220, ease: 'outExpo' }, 1450)
      .add(q('.fist-glow'), { opacity: [0, 0.6, 0], scale: [0.5, 1.3, 0.5], duration: 340, ease: 'outQuad' }, 1450)
      .add({}, { duration: 600 });

    return () => { tl.pause(); };
  }, []);

  return (
    <div ref={root} aria-hidden="true" title="Artes marciales" className="select-none">
      <svg width="170" height="170" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
        <defs>
          <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f2f4f7" />
            <stop offset="100%" stopColor="#cfd6e4" />
          </linearGradient>
        </defs>

        <circle cx="66" cy="74" r="58" stroke="rgba(47,111,208,.32)" strokeWidth="2" />
        <circle className="fist-glow" cx="112" cy="72" r="11" fill="#2f6fd0" opacity="0" style={{ transformOrigin: '112px 72px' }} />

        <g className="fighter" style={{ transformOrigin: '66px 96px' }}>
          {/* --- cinta de la cabeza (nudo + colas al viento) --- */}
          <g transform="translate(66,44)">
            <rect x="-11" y="-2.5" width="22" height="5.5" rx="2.5" fill="#e53935" />
            <path className="band-tail" d="M-11 1 C-20 3 -28 10 -36 18" stroke="#e53935" strokeWidth="4.5" strokeLinecap="round" fill="none" style={{ transformOrigin: '-11px 1px' }} />
            <path className="band-tail" d="M-11 0 C-22 -2 -32 2 -42 8" stroke="#ff6a60" strokeWidth="3.2" strokeLinecap="round" fill="none" style={{ transformOrigin: '-11px 0px' }} />
            <path className="band-tail" d="M11 1 C18 5 24 12 29 20" stroke="#c62828" strokeWidth="3.8" strokeLinecap="round" fill="none" style={{ transformOrigin: '11px 1px' }} />
          </g>

          {/* --- cabeza --- */}
          <circle cx="66" cy="53" r="12.5" fill="#f2c9a0" />
          <path d="M53 50 C56 41 77 41 79 50" fill="#241610" />
          <path d="M72 56 h5" stroke="#8a5a3b" strokeWidth="1.6" strokeLinecap="round" />

          {/* --- torso / gi --- */}
          <path d="M53 65 L47 93 L85 93 L79 65 Z" fill="url(#gi)" />
          <path d="M66 65 L58 93 M66 65 L74 93" stroke="#98a0ad" strokeWidth="1.4" opacity=".65" />
          <rect x="49" y="85" width="34" height="5.5" rx="1.8" fill="#2f6fd0" />

          {/* --- brazo trasero (guardia) --- */}
          <path d="M56 71 L43 79 L51 88" stroke="#e6ebf2" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="51" cy="88" r="4.8" fill="#f2c9a0" />

          {/* --- brazo delantero + puño cerrado --- */}
          <g className="arm-front">
            <path d="M77 71 L95 76 L108 74" stroke="#e6ebf2" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g transform="translate(110,74)" style={{ transformOrigin: '0px 0px' }}>
            <g className="fist" style={{ transformOrigin: '-6px 0px' }}>
              {/* puño cerrado */}
              <rect x="-8" y="-6.5" width="14" height="13" rx="3.5" fill="#f2c9a0" />
              <rect x="2" y="-6" width="5.5" height="12" rx="2.6" fill="#e8b98c" />
              <path d="M-6 -2.5 h7 M-6 0.5 h7 M-6 3.5 h7" stroke="#c78f5d" strokeWidth="1.1" strokeLinecap="round" />
            </g>
          </g>

          {/* --- piernas / base --- */}
          <path d="M56 93 L47 116 L39 124" stroke="url(#gi)" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M76 93 L85 116 L96 122" stroke="url(#gi)" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* líneas de impacto del puño */}
        <g stroke="#2f6fd0" strokeWidth="3" strokeLinecap="round">
          <path className="hit-line" d="M124 64 L136 60" opacity="0" />
          <path className="hit-line" d="M126 72 L138 72" opacity="0" />
          <path className="hit-line" d="M124 80 L136 84" opacity="0" />
        </g>
      </svg>
    </div>
  );
}
