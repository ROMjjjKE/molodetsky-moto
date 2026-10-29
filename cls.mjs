import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.evaluateOnNewDocument(() => {
  window.__shifts = [];
  new PerformanceObserver(l => {
    for (const e of l.getEntries()) {
      if (e.hadRecentInput) continue;
      window.__shifts.push({
        v: +e.value.toFixed(4),
        t: Math.round(e.startTime),
        src: e.sources.map(s => (s.node ? (s.node.className || s.node.nodeName) : '?') + '|' + Math.round(s.previousRect.y) + '->' + Math.round(s.currentRect.y)).slice(0, 3),
      });
    }
  }).observe({ type: 'layout-shift', buffered: true });
});
await p.goto('http://127.0.0.1:4250/molodetsky-moto/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1200));
console.log(JSON.stringify(await p.evaluate(() => window.__shifts), null, 1));
await b.close();
