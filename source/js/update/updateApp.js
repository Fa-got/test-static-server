import request from "request";
import fs from "fs";
import unzip from "unzip";
import EventEmmiter from "events";

class UpdateApp extends EventEmmiter {
	constructor() {
		super();
		// this.stores = options.stores;
		this.urlData = "http://localhost:2000/content/app.zip";
		this.path = "./public/c1/app.zip";
	}

	async init() {
		this.downloadZip();
		await this.extractZip();
		await this.deleteFile();
	}

	downloadZip() {
		this.rec = new request.get(this.urlData);
		this.rec
			.on("error", error => {
				console.log(`UpdateSelf => downloadZip -> rec: ${error}`);
			})
			.on("response", this.requestResponae.bind(this));
	}

	requestResponae(response) {
		const result = this.responseEvent(response);
		if (result) {
			console.log(`UpdateSelf -> downloadZip() -> download zip`);
			try {
				this.rec.pipe(fs.createWriteStream(this.path));
			} catch (err) {
				throw err;
			}

			this.emit("done");
		} else
			fs.unlink(this.path, error => {
				reject(error);
			});
	}

	async extractZip() {
		try {
			await fs
				.createReadStream(this.path)
				.pipe(unzip.Extract({ path: "./public/c1" }));
			console.log(`UpdateSelf -> extractZip() -> start unpack`);
		} catch (err) {
			throw err;
		}
	}

	async deleteFile() {
		fs.unlink(`public/c1/app.zip`, error => {
			console.log(`UpdateSelf => deleteFile`);
			if (error) console.log(`UpdateSelf => deleteFile ${error}`);
		});
	}

	responseEvent(response) {
		return response.statusCode === 200 && this.checkHeader(response.headers)
			? true
			: console.log(
					`UpdateSelf -> responseEvent() -> self update archive not found`
				);
	}

	checkHeader(headers) {
		const content = headers["content-type"];
		return content === "application/zip";
	}
}

export default UpdateApp;
