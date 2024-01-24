"use client";
import { MainChartProps } from "@/common/types";
import { Suspense, useEffect, useState } from "react";

const Chart = ({ chartData, chartOptions, type }: MainChartProps) => {
  const [Chart, setChart] = useState<any>(null);

  useEffect(() => {
    import("react-apexcharts").then((module) => {
      setChart(() => module.default);
    });
  }, [chartData]);

  if (!Chart) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <Chart
        options={chartOptions}
        series={chartData}
        type={type}
        width="100%"
        height="100%"
      />
    </Suspense>
  );
};

export default Chart;
