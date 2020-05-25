

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

        this._beforeEnter = options.beforeEnter?options.beforeEnter:null;
        this._beforeLeval = options.beforeLeval?options.beforeLeval:null;
        this._destory = options.destory?options.destory:null;

        this._css = [];
        this._js = [];
    }

    $(selector){
        return $("#"+this._id).find(selector);
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