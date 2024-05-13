import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function AreaChart(props) {
  const { data, title, xLabels } = props;
  const options = {
    colors: ["#fca311"],
    chart: {
      backgroundColor: "#14213d",
    },
    title: {
      text: "Your progression",
      style: {
        color: "#fca311",
      },
    },
    xAxis: {
      categories: xLabels,
      title: {
        text: "Date",
        style: {
          color: "#fca311",
        },
      },
      lineColor: "#fff",
      labels: {
        style: {
          color: "#fca311",
        },
      },
    },
    yAxis: {
      title: {
        text: "kg",
        style: {
          color: "#fca311",
        },
      },
      lineColor: "#fff",
      labels: {
        style: {
          color: "#fca311",
        },
      },
    },
    tooltip: {
      formatter: function () {
        return `${this.y} kg`;
      },
    },
    legend: {
      itemStyle: {
        color: "#fff",
      },
    },
    series: [
      {
        name: title,
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
