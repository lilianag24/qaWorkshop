import {Selector, t} from 'testcafe';

class OverviewPage{
    constructor(){
        this.pageTitle = Selector('.subheader').withText("Checkout: Overview");
        this.finishButton = Selector('a.btn_action.cart_button').withText("FINISH");
        this.cancelButton = Selector('.cart_cancel_link');
        this.itemName = Selector('.inventory_item_name');
    }

    //Validate page title
    async isPageLoaded(){
        return await this.pageTitle.exists;
    }

    //Click Finish Button
    async completePurchase(){
        await t.click(this.finishButton);
    }

    async getItemName(){
        let itemName = await this.itemName.textContent;
        return itemName; 
    }
}

export default new OverviewPage();