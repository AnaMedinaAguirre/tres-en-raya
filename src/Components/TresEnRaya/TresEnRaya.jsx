import React, { useState } from 'react';
import './TresEnRaya.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TresEnRaya = () => {
    // Estados para manejar el juego
    const [count, setCount] = useState(0); // Contador de turnos
    const [lock, setLock] = useState(false); // Bloquear el juego cuando hay un ganador
    const [boxes, setBoxes] = useState(Array(9).fill("")); // Estado de las cajas
    const [winnerMessage, setWinnerMessage] = useState(""); // Mensaje del ganador

    // Función para manejar el clic en una caja
    const toggle = (num) => {
        if (lock || boxes[num] !== "") {
            return; // Si el juego está bloqueado o la caja ya está ocupada, no hacer nada
        }

        const newBoxes = [...boxes];
        newBoxes[num] = count % 2 === 0 ? "x" : "o"; // Alternar entre "x" y "o"
        setBoxes(newBoxes);
        setCount(count + 1);
        checkWin(newBoxes);
    };

    // Función para verificar si hay un ganador
    const checkWin = (boxes) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
            [0, 4, 8], [2, 4, 6]             // Diagonales
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
                won(boxes[a], combination); // Si hay un ganador, llamar a la función won
                return;
            }
        }

        // Si todas las cajas están ocupadas y no hay ganador, es un empate
        if (boxes.every(box => box !== "")) {
            setWinnerMessage("¡Es un empate!");
            setLock(true);
        }
    };

    // Función para manejar el caso en que hay un ganador
    const won = (winner, combination) => {
        setLock(true); // Bloquear el juego
        setWinnerMessage(`Felicidades: <img src=${winner === "x" ? cross_icon : circle_icon}>`);

        // Agregar clase a las cajas ganadoras
        combination.forEach((index) => {
            document.getElementById(`box-${index}`).classList.add('winner-box');
        });
    };

    // Función para reiniciar el juego
    const reset = () => {
        setLock(false); // Desbloquear el juego
        setBoxes(Array(9).fill("")); // Reiniciar las cajas
        setWinnerMessage(""); // Reiniciar el mensaje del ganador
        setCount(0); // Reiniciar el contador de turnos

        // Remover la clase de las cajas ganadoras
        for (let i = 0; i < 9; i++) {
            document.getElementById(`box-${i}`).classList.remove('winner-box');
        }
    };

    return (
        <div className='container'>
            {/* Título del juego */}
            <h1 className="title" dangerouslySetInnerHTML={{ __html: winnerMessage || "Juego de Tres En Raya en <span>React</span>" }}></h1>

            {/* Tablero de juego */}
            <div className="board">
                <div className="row1">
                    <div id="box-0" className="boxes" onClick={() => toggle(0)}>
                        {boxes[0] && <img src={boxes[0] === "x" ? cross_icon : circle_icon} alt="icon" />}
                    </div>
                    <div id="box-1" className="boxes" onClick={() => toggle(1)}>
                        {boxes[1] && <img src={boxes[1] === "x" ? cross_icon : circle_icon} alt="icon" />}
                    </div>
                    <div id="box-2" className="boxes" onClick={() => toggle(2)}>
                        {boxes[2] && <img src={boxes[2] === "x" ? cross_icon : circle_icon} alt="icon" />}
                    </div>
                </div>
                <div className="row2">
                    <div id="box-3" className="boxes" onClick={() => toggle(3)}>
                        {boxes[3] && <img src={boxes[3] === "x" ? cross_icon : circle_icon} alt="icon" />}
                    </div>
                    <div id="box-4" className="boxes" onClick={() => toggle(4)}>
                        {boxes[4] && <img src={boxes[4] === "x" ? cross_icon : circle_icon} alt="icon" />}
                    </div>
                    <div id="box-5" className="boxes" onClick={() => toggle(5)}>
                        {boxes[5] && <img src={boxes[5] === "x" ? cross_icon : circle_icon} alt="icon" />}
                    </div>
                </div>
                <div className="row3">
                    <div id="box-6" className="boxes" onClick={() => toggle(6)}>
                        {boxes[6] && <img src={boxes[6] === "x" ? cross_icon : circle_icon} alt="icon" />}
                    </div>
                    <div id="box-7" className="boxes" onClick={() => toggle(7)}>
                        {boxes[7] && <img src={boxes[7] === "x" ? cross_icon : circle_icon} alt="icon" />}
                    </div>
                    <div id="box-8" className="boxes" onClick={() => toggle(8)}>
                        {boxes[8] && <img src={boxes[8] === "x" ? cross_icon : circle_icon} alt="icon" />}
                    </div>
                </div>
            </div>

            {/* Botón para reiniciar el juego */}
            <button className="reset" onClick={reset}>Reiniciar</button>
        </div>
    );
};

export default TresEnRaya;