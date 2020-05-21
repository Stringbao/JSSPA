
import util from "../util/tool.js";
import define from "../util/define.js";

export default class SpaRouterManager{
    constructor(){
        this._currentView = null;
        this._nextView = null;
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
        let hash = this.getCurrentHash();
        //首次加载
        window.addEventListener("DOMContentLoaded",function(){
            history.pushState(null, '', "#"+hash);
            util._event_publisher.broadcast(define.URI.CHANGEHASH,hash);
        })

        //hash changed
        window.addEventListener('popstate', (e)=> {
            let nextHash = this.getCurrentHash();
            util._event_publisher.broadcast(define.URI.CHANGEHASH,nextHash);
        });
    }

    init(){
        this.watchURI();
    }
}