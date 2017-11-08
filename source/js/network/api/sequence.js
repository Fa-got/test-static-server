import crypto from "crypto";

class Access {
	constructor() {
		this.time = 12345678;
		this.token();
	}

	token() {
		const solt = (this.time * 666 / 13).toFixed() * this.time;
		console.log(solt);

		const cipher = crypto.createCipher("aes128", solt.toString());
		// const hash = crypto.createHmac('sha256', solt.toString())
		//     .update('Token')
		//     .digest('hex');
		console.log(cipher);
	}
}

export default Access;
