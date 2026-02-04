import { useEffect, useState } from "react";
import { api } from "../services/api";
import ChartView from "./ChartView";

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const userId = "demo-user";
  useEffect(() => {
    api.get(`report/${userId}`)
      .then(res => setLogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div className="section-title">
        <h2>Daily Productivity Report</h2>
        <p>Time spent on each website today</p>
      </div>

      <div className="cards">
        {logs.map((item, index) => (
          <div className="card" key={index}>
            <div className="site">{item.site}</div>
            <div className="time">
              {(item.timeSpent / 60000).toFixed(1)}
              <span>min</span>
            </div>
          </div>
        ))}
      </div>

      {logs.length > 0 && (
        <div className="chart-box">
          <h3>Website Usage Chart</h3>
          <ChartView logs={logs} />
        </div>
      )}
    </>
  );
}

export default Dashboard;