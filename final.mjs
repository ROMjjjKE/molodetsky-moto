import puppeteer from 'puppeteer-core';
const URL = 'https://romjjjke.github.io/molodetsky-moto/';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
await p.setViewport({ width: 1440, height: 900 });
await p.goto(URL, { waitUntil: 'networkidle2' });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1000));
await p.screenshot({ path: 'screenshots/desktop-1440.png' });

const jump = async (sel, off) => {
  await p.evaluate((s, o) => { const el = document.querySelector(s); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - o, behavior: 'instant' }); }, sel, off);
  await new Promise(r => setTimeout(r, 800));
};
await jump('#napravleniya', 80);
await p.screenshot({ path: 'screenshots/desktop-raboty.png' });

await jump('#defektovka', 520);
await new Promise(r => setTimeout(r, 900));
const stage = await p.evaluate(() => Math.round(document.querySelector('.check__stage').getBoundingClientRect().top + window.scrollY));
await p.evaluate(y => window.scrollTo({ top: y + 1250, behavior: 'instant' }), stage);
await new Promise(r => setTimeout(r, 900));
console.log('check', await p.evaluate(() => ({ cls: document.querySelector('.check').className, on: document.querySelector('.item.on .item__t')?.innerText, n: document.querySelector('.check__count').innerText.replace(/\s+/g, ' ') })));
await p.screenshot({ path: 'screenshots/desktop-defektovka.png' });

await jump('#klassy', 80);
await p.screenshot({ path: 'screenshots/desktop-klassy.png' });
await jump('#podbor', 80);
await p.screenshot({ path: 'screenshots/desktop-podbor.png' });
await jump('#pozicii', 80);
await p.screenshot({ path: 'screenshots/desktop-pozicii.png' });
await jump('#zayavka', 70);
await p.screenshot({ path: 'screenshots/desktop-zayavka.png' });
await p.close();

const m = await b.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto(URL, { waitUntil: 'networkidle2' });
await m.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await m.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1000));
await m.screenshot({ path: 'screenshots/mobile-390.png' });
const mj = async (sel, off) => {
  await m.evaluate((s, o) => { const el = document.querySelector(s); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - o, behavior: 'instant' }); }, sel, off);
  await new Promise(r => setTimeout(r, 700));
};
await mj('#defektovka', -60);
await m.screenshot({ path: 'screenshots/mobile-390-defektovka.png' });
await mj('#zayavka', 60);
await m.screenshot({ path: 'screenshots/mobile-390-zayavka.png' });
await m.close();
await b.close();
console.log('shots ok, errors:', errs.slice(0, 2));
