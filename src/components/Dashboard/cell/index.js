const Cell = ({ rowIndex, colIndex, className, setNewState }) => {
  const changeState = () => {
    setNewState(rowIndex, colIndex);
  };

  return <div className={className} onClick={changeState}></div>;
};

export default Cell;
