

import tool from "../util/tool.js";


export default class View{
    constructor(name){
        this._id = tool._idSeed.newId();

        this._name = name;
        this._cache = {
            template:""
        };
    }

    init(options){
        this._router = options.router;
        this._template = options.template;
        this._default = options.default==undefined?false:options.default;

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

    importStyle(files){
        if(typeof files == "string"){
            files = [files];
        }
        if(files instanceof Array){
            this._css = files;
        }
    }
    
    importScript(files){
        if(typeof files == "string"){
            files = [files];
        }
        if(files instanceof Array){
            this._js = files;
        }
    }
}