import {Selector, t} from 'testcafe';

class FinishPage{

    constructor(){
        this.pageTitle = Selector('.subheader').withText("Finish");
        this.finishMsg = Selector('.complete-header').withText("THANK YOU FOR YOUR ORDER");
    }

    //Validate finish page is displayed
    async isPageLoaded(){
        return await this.pageTitle.exists && await this.finishMsg.exists; 
    }

}
export default new FinishPage();
