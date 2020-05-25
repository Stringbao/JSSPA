
import util from "../util/tool.js";
import define from "../util/define.js";

export default class SpaRouterManager{
    constructor(){
        
    }

    getCurrentHash(){
        let _uri = location.hash;
        if(!_uri || _uri == "#/" || _uri == "#"){
            return "/";
        }
        if(_uri.indexOf('?') != -1){
            _uri = _uri.substring(_uri.indexOf('#')+1,_uri.indexOf('?'))
        }else{
            _uri = _uri.substring(_uri.indexOf('#')+1);
        }
        return _uri;
    }

    watchURI(){
        // let hash = this.getCurrentHash();
        //first load
        // window.addEventListener("onload",function(){
        //     history.pushState(null, '', "#"+hash);
        //     util._event_publisher.broadcast(define.URI.CHANGEHASH,hash);
        // })

        //hash changed
        window.addEventListener('popstate', (e)=> {
            let nextHash = this.getCurrentHash();
            history.pushState(null, '', "#"+nextHash);
            util._event_publisher.broadcast(define.URI.CHANGEHASH,nextHash);
        });
    }

    init(){
        this.watchURI();
    }
}