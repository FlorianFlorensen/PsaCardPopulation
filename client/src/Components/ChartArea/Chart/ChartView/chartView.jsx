import React from "react";
import { Pie } from "react-chartjs-2";

const ChartView = ({ chartValues, chartCategories }) => {
  let data = {
    labels: chartCategories,
    datasets: [
      {
        data: chartValues,
      },
    ],
  };

  return (
    <div>
      <Pie data={data} />
    </div>
  );
};

export default ChartView;
