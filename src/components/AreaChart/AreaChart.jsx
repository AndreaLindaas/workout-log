import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function AreaChart(props) {
  const { data, title, xLabels } = props;
  const options = {
    title: {
      text: title,
    },
    xAxis: {
      categories: xLabels,
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "kg",
      },
    },
    series: [
      {
        data: data,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
