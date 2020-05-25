
import $ from "jquery";
import define from "@util/define.js";

export default {
    /**
     * @description 载入单个CSS文件
     */
    appendCss:(css)=>{
        return new Promise((reslove,reject)=>{
            let head = document.getElementsByTagName('head')[0];
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = css;
            head.appendChild(link);
            link.addEventListener('load', function () {
                reslove();
            }, false);
        })
    },
    /**
     * @description 载入单个JS文件
     */
    appendJs(js){
        return new Promise((reslove,reject)=>{
            let head = document.getElementsByTagName('head')[0];
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = js;
            head.appendChild(script);

            script.addEventListener('load', function () {
                reslove();
            }, false);
        })
    },
    loadFileQueue(fileArray,count=0,cb){
        if(count == fileArray.length){
            cb && cb();
            return;
        }
        let tmp = fileArray[count];
        let suff = tmp.substring(tmp.lastIndexOf('.') +1);
        if(suff == define.SUFFIX.CSS){
            this.appendCss(tmp).then(x=>{
                count++;
                console.log(tmp);
                this.loadFileQueue(fileArray,count,cb);
            })
        }else{
            this.appendJs(tmp).then(x=>{
                count++;
                console.log(tmp);
                this.loadFileQueue(fileArray,count,cb);
            })
        }
    },
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
    },
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