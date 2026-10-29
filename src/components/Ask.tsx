import { useState } from 'react';

const WHAT = ['ТО / плановое обслуживание', 'Ремонт', 'Тюнинг', 'Мотоподбор', 'Обучение вождению', 'Эвакуация'];
const MOTO = ['Спортбайк', 'Стрит', 'Эндуро', 'Кросс', 'Турист', 'Чоппер', 'Другое'];
const PHONE = '+375 44 454-10-30';
const TEL = 'tel:+375444541030';

export default function Ask() {
  const [f, setF] = useState({ name: '', tel: '', what: WHAT[0], moto: MOTO[0], city: '', note: '' });
  const [bad, setBad] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (f.name.trim().length < 2) errs.name = true;
    if (f.tel.replace(/\D/g, '').length < 9) errs.tel = true;
    setBad(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    const lines = [
      'Заявка с сайта: мотосервис (ИП Молодецкий)',
      `Имя: ${f.name}`,
      `Телефон: ${f.tel}`,
      `Нужно: ${f.what}`,
      `Мотоцикл: ${f.moto}`,
      `Город: ${f.city || '—'}`,
      `Детали: ${f.note || '—'}`,
    ].join('\n');

    window.setTimeout(() => {
      window.open(`https://wa.me/375444541030?text=${encodeURIComponent(lines)}`, '_blank', 'noopener');
      setSending(false);
      setSent(true);
    }, 400);
  };

  return (
    <section className="ask" id="zayavka">
      <div className="wrap" style={{ paddingBlock: 'var(--sect)' }}>
        <div className="cols shead" style={{ marginBottom: 'clamp(20px, 3vw, 40px)' }}>
          <div className="shead__num micro">08 / заявка</div>
          <h2 className="shead__title reveal">Записаться или спросить</h2>
          <p className="shead__note reveal" style={{ color: 'var(--ink-2)' }}>
            Позвоните или оставьте номер: перезвоню, скажу по работе и по времени.
          </p>
        </div>

        <div className="ask__grid">
          <div>
            <div className="micro">Телефон</div>
            <a className="ask__phone" href={TEL}>{PHONE}</a>
            <p className="ask__hint">
              Если не отвечаю — значит под мотоциклом. Напишите в WhatsApp или оставьте заявку,
              перезвоню.
            </p>
          </div>

          <form className="form" onSubmit={submit} noValidate>
            <div className="half">
              <div className={bad.name ? 'bad' : ''}>
                <label htmlFor="m-name">Имя</label>
                <input id="m-name" value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" aria-invalid={!!bad.name} />
                {bad.name && <span className="err">Как к вам обращаться</span>}
              </div>
              <div className={bad.tel ? 'bad' : ''}>
                <label htmlFor="m-tel">Телефон</label>
                <input id="m-tel" value={f.tel} onChange={(e) => set('tel', e.target.value)} inputMode="tel" autoComplete="tel" aria-invalid={!!bad.tel} />
                {bad.tel && <span className="err">Нужен номер для связи</span>}
              </div>
            </div>

            <div className="half">
              <div>
                <label htmlFor="m-what">Что нужно</label>
                <select id="m-what" value={f.what} onChange={(e) => set('what', e.target.value)}>
                  {WHAT.map((w) => <option key={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="m-moto">Мотоцикл</label>
                <select id="m-moto" value={f.moto} onChange={(e) => set('moto', e.target.value)}>
                  {MOTO.map((w) => <option key={w}>{w}</option>)}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="m-city">Город или район</label>
              <input id="m-city" value={f.city} onChange={(e) => set('city', e.target.value)} placeholder="Новогрудок, Кореличи, Дятлово…" />
            </div>

            <div className="field">
              <label htmlFor="m-note">Что случилось</label>
              <textarea id="m-note" rows={3} value={f.note} onChange={(e) => set('note', e.target.value)} placeholder="Например: Yamaha MT-07, стук на прогреве, нужна диагностика" />
            </div>

            <button className="btn" type="submit" disabled={sending}>
              {sending ? 'Собираем заявку…' : 'Отправить в WhatsApp'}
            </button>

            {sent && (
              <div className="ask__ok" role="status">
                Заявка собрана и открыта в WhatsApp — осталось нажать «Отправить». Если окно не
                открылось, позвоните: <a href={TEL} style={{ borderBottom: '1px solid currentColor' }}>{PHONE}</a>.
              </div>
            )}

            <p className="ask__fine">
              Стоимость работы и запчастей называю после осмотра: по телефону видно только то, что вы
              сказали, а не то, что внутри.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
