 import playerConfig from "@/playerConfig.json";


class PlyerConfigController{
    constructor(){
        this.player = playerConfig;


    }

    init(){
        console.log(this.player)
    }

}

export default PlyerConfigController;