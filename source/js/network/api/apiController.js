import { exec } from "child_process";
import { Router } from "express";
import playerConfig from "@/player.config.json";

class ApiController {
	constructor() {
		this.router = new Router();
		this.initRouter();
	}

	initRouter() {
        // api-reboot
		this.router.post("/reboot", (req, res) => {
			console.log(req.body);
			// this.apiHandler(req.body, res)
			ApiController.reboot();
		});

		// api-refresh
		this.router.post("/refresh", (req, res) => {
			ApiController.refresh();
		});

		// api-config
		this.router.get("/config", (req, res) => {
			ApiController.config();
			res.send(ApiController.config());
		});
	}

	static config() {
		return playerConfig.player;
	}

	static reboot() {
		console.log("reboot");
		// exec("shutdown -r", () => {});
	}

	static refresh() {
		console.log("refresh");
		// this.browser.refresh()
	}
}

export default ApiController;
