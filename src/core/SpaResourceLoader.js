
import $ from "jquery";
import define from "@util/define.js";

export default class SpaResourceLoader{
    constructor(){
        this._resrouce = [];
    }

    appendResource(path){
        this._resrouce.push(path);
    }

    appendCss(css){
        return new Promise((reslove,reject)=>{
            if(typeof css == "string"){
                css = [css];
            }
            css && css instanceof Array && css.forEach(x => {
                let head = document.getElementsByTagName('head')[0];
                let link = document.createElement('link');
                link.type='text/css';
                link.rel = 'stylesheet';
                link.href = x;
                head.appendChild(link);
                this.appendResource(x);
            });
            reslove();
        })
    }

    appendJs(js){
        return new Promise((reslove,reject)=>{
            if(typeof js == "string"){
                js = [js];
            }
            js && js instanceof Array & js.forEach(x => {
                let head = document.getElementsByTagName('head')[0];
                let script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = x;
                head.appendChild(script);
                this.appendResource(x);
            });
            reslove();
        })
    }

    loadFiles(files){
        let promises = [];
        for (let index = 0; index < files.length; index++) {
            const x = files[index];
            let suff = x.substring(x.lastIndexOf('.') +1);
            switch(suff){
                case define.SUFFIX.CSS:
                    promises.push(this.appendCss(x));
                    break;
                case define.SUFFIX.JS:
                    promises.push(this.appendJs(x));
                    break;
            }
        }
        return Promise.all(promises);
    }

    loadTemplate(url){
        return new Promise((reslove,reject)=>{
            $.ajax({
                url:url,
                success:function(d){
                    reslove(d);
                },
                error:(err=>{
                    reject(err.responseText);
                })
            })
        })
        
    }
}