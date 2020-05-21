
import SpaEngine from "@core/SpaEngine.js";

let config = {
    public_asset:[
        "./modules/static/app.css",
        "./modules/static/tool.js"
    ],
    views:[
        {
            default:true,
            name:"person",
            router:"/",
            template:"./modules/views/person/person.html"
        },
        {
            name:"car",
            router:"/car",
            template:"./modules/views/car/car.html"
        }
    ]
}

import Person from "./modules/views/person/person.js";
import Car from "./modules/views/car/car.js";

let spa_enging = new SpaEngine(config);
window.spa_enging = spa_enging;

let person = new Person("person");
let car = new Car("car");
spa_enging.registerView(person);
spa_enging.registerView(car);

spa_enging.run($("#app"));