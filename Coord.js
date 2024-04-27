// RaspBerry cordinates 
class Coord {
    constructor(xAxis, yAxis) {
        this.xAxis = xAxis;
        this.yAxis = yAxis;
    }
}; 

// Examples of positions of the 3 Raspberry 
const coordR1 = new Coord(xAxis = 1.5, yAxis = 1.5);
const coordR2 = new Coord(xAxis = -1.5, yAxis = -1.5);
const coordR3 = new Coord(xAxis = 1.5, yAxis = -1.5); 

module.exports = {Coord, coordR1, coordR2, coordR3};
