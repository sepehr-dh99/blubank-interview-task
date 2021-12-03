import { useState, useEffect } from "react";
import Transactions from "./Pages/Transactions";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import BackDrop from "./Components/BackDrop";
import Modal from "./Components/Modal";
import "./Styles/Main.css";
import { CSSTransition } from "react-transition-group";

function App() {
  const [data, setData] = useState({
    amount: 0,
    date: "",
    tracking_code: "",
    reference_number: "",
  });

  const [showMessage, setShowMessage] = useState(false);
  const getDataFromChild = (e) => setData(e);
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/modal") setShowMessage(true);
    if (location.pathname !== "/modal") setShowMessage(false);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Transactions setData={getDataFromChild} />}>
          <Route path="/modal" />
        </Route>
      </Routes>
      <BackDrop show={showMessage} click={() => navigate(`/`)} />
      <CSSTransition
        in={showMessage}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <Modal data={data} />
      </CSSTransition>
    </>
  );
}

export default App;
