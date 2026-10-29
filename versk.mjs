import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
for (const w of [320, 390, 480, 768, 1024, 1200, 1440, 1680]) {
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.setViewport({ width: w, height: 860 });
  await p.goto('http://127.0.0.1:4250/molodetsky-moto/', { waitUntil: 'networkidle2' });
  await p.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 400));
  const st = await p.evaluate(() => {
    const over = [];
    document.querySelectorAll('*').forEach(el => { const r = el.getBoundingClientRect(); if (r.right > window.innerWidth + 1 && r.width > 0) over.push(el.tagName + '.' + (typeof el.className === 'string' ? el.className.split(' ')[0] : '')); });
    return { sw: document.documentElement.scrollWidth, inner: window.innerWidth, over: [...new Set(over)].slice(0, 3), h1: getComputedStyle(document.querySelector('h1')).fontSize };
  });
  console.log(String(w).padStart(4), st.sw > st.inner ? 'OVERFLOW ' + st.over.join(',') : 'ok', st.h1, errs[0] || '');
  await p.close();
}
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4250/molodetsky-moto/', { waitUntil: 'networkidle2' });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
const pre = await p.evaluate(() => Math.round(document.querySelector('#defektovka').getBoundingClientRect().top + window.scrollY));
await p.evaluate(y => window.scrollTo({ top: y - 520, behavior: 'instant' }), pre);
await new Promise(r => setTimeout(r, 1200));
const stage = await p.evaluate(() => Math.round(document.querySelector('.check__stage').getBoundingClientRect().top + window.scrollY));
for (const off of [60, 700, 1300, 1900]) {
  await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), stage + off);
  await new Promise(r => setTimeout(r, 700));
  console.log(off, await p.evaluate(() => ({
    cls: document.querySelector('.check').className,
    y: Math.round(document.querySelector('.check__stage').getBoundingClientRect().top),
    on: document.querySelector('.item.on .item__t')?.innerText || '—',
    count: document.querySelector('.check__count').innerText.replace(/\s+/g, ' '),
  })));
}
await b.close();
