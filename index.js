import cluster from "cluster";
import LoaderController from "bbt-loader";
import LoaderList from "@/loaderList";
// import Logger from "~/service/logger";

class Main {
	static init() {
		Main.startCluster();
		Main.processEvent();
	}

	static startCluster() {
		if (cluster.isMaster) {
			cluster.fork();
			cluster.on("exit", Main.clusterExit);
		}

		if (cluster.isWorker) {
			// eslint-disable-next-line
			new LoaderController({ loaderList: LoaderList });
		}
	}

	static clusterExit(worker, code, signal) {
		// Logger.error(`Cluster restart after ${code || signal}`);
		cluster.fork();
	}

	static processEvent() {
		process.on("uncaughtException", Main.exceptionGandler);
		process.on("unhandledRejection", Main.rejectionHandler);
	}

	static exceptionGandler(err) {
		// Logger.error(`Uncaught Exception: ${err}`);
		Main.exit();
	}

	static rejectionHandler(reason, p) {
		// Logger.error(`Unhandled Rejection at: ${p} reason: ${reason}`);
		Main.exit();
	}

	static exit() {
		setTimeout(() => process.exit(1), 5000);
	}
}

Main.init();
