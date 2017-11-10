import crypto from 'crypto';

class Access{
    constructor(){
        this.time = 12345678;
        this.token();
    }

    token(){
        const solt = (this.time * 666 / 13).toFixed() * this.time;
        console.log(solt)

        const cipher = crypto.createCipher('aes128', solt.toString());
        console.log(cipher)
    }

}

export default Access;