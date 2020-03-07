import LoginPage from '../pages/login.page.js'
import ShoppingCartPage from '../pages/shoppingCart.page.js'
import ProductsPage from '../pages/products.page.js'
import UserInfoPage from '../pages/userInfo.page.js'
import OverviewPage from '../pages/overview.page.js'

const VALID_USER = 'standard_user';  
const PASSWORD = 'secret_sauce';
const FIRST_NAME = 'TestName';
const LAST_NAME = 'LastName';
const ZIP_CODE = '12345';


fixture('Login Tests').page('https://www.saucedemo.com/')
    .beforeEach(async t => {
        await  t.maximizeWindow();

        //Login
        await LoginPage.login(VALID_USER,PASSWORD);
        await t.expect(await ProductsPage.isPageLoaded()).ok();

        //Add item to cart
        await ProductsPage.addItemToCart(1);
        let totalItems = await ProductsPage.getTotalItemsAdded(); 
        await t.expect(totalItems).eql("1");

        //Navigate to Cart page
        await ProductsPage.navigateToCart();
        await t.expect(await ShoppingCartPage.isPageLoaded()).ok();

        //Navigate to User Information page
        await ShoppingCartPage.checkoutItems();
        await t.expect(await UserInfoPage.isPageLoaded()).ok();  
    })


test("Continue with missing user information" , async t => {
    await UserInfoPage.clickContinue();
    let currentErrorMsg = await UserInfoPage.getErrorMessage();
    await t.expect(currentErrorMsg).contains("Error: First Name is required");
});


test("Complete User information" , async t => {  
    await UserInfoPage.completeCheckOut(FIRST_NAME, LAST_NAME, ZIP_CODE);
    await UserInfoPage.clickContinue();
    await t.expect(await OverviewPage.isPageLoaded()).ok();
});


