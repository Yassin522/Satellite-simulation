import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Moon from "./physics/moon"
import PLanet from "./physics/Planet"
import gsap from 'gsap'
import * as dat from 'dat.gui'
import typefacefont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import GLTFLoader from  'THREE/examples/jsm/loaders/GLTFLoader.js'
import { Plane } from 'three'
console.log(typefacefont)
// import { MeshBasicMaterial, MeshDepthMaterial } from 'three'
// import {flags} from "webpack-cli/lib/utils/cli-flags";



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}




/**
 * @texture  type 2
 */

// const loadingmanager = new THREE.LoadingManager()
const textureload = new THREE.TextureLoader()
textureload
const particletexture = textureload.load('/textures/particles/9.png')
// const Venustexture = textureload.load('Venus.jpg')
const earthtexture = textureload.load('earth.jpg')
const Marstexture = textureload.load('Mars.jpg')
const Jupitertexture = textureload.load('Jupiter.jpg')


// window.addEventListener('mousemove' ,(event) => {

//     cursor.x = (event.clientX / sizes.width -0.5)
//     cursor.y = -( event.clientY / sizes.height-0.5)
//     // console.log(cursor.x)
//     // console.log(cursor.y)
// })





/**
 * @Parameters
 */
const parameters = {
    // Moon //
    Moon_Mass: 1600000,
    drag_coeff: 0.47,
    gravity_coeff: 6.67428 * Math.pow(10, -11),
    initial_distance : 58500061,
    initial_speed: 88818881429.88830654,
    //47438881429.888306

    //  planet // 
    Planet_Mass: 5.9742 * Math.pow(10, 24),
    Plane_raduis: 10,
    rho: 5520,
    atmo_rho: 1000,
    eng_force: 1,

    type: 2,
    planetTextures: earthtexture,
    types: {
        default() {
            parameters.type = 0;
            parameters.planetTextures = earthtexture;
            parameters.Plane_raduis = 8;
            // parameters.rho = 5520
            // parameters.atmo_rho = 5520
        },
        Jupiter() {
            parameters.type = 1;
            parameters.planetTextures = Jupitertexture;
            parameters.Plane_raduis = 13;
            // parameters.rho = 20
            // parameters.atmo_rho = 20
        },
        Mars() {
            parameters.type = 2;
            parameters.planetTextures = Marstexture;
            parameters.Plane_raduis = 6;
            // parameters.rho = 30
            // parameters.atmo_rho = 30
        },
    },
    starte_simulation : true,
}
// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()












/**
 *           @geometry
 */

const sungroup = new THREE.Group()
scene.add(sungroup)


const PLANET1 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(4, 32, 32),
    new THREE.MeshBasicMaterial()
)
PLANET1.position.x = 50
PLANET1.position.y = -30
PLANET1.material.color.set(0x0000ff)
// sungroup.add(PLANET1)



const PLANET2 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(4, 32, 32),
    new THREE.MeshBasicMaterial()
)
PLANET2.position.y = -30
PLANET2.material.color.set(0x0000ff)
// sungroup.add(PLANET2)



const PLANET3 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(4, 32, 32),
    new THREE.MeshBasicMaterial()
)
PLANET3.position.x = -50
PLANET3.position.y = -30
PLANET3.material.color.set(0x0000ff)
// sungroup.add(PLANET3)







const PLANET = new THREE.Mesh(
    new THREE.SphereBufferGeometry(8, 32, 32),
    new THREE.MeshBasicMaterial(
        {
            map: parameters.planetTextures,

        }
    )
)
sungroup.add(PLANET)



const MOON1 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1, 32, 32),
    new THREE.MeshBasicMaterial(
        {
            color: 0xff0000
        }
    )
)


MOON1.position.x = 1       
MOON1.position.y = 50000    
MOON1.position.z = parameters.initial_distance


sungroup.add(MOON1)





const MOON2 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1, 32, 32),
    new THREE.MeshBasicMaterial(
        {
            color: 0x00ff00
        }
    )
)
MOON2.position.x = -1       
MOON2.position.y = -50000    
MOON2.position.z = -parameters.initial_distance

sungroup.add(MOON2)



const MOON3 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1, 32, 32),
    new THREE.MeshBasicMaterial(
        {
            color: 0x0000ff
        }
    )
)
MOON3.position.x = 58500061        
MOON3.position.y = -1 
MOON3.position.z = -1

sungroup.add(MOON3)







/**
 *    @particles
 */

const particlesgeometry = new THREE.BufferGeometry(1, 32, 32)
const count = 500000 //100000

const positions = new Float32Array(count * 3)
const particlecolor = new Float32Array(count * 3)


for (let i = 0; i < count * 3; i++) {

    positions[i] = (Math.random() - 0.5) * 250
    particlecolor[i] = (1)

}

particlesgeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)

particlesgeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(particlecolor, 3)
)

const particlesmaterial = new THREE.PointsMaterial(
    {
        size: 0.13,
        sizeAttenuation: true,
        // map : particletexture ,
        //  type 1 تفعيل الشفافية 
        transparent: true,
        alphaMap: particletexture,
        vertexColors: true
        // alphaTest :0.01
    }
)
// type 2
particlesmaterial.depthWrite = false

const particles = new THREE.Points(particlesgeometry, particlesmaterial)
scene.add(particles)







/**
 *
 *          @AxesHelper
 */
// const axeshelper = new THREE.AxesHelper()
// scene.add(axeshelper)


window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// full screen

window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    }
    else {
        document.exitFullscreen()
    }
})


/**
 * @Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 100)
// const camera = new THREE.OrthographicCamera(-5,5,5,-5,0.1,100)
camera.position.z = 55
camera.position.y = 8
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//  تفعيل الظلال و اضافة لون للسماء
// renderer.shadowMap.enabled = true 
// renderer.setClearColor('#333333')
// doorlight.castShadow = true



// gui.add()
//gui.add(PointLight , 'intensity' ).min(0).max(1).step(0.01).name('lighting')
// gui.hide()
// gui.add(mesh.position, 'y').min(- 3).max(3).step(0.01).name('elevation')
// gui.add(mesh, 'visible')
// gui.add(material, 'wireframe')

// gui
//     .addColor(parameters, 'color')
//     .onChange(() =>
//     {
//         material.color.set(parameters.color)
//     })

// gui.add(parameters, 'spin')


/**
 * @Physics_Objects
 */
const physicsplanet = new PLanet(
    PLANET.position,
    parameters.Planet_Mass,
    parameters.Plane_raduis,
    parameters.rho,
    parameters.atmo_rho,
    parameters.type,
)

const physicsmoon1 = new Moon(
    new THREE.Vector3(MOON1.position.x, MOON1.position.y, MOON1.position.z),
    parameters.Moon_Mass,
    parameters.initial_speed,
    parameters.drag_coeff,
    parameters.gravity_coeff,
    parameters.eng_force,
)
physicsmoon1.velocity.setX(parameters.initial_speed) 
physicsmoon1.velocity.setY(10) 
physicsmoon1.velocity.setZ(1000) 
physicsmoon1.position.x = 1                          
physicsmoon1.position.y = 50000                      
physicsmoon1.position.z = parameters.initial_distance   










const physicsmoon2 = new Moon(
    new THREE.Vector3(MOON2.position.x, MOON2.position.y, MOON2.position.z),
    parameters.Moon_Mass,
    parameters.initial_speed ,
    parameters.drag_coeff,
    parameters.gravity_coeff,
    parameters.eng_force,
)
physicsmoon2.velocity.setX(parameters.initial_speed) 
physicsmoon2.velocity.setY(10) 
physicsmoon2.velocity.setZ(1000) 
physicsmoon2.position.x = -1                          
physicsmoon2.position.y = -50                     
physicsmoon2.position.z = -parameters.initial_distance   








const physicsmoon3 = new Moon(
    new THREE.Vector3(MOON3.position.x, MOON3.position.y, MOON3.position.z),
    parameters.Moon_Mass,
    parameters.initial_speed ,
    parameters.drag_coeff,
    parameters.gravity_coeff,
    parameters.eng_force,
)
physicsmoon3.velocity.setX(100) 
physicsmoon3.velocity.setY(parameters.initial_speed) 
physicsmoon3.velocity.setZ(1000) 
physicsmoon3.position.x = parameters.initial_distance
physicsmoon3.position.y = -100
physicsmoon3.position.z = -1000




// const test =()=>{
//     let temp = physicsmoon2.position
//     physicsmoon3.position=temp
    


// }




/**
 * @Debug
 */
const gui = new dat.GUI({
    // closed: true,
    width: 400
})

const planet = gui.addFolder("planet")
const moon = gui.addFolder("moon")

moon.add(parameters, 'Moon_Mass').min(500).max(3100).step(50).onFinishChange(() => {
    physicsmoon1.Moon_mass = parameters.Moon_Mass
    // physicsmoon2.Moon_mass = parameters.Moon_Mass
})

moon.add(parameters, 'drag_coeff').min(0.047).max(5.47).step(0.001).onFinishChange(() => {
    physicsmoon1.drag_coeff = parameters.drag_coeff
    // physicsmoon2.drag_coeff = parameters.drag_coeff
})

// gui.add(parameters, 'gravity_coeff').min(5.67428).max(7.67428).step(0.01).onFinishChange(()=>{
//     physicsmoon1.gravity_coeff = parameters.gravity_coeff * Math.pow(10,-11)
// })
moon.add(parameters, 'gravity_coeff').min(5.67428).max(7.67428).step(0.1).onFinishChange(() => {
    physicsmoon1.gravity_coeff = parameters.gravity_coeff * Math.pow(10, -11)
    // physicsmoon2.gravity_coeff = parameters.gravity_coeff * Math.pow(10,-11)
})

moon.add(parameters, 'eng_force').min(0).max(2).step(0.01).onFinishChange(() => {
    physicsmoon1.eng_force = (parameters.eng_force)
    // physicsmoon2.eng_force = ( parameters.eng_force * 1.25 )
})
// moon.add(parameters, 'Plane_raduis').min(0).max(50).step(0.01).onFinishChange(()=>{
//     // sungroup.remove(PLANET)
//     // sungroup.add(PLANET)
// })


const subFolder = moon.addFolder("types");

subFolder.add(parameters.types, "default").onFinishChange(() => {
    PLANET.geometry = new THREE.SphereBufferGeometry(parameters.Plane_raduis, 32, 32)
    PLANET.material.map = parameters.planetTextures
    physicsplanet.type = parameters.type
    physicsplanet.rho = 5520; // kg/m^3  wood
    physicsplanet.atmo_rho = 1000; //
    physicsplanet.mass = 5.9742 * Math.pow(10, 24)

});
subFolder.add(parameters.types, "Jupiter").onFinishChange(() => {
    PLANET.geometry = new THREE.SphereBufferGeometry(parameters.Plane_raduis, 32, 32)
    PLANET.material.map = parameters.planetTextures
    physicsplanet.type = parameters.type
    physicsplanet.rho = 1326; // kg/m^3  wood
    physicsplanet.atmo_rho = 253; //
    physicsplanet.mass = 10.8986 * Math.pow(10, 24)


});
subFolder.add(parameters.types, "Mars").onFinishChange(() => {
    PLANET.geometry = new THREE.SphereBufferGeometry(parameters.Plane_raduis, 32, 32)
    PLANET.material.map = parameters.planetTextures
    physicsplanet.type = parameters.type
    physicsplanet.rho = 3933; // kg/m^3  wood
    physicsplanet.atmo_rho = 750; //
    physicsplanet.mass = 2.4142 * Math.pow(10, 24)


});
subFolder.open();






planet.add(parameters, 'Planet_Mass').min(0.00742).max(30.8742).step(0.05).onFinishChange(() => {
    physicsplanet.mass = parameters.Planet_Mass * Math.pow(10, 24)
})

planet.add(parameters, 'atmo_rho').min(1000).max(100000).step(50).onFinishChange(() => {
    physicsplanet.atmo_rho = parameters.atmo_rho
})

planet.add(parameters, 'rho').min(5720).max(5320).step(30).onFinishChange(() => {
    physicsplanet.rho = parameters.rho
})


const check_sadm = (planet_position,moon1_position,moon2_position) => {
        let v1_x = planet_position.x  - moon2_position.x
        let v1_y = planet_position.y  - moon2_position.y
        let v1_z = planet_position.z  - moon2_position.z
    let v1 = new THREE.Vector3(
        v1_x,
        v1_y,
        v1_z,
    )

        let v2_x = moon1_position.x - planet_position.x
        let v2_y = moon1_position.y - planet_position.y
        let v2_z = moon1_position.z - planet_position.z
    let v2 = new THREE.Vector3(
        v2_x,
        v2_y,
        v2_z,
    )

    let d = v1.add(v2)

    let distance = d.length() - 2

    // console.log("mmmmmmmmmm",distance)

        return distance
}
    // if (distance <= 0.0) {
    //     console.log("lalallalalal",distance)

    //     PLANET1.material.color.set(0xffff00)

        // if (physicsmoon1.Moon_mass - (physicsmoon1.Moon_mass / physicsmoon2.Moon_mass)  >= 0.5
        // || physicsmoon2.Moon_mass - (physicsmoon2.Moon_mass / physicsmoon1.Moon_mass)  >= 0.5 ) {

        //     if(physicsmoon1.Moon_mass -(physicsmoon1.Moon_mass / physicsmoon2.Moon_mass)*10000 >0)
        //             physicsmoon1.Moon_mass -= (physicsmoon1.Moon_mass / physicsmoon2.Moon_mass)*10000
        //     else 
        //     sungroup.remove(MOON1)
        //     if(physicsmoon2.Moon_mass -(physicsmoon2.Moon_mass / physicsmoon1.Moon_mass)*10000 >0)
        //     physicsmoon2.Moon_mass -= (physicsmoon2.Moon_mass / physicsmoon1.Moon_mass)*10000
        //     else 
        //     sungroup.remove(MOON1)
        //        // MOON1.material.color.set(0x00ff00)
        // }
        // if (physicsmoon2.Moon_mass - (physicsmoon2.Moon_mass / physicsmoon1.Moon_mass)  >= 0.5) {
        //     physicsmoon2.Moon_mass -= (physicsmoon2.Moon_mass / physicsmoon1.Moon_mass) * 10000
        //     //MOON2.material.color.set(0x00ff00)
        // }
    // } else{
    //     PLANET1.material.color.set(0x00ff00)
    // }





physicsplanet.add1(physicsmoon1);
physicsplanet.add2(physicsmoon2);
physicsplanet.add3(physicsmoon3);
// physicsmoon2.Moon_mass = 12000
// physicsmoon2.velocity.x = parameters.initial_speed
// physicsmoon2.velocity.y = 0
// physicsmoon2.velocity.x = 0



                            // full screen //

window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    }
    else {
        document.exitFullscreen()
    }
})


/**
 * Animate
 */
const clock = new THREE.Clock()
let time = Date.now()
let oldelapsedTime = 0;

const tick = () => {


if(parameters.starte_simulation == true ){
    
    let elapsedTime = clock.getElapsedTime()


    const deltatime = 0.000006
    physicsplanet.update(deltatime)



                             // samdem by planet //

    let vectort1 = new THREE.Vector3(
        PLANET.position.x - MOON1.position.x,
        PLANET.position.y - MOON1.position.y,
        PLANET.position.z - MOON1.position.z
    )
    let distance1 = vectort1.length() - (parameters.Plane_raduis + 1)
    if (distance1 <= 0) {
        sungroup.remove(MOON1)
    } else {
        MOON1.position.x = physicsmoon1.position.x / 1200000
        MOON1.position.y = physicsmoon1.position.y / 1200000
        MOON1.position.z = physicsmoon1.position.z / 1200000


    }

    let vectort2 = new THREE.Vector3(
        PLANET.position.x - MOON2.position.x,
        PLANET.position.y - MOON2.position.y,
        PLANET.position.z - MOON2.position.z
    )

    let distance2 = vectort2.length() - (parameters.Plane_raduis + 1)
    if (distance2 <= 0) {
        sungroup.remove(MOON2)
    } else {
        MOON2.position.x = physicsmoon2.position.x / 1200000
        MOON2.position.y = physicsmoon2.position.y / 1200000
        MOON2.position.z = physicsmoon2.position.z / 1200000


    }




    let vectort3 = new THREE.Vector3(
        PLANET.position.x - MOON3.position.x,
        PLANET.position.y - MOON3.position.y,
        PLANET.position.z - MOON3.position.z
    )

    let distance3 = vectort3.length() - (parameters.Plane_raduis + 1)
    if (distance3 <= 0) {
        sungroup.remove(MOON3)
        
    } else {
        MOON3.position.x = physicsmoon3.position.x / 1200000
        MOON3.position.y = physicsmoon3.position.y / 1200000
        MOON3.position.z = physicsmoon3.position.z / 1200000


    }


                              // samdem by satalits //
                            
    let distance_1_2 = check_sadm(
        PLANET.position,
        MOON1.position,
        MOON2.position
        )

    if (distance_1_2 <= 0.3) {
        console.log("ok_1_2",distance_1_2)
        console.log("physicsmoon1.Moon_mass",physicsmoon1.Moon_mass)
        console.log("physicsmoon2.Moon_mass",physicsmoon2.Moon_mass)
        if(physicsmoon1.Moon_mass-500000>0 ){
            physicsmoon1.Moon_mass = physicsmoon1.Moon_mass-500000
        }
        else {
            physicsmoon1.velocity.setLength(physicsmoon2.velocity.getLength() )
        }



        if(physicsmoon2.Moon_mass-500000>0 ){
            physicsmoon2.Moon_mass = physicsmoon2.Moon_mass-500000
        }
        else {
            physicsmoon2.velocity.setLength(physicsmoon1.velocity.getLength() )
        }
        PLANET1.material.color.set(0xff0000)
    }else{
        PLANET1.material.color.set(0x0000ff)
    }



    let distance_1_3 = check_sadm(
        PLANET.position,
        MOON1.position,
        MOON3.position
        )

    if (distance_1_3 <= 0.1) {
        console.log("ok_1_3",distance_1_3)
        if(physicsmoon1.Moon_mass-500000>0 ){
            physicsmoon1.Moon_mass = physicsmoon1.Moon_mass-500000
        }
        else {
            physicsmoon1.velocity.setLength(physicsmoon3.velocity.getLength() )
        }



        if(physicsmoon3.Moon_mass-500000>0 ){
            physicsmoon3.Moon_mass = physicsmoon3.Moon_mass-500000
        }
        else {
            physicsmoon3.velocity.setLength(physicsmoon1.velocity.getLength() )
        }


        PLANET2.material.color.set(0xff0000)
    }else{
        PLANET2.material.color.set(0x0000ff)
    }


    let distance_2_3 = check_sadm(
        PLANET.position,
        MOON2.position,
        MOON3.position
        )

    if (distance_2_3 <= 0.1) {
        console.log("ok_2_3",distance_2_3)

        // PLANET3.material.color.set(0xff0000)
    }else{
        // PLANET3.material.color.set(0x0000ff)
    }

}






    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
    // console.log(tick)
};

tick()

// const citizen = age >= 18 ? "Can vote" : "Cannot vote";













// const check_sadm = (planet_position,moon1_position,moon2_position) => {
//     let v1_x = PLANET.position.x  - MOON2.position.x
//     let v1_y = PLANET.position.y  - MOON2.position.y
//     let v1_z = PLANET.position.z  - MOON2.position.z
// let v1 = new THREE.Vector3(
//     v1_x,
//     v1_y,
//     v1_z,
// )

//     let v2_x = MOON1.position.x - PLANET.position.x
//     let v2_y = MOON1.position.y - PLANET.position.y
//     let v2_z = MOON1.position.z - PLANET.position.z
// let v2 = new THREE.Vector3(
//     v2_x,
//     v2_y,
//     v2_z,
// )

// let d = v1.add(v2)

// let distance = d.length() - 2

// console.log("mmmmmmmmmm",distance)

//     return distance
// }