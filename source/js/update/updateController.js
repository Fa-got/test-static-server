import UpdateApp from 'updateApp';

class UpdateController{
    constructor(options){
        this.stores = options.stores
    }

    init() {
        return new Promise(resolve => {
            this.stores.wsAnswer.subscribe(() => {
                this.moduleAnswer(this.stores.wsAnswer.getStore);
            });
            resolve();
        });
    }

}

export default UpdateController