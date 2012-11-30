//let _  = require "underscore"
//import "./scene"
var sphere1 = {
    "position": {
        "x": 1,
        "y": 2,
        "z": 3
    },
    "radius": 2.0,
    "color": {
        "red": 1.0,
        "green": 2.0,
        "blue": 3.0
    },
    "diffuse": {
        "red": 1.0,
        "green": 2.0,
        "blue": 3.0
    }
};
var sphere2 = {
    "position": {
        "x": 21,
        "y": 13,
        "z": 17
    },
    "radius": 3.0,
    "color": {
        "red": 1.0,
        "green": 2.0,
        "blue": 3.0
    },
    "diffuse": {
        "red": 1.0,
        "green": 2.0,
        "blue": 3.0
    }
};
var light1 = {
    "position": {
        "x": 4,
        "y": 5,
        "z": 6
    },
    "color": {
        "red": 22,
        "green": 33,
        "blue": 33
    }
};
var ambientLight1 = {
    "position": {
        "x": 4,
        "y": 5,
        "z": 6
    },
    "color": {
        "red": 22,
        "green": 33,
        "blue": 33
    }
};
var ray1 = {
    "position": {
        "x": 2,
        "y": 3,
        "z": 4
    },
    "direction": {
        "x": 1,
        "y": 2,
        "z": 3
    }
};
//let finalColor = scene.computeColor(12)(ray1)(sphere1)(light1)(ambientLight1)
//let minned = scene.getClosestSphere(ray1)([sphere1, sphere2])
var s = scene.getClosestSphere(ray1, [sphere1, sphere2]);
console.log(s);
//@ sourceMappingURL=tracer.js.map
