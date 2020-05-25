import DomMangager from "./DomMangager.js";
import SpaResourceLoader from "./SpaResourceLoader.js";

export default class SpaViewManager{
    constructor(){
        
    }

    laodView(view,container){
        view.beforeEnter && view.beforeEnter(view);
        DomMangager.appendToContainer(container, $(view._cache.template));
    }

    load(view,container){
        return new Promise((resolve,reject)=>{
            //load css
            SpaResourceLoader.loadFileQueue(view._css,0,()=>{
                //load js
                SpaResourceLoader.loadFileQueue(view._js,0,()=>{
                    //load template
                    if(view._cache.template){
                        DomMangager.appendToContainer(container, $(view._cache.template));
                        resolve();
                    }else{
                        SpaResourceLoader.loadTemplate(view._template).then(x=>{
                            view.beforeEnter && view.beforeEnter(view);
                            let rootDiv = $("<div id='"+view._id+"'></div>");
                            rootDiv.append($(x));
                            DomMangager.appendToContainer(container, rootDiv);
                            view._cache.template = rootDiv[0].outerHTML;
                            resolve();
                        })
                    }
                });
            })
        })
    }
}