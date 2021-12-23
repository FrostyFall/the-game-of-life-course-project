import { useContext } from "react";
import Menu from "../components/MainMenu";
import { InitCellsContent, FpsContent, RadiusContent } from "../App";

const MainMenu = () => {
  const { radius, setRadius } = useContext(RadiusContent);
  const { fps, setFps } = useContext(FpsContent);
  const { initCells, setInitCells } = useContext(InitCellsContent);

  return (
    <Menu
      fps={fps}
      initCells={initCells}
      setFps={setFps}
      setInitCells={setInitCells}
      radius={radius}
      setRadius={setRadius}
    />
  );
};

export default MainMenu;
