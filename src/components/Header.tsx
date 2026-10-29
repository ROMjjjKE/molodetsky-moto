import { useEffect, useRef } from 'react';

const PHONE = '+375 44 454-10-30';
const TEL = 'tel:+375444541030';

export default function Header() {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="hdr">
      <div className="wrap hdr__in">
        <a className="hdr__brand" href="#top" aria-label="Молодецкий, мотосервис, в начало страницы">
          <span className="hdr__mark" aria-hidden="true" />
          <span className="hdr__name">Молодецкий</span>
          <span className="hdr__city">мото · Новогрудок</span>
        </a>
        <nav className="hdr__nav" aria-label="Разделы">
          <a href="#napravleniya">Работы</a>
          <a href="#defektovka">Проверка</a>
          <a href="#podbor">Мотоподбор</a>
          <a href="#zayavka">Записаться</a>
        </nav>
        <a className="hdr__tel" href={TEL}>{PHONE}</a>
      </div>
      <span className="hdr__bar" ref={bar} aria-hidden="true" />
    </header>
  );
}
