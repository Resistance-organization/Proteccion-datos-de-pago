const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:5183', { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.mouse.wheel(0, 5000);
  await page.waitForTimeout(500);
  const input = page.locator('input[placeholder]').first();
  if (await input.count()) {
    await input.fill('mis cuentas');
    await page.locator('button:has-text("Guardar y continuar")').click();
    await page.waitForTimeout(500);
  }
  await page.waitForTimeout(600);
  await page.locator('button:has-text("Siguiente módulo")').click();
  await page.waitForTimeout(800);

  // Identidad digital infographic (not casos reales, should use default 900px now)
  const infId = page.locator('text=identidad digital').first();
  if (await infId.count()) {
    await infId.scrollIntoViewIfNeeded();
  } else {
    await page.mouse.wheel(0, 1500);
  }
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:\\Users\\PAULAV~1\\AppData\\Local\\Temp\\claude\\p5_infographic.png' });

  await browser.close();
})();
