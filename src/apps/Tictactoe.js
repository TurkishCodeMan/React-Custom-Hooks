import { useContext } from "react";
import { Context } from "./utils/ContextProvider";


function calculateStatus(winner, squares, nextValue) {
    return winner
        ? `Winner: ${winner}`
        : squares.every(Boolean)
            ? `Scratch: Cat's game`
            : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
    return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}


function Board({ squares, selectSquare, restart }) {
    // const [squares, setSquares] = useLocalStorage("board", Array(9).fill(null))
    // console.log("%cBoard Render", "color:BlueViolet")

    function renderSquare(i) {
        return (
            <button className="square" onClick={() => selectSquare(i)}>
                {squares[i]}
            </button>
        )
    }
    return (
        <div>
            <a className="mb-1" onClick={restart}>Restart</a>

            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>

        </div>
    )
}



const Tictactoe = () => {
    //console.log("%cApp Render", "color:MediumSpringGreen")
    const { squares, setPresent, addStep, state, setState } = useContext(Context)
    const nextValue = calculateNextValue(squares);
    const winner = calculateWinner(squares);
    const status = calculateStatus(winner, squares, nextValue)

    function selectSquare(square) {
        if (winner || squares[square]) {
            return;
        }
        const squaresCopy = [...squares];
        squaresCopy[square] = nextValue;
        setPresent(squaresCopy);
        addStep(Object.values(state).length, squaresCopy);
    }
    function restart() {
        setState();
    }
    const steps = Object.keys(state).map((stepSquares, step) => {
        const desc = step ? `Go to move #${step}` : 'Go to game start'
        const isCurrentStep = stepSquares !== 'present' && JSON.stringify(state[stepSquares]) === JSON.stringify(squares);

        return (
            <div key={step}>
                {stepSquares !== `present` &&
                    <li>
                        <button
                            className={`bg-gray-300 px-6 py-2 my-1 ${isCurrentStep ? 'bg-blue-200' : ''}`}
                            disabled={isCurrentStep} onClick={() => setPresent(state[stepSquares])}>
                            {desc} {isCurrentStep ? '(current)' : null}
                        </button>
                    </li>
                }
            </div>
        )


    })

    return (

        <div className="game">

            <div className="game-board">
                <Board squares={squares} restart={restart} selectSquare={selectSquare} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{steps}</ol>
            </div>

        </div>

    )
}

export default Tictactoe;;