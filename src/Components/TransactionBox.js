import React from "react";
import Increase from "../Assets/Images/top-left.png";
import Decrease from "../Assets/Images/bottom-right.png";
import Left from "../Assets/Images/left-arrow.png";

export default function TransactionBox(props) {
  // seprate numbers with comma
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <div className="detail-box">
        <div className="transaction-right-side">
          <div className="transaction-type">
            <img src={props.data.isWithdrawal ? Decrease : Increase} />
          </div>
          <div className="transaction-meta">
            <p className="type">
              {props.data.isWithdrawal ? "برداشت" : "واریز"}
            </p>
            <p className="date">{props.data.date.split(",")[0]}</p>
          </div>
        </div>
        <div className="transaction-left-side">
          <div className="transaction-amount">
            <p className={props.data.isWithdrawal ? "" : "increase-amount"}>
              {numberWithCommas(props.data.amount)}
              {props.data.isWithdrawal ? "-" : "+"} ریال
            </p>
          </div>
          <div className="transaction-arrow">
            <img src={Left} />
          </div>
        </div>
      </div>
    </>
  );
}
