import { exec } from "child_process";
// import Electron from "electron.Config.js"


class ApiController {
    constructor(){
        // this.browser = new Electron()
    }

    static config(){

    }

    static reboot(){
        console.log('reboot')
        // exec("shutdown -r", () => {});
    }

    static refresh(){
        console.log("refresh")
        // this.browser.refresh()
    }
}

export default ApiController;