import { useContext, useEffect } from "react";
import Cell from "../cell";
import { ModalContent } from "../../../App";

const Board = ({
  cells,
  setCells,
  initCells,
  gensBorn,
  cellsLeft,
  setCellsLeft,
}) => {
  const setModal = useContext(ModalContent);

  const changeCellState = (rowIndex, colIndex) => {
    if (gensBorn > 0) {
      setModal({
        isShown: true,
        message: "Cannot change cells after the game has started",
      });
      return;
    }

    const newState = [...cells];

    let cellsOnBoard = 0;

    newState.forEach((row) => {
      row.forEach((el) => {
        if (el === 1) {
          cellsOnBoard++;
        }
      });
    });

    if (newState[rowIndex][colIndex] === 0 && cellsOnBoard < initCells) {
      newState[rowIndex][colIndex] = 1;
      cellsOnBoard++;
    } else if (newState[rowIndex][colIndex] === 1) {
      newState[rowIndex][colIndex] = 0;
      cellsOnBoard--;
    }

    setCellsLeft(initCells - cellsOnBoard);
    setCells(newState);
  };

  useEffect(() => {
    const generate2DArray = () => {
      const array = [];

      for (let i = 0; i < 12; i++) {
        const subArray = [];
        subArray.length = 28;
        subArray.fill(0);

        array.push(subArray);
      }

      return array;
    };

    setCells(generate2DArray());
  }, [setCells]);

  return (
    <div className='board'>
      <div className='info-container'>
        <span className='cells-left'>Cells Left ({cellsLeft})</span>
        <span className='gens-born'>Generations Born ({gensBorn})</span>
      </div>
      <div className='grid'>
        {cells.map((row, rowIndex) => {
          return row.map((el, colIndex) => {
            return (
              <Cell
                key={`${rowIndex}${colIndex}`}
                rowIndex={rowIndex}
                colIndex={colIndex}
                className={el === 0 ? "cell dead" : "cell alive"}
                setNewState={changeCellState}
              />
            );
          });
        })}
      </div>
    </div>
  );
};

export default Board;
