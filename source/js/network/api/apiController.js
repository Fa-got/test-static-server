import { exec } from "child_process";
import { Router } from "express";
import playerConfig from "@/player.config.json";
import TakeScreenshot from "../../electron/TakeScreenshot";

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
		this.router.post("/config", (req, res) => {
			res.send(ApiController.config());
		});

		// api-screenShot
		this.router.post("/screenShot", (req, res) => {
			res.send(ApiController.screenShot());
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
	static screenShot() {
		console.log("buffer");
		return TakeScreenshot.takeScreanShot();
	}
}

export default ApiController;
