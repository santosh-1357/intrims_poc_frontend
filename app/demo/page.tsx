"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [Chart, setChart] = useState<any>(null);

  useEffect(() => {
    import("react-apexcharts").then((module) => {
      setChart(() => module.default);
    });
  }, []);

  if (!Chart) {
    return null;
  }

  return (
    <Chart
      options={{
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      }}
      series={[44, 55, 13, 43, 22]}
      type="pie"
      width="100%"
      height="100%"
    />
  );
};

export default Page;
