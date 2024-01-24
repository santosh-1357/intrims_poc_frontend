"use client";
import { Chart } from "react-google-charts";
import Loader from "../Loader";

export const options = {
  backgroundColor: "#ffffff", //81d4fa
  defaultColor: "#f5f5f5",
  title: "Company Performance",
  domain: "IN",
  sizeAxis: { minValue: 1, maxSize: 12 },
  colorAxis: { colors: ["blue"] },
  legend: "none",
};

const GeoChart = ({ data, options, ...rest }: any) => {
  return (
    <Chart
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      chartType="GeoChart"
      loader={<Loader className="h-full" />}
      width="100%"
      height="100%"
      data={data}
      options={{
        ...options,
        backgroundColor: "#ffffff",
        defaultColor: "#f5f5f5",
        domain: "IN",
      }}
      {...rest}
    />
  );
};

export default GeoChart;
