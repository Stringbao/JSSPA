
import RouterManager from "./RouterManager.js";
import SpaViewManager from "./SpaViewManager.js";
import StoreManager from "./StoreManager.js"

export default class SpaEngine{
    constructor(){
        this._spaViewManager = new SpaViewManager();
        this._storeManager = new StoreManager();
        this._routerManager = new RouterManager();
    }   

    run(){
        
    }
}