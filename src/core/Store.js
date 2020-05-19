
export default class Store{
    constructor(){
        this._data = null;
    }

    getData(){
        return this._data;
    }

    setData(data){
        this._data = data;
    }

    storeCompleted(fn){
        fn & fn(this._data);
    }
}