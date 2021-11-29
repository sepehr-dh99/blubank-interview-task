import React, { useState, useRef, useCallback } from "react";
import "./Transactions.css";
import useTransactions from "../../Hooks/useTransactions";
import TransactionBox from "../../Components/TransactionBox";

export default function Transactions() {
  const [pageNumber, setPageNumber] = useState();
  const { loading, transactions, hasMore } = useTransactions(pageNumber);

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
      {transactions.map((transaction, index) => {
        if (transactions.length === index + 1) {
          return (
            <div
              className="transaction-box"
              ref={lastTransaction}
              key={transaction.id}
            >
              <TransactionBox data={transaction} />
            </div>
          );
        } else {
          return (
            <div className="transaction-box" key={transaction.id}>
              <TransactionBox data={transaction} />
            </div>
          );
        }
      })}
      {loading && "loading..."}
    </>
  );
}
