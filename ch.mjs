import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4250/molodetsky-moto/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
console.log(await p.evaluate(() => {
  const c = document.createElement('canvas').getContext('2d');
  const m = (f, s) => { c.font = f; return +c.measureText(s).width.toFixed(2); };
  const zero = s => m('400 100px ' + s, '0000000000') / 10;
  return {
    days0: zero('"Days One"'), arial0: zero('Arial'), black0: zero('"Arial Black"'),
    chRatio: +(zero('"Days One"') / zero('Arial')).toFixed(4),
    lines: document.querySelector('h1').getClientRects().length,
    h1h: Math.round(document.querySelector('h1').getBoundingClientRect().height),
  };
}));
await b.close();
