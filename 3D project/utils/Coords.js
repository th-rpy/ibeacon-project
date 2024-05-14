// RaspBerry cordinates 
class Coord {
    constructor(xAxis, yAxis) {
        this.xAxis = xAxis;
        this.yAxis = yAxis;
    }
}; 

// Examples of positions of the 3 Raspberry 
const coordR1 = new Coord(6, 6);
const coordR2 = new Coord(-6, -6);
const coordR3 = new Coord(-6, 6); 

export {Coord, coordR1, coordR2, coordR3};