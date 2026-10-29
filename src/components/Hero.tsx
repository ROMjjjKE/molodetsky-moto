const PHONE = '+375 44 454-10-30';
const TEL = 'tel:+375444541030';

const FACTS = [
  ['ТО и ремонт', 'все классы'],
  ['Мотоподбор', 'с диагностикой'],
  ['Эвакуация', 'по Новогрудку и району'],
];

const CLASSES = ['спортбайк', 'стрит', 'эндуро', 'кросс', 'спорт-турист', 'турист', 'чоппер', 'мотард', 'стант'];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__plate micro">ИП Молодецкий Р. Н. · Гродненская обл., Новогрудок</div>
        <h1>Мотоцикл ломается не от пробега, а <i>от отношения</i></h1>
        <p className="lead hero__lead">
          Ремонт, ТО, тюнинг и подбор мотоцикла перед покупкой. Смотрю машину целиком, а не только узел,
          с которым приехали: так дешевле, чем возвращаться дважды.
        </p>
        <div className="hero__row">
          <div className="hero__cta">
            <a className="btn" href={TEL}>{PHONE}</a>
            <a className="link-lime" href="#zayavka">Записаться на осмотр</a>
          </div>
          <div className="hero__facts">
            {FACTS.map(([b, s]) => (
              <div className="hero__fact" key={b}>
                <b>{b}</b>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="band" aria-hidden="true">
        <div className="band__track">
          {[0, 1].map((k) => (
            <span key={k}>
              {CLASSES.map((c) => (
                <span key={c} style={{ padding: 0 }}>
                  {c} <i>·</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
