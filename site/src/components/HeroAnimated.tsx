import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

/**
 * Entrada animada del hero (estilo conteo de técnica) con Anime.js.
 * Respeta prefers-reduced-motion.
 */
export default function HeroAnimated() {
  const root = useRef<HTMLDivElement>(null);
  const wa = 'https://wa.me/5491131074612?text=Hola%20Gerardo%2C%20escribo%20desde%20la%20p%C3%A1gina%20y%20quiero%20consultar%20por%20las%20clases';

  useEffect(() => {
    if (!root.current) return;
    const items = root.current.querySelectorAll('[data-reveal]');
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduce) {
      items.forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
        (el as HTMLElement).style.filter = 'none';
      });
      return;
    }
    try {
      // estado inicial por JS: visible por defecto si JS/hydration falla
      items.forEach((el) => {
        const s = (el as HTMLElement).style;
        s.opacity = '0'; s.transform = 'translateY(26px) scale(0.98)'; s.filter = 'blur(6px)';
      });
      animate(items, {
        opacity: [0, 1],
        translateY: [26, 0],
        scale: [0.98, 1],
        filter: ['blur(6px)', 'blur(0px)'],
        delay: stagger(140, { start: 120 }),
        duration: 850,
        ease: 'outExpo',
      });
    } catch {
      // fallback: nunca dejar el contenido invisible
      items.forEach((el) => { (el as HTMLElement).style.opacity = '1'; });
    }
  }, []);

  return (
    <div ref={root}>
      <span className="eyebrow" data-reveal>Villa Lynch · San Martín</span>
      <h1 className="disp" data-reveal style={{ fontSize: 'clamp(38px,8vw,74px)', marginTop: 14, maxWidth: '15ch' }}>
        Taekwon-Do<br />para <em style={{ fontStyle: 'normal', color: 'var(--ac)' }}>chicos</em><br />y adultos
      </h1>
      <p className="lede" data-reveal>
        Escuela de Taekwon-Do ITF ATRA Sáenz Peña. Martes y jueves en la
        Sociedad de Fomento Dr. Figueroa Alcorta, Av. Rodríguez Peña 4754. Desde los 4 años,
        adolescentes y adultos. Se empieza sin saber nada y sin equipo.
      </p>
      <div className="cta" data-reveal>
        <a className="btn" href={wa} target="_blank" rel="noopener">Consultar por WhatsApp</a>
        <a className="btn s" href="#clases">Ver las clases</a>
      </div>
    </div>
  );
}
