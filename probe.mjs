import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
p.on('console', m => { if (m.type() === 'error') errs.push('c:' + m.text().slice(0, 120)); });
await p.setViewport({ width: 1440, height: 900 });
await p.evaluateOnNewDocument(() => {
  window.__s = [];
  new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__s.push(+e.value.toFixed(4)); }).observe({ type: 'layout-shift', buffered: true });
});
await p.goto('http://127.0.0.1:4250/molodetsky-moto/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 900));
console.log(JSON.stringify(await p.evaluate(() => {
  const c = document.createElement('canvas').getContext('2d');
  const s = 'Мотоцикл ломается не от пробега, а от отношения';
  const w = f => { c.font = f; return +c.measureText(s).width.toFixed(1); };
  return {
    days: w('400 40px "Days One"'), black: w('400 40px "Arial Black"'), arialb: w('700 40px Arial'),
    plex: w('400 40px "IBM Plex Sans"'), arial: w('400 40px Arial'),
    ratioDays: +(w('400 40px "Days One"') / w('400 40px "Arial Black"')).toFixed(4),
    ratioPlex: +(w('400 40px "IBM Plex Sans"') / w('400 40px Arial')).toFixed(4),
    h1: document.querySelector('h1').innerText, cls: +window.__s.reduce((a, b) => a + b, 0).toFixed(4),
    fonts: [...document.fonts].filter(f => f.status === 'loaded').length,
  };
}), null, 1), errs.slice(0, 3));
await b.close();
