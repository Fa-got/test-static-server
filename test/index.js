import express from "express";
import http from "http";
import fetch from "isomorphic-fetch";
import crypto from "crypto";
require("es6-promise").polyfill();
import Config from "@/server.config.json";

class TestRequest {
	constructor() {
		this.app = express();
		this.server = http.createServer(this.app);
		this.id = 999;
		this.ip = "127.0.0.1";
		this.port = 2000;
		this.url = "http://localhost:3000/api/reboot";
		console.log(Config);
		this.init();
	}

	init() {
		return new Promise((resolve, reject) => {
			this.start()
				.then(() => {
					this.initMiddleware();
					// this.initRequest()
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
					`Server ${this.ip} is listening on port ${this.port}`
				);
				resolve();
			});
		});
	}

	// encode(){
	// 	let algorithm = 'aes-256-ctr'
	// 	encrypt(text){
	//  		var cipher = crypto.createCipher(algorithm,password)
	//  		var crypted = cipher.update(text,'utf8','hex')
	//  		crypted += cipher.final('hex');
	//  		return crypted;
	// }

	initRequest() {
		let data = {
			module: {
				id: this.id,
				ip: this.ip
			}
		};

		fetch(this.url, {
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			method: "post",
			body: JSON.stringify(data)
		})
			.then(data => {
				console.log(`${JSON.stringify(data.statusText)} success`);
			})
			.catch(error => {
				console.log("Request failed", error);
			});
	}

	initMiddleware() {
		this.app.use((req, res, next) => {
			res.header("Access-Control-Allow-Credentials", true);
			res.header("Access-Control-Allow-Methods", "GET, POST");
			res.header("Access-Control-Allow-Headers", "Cache-Control");
			next();
		});
	}

	initGetHandlers() {
		this.app.get("/favicon.ico", (req, res) => res.sendStatus(204));
	}
}

export default TestRequest;

new TestRequest();
