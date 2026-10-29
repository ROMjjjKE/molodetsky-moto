const STEPS = [
  ['Заявка', 'Рассказываете, что ищете и какой бюджет. Если задача нереальна за эти деньги — говорю сразу.'],
  ['Поиск', 'Смотрю объявления и площадки, отсеиваю то, что не стоит выезда. Варианты присылаю вам.'],
  ['Выезд и диагностика', 'Осмотр на месте по восьми пунктам: от холодного пуска до сверки номеров.'],
  ['Торг с продавцом', 'Называю продавцу реальную цену с учётом найденных работ и торгуюсь от неё.'],
  ['Сделка', 'Помогаю с документами и передачей денег, чтобы сделка не превратилась в сюрприз.'],
  ['Доставка или эвакуация', 'Забираю мотоцикл и привожу в Новогрудок — своим транспортом.'],
];

export default function Select() {
  return (
    <section className="section" id="podbor">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num micro">05 / подбор</div>
          <h2 className="shead__title reveal">Мотоподбор: как это устроено</h2>
          <p className="shead__note reveal">
            Вы платите не за «посмотреть», а за то, что кто-то, кто разбирается, отговорит вас от
            проблемного мотоцикла.
          </p>
        </div>
        <ol className="steps reveal" style={{ marginTop: 'clamp(18px, 2.4vw, 32px)' }}>
          {STEPS.map(([t, d], i) => (
            <li key={t}>
              <span className="steps__n num">{String(i + 1).padStart(2, '0')}</span>
              <span className="steps__t">{t}</span>
              <span className="steps__d">{d}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
