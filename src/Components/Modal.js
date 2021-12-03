import React from "react";

export default function Modal(props) {
  // seprate numbers with comma
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <>
      <div className="modal">
        <div className="modal-header">
          <h4 className="amount">{numberWithCommas(props.data.amount)} ریال</h4>
          <p className="title">مبلغ</p>
        </div>
        <div className="modal-meta">
          <div className="detail-bar">
            <p>زمان</p>
            <p>{props.data.date}</p>
          </div>
          <div className="detail-bar">
            <p>شماره پیگیری</p>
            <p>{props.data.tracking_code}</p>
          </div>
          <div className="detail-bar">
            <p>شماره مرجع</p>
            <p>{props.data.reference_number}</p>
          </div>
        </div>
      </div>
    </>
  );
}
