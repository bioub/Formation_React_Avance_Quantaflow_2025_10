import test, { expect } from "@playwright/test";

test('login with wrong password shows error', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByLabel('Identifiant').fill('admin');
  await page.getByLabel('Mot de passe').fill('wrongpassword');
  await page.getByRole('button', { name: 'Valider' }).click();

  const errorMessage = page.getByText('Identifiant ou mot de passe incorrect.');
  await expect(errorMessage).toBeVisible();
});

test('login redirects to /pokemons when credentials are correct', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByLabel('Identifiant').fill('pikachu');
  await page.getByLabel('Mot de passe').fill('pikachu');
  await page.getByRole('button', { name: 'Valider' }).click();

  await expect(page).toHaveURL(/.*\/pokemons/);
});