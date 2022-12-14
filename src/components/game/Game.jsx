import { useState, useEffect } from 'react'

import styles from './Game.module.css'
import GameOption from '../gameOption/GameOption'
import GameInfo from '../gameinfo/GameInfo'
import Score from '../score/Score'

const winnerTable = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function Game () {

  const [gameState, setGameState] = useState(Array(9).fill(0))
  const [currentPlayer, setCurrentPlayer] = useState(-1)
  const [winner, setWinner] = useState(0)
  const [winnerLine, setWinnerLine] = useState([])
  const [draw, setDraw] = useState(false)
  const [circlePoint, setCirclePoint] = useState(0)
  const [xPoint, setXPoint] = useState(0)

  const handleClick = (pos) => {
    if (gameState[pos] === 0 && winner === 0) {
      let newGameState = [...gameState]
      newGameState[pos] = currentPlayer
      setGameState(newGameState)
    }
  }

  const verifyGame = () => {
    winnerTable.forEach((line) => {
      const values = line.map((pos) => gameState[pos])
      const sum = values.reduce((acc, value) => acc + value)
      if (sum === 3 || sum === -3) {
        setWinner(sum / 3)
        setWinnerLine(line)
        sum > 0 ? setCirclePoint(circlePoint + 1) : setXPoint(xPoint + 1)
      }
    })
  }

  const handleReset = () => {
    setGameState(Array(9).fill(0))
    setWinner(0)
    setWinnerLine([])
    setDraw(false)
  }

  const verifyDraw = () => {
    if (gameState.find((value) => value === 0) === undefined && winner === 0) {
      setDraw(true)
    }
  }

  const verifyWinnerLine = (pos) => {
    return winnerLine.find((value) => value === pos) !== undefined
  }

  // O useEffect sempre terá dois parâmetros. O primeiro é uma função
  // e o segundo é um array:

  useEffect(() => {
    setCurrentPlayer(currentPlayer * -1)
    verifyGame()
    verifyDraw()
  }, [gameState])

  useEffect(() => {
    if (winner !== 0) setDraw(false)
  }, [winner])

  return (
    <>
      <div className={styles.gameContent}>
        <div className={styles.game}>
          {
            gameState.map((value, pos) =>
              <GameOption 
                key={`game-option-pos-${pos}`}s
                status={value}
                onClick={() => handleClick(pos)}
                isWinner={verifyWinnerLine(pos)}
                isDraw={draw}
              />
            )
          }
        </div>
        <GameInfo
          currentPlayer={currentPlayer}
          winner={winner}
          onReset={handleReset}
          isDraw={draw}
        />
      </div>
      <Score 
        circlePoint={circlePoint}
        xPoint={xPoint}
      />
    </>
  )
}

export default Game