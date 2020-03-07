import {Selectro, t, Selector} from 'testcafe'

class ProductsPage{

    constructor(){
        this.pageTitle = Selector('.product_label').withExactText('Products');
        this.addToCartButton = Selector('.btn_primary').withExactText("ADD TO CART");
        this.shoppingCartIcon = Selector(".shopping_cart_link");
        this.itemsAddedIcon = Selector('#shopping_cart_container > a > span');
        this.removeButton = Selector('.btn_secondary').withExactText("REMOVE");  
        this.itemName = Selector('.inventory_item_name');
        this.menuButton = Selector('.bm-burger-button');    
        this.logoutLink = Selector('#logout_sidebar_link');
    }

    async isPageLoaded(){
        return await this.pageTitle.exists;
    }

    async navigateToCart(){
        await t.click(this.shoppingCartIcon);
    }

    async addItemToCart(items){
        for(let i=0; i<items; i++){
            await t.click(this.addToCartButton);
        }
    }

    async getTotalItemsAdded(){
        let totalItems = await this.itemsAddedIcon.textContent;
        return await totalItems; 

    }

    async logoutApp(){
        await t.click(this.menuButton)
            .click(this.logoutLink);
    }
}

export default new ProductsPage();