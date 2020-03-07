import LoginPage from '../pages/login.page.js'
import ShoppingCartPage from '../pages/shoppingCart.page.js'
import ProductsPage from '../pages/products.page.js'
import UserInfoPage from '../pages/userInfo.page.js'
import OverviewPage from '../pages/overview.page.js'
import FinishPage from '../pages/finish.page.js'

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
    })

    test("Validate Items at Overview page", async t => {
        //get Item Name displayed at Your Cart
        let itemInShoppingCart = await ShoppingCartPage.getItemName();
        await ShoppingCartPage.checkoutItems();
        //Assert Your Information page is displayed
        await t.expect(await UserInfoPage.isPageLoaded()).ok();  
        await UserInfoPage.completeCheckOut(FIRST_NAME, LAST_NAME, ZIP_CODE);
        await UserInfoPage.clickContinue();
        //Assert Overview page is displayed
        await t.expect(await OverviewPage.isPageLoaded()).ok();
        //Get item Name displayed at Overview page
        let itemOverview = await OverviewPage.getItemName();
        //Compare items names displayed in Your Cart and Overview pages
        await t.expect(itemInShoppingCart).eql(itemOverview);
    });

    test("Complete Order", async t => {
        await ShoppingCartPage.checkoutItems();
        //Assert Your Information page is displayed
        await t.expect(await UserInfoPage.isPageLoaded()).ok();  
        await UserInfoPage.completeCheckOut(FIRST_NAME, LAST_NAME, ZIP_CODE);
        await UserInfoPage.clickContinue();
        //Assert Overview page is displayed
        await t.expect(await OverviewPage.isPageLoaded()).ok();
        await OverviewPage.completePurchase();
        //Assert Finish page is displayed
        await t.expect(await FinishPage.isPageLoaded()).ok();
    });