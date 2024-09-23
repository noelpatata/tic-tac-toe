import { useState } from "react"
import c from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { saveGameStorage, restartGameStorage  } from "./LocalStorageManager.js"



function App() {
  const [board, setBoard] = useState(() => {

    const boardFromStorage = window.localStorage.getItem('board')

    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)

  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const horizontalCheck = (boardToCheck) => {
    for (let i = 0; i < boardToCheck.length; i++) {
      if (
        (i % 3) === 0 &&
        i != boardToCheck.length - 1
      ) {
        if (
          boardToCheck[i] &&
          boardToCheck[i] === boardToCheck[i + 1] &&
          boardToCheck[i] === boardToCheck[i + 2]
        ) {
          return boardToCheck[i]
        }
      }

    }
    return null
  }
  const verticalCheck = (boardToCheck) => {
    for (let i = 0; i < boardToCheck.length; i++) {
      if (i <= 2) {
        if (
          boardToCheck[i] &&
          boardToCheck[i] === boardToCheck[i + 3] &&
          boardToCheck[i] === boardToCheck[i + 6]
        ) {
          return boardToCheck[i]
        }
      }


    }
    return null
  }
  const diagonalCheck = (boardToCheck) => {
    for (let i = 0; i < boardToCheck.length; i++) {
      if (i === 0) {
        if (
          boardToCheck[i] &&
          boardToCheck[i] === boardToCheck[i + 4] &&
          boardToCheck[i] === boardToCheck[i + 8]
        ) {
          return boardToCheck[i]
        }
      }
      if (i === 2) {
        if (
          boardToCheck[i] &&
          boardToCheck[i] === boardToCheck[i + 2] &&
          boardToCheck[i] === boardToCheck[i + 4]
        ) {
          return boardToCheck[i]
        }
      }



    }
    return null
  }

  const restartGameClick = () => {
    setWinner(null)
    setBoard(Array(9).fill(null))
    restartGameStorage()
    
  }

  const checkWinner = (boardToCheck) => {

    if (horizontalCheck(boardToCheck)) return horizontalCheck(boardToCheck)
    if (verticalCheck(boardToCheck)) return verticalCheck(boardToCheck)
    if (diagonalCheck(boardToCheck)) return diagonalCheck(boardToCheck)

  }

  const checkDraw = (newBoard) => {
    return newBoard.every((s) => s != null)
  }

  const updateBoard = (index) => {

    if (board[index] || winner) {
      return
    }

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameStorage({
      b : newBoard,
      t : newTurn
    })

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      c()
      setWinner(newWinner)
    } else if(checkDraw(newBoard)){
      setWinner(false)
    }


  }

  return (
    
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button className="restartButton" onClick={restartGameClick}>Reset</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>

            )
          })
        }

      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {
        winner != null && (
          <section className="winner">
            <div>
              <h2>
              {
                winner === false
                  ? 'Empate'
                  : 'Gano:'
              }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button className="restartButton" onClick={restartGameClick}>Empezar de nuevo</button>
              </footer>
              
            </div>
          </section>
        )
      }

    </main>

  )
}

export default App
