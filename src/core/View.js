

import tool from "../util/tool.js";

export default class View{
    constructor(){
        this._id = tool._idSeed.newId();
        this._cache = {
            template:""
        };
    }

    init(options){
        this._name = options.name;
        this._router = options.router;
        this._template = options.template;
        this._class = options.class;
        this._isLoaded = options.__isLoaded;
        this._cache.template = options.__tmplateStr;

        this._css = [];
        this._js = [];
    }

    $event(handle,selector,cb){
        let tmpSelector = "#"+this._id + " " +selector;
        $("body").off(handle,tmpSelector).on(handle,tmpSelector,function(e){
            cb && cb(e);
        })
    }

    onReady(){
        
    }

    registerAsset(){

    }

    registerStyle(files){
        if(typeof files == "string"){
            files = [files];
        }
        if(files instanceof Array){
            this._css = files;
        }
    }
    
    registerScript(files){
        if(typeof files == "string"){
            files = [files];
        }
        if(files instanceof Array){
            this._js = files;
        }
    }
}