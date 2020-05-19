

export default class SpaStoreManager{
    constructor(){
        this._stores = [];
    }

    addStore(store){
        this._stores.push(store);
    }

    getStoreByKey(key){
        let res = null;
        this._stores.forEach(x=>{
            if(key == x._key){
                res = x;
            }
        })
        return res;
    }
}