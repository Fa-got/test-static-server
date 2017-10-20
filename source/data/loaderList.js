import ServerController from "~/server/serverController";

const LoaderList = [

	{
		step: 0,
		isLoaded: false,
		parts: [
			{
				name: "server",
				type: "init",
				controller: ServerController,
				params: [],
				isLoaded: false
			}
		]
	}
];

export default LoaderList;
