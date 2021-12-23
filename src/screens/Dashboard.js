import DashScreen from "../components/Dashboard/dash_screen";
import Board from "../components/Dashboard/board";
import ControlsPanel from "../components/Dashboard/controls_panel";

import { useEffect, useState, useContext, useRef } from "react";
import {
  InitCellsContent,
  FpsContent,
  RadiusContent,
  ModalContent,
} from "../App";

const Dashboard = () => {
  const [cells, setCells] = useState([]);
  const { initCells } = useContext(InitCellsContent);
  const { fps } = useContext(FpsContent);
  const { radius } = useContext(RadiusContent);
  const setModal = useContext(ModalContent);
  const [cellsLeft, setCellsLeft] = useState(initCells);
  const [gameState, setGameState] = useState(0);
  const [gensBorn, setGensBorn] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    function countNeighbors(row, col) {
      const rows = 12;
      const cols = 28;
      let counter = 0;

      // Loop over all columns that are in cell's radius
      for (let i = 0 + -1 * radius; i < 1 + radius; i++) {
        if (col + i >= 0 && col + i < cols) {
          // Cells on rows above
          for (let j = 0; j < radius; j++) {
            if (row > j && cells[row - j - 1][col + i] === 1) {
              counter++;
            }
          }

          // Cells on rows below
          for (let j = 0; j < radius; j++) {
            if (row < rows - 1 - j && cells[row + j + 1][col + i] === 1) {
              counter++;
            }
          }
        }
      }

      // Cells on left
      for (let i = 0; i < radius; i++) {
        if (col - 1 - i >= 0 && cells[row][col - 1 - i] === 1) {
          counter++;
        }
      }

      // Cells on right
      for (let i = 0; i < radius; i++) {
        if (col + 1 + i < cols && cells[row][col + 1 + i] === 1) {
          counter++;
        }
      }

      return counter;
    }

    if (gameState === 0 && timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    if (gameState === 1 && cells.length > 0) {
      timer.current = setTimeout(() => {
        let isEnd = false;

        setCells((prevState) => {
          if (prevState.every((row) => row.every((col) => col === 0))) {
            isEnd = true;
            setGameState(0);

            return prevState;
          }

          let newCells = [];

          prevState.forEach((row, rowIndex) => {
            let newRow = [];

            row.forEach((col, colIndex) => {
              let cellState = col;
              let neighborsCount = countNeighbors(rowIndex, colIndex);

              if (cellState === 0 && neighborsCount === 3) {
                cellState = 1;
              } else if (
                cellState === 1 &&
                (neighborsCount > 3 || neighborsCount < 2)
              ) {
                cellState = 0;
              }

              newRow.push(cellState);
            });

            newCells.push(newRow);
          });

          return newCells;
        });

        if (!isEnd) {
          setGensBorn((prevState) => ++prevState);
        }

        if (isEnd) {
          setModal({
            isShown: true,
            message: "Game is Over",
          });
        }
      }, 1000 / fps);
    }

    return () => {
      clearTimeout(timer.current);
      timer.current = null;
    };
  }, [cells, gameState, fps, radius, setModal]);

  return (
    <DashScreen>
      <Board
        cells={cells}
        setCells={setCells}
        initCells={initCells}
        gensBorn={gensBorn}
        cellsLeft={cellsLeft}
        setCellsLeft={setCellsLeft}
      />
      <ControlsPanel
        cells={cells}
        setCells={setCells}
        initCells={initCells}
        gameState={gameState}
        setGameState={setGameState}
        setGensBorn={setGensBorn}
        cellsLeft={cellsLeft}
        setCellsLeft={setCellsLeft}
      />
    </DashScreen>
  );
};

export default Dashboard;
