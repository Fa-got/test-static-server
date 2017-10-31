
import staticServer from "./staticServer";

class ServerController {
	constructor() {
		this.static = new staticServer();
	}

	init() {
		return new Promise((resolve, reject) => {
			this.initServer().then(resolve).catch(err => {
				reject(err);
			});
		});
	}

	initServer() {
		return new Promise((resolve, reject) => {
			this.static.init().then(resolve).catch(reject);
		});
	}
}

export default ServerController;
