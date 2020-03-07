import {Selector, t} from 'testcafe';

class LoginPage{

    constructor(){
        this.loginContainer = Selector('#login_button_container')
        this.inputUsername = Selector('#user-name');
        this.inputPassword = Selector('#password');
        this.loginButton = Selector('.btn_action');
        this.loginError = Selector('[data-test="error"]');
    }

    //Validate login page is displayed
    async isPageLoaded(){
        return await this.loginContainer.exists; 
    }

    //Login Process
    async login(username, password){
        await t.typeText(this.inputUsername,username)
            .typeText(this.inputPassword, password)
            .click(this.loginButton);
    }

    //Get error at Login page
    async getErrorMessage(){
        let errorMsg = await (await this.loginError.textContent);
        return await errorMsg; 
    }
}

export default new LoginPage();