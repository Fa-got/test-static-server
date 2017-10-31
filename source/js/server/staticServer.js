import http from "http";
import express, {Router} from "express";
import Config from "@/severConfig.json";
import ApiController from "./../api/ApiController";
import bodyParser from "bodyParser";


class staticServer {
    constructor() {
        this.router = new Router()
        this.app = express();
        this.server = http.createServer(this.app);
        this.ip = Config.server.host;
        this.port = Config.server.port;
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

    initApi(){
        this.app.use((req, res, next) => {
            if(req.module.hash === this.module.hash
                && req.id === this.id ){

                //start-api
                this.app.use('/api', this.router);
                //api-reboot
                this.router.post('/reboot', (req, res) => {
                    ApiController.reboot();
                });
                //api-refresh
                this.router.post('/refresh', (req, res) => {
                    ApiController.refresh();
                });
                //api-config
                this.router.post('/config', (req, res) => {
                    res.json({"timeShot": 5000});
                });
            }else{

            }


    }



    initGetHandlers(){
        this.app.get("/favicon.ico", (req, res) => res.sendStatus(204));
    }
}

export default staticServer;

