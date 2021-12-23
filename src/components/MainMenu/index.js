import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Menu = ({ fps, setFps, initCells, setInitCells, radius, setRadius }) => {
  const changeRadius = (e) => {
    const maxRadius = 3;
    const minRadius = 1;

    switch (e.currentTarget.className) {
      case "decrement":
        radius === minRadius ? setRadius(maxRadius) : setRadius(radius - 1);
        break;
      case "increment":
        radius === maxRadius ? setRadius(minRadius) : setRadius(radius + 1);
        break;
      default:
        break;
    }
  };

  const changeFps = (e) => {
    const maxFps = 15;
    const minFps = 1;

    switch (e.currentTarget.className) {
      case "decrement":
        fps === minFps ? setFps(maxFps) : setFps(fps - 1);
        break;
      case "increment":
        fps === maxFps ? setFps(minFps) : setFps(fps + 1);
        break;
      default:
        break;
    }
  };

  const changeInitCells = (e) => {
    const maxInitCells = 50;
    const minInitCells = 3;

    switch (e.currentTarget.className) {
      case "decrement":
        initCells === minInitCells
          ? setInitCells(maxInitCells)
          : setInitCells(initCells - 1);
        break;
      case "increment":
        initCells === maxInitCells
          ? setInitCells(minInitCells)
          : setInitCells(initCells + 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className='menu'>
      <h1>The Game of Life</h1>
      <div className='options'>
        <div className='fps-container'>
          <p>FPS</p>
          <div className='number-picker'>
            <button className='decrement' onClick={changeFps}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input type='number' readOnly value={fps} />
            <button className='increment' onClick={changeFps}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className='init-cells-container'>
          <p>Initial Cells</p>
          <div className='number-picker'>
            <button className='decrement' onClick={changeInitCells}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input type='number' readOnly value={initCells} />
            <button className='increment' onClick={changeInitCells}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className='radius-container'>
          <p>Radius</p>
          <div className='number-picker'>
            <button className='decrement' onClick={changeRadius}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input type='number' readOnly value={radius} />
            <button className='increment' onClick={changeRadius}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
      <div className='btn-controls'>
        <Link to='/dashboard' className='start-btn'>
          Play Game
        </Link>
      </div>
    </div>
  );
};

export default Menu;
