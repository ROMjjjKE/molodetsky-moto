import { useEffect, useRef, useState } from 'react';

const POINTS = [
  {
    t: 'Сервисная история',
    d: 'Когда и что менялось, сколько денег стоило владельцу. Отметок может не быть — тогда считаем по худшему варианту.',
  },
  {
    t: 'Цепь и звёзды',
    d: 'Растянутая цепь и «пила» на зубьях: комплект меняется целиком, и это не копейки в общем бюджете покупки.',
  },
  {
    t: 'Тормоза',
    d: 'Толщина дисков, износ колодок, состояние шлангов и свободный ход рычага. Тормоза не ремонтируют «потом».',
  },
  {
    t: 'Вилка и рулевая',
    d: 'Потёки на сальниках, люфт подшипников и то, как амортизатор отрабатывает под весом райдера.',
  },
  {
    t: 'Холодный пуск',
    d: 'Как заводится на холодную, есть ли стук на прогреве и посторонние звуки на холостых оборотах.',
  },
  {
    t: 'Следы падений',
    d: 'Смещённые клипоны и подножки, потёртости на раме, разная резина по сторонам — обычно признак укладки.',
  },
  {
    t: 'Резина и диски',
    d: 'Возраст важнее протектора: год выпуска нанесён на боковине. Биение дисков проверяем на подъёмнике.',
  },
  {
    t: 'Документы и номера',
    d: 'Сверка номеров рамы и двигателя с документами. Без этого остальные пункты не имеют значения.',
  },
];

export default function Check() {
  const [pin, setPin] = useState(false);
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 980px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!desktop.matches || calm.matches) return;

    let killed = false;
    let cleanup: (() => void) | null = null;
    let timer: number | undefined;

    const begin = () =>
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
        if (killed || !stageRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        setPin(true);

        requestAnimationFrame(() => requestAnimationFrame(() => {
          const stage = stageRef.current;
          if (killed || !stage) return;
          const trigger = ScrollTrigger.create({
            trigger: stage,
            start: 'top top',
            end: () => '+=' + Math.round(window.innerHeight * 2.1),
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(POINTS.length - 1, Math.floor(self.progress * POINTS.length));
              setActive((prev) => (prev === i ? prev : i));
            },
          });
          ScrollTrigger.refresh();
          cleanup = () => trigger.kill();
        }));
      });

    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        timer = window.setTimeout(begin, 80);
      }
    }, { rootMargin: '320px 0px' });
    if (stageRef.current) io.observe(stageRef.current);

    return () => {
      killed = true;
      io.disconnect();
      if (timer) clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, []);

  const seen = (i: number) => !pin || i <= active;

  return (
    <section className={`section check ${pin ? 'check--pin' : 'check--manual'}`} id="defektovka">
      <div className="wrap check__head">
        <div className="cols shead">
          <div className="shead__num micro">03 / проверка</div>
          <h2 className="shead__title reveal">Восемь пунктов перед покупкой</h2>
          <p className="shead__note reveal">
            Так проходит осмотр при мотоподборе. Прокрутите страницу: пункты открываются по одному.
          </p>
        </div>
      </div>

      <div className="check__stage" ref={stageRef}>
        <div className="wrap">
          <div className="check__grid">
            <div className="check__lead">
              <div className="micro">{pin ? 'смотрим по порядку' : 'полный список'}</div>
              <h3>Дефектовка</h3>
              <p>
                После такого прохода у вас на руках список работ и цена, которую продавец не назвал в
                объявлении. Иногда вывод — «не брать», и это тоже результат.
              </p>
              <div className="check__count num">
                {String(active + 1).padStart(2, '0')}
                <small>/ 08</small>
              </div>
            </div>

            <div className="check__list">
              <div className="items">
                {POINTS.map((p, i) => (
                  <div className={`item ${i === active && pin ? 'on' : ''} ${seen(i) ? 'done' : ''}`} key={p.t}>
                    <span className="item__n num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="item__t">{p.t}</span>
                    <span className="item__m" aria-hidden="true">{seen(i) ? '✓' : ''}</span>
                    <span className="item__d">{p.d}</span>
                  </div>
                ))}
              </div>
              <div className="detail" aria-live={pin ? 'polite' : 'off'}>
                <span className="detail__n num">{String(active + 1).padStart(2, '0')} · что это может скрывать</span>
                <p>{POINTS[active].d}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
