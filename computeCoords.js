// Import needs 
const {Coord, coordR1, coordR2, coordR3} = require('./Coord'); 

/**
 * Estimates the position of an iBeacon based on distances from known coordinates.

 * @param {Array<Coord>} coords - An array of Coord
 * @param {Array<number>} distances - An array of distances from each known position to the iBeacon.
 * @param {number} [iterations=10000] - The number of iterations to perform in the gradient descent.
 * @param {number} [learningRate=0.01] - The learning rate or step size for the gradient descent.
 * @returns {Coord} - A Coord instance representing the estimated position of the iBeacon.
 */

function computeIBeaconObjCoords(coords, distances, iterations = 10000, learningRate = 0.01) {
    let positions = coords.map(coord => [coord.xAxis, coord.yAxis]);

    let estimatedPosition = positions.reduce((acc, pos) => [acc[0] + pos[0], acc[1] + pos[1]], [0, 0])
        .map(sum => sum / positions.length);

    for (let i = 0; i < iterations; i++) {
        let gradients = [0, 0];
        positions.forEach((pos, index) => {
            const distanceToPos = Math.sqrt((estimatedPosition[0] - pos[0]) ** 2 + (estimatedPosition[1] - pos[1]) ** 2);
            if (distanceToPos !== 0) {
                const grad = [
                    (distanceToPos - distances[index]) * (estimatedPosition[0] - pos[0]) / distanceToPos,
                    (distanceToPos - distances[index]) * (estimatedPosition[1] - pos[1]) / distanceToPos
                ];
                gradients[0] += grad[0];
                gradients[1] += grad[1];
            }
        });

        estimatedPosition[0] -= learningRate * gradients[0];
        estimatedPosition[1] -= learningRate * gradients[1];
    }

    return new Coord(estimatedPosition[0].toFixed(1), estimatedPosition[1].toFixed(1));
}

module.exports = {computeIBeaconObjCoords}
