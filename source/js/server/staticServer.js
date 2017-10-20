import http from "http";
import express from "express";
import path from "path";
// import Config from "@/config.json";
import fs from "fs";

class staticServer {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.ip = "localhost";
        this.port = 3000;
        this.folder = `c1`
    }

    init() {
        return new Promise((resolve, reject) => {
            this.start()
                .then(() => {
                    this.initMiddleware();
                    this.initView();
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
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Credentials", true);
            res.header("Access-Control-Allow-Methods", "GET, POST");
            res.header("Access-Control-Allow-Headers", "Cache-Control");
            next();
        });
    }

    initView() {
        this.app.use("/", express.static(`public/${this.folder}`));
    }



    initGetHandlers() {
        this.app.get("/favicon.ico", (req, res) => res.sendStatus(204));

        fs.readdir(`public/`, (err, files) => {
            files.forEach(file => {
                console.log(file);
            });
        })
    }
}

export default staticServer;

