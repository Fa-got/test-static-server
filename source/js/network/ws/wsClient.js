import io from "socket.io-client";
import ConfigServer from "@/server.config.json";

class WsClient {
	constructor(options) {
		this.socket = io(
			`ws://${ConfigServer.network.host}:${ConfigServer.network.port}`
		);
		this.stores = options.stores;
		this.lang = options.lang.Text;
	}

	init() {
		return new Promise(resolve => {
			this.socket.on("connect", () => {
				global.console.log("connect");
				this.socket.emit("INTRO", { data: "im player" });
				resolve();
			});

			this.socket.on("connect_error", this.errorHand.bind(this));
			// this.socket.on("reconnect_attempt", this.errorHand.bind(this));

			this.socket.on("CHUNKS", message => {
				this.stores.dataChunk.setAll(message);
			});
		});
	}

	errorHand(err) {
		this.stores.error.set({
			code: "networkConnection",
			type: "critical",
			class: "WsClient",
			method: null,
			dependencies: err
		});
	}
}

export default WsClient;
