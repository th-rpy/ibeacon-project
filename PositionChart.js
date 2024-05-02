import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js';
import { computeIBeaconObjCoords } from './computCoords.js'; // Assurez-vous que le chemin est correct

function App() {
  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);
  const chartRef = useRef(null); // Référence au graphique

  useEffect(() => {
    // Calcul des résultats
    const coords = [
      { xAxis: 1.5, yAxis: 1.5 },
      { xAxis: -1.5, yAxis: -1.5 },
      { xAxis: -1.5, yAxis: 1.5 }
    ];

    const distances1 = [2.12, 2.12, 2.12];
    setResult1(computeIBeaconObjCoords(coords, distances1));

    const distances2 = [1.5, 3.34, 3.34];
    setResult2(computeIBeaconObjCoords(coords, distances2));
  }, []);

  useEffect(() => {
    if (result1 && result2) {
        // Destruction du graphique existant s'il existe
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Création du nouveau graphique
      const ctx = document.getElementById('coordinateChart').getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Point de coordonnées ',
            backgroundColor: 'red',
            borderColor: 'red',
            data: [{ x: result1.x, y: result1.y }, { x: result2.x, y: result2.y }]
          }]
        },
        options: {
          scales: {
            xAxes: {

              type: 'category', // Type d'axe
              position: 'bottom', // Position de l'axe
              title: {
                display: true,

              text: 'Catégories'
              }
            },
            yAxes: {
              type: 'linear', // Type d'axe
              position: 'left', // Position de l'axe
              title: {
                display: true,
                text: 'Valeurs'
              },
              ticks: {
                beginAtZero: true // Commencer l'axe à zéro
              }
            }
          }
        }
      });
    }
  }, [result1, result2]);

  return (
    <div>
      <canvas id="coordinateChart" width="700" height="700"></canvas>
    </div>
  );
}

export default App;
