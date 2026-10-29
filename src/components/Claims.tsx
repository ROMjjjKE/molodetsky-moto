const ITEMS = [
  {
    n: 'позиция 01',
    h: 'Иногда лучший результат — «не покупай»',
    p: 'Если мотоцикл требует работ дороже, чем стоит разница в цене с другим вариантом, я говорю прямо. Отказаться от сделки — нормальный финал подбора.',
  },
  {
    n: 'позиция 02',
    h: 'Тюнинг — это не только звук',
    p: 'Выхлоп без настройки часто добавляет проблем, а не мощности. Сначала подвеска под ваш вес и нормальные тормоза, потом всё остальное.',
  },
  {
    n: 'позиция 03',
    h: 'Гарантия — это когда есть кто-то конкретный',
    p: 'Не «сервис с гарантией», а человек, который помнит, что делал с вашим мотоциклом, и отвечает за работу лично.',
  },
];

export default function Claims() {
  return (
    <section className="section" id="pozicii">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num micro">06 / позиции</div>
          <h2 className="shead__title reveal">Во что я верю в этой работе</h2>
          <p className="shead__note reveal">
            Три вещи, которые отличают мотосервис от «заменим масло и до свидания».
          </p>
        </div>
        <div className="claims" style={{ marginTop: 'clamp(20px, 2.6vw, 36px)' }}>
          {ITEMS.map((it) => (
            <article className="claim reveal" key={it.n}>
              <div>
                <span className="claim__n">{it.n}</span>
              </div>
              <div>
                <h3>{it.h}</h3>
                <p style={{ marginTop: 10 }}>{it.p}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
