import {Selectro, t, Selector} from 'testcafe'

class ShoppingCartPage {

    constructor(){
        this.pageTitle = Selector('.subheader').withExactText("Your Cart");
        this.removeButton = Selector('.btn_secondary');
        this.checkoutButton = Selector('.checkout_button');
        this.itemName = Selector('.inventory_item_name');
    }

    async isPageLoaded(){
        return await this.pageTitle.exists;
    }

    async checkoutItems(){
        await t.click(this.checkoutButton);
    }

    async getItemName(){
        let itemName = await this.itemName.textContent;
        return itemName; 
    }

}

export default new ShoppingCartPage();