import LoginPage from '../pages/login.page.js'
import ShoppingCartPage from '../pages/shoppingCart.page.js'
import ProductsPage from '../pages/products.page.js'

const VALID_USER = 'standard_user';  
const PASSWORD = 'secret_sauce';


fixture('Login Tests').page('https://www.saucedemo.com/')
    .beforeEach(async t => {
        await  t.maximizeWindow();
        await LoginPage.login(VALID_USER,PASSWORD);
        //Assertion
        await t.expect(await ProductsPage.isPageLoaded()).ok();
    })

test('Navigate to Shopping Cart Page', async t => {
    await ProductsPage.navigateToCart();
    //Assertion
    await t.expect(await ShoppingCartPage.isPageLoaded()).ok();
});

test('Add single item to shopping cart', async t => {
    await ProductsPage.addItemToCart(1);
    let totalItems = await ProductsPage.getTotalItemsAdded();
    //Assertion 
    await t.expect(totalItems).eql("1");
})

test('Add multiple items to shopping cart', async t => {
    await ProductsPage.addItemToCart(3);
    let totalItems = await ProductsPage.getTotalItemsAdded();
    //Assertion 
    await t.expect(totalItems).eql("3");
})
