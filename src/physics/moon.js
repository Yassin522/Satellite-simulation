import * as THREE from "three"
import { Vector3 } from "three";
import vector from "./vector";

class Moon {
    constructor(
        position,
        Moon_mass,
        // Moon_raduis,
        speed,
        drag_coeff,
        gravity_coeff,
        eng_force,
    
    )
    {
        this.position = position ;
        this.Moon_mass = Moon_mass;
        this.drag_coeff = drag_coeff   // 0.47;
        this.gravity_coeff =  gravity_coeff  //6.67428 * Math.pow(-11,10)  //m^3.kg^-1.s^-2
        this.speed = speed
        this.velocity = vector.create(this.speed,1,1) // 47438881429.888306
        this.eng_force = eng_force
        this.Moon_raduis = 1  //3*1600/(4*Math.PI*7.86);
        this.area = Math.PI * Math.pow(this.Moon_raduis, 2); 
        // this.distance = 2
    }

    update(deltatime ,Planet_mass,planet_position,atmo_rho){
        // console.log("x=" , this.position.x)
        // console.log("y=" , this.position.y)
        // console.log("z=" , this.position.z)
        let gravity_force = this.gravity_force(Planet_mass, planet_position);
        let drag_Force = this.drag_force(atmo_rho)

        let total_force = vector.create(
            gravity_force.getX()  + drag_Force.getX(),//+dragForce.x,
            gravity_force.getY()  + drag_Force.getY(),//+dragForce.y,
            gravity_force.getZ()  + drag_Force.getZ(),//+dragForce.z,

        )

            // console.log("drag_Force",drag_Force)
            // console.log("gravity_force1",gravity_force)
            // console.log("total_force",total_force)
        let acc = vector.create(
            total_force.getX() / this.Moon_mass,
            total_force.getY() / this.Moon_mass,
            total_force.getZ() / this.Moon_mass
        );
            // console.log("acc",acc)

            this.velocity.setX( this.velocity.getX() * this.eng_force)
            this.velocity.setY( this.velocity.getY() * this.eng_force)
            this.velocity.setZ( this.velocity.getZ() * this.eng_force)
    
            this.eng_force = 1


            this.velocity.addTo(acc ,deltatime)
        // let velocity_x =   this.velocity.getX() 
        // let velocity_y =   this.velocity.getY() 
        // let velocity_z =   this.velocity.getZ()  
        // velocity_x += acc.getX() 
        // velocity_y += acc.getY() 
        // velocity_z += acc.getZ()  
        // this.velocity.setX(this.velocity.getX() + acc.getX() )  
        // this.velocity.setY(this.velocity.getY() + acc.getY() )  
        // this.velocity.setZ(this.velocity.getZ() + acc.getZ() )  
            // console.log("velo",this.velocity)


        this.position.x += this.velocity.getX() * deltatime
        this.position.y += this.velocity.getY() * deltatime
        this.position.z += this.velocity.getZ() * deltatime
        // console.log("x=" , this.position.x)
        // console.log("y=" , this.position.y)
        // console.log("z=" , this.position.z)
    
    }


    


    gravity_force(Planet_mass,planet_position){

        let distance_x =  planet_position.x  - this.position.x 
        let distance_y =  planet_position.y  - this.position.y 
        let distance_z =  planet_position.z  - this.position.z 
            let diraction = vector.create(
                distance_x,
                distance_y,
                distance_z
                )
            
            let normalize1 = diraction.normalize()
            let    gravity_force = vector.create(0,0,0)
            if( distance_x == 0 ){
                gravity_force = vector.create(
                        0 ,
                        (this.gravity_coeff * this.Moon_mass * Planet_mass *normalize1.getY())*(1) / distance_y * distance_y,
                        (this.gravity_coeff * this.Moon_mass * Planet_mass *normalize1.getZ())*(1) / distance_z * distance_z
                        )
            }
                        else if(distance_y == 0){
                gravity_force = vector.create(
                        (this.gravity_coeff * this.Moon_mass * Planet_mass *normalize1.getX())*(1) / distance_x * distance_x  ,
                        0,
                        (this.gravity_coeff * this.Moon_mass * Planet_mass *normalize1.getZ())*(1) / distance_z * distance_z  
                        )
                }
                        else if(distance_z == 0){
                gravity_force = vector.create(
                        (this.gravity_coeff * this.Moon_mass * Planet_mass *normalize1.getX())*(1) / distance_x * distance_x  ,
                        (this.gravity_coeff * this.Moon_mass * Planet_mass *normalize1.getY())*(1) / distance_y * distance_y  ,
                        0,  
                        )
                }else{
                    gravity_force = vector.create(
                        (this.gravity_coeff * this.Moon_mass * Planet_mass *normalize1.getX())*(1) / distance_x * distance_x  ,
                        (this.gravity_coeff * this.Moon_mass * Planet_mass *normalize1.getY())*(1) / distance_y * distance_y  ,
                        (this.gravity_coeff * this.Moon_mass * Planet_mass *normalize1.getZ())*(1) / distance_z * distance_z  
                        )
                }


                    // console.log("Math.pow(distance_x,2)",Math.pow(distance_x,2))
                    // console.log("Math.pow(distance_y,2)",Math.pow(distance_y,2))
                    // console.log("Math.pow(distance_z,2)",Math.pow(distance_z,2))
                    // console.log("this.gravity_coeff",this.gravity_coeff)
                    // console.log(" this.Moon_mass", this.Moon_mass)
                    // console.log("Planet_mass",Planet_mass)
                    
                return gravity_force ;
    }

    // calc_distance(planet_position){

    //     this.distance =  Math.sqrt(
    //         Math.pow(2,Moon.position.x - planet_position.x)+
    //         Math.pow(2,Moon.position.y - planet_position.y)+
    //         Math.pow(2,Moon.position.z - planet_position.z)
    //     )
    // }

    drag_force(atmo_rho) {
        // console.log("velo11111",this.velocity)
        let velocitySquere = this.velocity.squere()  /10000000
        
        let normalize2 = this.velocity.normalize();
        let drag_force = vector.create(
          ((velocitySquere * -1) / 2) * this.drag_coeff * atmo_rho * this.area * normalize2.getX(),
          ((velocitySquere * -1) / 2) * this.drag_coeff * atmo_rho * this.area * normalize2.getY(),
          ((velocitySquere * -1) / 2) * this.drag_coeff * atmo_rho * this.area * normalize2.getZ())
        
        // console.log("velocitySquere", velocitySquere)
        // console.log("velo22222",this.velocity.getLength())
        // console.log("drag_coeff", this.drag_coeff)
        // console.log("atmo_rho", atmo_rho)
        // console.log("this.area", this.area)
        // console.log("normalize2", normalize2)
        return drag_force;
    }
    
}
export default Moon;