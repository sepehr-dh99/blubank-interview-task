import { useEffect, useState } from "react";
import axios from "axios";

export default function useTransactions(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [hasMore, setHasmore] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: "https://retoolapi.dev/gHruOU/data",
      params: { _page: pageNumber, _limit: 20 },
    })
      .then((res) => {
        setTransactions((prevTransactions) => {
          return [...prevTransactions, ...res.data];
        });
        setHasmore(res.data.length > 0);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
      });
  }, [pageNumber]);
  return { loading, transactions, hasMore };
}
