import {Selector, t} from 'testcafe';

class UserInfoPage{
    constructor(){
        this.pageTitle = Selector('.subheader').withText("Checkout: Your Information");
        this.inputFirstName = Selector('#first-name');
        this.inputLastName = Selector('#last-name');
        this.inputZipCode = Selector('#postal-code');
        this.cancelButton = Selector('.cart_cancel_link');
        this.continueButton = Selector('.checkout_buttons > .btn_primary');
        this.errorMsg = Selector('[data-test="error"]');
    }

    //Validate page title
    async isPageLoaded(){
        return await this.pageTitle.exists;
    }

    //Return error message
    async getErrorMessage(){
        let errorMsg = await this.errorMsg.textContent;
        return await errorMsg;
    }

    //Enter FirstName
    async enterFirstName(firstName){
        await t.typeText(this.firstNameField, firstName);
    }

    //Enter LastName
    async enterLastName(lastName){
        await t.typeText(this.lastNameField, lastName);
    }

    //Enter ZipCode
    async enterZipCode(zipCode){
        await t.typeText(this.zipCodeField, zipCode);
    }

    //Click Continue button
    async clickContinue(){
        await t.click(this.continueButton);
    }

    //Enter all user Information
    async completeCheckOut(firstName, lastName, zipCode){
        await t.typeText(this.inputFirstName, firstName)
        .typeText(this.inputLastName, lastName)
        .typeText(this.inputZipCode,zipCode);
    }
}

export default new UserInfoPage();