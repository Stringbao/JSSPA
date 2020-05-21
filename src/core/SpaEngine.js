
import SpaRouterManager from "./SpaRouterManager.js";
import SpaViewManager from "./SpaViewManager.js";
import SpaResourceLoader from "./SpaResourceLoader.js";
import util from "../util/tool.js";
import define from "../util/define.js";

let tool = {
    findConfigByName(data,name){
        let res = null;
        data.forEach(item => {
            if(item.name == name){
                res = item;
            }
        });
        return res;
    },
    findViewByHash(data,hash){
        let res = null;
        data.forEach(item => {
            if(item._router == hash){
                res = item;
            }
        });
        return res;
    }
}

export default class SpaEngine{
    constructor(config){
        this._config = config;

        this._container = null;
        this._spaViewManager = new SpaViewManager();
        this._spaRouterManager = new SpaRouterManager();

        this._currentView = null;
        this._views = [];
    }   

    run(container){
        this._container = $(container);
        let public_asset = this._config.public_asset;
        //加载公用资源
        SpaResourceLoader.loadFiles(public_asset);

        this._spaRouterManager.watchURI();

        util._event_publisher.on(define.URI.CHANGEHASH,(hash=>{
            let view = tool.findViewByHash(this._views, hash);
            this.switchView(view);
        }))
    }

    switchView(view){
        this._currentView = view;
        this._currentView.registerAsset();
        view._beforeEnter && view._beforeEnter(view);
        this._spaViewManager.load(this._currentView,this._container).then(x=>{
            view.onReady();
        })
    }

    registerView(view){
        let config = tool.findConfigByName(this._config.views,view._name);
        view.init(config);
        this._views.push(view);
    }
}

