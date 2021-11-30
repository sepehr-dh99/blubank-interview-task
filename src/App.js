import { useState } from "react";
import Transactions from "./Pages/Transactions/Transactions";
import { Routes, Route } from "react-router-dom";
import BackDrop from "./Components/BackDrop";
import Modal from "./Components/Modal";

function App() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    amount: 0,
    date: "",
    tracking_code: "",
    reference_number: "",
  });

  const getDataFromChild = (e) => setData(e);
  const showStateSetter = (e) => setShow(e);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Transactions show={showStateSetter} setData={getDataFromChild} />
          }
        >
          <Route
            path="/modal"
            element={
              <>
                <BackDrop show={show} click={() => console.log(1)} />
                <Modal show={show} data={data} />
              </>
            }
          />
        </Route>
      </Routes>
      <Routes>
        <Route
          path="/modal"
          element={
            <>
              <BackDrop show={show} click={() => setShow(false)} />
              <Modal show={show} data={data} />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
