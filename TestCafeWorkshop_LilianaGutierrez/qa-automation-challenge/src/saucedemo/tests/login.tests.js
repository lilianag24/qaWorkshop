import LoginPage from '../pages/login.page.js';
import ProductsPage from '../pages/products.page.js'

const VALID_USER = 'standard_user';  
const INVALID_USER = 'invalid_user';
const PASSWORD = 'secret_sauce';

fixture('Login Tests').page('https://www.saucedemo.com/');

test('Login successful', async t => {
    await  t.maximizeWindow();
    await LoginPage.login(VALID_USER,PASSWORD);
    //Assertion
    await t.expect(await ProductsPage.isPageLoaded()).ok();
});

test("Invalid User", async t => {
    await LoginPage.login(INVALID_USER,PASSWORD);
    let currentErrorMsg = await LoginPage.getErrorMessage();
    await t.expect(currentErrorMsg).contains("Username and password do not match any user in this service");
});