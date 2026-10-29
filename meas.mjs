import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4250/molodetsky-moto/', { waitUntil: 'networkidle2' });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
const pre = await p.evaluate(() => Math.round(document.querySelector('#defektovka').getBoundingClientRect().top + window.scrollY));
await p.evaluate(y => window.scrollTo({ top: y - 520, behavior: 'instant' }), pre);
await new Promise(r => setTimeout(r, 1100));
const stage = await p.evaluate(() => Math.round(document.querySelector('.check__stage').getBoundingClientRect().top + window.scrollY));
await p.evaluate(y => window.scrollTo({ top: y + 900, behavior: 'instant' }), stage);
await new Promise(r => setTimeout(r, 800));
console.log(await p.evaluate(() => {
  const r = s => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return { top: Math.round(b.top), h: Math.round(b.height) }; };
  return {
    stage: r('.check__stage'), wrap: r('.check__stage .wrap'), grid: r('.check__grid'),
    lead: r('.check__lead'), items: r('.items'), detail: r('.detail'),
    itemH: Math.round(document.querySelector('.item').getBoundingClientRect().height),
  };
}));
await b.close();
