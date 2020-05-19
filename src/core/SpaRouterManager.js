

export default class SpaRouterManager{
    constructor(){
        this._routers = [];

        this._currentView = null;
        this._nextView = null;
    }

    addRouter(router){
        this._routers.push(router);
    }

    getCurrentRouter(){
        let _uri = this.getCurrentHash();
        let res = null;
        this._routers.forEach(x=>{
            if(x._uri == _uri){
                res = x;
            }
        })
        return res;
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

    getDefaultRouter(){
        let res = null;
        this._routers.forEach(x=>{
            if(x._isDefault){
                res = x;
            }
        })
        return res;
    }

    watchURI(){
        let that = this;
        
        let currentRouter = this.getCurrentRouter();
        if(!currentRouter){
            console.log("can not match current router");
            return;
        }
        this._currentView = spa_enging._spaViewManager.getViewByKey(currentRouter._key);
        //首次加载
        window.addEventListener("DOMContentLoaded",function(){
            history.pushState(null, '', "#"+currentRouter._uri);
            that._currentView.load();
        })

        //hash changed
        window.addEventListener('popstate', function(e) {
            currentRouter._beforeLeave && currentRouter._beforeLeave(this);
            let nextRouter = that.getCurrentRouter();
            if(!nextRouter){
                console.log("can not match current router");
                return;
            }
            that._nextView = spa_enging._spaViewManager.getViewByKey(nextRouter._key);
            that._nextView.load();

            that._currentView = that._nextView;
        });
    }

    init(){
        this.watchURI();
    }
}