import http from "http";
import express from "express";
import bodyParser from "body-parser";
import ConfigServer from "@/server.config.json";
import ApiController from "../api/apiController";
import UpdateApp from '../../update/updateApp';

class staticServer {
	constructor() {
		this.app = express();
		this.server = http.createServer(this.app);
		this.ip = ConfigServer.server.host;
		this.port = ConfigServer.server.port;
		this.api = new ApiController();

		this.testZip = new UpdateApp;
		this.testZip.on("done",)
		this.testZip.init();

	}

	init() {
		return new Promise((resolve, reject) => {
			this.start()
				.then(() => {
					this.initMiddleware();
					this.initView();
					this.initApi();
					this.initGetHandlers();
				})
				.then(resolve)
				.catch(reject);
		});
	}

	start() {
		return new Promise(resolve => {
			this.server.listen(this.port, this.ip, () => {
				global.console.log(
					`${new Date()} Server ${this.ip} is listening on port ${this.port}`
				);
				resolve();
			});
		});
	}

	initMiddleware() {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use((req, res, next) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Credentials", true);
			res.header("Access-Control-Allow-Methods", "GET, POST");
			res.header("Access-Control-Allow-Headers", "Cache-Control");
			next();
		});
	}

	initView() {
		this.app.use("/public", express.static(`public`));
	}
	initApi() {
		this.app.use("/api", this.api.router);
	}

	initGetHandlers() {
		this.app.get("/favicon.ico", (req, res) => res.sendStatus(204));
	}
}

export default staticServer;
