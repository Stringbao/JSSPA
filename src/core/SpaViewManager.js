

export default class SpaViewManager{
    constructor(){
        this._views = [];
    }

    addView(view){
        this._views.push(view);
    }
}