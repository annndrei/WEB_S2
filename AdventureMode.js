import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gamescreen.css';

const GameScreen = ({ mode, onReturn }) => {
  const [level, setLevel] = useState(0);
  const totalLevels = 5;
  const [pathPoints, setPathPoints] = useState([]);

  useEffect(() => {
    generatePathPoints();
  }, []);

  const generatePathPoints = () => {
    const width = 600;
    const height = 500;
    let points = [];

    for (let i = 0; i < totalLevels; i++) {
      let x = 100 + (i * (width - 200)) / (totalLevels - 1);
      let y = Math.random() * (height - 200) + 100;
      points.push({ x, y });
    }

    setPathPoints(points);
  };

  const pathD = `M${pathPoints.map(p => `${p.x},${p.y}`).join(' ')}`;

  const startLevel = (lvl) => {
    if (lvl === level) {
      setLevel((prev) => Math.min(prev + 1, totalLevels - 1));
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌍 Adventure Mode</h1>
      <svg width="600" height="500" style={styles.svg}>
        <path d={pathD} stroke="black" fill="none" strokeWidth="8" strokeLinecap="round" />
        
        {pathPoints.map((point, index) => (
          <g key={index}>
            <circle cx={point.x} cy={point.y} r="25" fill={index === level ? '#74ebd5' : '#ddd'} />
            {index === level && (
              <text x={point.x - 10} y={point.y + 5} fontSize="20px">🧑‍🚀</text>
            )}
          </g>
        ))}

        {/* Trophy at the end */}
        {pathPoints.length > 0 && (
          <text x={pathPoints[pathPoints.length - 1].x - 10} 
                y={pathPoints[pathPoints.length - 1].y - 30} 
                fontSize="30px">
            🏆
          </text>
        )}
      </svg>

      {/* Buttons at the bottom */}
      <div>
        {pathPoints.map((_, index) => (
          <button
            key={index}
            style={styles.button}
            onClick={() => startLevel(index)}
            disabled={index !== level}
          >
            Start Level {index + 1}
          </button>
        ))}
      </div>

      <button style={styles.returnButton} onClick={onReturn}>Return</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #74ebd5, #acb6e5)',
    fontFamily: "'Poppins', sans-serif",
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    color: '#fff',
    marginBottom: '20px',
    textAlign: 'center',
  },
  svg: {
    marginBottom: '20px',
    background: '#fff',
    borderRadius: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#74ebd5',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '5px',
  },
  returnButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default GameScreen;
