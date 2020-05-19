

export default class Router{
    constructor(options){
        this._key = options.key;
        this._uri = options.router.url;
        this._isDefault = options.router.default;

        this._beforeEnter = options.router.beforeEnter;
        this._beforeLeave = options.router.beforeLeave;
    }
}