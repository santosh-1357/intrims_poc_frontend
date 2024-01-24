import { memo, useEffect, useState } from "react";
import {
  APIResponse,
  ChartData,
  ChartProps,
  MonthlyChartData,
  Payload,
} from "@/common/types";
import { CHART_FORMATE, chartColors, chartFormate } from "@/common/data";
import { getBarChartData } from "@/services";
import Chart from "./Chart";
import Card from "../Card";
import Loader from "../Loader";
import { Dropdown } from "primereact/dropdown";
import NoRecord from "../NoRecord";

const BarChart = ({ chartOptions, body }: ChartProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFormate, setSelectedChartFormate] = useState(chartFormate[0]);
  const [data, setData] = useState<Payload<MonthlyChartData> | any>(null);

  useEffect(() => {
    const getQuantityData = async () => {
      try {
        handleLoading();
        const result: APIResponse<MonthlyChartData> = await getBarChartData({
          allData: selectedFormate.code === CHART_FORMATE.ALL,
          ...body,
        });
        setData(result.payload);
        handleLoading();
      } catch (error) {
        handleLoading();
        console.log(error);
      }
    };

    getQuantityData();
  }, [selectedFormate]);

  const handleLoading = () => setIsLoading((pre) => !pre);

  return (
    <Card className="relative p-[20px] border md:mt-16 lg:mt-0">
      {isLoading ? (
        <Loader className="h-[250px] lg:h-[450px]" />
      ) : data ? (
        <>
          <Dropdown
            value={selectedFormate}
            onChange={(e) => setSelectedChartFormate(e.value)}
            options={chartFormate}
            optionLabel="name"
            defaultChecked
            defaultValue="all"
            className="absolute z-10 top-3 left-3 rounded-lg bg-lightPrimary hover:bg-gray-100 text-sm font-medium text-gray-600"
          />

          <div className="h-[250px] w-full lg:h-[450px]">
            <Chart
              chartOptions={{
                ...chartOptions,
                xaxis: {
                  ...chartOptions.xaxis,
                  categories: data?.monthArray,
                },
              }}
              chartData={data?.chartData?.map(
                (data: ChartData, index: number) => ({
                  ...data,
                  color: chartColors[index],
                })
              )}
              type="bar"
            />
          </div>
        </>
      ) : (
        <NoRecord />
      )}
    </Card>
  );
};

export default memo(BarChart);
