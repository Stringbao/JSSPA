
import DomMangager from "./DomMangager.js";

export default class View{
    constructor(options){
        this._key = options.key;
        this._template = options.template;
        this._controller = options.controller;
        this._dependencies = options.dependencies;

        this._store = null;
        this._router = null;
        
        this._cache = "";
    }

    load(){
        this._store = spa_enging._spaStoreManager.getStoreByKey(this._key);
        this._router = spa_enging._spaRouterManager.getCurrentRouter();
        
        //执行beforeEnter
        this._router._beforeEnter && this._router._beforeEnter(this);

        //load all resources
        spa_enging._spaResourceLoader.loadFiles(this._dependencies).then(x=>{
            return spa_enging._spaResourceLoader.appendJs(this._store._store);
        }).then(x=>{
            return spa_enging._spaResourceLoader.appendJs(this._controller);
        }).then(x=>{
            if(this._cache){
                DomMangager.appendToContainer(spa_enging._container,$(this._cache));
            }else{
                spa_enging._spaResourceLoader.loadTemplate(this._template).then(x=>{
                    this._cache = x;
                    DomMangager.appendToContainer(spa_enging._container,$(x));
                })
            }
        })
    }
}