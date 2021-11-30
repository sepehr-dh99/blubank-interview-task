import React, { useState, useRef, useCallback } from "react";
import "../../Styles/Main.css";
import Navigation from "../../Components/Navigation";
import useTransactions from "../../Hooks/useTransactions";
import TransactionBox from "../../Components/TransactionBox";
import Spinner from "../../Components/Spinner";
import { useNavigate } from "react-router-dom";

export default function Transactions(props) {
  const [pageNumber, setPageNumber] = useState();
  const { loading, transactions, hasMore } = useTransactions(pageNumber);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({
    amount: 0,
    date: "",
    tracking_code: "",
    reference_number: "",
  });
  let navigate = useNavigate();

  // This will set modals meta data and open it
  const setModalDetail = (n) => {
    setModalData({
      amount: n.amount,
      date: n.date,
      tracking_code: n.tracking_code,
      reference_number: n.reference_number,
    });
    setModal(true);
  };

  // useRef observer
  const observer = useRef();

  // callback on observer detections
  const lastTransaction = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <Navigation />
      <div className="transactions">
        <h4 className="meta-title">گردش حساب</h4>
        {transactions.map((transaction, index) => {
          if (transactions.length === index + 1) {
            return (
              <div
                className="transaction-box"
                ref={lastTransaction}
                key={transaction.id}
                onClick={() => {
                  props.show(modal);
                  props.setData(transaction);
                }}
              >
                <TransactionBox
                  click={() => {
                    setModalDetail(transaction);
                    navigate(`/modal`);
                  }}
                  data={transaction}
                />
              </div>
            );
          } else {
            return (
              <div
                className="transaction-box"
                key={transaction.id}
                onClick={() => {
                  props.show(modal);
                  props.setData(transaction);
                }}
              >
                <TransactionBox
                  click={() => {
                    setModalDetail(transaction);
                    navigate(`/modal`);
                  }}
                  data={transaction}
                />
              </div>
            );
          }
        })}
        {loading && <Spinner />}
        {/* <Modal data={modalData} show={modal} />
        <BackDrop show={modal} click={() => setModal(false)} /> */}
      </div>
    </>
  );
}
