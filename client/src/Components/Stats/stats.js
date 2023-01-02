import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../StateManagement/Reducers/statsReducer";
import styles from "./stats.module.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Stats() {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.stats.getStats);

  useEffect(() => {
    dispatch(getStats());
  }, []);

  const renderCustomBarLabel = (props) => {
    console.log({ props });
    const { payload, x, y, width, height, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y}
        textAnchor="middle"
        dy={-6}
      >{`value: ${value}`}</text>
    );
  };

  const data = [
    { name: "Gas", kwh: stats.gas },
    { name: "Electricity (Day)", kwh: stats.electricityDay },
    { name: "Electricity (Night)", kwh: stats.electricityNight },
  ];

  return (
    <div className={styles.main}>
      <h2>Average Daily Consumption</h2>

      <div className={styles.chart}>
        <ResponsiveContainer width="90%" height="90%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              tick={{ fill: "#f6ae84" }}
              tickLine={{ stroke: "#f6ae84" }}
            />
            <YAxis
              tick={{ fill: "#f6ae84" }}
              tickLine={{ stroke: "#f6ae84" }}
            />
            <CartesianGrid stroke="#ffffff" strokeDasharray="5 5" />
            <Bar
              dataKey="kwh"
              barSize={50}
              fill="#008080"
              label={renderCustomBarLabel}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Stats;
