// use this site to calculate distance for those examples: 
// https://www.calculator.net/distance-calculator.html?x11=-1.5&y11=1.5&x12=1.5&y12=0&type=1&x=Calculate
const {computeIBeaconObjCoords} = require('./computeCoords'); 
const {Coord} = require('./Coord'); 

const coords = [
    new Coord(xAxis = 1.5, yAxis = 1.5), 
    new Coord(xAxis = -1.5, yAxis = -1.5), 
    new Coord(xAxis = -1.5, yAxis = 1.5)
]
const distances1 = [2.12, 2.12, 2.12];
const result1 = computeIBeaconObjCoords(coords, distances1);

console.log("Estimated Position:", result1);
// Estimated Position: (0, 0): 5atr teb3d nefs position 3la 3 raspberry (2.12)


const distances2 = [1.5, 3.34, 3.34];
const result2 = computeIBeaconObjCoords(coords, distances2);

console.log("Estimated Position:", result2);
// Expected Output: (1.5, 0)
