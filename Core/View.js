

export default class View{
    constructor(){
        this._store = null;
    }

    getStore(){
        return this._store;
    }
    
    setSotre(store){
        this._store = store;
    }
}