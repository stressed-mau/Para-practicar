import { test, expect } from '@playwright/test';

test('flujo de compra exitoso', async ({ page }) => {

  // 1. Ir a la página
  await page.goto('https://www.saucedemo.com/');

  // 2. Login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 3. Validar login
  await expect(page).toHaveURL(/inventory/);

  // 4. Agregar producto
  await page.click('text=Add to cart');

  // 5. Ir al carrito
  await page.click('.shopping_cart_link');

  // 6. Validar que hay producto
  await expect(page.locator('.inventory_item_name')).toBeVisible();

  // 7. Checkout
  await page.click('#checkout');

  await page.fill('#first-name', 'Juan');
  await page.fill('#last-name', 'Perez');
  await page.fill('#postal-code', '12345');

  await page.click('#continue');

  // 8. Finalizar compra
  await page.click('#finish');

  // 9. Validación final
  await expect(page.locator('.complete-header'))
    .toHaveText('Thank you for your order!');
});