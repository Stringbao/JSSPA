
import View from "./View.js";
import SpaRouterManager from "./SpaRouterManager.js";
import SpaViewManager from "./SpaViewManager.js";
import SpaResourceLoader from "./SpaResourceLoader.js";
import util from "../util/tool.js";
import define from "../util/define.js";

let tool = {
    findConfigByHash(data,hash){
        let res = null;
        data.forEach(item => {
            if(item.router == hash){
                res = item;
            }
        });
        return res;
    },
    getDefaultConfig(data){
        let res = null;
        data.forEach(item => {
            if(item.default){
                res = item;
            }
        });
        return res;
    },
    getViewByName(data,name){
        let res = null;
        data.forEach(item => {
            if(item._name == name){
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
        this._prevView = null;
        this._views = [];
    }

    run(container){
        let that = this;
        this._container = $(container);
        let public_asset = this._config.public_asset;
        //加载公用资源
        SpaResourceLoader.loadFileQueue(public_asset,0,()=>{
            that.switchView(that._spaRouterManager.getCurrentHash());
        });

        that._spaRouterManager.watchURI();
        util._event_publisher.on(define.URI.CHANGEHASH,(hash=>{
            that.switchView(hash);
        }))
    }

    switchView(hash){
        let config = tool.findConfigByHash(this._config.views,hash);
        if(!config){
            return;
        }
        history.pushState(null, '', "#"+hash);
        let view = tool.getViewByName(this._views,config.name);
        this._prevView = this._currentView;

        this._prevView && this._prevView.beforeLeave && this._prevView.beforeLeave(this._prevView);

        if(view && view._cache.template){
            this._currentView = view;
            this._spaViewManager.laodView(view,this._container);
            view.onReady();
        }else{
            //load js --> create View --> SpaViewManager load(View) -->append view to _views
            let js = config.template;
            let jsPath = js.substring(0,js.indexOf('html')) + "js";
            SpaResourceLoader.appendJs(jsPath).then(x=>{
                let str = "new "+config.class+"();";
                let view = eval(str);
                view.init(config);
                view.registerAsset();
                this._spaViewManager.load(view,this._container).then(x=>{
                    view.onReady();
                    this._views.push(view);
                    this._currentView = view;
                });
            })
        }
    }

    clearCache(){
        this._views.forEach(x=>{
            x._cache.template = "";
        })
    }
}

window.CoreView = View;