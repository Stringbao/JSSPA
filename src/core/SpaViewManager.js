

export default class SpaViewManager{
    constructor(){
        this._views = [];
    }

    addView(view){
        this._views.push(view);
    }

    getViewByKey(key){
        let res = null
        this._views.forEach(x=>{
            if(x._key == key){
                res = x;
            }
        })
        return res;
    }


}