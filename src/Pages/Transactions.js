import React, { useState, useRef, useCallback } from "react";
import Navigation from "../Components/Navigation";
import useTransactions from "../Hooks/useTransactions";
import TransactionBox from "../Components/TransactionBox";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";

export default function Transactions(props) {
  const [pageNumber, setPageNumber] = useState();
  const { loading, transactions, hasMore } = useTransactions(pageNumber);

  let navigate = useNavigate();

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
                onClick={() => {
                  props.setData(transaction);
                }}
                ref={lastTransaction}
              >
                <TransactionBox
                  key={transaction.id}
                  click={() => {
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
                onClick={() => {
                  props.setData(transaction);
                }}
              >
                <TransactionBox
                  key={transaction.id + " " + Math.random()}
                  click={() => {
                    navigate(`/modal`);
                  }}
                  data={transaction}
                />
              </div>
            );
          }
        })}
        {loading && <Spinner />}
      </div>
    </>
  );
}
