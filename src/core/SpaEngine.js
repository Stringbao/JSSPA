
import SpaRouterManager from "./SpaRouterManager.js";
import SpaViewManager from "./SpaViewManager.js";
import SpaStoreManager from "./SpaStoreManager.js";
import SpaResourceLoader from "./SpaResourceLoader.js";
import View from "./View.js";
import Store from "./Store.js";
import Router from "./Router.js";

export default class SpaEngine{
    constructor(config){
        this._config = config;

        this._container = null;
        this._spaViewManager = new SpaViewManager();
        this._spaStoreManager = new SpaStoreManager();
        this._spaRouterManager = new SpaRouterManager();
        this._spaResourceLoader = new SpaResourceLoader();
    }   

    appendView(view){
        this._spaViewManager.addView(view);
    }

    getResourceByKey(key){
        let _store = this._spaStoreManager.getStoreByKey(key);
        let _view = this._spaViewManager.getViewByKey(key);

        return {
            key:key,
            store:_store._store,
            template:_view._template,
            controller:_view._controller,
            dependencies:_view._dependencies
        }
    }

    run(container){
        this._container = $(container);
        let public_asset = this._config.public_asset;
        let views = this._config.views;
        //加载公用资源
        this._spaResourceLoader.loadFiles(public_asset);
        //初始化视图并且缓存当前view template
        views.forEach(x => {
            let _view = new View(x);
            let _store = new Store(x);
            let _router = new Router(x);
            this._spaViewManager.addView(_view);
            this._spaStoreManager.addStore(_store);
            this._spaRouterManager.addRouter(_router);
        });

        this._spaRouterManager.init();
    }
}