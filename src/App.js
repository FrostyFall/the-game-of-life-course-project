import "./style.css";
import MainMenu from "./screens/MainMenu";
import Dashboard from "./screens/Dashboard";
import Background from "./components/General/background";
import Modal from "./components/Dashboard/modal";
import { useState, createContext, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const InitCellsContent = createContext();
export const FpsContent = createContext();
export const RadiusContent = createContext();
export const ModalContent = createContext();

function App() {
  const [radius, setRadius] = useState(1);
  const [fps, setFps] = useState(1);
  const [initCells, setInitCells] = useState(3);
  const [modalInfo, setModal] = useState({
    isShown: false,
    message: "",
  });
  const timer = useRef(null);

  const closeModal = () => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    setModal((prevState) => {
      return { ...prevState, isShown: false };
    });
  };

  useEffect(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    if (modalInfo.isShown) {
      timer.current = setTimeout(() => {
        setModal((prevState) => {
          return { ...prevState, isShown: false };
        });

        timer.current = null;
      }, 5000);
    }

    return () => {
      clearTimeout(timer.current);
      timer.current = null;
    };
  }, [modalInfo]);

  return (
    <div className='app dark'>
      <Background>
        <Router>
          <Switch>
            <InitCellsContent.Provider value={{ initCells, setInitCells }}>
              <FpsContent.Provider value={{ fps, setFps }}>
                <RadiusContent.Provider value={{ radius, setRadius }}>
                  <Route exact path='/'>
                    <MainMenu />
                  </Route>
                  <Route path='/dashboard'>
                    <ModalContent.Provider value={setModal}>
                      <Modal modalInfo={modalInfo} closeModal={closeModal} />
                      <Dashboard />
                    </ModalContent.Provider>
                  </Route>
                </RadiusContent.Provider>
              </FpsContent.Provider>
            </InitCellsContent.Provider>
          </Switch>
        </Router>
      </Background>
    </div>
  );
}

export default App;
