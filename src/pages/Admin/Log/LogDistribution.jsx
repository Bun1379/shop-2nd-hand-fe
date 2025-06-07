import { useEffect, useState } from "react";
import LogAPI from "../../../api/LogAPI";
import LogTable from "./LogDistributionTable";

const LogDistribution = () => {
  const [logs, setLogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const fetchDataLog = async () => {
    try {
      const res = await LogAPI.getLogs({
        page,
      });
      if (res.status === 200) {
        console.log(res.data);
        setLogs(res.data.DT.data);
        setTotalPages(res.data.DT.totalPages);
      }
    } catch (err) {
      console.log(err.response.data.EM);
    }
  };
  useEffect(() => {
    fetchDataLog();
  }, [page]);
  return (
    <div className="p-4">
      <h1>Lịch sử phân phối hàng hóa</h1>
      <LogTable logs={logs} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default LogDistribution;
