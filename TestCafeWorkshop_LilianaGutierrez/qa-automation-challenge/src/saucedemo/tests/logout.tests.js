import LoginPage from '../pages/login.page.js';
import ProductsPage from '../pages/products.page.js';

const VALID_USER = 'standard_user';  
const PASSWORD = 'secret_sauce';

fixture('Login Tests').page('https://www.saucedemo.com/')
    .beforeEach(async t => {
        await  t.maximizeWindow();
        await LoginPage.login(VALID_USER,PASSWORD);
        //Assertion
        await t.expect(await ProductsPage.isPageLoaded()).ok();
     })

     test("Successful Logout", async t=> {
        await ProductsPage.logoutApp();
        //Assert login page is displayed
        await t.expect(await LoginPage.isPageLoaded()).ok();
    });
