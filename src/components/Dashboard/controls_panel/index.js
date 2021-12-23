import { useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { ModalContent } from "../../../App";

const ControlsPanel = ({
  setCells,
  initCells,
  gameState,
  setGameState,
  setGensBorn,
  cellsLeft,
  setCellsLeft,
}) => {
  const startGameBtn = useRef(null);
  const setModal = useContext(ModalContent);

  const emptyCells = () => {
    const emptyCells = [];

    for (let i = 0; i < 12; i++) {
      const subEmptyCells = [];
      subEmptyCells.length = 28;
      subEmptyCells.fill(0);

      emptyCells.push(subEmptyCells);
    }

    setGameState(0);
    setCells(emptyCells);
    setCellsLeft(initCells);
    setGensBorn(0);
    setModal({ isShown: true, message: "Game has been reset" });
  };

  const changeGameState = () => {
    if (cellsLeft === 0) {
      setGameState((prevState) => +!prevState);
    } else {
      setModal({
        isShown: true,
        message: "Not all initial cells have been put into grid",
      });
    }
  };

  useEffect(() => {
    startGameBtn.current.innerText =
      gameState === 1 ? "Pause Game" : "Start Game";
  }, [gameState]);

  return (
    <div className='controls-panel'>
      <button
        className='start-game-btn'
        onClick={changeGameState}
        ref={startGameBtn}
      >
        Start Game
      </button>
      <button className='restart-btn' onClick={emptyCells}>
        <FontAwesomeIcon icon={faRedo} />
      </button>
      <Link to='/' className='back-to-mm'>
        Back to Main Menu
      </Link>
    </div>
  );
};

export default ControlsPanel;
