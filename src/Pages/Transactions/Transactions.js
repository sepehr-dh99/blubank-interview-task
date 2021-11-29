import React, { useState } from "react";
import "./Transactions.css";
import useTransactions from "../../Hooks/useTransactions";
import TransactionBox from "../../Components/TransactionBox";

export default function Transactions() {
  const [pageNumber, setPageNumber] = useState();
  const { loading, transactions, hasMore } = useTransactions(pageNumber);

  return (
    <>
      {transactions.map((transaction) => {
        return <TransactionBox data={transaction} />;
      })}
    </>
  );
}
