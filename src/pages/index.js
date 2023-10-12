import React, { useState, useEffect } from 'react';

export default function Home() {
  const [playerOne, setPlayerOne] = useState(true); // Use state to track the current player
  const [squares, setSquares] = useState(Array(9).fill(null)); // Use state to track the board state
  const [gameResult, setGameResult] = useState(null); // Use state to track the game result

  useEffect(() => {
    // Check for a winner after each move
    checkWinner();
  }, [squares]);

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setGameResult(`Player ${squares[a]} wins!`);
        return;
      }
    }

    // Check for a draw
    if (!squares.includes(null)) {
      setGameResult('It is a draw!');
    }
  };

  const handleClick = (index) => {
    if (squares[index] || gameResult) {
      // If the square is already filled or the game is over, do nothing
      return;
    }

    const newSquares = [...squares];
    newSquares[index] = playerOne ? 'X' : 'O';
    setSquares(newSquares);
    setPlayerOne(!playerOne); // Switch players
  };

  // Render the board
  const renderSquare = (index) => (
    <button
      className="hover:bg-yellow-400 w-full h-full"
      onClick={() => handleClick(index)}
    >
      {squares[index]}
    </button>
  );

  return (
    <div>
      <h1 className='text-5xl	text-center	'>
          <span className='text-yellow-300	'>TIC</span>
          <span>TAC</span>
          <span className='text-yellow-300	'>TOE</span>
        </h1>
        <div>
        {playerOne?
        <p className='m-6 text-3xl text-center'>X player turn</p>
          :
          <p className='m-6 text-3xl text-center'>O player turn</p>
        }
        </div>
      <div className="absolute inset-x-0	inset-y-0	 m-auto	w-6/12	h-80	grid grid-cols-3">
        
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <div  className={`${
              index === 0 || index === 1|| index === 3||index === 4||index === 6||index === 7 ? 'border-r-4 border-white' : ''
            }`} key={index}>
              {renderSquare(index)}
            </div>
          ))}
      </div>
      {gameResult?
        <div style={{backgroundColor:'rgba(231,231,231,0.6)'}} className='absolute w-7/12	text-center	text-2xl	h-2/6	  top-1/3 inset-x-0	m-auto'>
          <p style={{"margin-top": "15%",
    "color": "greenyellow",
    "font-size": "larger",
    "font-weight": "bolder"}}className='mt-1/2'>{gameResult}</p>
          </div>
        :null}
    </div>
  );
}
