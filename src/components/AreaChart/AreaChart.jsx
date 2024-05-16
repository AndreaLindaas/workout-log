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
  console.log("lengde", data.length);
  if (data.length < 2) {
    return (
      <div>
        <p>
          We are still gathering data to show your progress in a chart. Perform
          more of this excercise and we will have it ready for you!
        </p>
      </div>
    );
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
