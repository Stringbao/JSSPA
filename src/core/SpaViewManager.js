
import DomMangager from "./DomMangager.js";
import SpaResourceLoader from "./SpaResourceLoader.js";
import { Promise, resolve } from "q";

export default class SpaViewManager{
    constructor(){
        
    }
    
    importStyle(files){
        if(typeof files == "string"){
            files = [files];
        }
        files instanceof Array && SpaResourceLoader.loadFiles(files);
    }
    
    importScript(files){
        if(typeof files == "string"){
            files = [files];
        }
        files instanceof Array && SpaResourceLoader.loadFiles(files);
    }

    load(view,container){
        return new Promise((resolve,rejext)=>{
            //load css
            let res = [];
            Array.prototype.push.apply(res,view._css);
            Array.prototype.push.apply(res,view._js);
            SpaResourceLoader.loadFiles(res).then(x=>{
                if(view._cache.template){
                    DomMangager.appendToContainer(container, $(view._cache.template));
                }else{
                    SpaResourceLoader.loadTemplate(view._template).then(x=>{
                        let rootDiv = $("<div id='"+view._id+"'></div>");
                        rootDiv.append($(x))
                        DomMangager.appendToContainer(container, rootDiv);
                        view._cache.template = rootDiv[0].outerHTML;
                        resolve();
                    })
                }
            })
        })
        
    }
}