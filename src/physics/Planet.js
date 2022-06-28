import vector from "./vector";
import * as THREE from "three";
import { Vector3 } from "three";


class PLanet {

    constructor(
        position,
        mass ,
        planet_raduis,
        rho,
        atmo_rho,
        types,


    )
    {
        
        this.position = position 
        this.type = types
        this.raduis = planet_raduis //
        this.rho = rho; // = 5520
        // this.mass =mass 
        this.atmo_rho = atmo_rho; //
        this.mass = mass  //
        this.moon_update = Object 


        // this.mass =  this.rho * (4 / 3) * Math.PI * Math.pow(this.raduis, 3);

    }

    add1(object) {
        this.moon_update1 = object;
    }
    
    add2(object) {
        this.moon_update2 = object;
    }
    add3(object) {
        this.moon_update3 = object;
    }

    update(deltatime){
        
        this.moon_update1.update(deltatime, this.mass, this.position, this.atmo_rho)
        this.moon_update2.update(deltatime, this.mass, this.position, this.atmo_rho)
        this.moon_update3.update(deltatime, this.mass, this.position, this.atmo_rho)
    


        
    }
}
export default PLanet;