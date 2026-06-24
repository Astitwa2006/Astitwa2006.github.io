const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const projects = [
    { name: 'SCT_WD_1', url: 'https://sct-wd-1-otg0ke0rd-astitwa-s-projects.vercel.app/' },
    { name: 'SCT_WD_2', url: 'https://sct-wd-2-wl08nzntw-astitwa-s-projects.vercel.app/' },
    { name: 'SCT_WD_3', url: 'https://sct-wd-3-rju0speaw-astitwa-s-projects.vercel.app/' },
    { name: 'SCT_WD_4', url: 'https://sct-wd-4-7qdz3bhcm-astitwa-s-projects.vercel.app/' }
  ];

  for (const proj of projects) {
    console.log(`Taking screenshot of ${proj.name}...`);
    await page.goto(proj.url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: `/Users/astitwa/.gemini/antigravity/brain/0bb97ddb-fa8c-42c6-ad4a-dd550a91d716/${proj.name}_screenshot.png`, fullPage: false });
    console.log(`Saved ${proj.name}_screenshot.png`);
  }

  await browser.close();
})();
