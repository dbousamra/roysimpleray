var arrayMonad = {
    "return": function(x) {
        return [x];
    },
    "bind": function(x, f) {
        return Array.prototype.concat.apply([], x.map(f));
    }
};
var colorOps = {
    "mult": function(color1, color2) {
        return {
            "red": (color1.red * color2.red),
            "green": (color1.green * color2.green),
            "blue": (color1.blue * color2.blue)
        };
    },
    "add": function(color1, color2) {
        return {
            "red": (color1.red + color2.red),
            "green": (color1.green + color2.green),
            "blue": (color1.blue + color2.blue)
        };
    },
    "multD": function(color1, double) {
        return {
            "red": (color1.red * double),
            "green": (color1.green * double),
            "blue": (color1.blue * double)
        };
    },
    "toRGB": function(color) {
        return {
            "red": (color.red * 255),
            "green": (color.green * 255),
            "blue": color.blue * 255
        };
    }
};
var vectorOps = {
    "mult": function(vec1, vec2) {
        return {
            "x": (vec1.x * vec2.x),
            "y": (vec1.y * vec2.y),
            "z": (vec1.z * vec2.z)
        };
    },
    "add": function(vec1, vec2) {
        return {
            "x": (vec1.x + vec2.x),
            "y": (vec1.y + vec2.y),
            "z": (vec1.z + vec2.z)
        };
    },
    "sub": function(vec1, vec2) {
        return {
            "x": (vec1.x - vec2.x),
            "y": (vec1.y - vec2.y),
            "z": (vec1.z - vec2.z)
        };
    },
    "div": function(vec1, vec2) {
        return {
            "x": (vec1.x / vec2.x),
            "y": (vec1.y / vec2.y),
            "z": (vec1.z / vec2.z)
        };
    },
    "multD": function(vec1, double) {
        return {
            "x": (vec1.x * double),
            "y": (vec1.y * double),
            "z": (vec1.z * double)
        };
    },
    "divD": function(vec1, double) {
        return {
            "x": (vec1.x / double),
            "y": (vec1.y / double),
            "z": (vec1.z / double)
        };
    },
    "dot": function(vec1, vec2) {
        return (vec1.x * vec2.x) + (vec1.y * vec2.y) + (vec1.z * vec2.z);
    }
};
var intersectRay = function(ray, sphere) {
    var v = vectorOps.sub(sphere.position, ray.position);
    var temp = vectorOps.mult(v, ray.direction);
    var a = temp.x + temp.y + temp.z;
    var temp2 = vectorOps.mult(v, v);
    var b = (temp2.x + temp2.y + temp2.z) - (sphere.radius * sphere.radius);
    var c = a * a - b;
    return (function() {
        if(c >= 0) {
            return a - Math.sqrt(c);
        } else {
            return (Number.POSITIVE_INFINITY);
        }
    })();
};
var length = function(vec1) {
    return Math.sqrt(lengthSquared(vec1));
};
var normal = function(Ops, vec1) {
    return Ops.divD(vec1, length(vec1));
};
var lengthSquared = function(vec1) {
    var t = vectorOps.mult(vec1, vec1);
    return t.x + t.y + t.z;
};
var computeColor = function(hitAngle, ray, sphere, light, ambientLight) {
    return (function() {
        if(hitAngle == (Number.POSITIVE_INFINITY)) {
            return {
                "red": 1.0,
                "green": 1.0,
                "blue": 1.0
            };
        } else {
            var vectorCoefficent = vectorOps.add(ray.position, vectorOps.multD(ray.direction, hitAngle));
            var lightCoefficent = normal(vectorOps, vectorOps.sub(light.position, sphere.position));
            var positionCoefficient = normal(vectorOps, vectorOps.sub(vectorCoefficent, sphere.position));
            var t = vectorOps.mult((lightCoefficent), (positionCoefficient));
            var shadedCoefficient = t.x + t.y + t.z;
            //Is this LISP?;
            return colorOps.mult((sphere.color), colorOps.add(colorOps.multD((light.color), Math.max(shadedCoefficient, 0)), (ambientLight.color)));
        }
    })();
};
var getObjectColor = function(scene, object, ray) {
    var hitAngle = intersectRay(ray, object);
    return computeColor(hitAngle, ray, object, scene.lights[0], scene.ambientLight);
};
var getClosestSphere = function(ray, spheres) {
    return _.head(_.sortBy((spheres), function(s) {
        return intersectRay(ray, s);
    }));
};
var rayTrace = function(scene, pixelx, pixely) {
    var ray = {
        "position": {
            "x": pixelx,
            "y": pixely,
            "z": -1000
        },
        "direction": normal(vectorOps, ({
            "x": 0,
            "y": 0,
            "z": 1
        }))
    };
    var closestSphere = getClosestSphere(ray, scene.objects);
    var finalColor = getObjectColor(scene, closestSphere, ray);
    return {
        "x": pixelx,
        "y": pixely,
        "color": colorOps.toRGB((finalColor))
    };
};
var traceScene = function(scene, width, height) {
    var array1 = _.range((height));
    var array2 = _.range((width));
    return (function(){
        var __monad__ = arrayMonad;
        
        return __monad__.bind(array1, function(y) {
            
            return __monad__.bind(array2, function(x) {
                
                return __monad__.return(rayTrace(scene, x, y));
            });
        });
    })();
};
//@ sourceMappingURL=tracer.js.map
