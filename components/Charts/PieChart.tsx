import { memo, useEffect, useMemo, useState } from "react";
import { APIResponse, ChartProps, Payload } from "@/common/types";
import { getPieChartData } from "@/services";
import Chart from "./Chart";
import Card from "../Card";
import Loader from "../Loader";
import NoRecord from "../NoRecord";

const PieChart = ({ chartOptions, body }: ChartProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Payload<any> | any>([]);

  const handleLoading = () => setIsLoading((pre) => !pre);

  useEffect(() => {
    const getChartData = async () => {
      try {
        handleLoading();
        const result: APIResponse<Array<any>> = await getPieChartData(body);
        setData(result.payload);
        handleLoading();
      } catch (error) {
        handleLoading();
        console.log(error);
      }
    };

    getChartData();
  }, []);

  const calculatedData = useMemo(() => {
    const belowAverageObjects = data.filter(
      (item: any) => item.totalQuantity < 3500
    );

    const normalData = data.filter((item: any) => item.totalQuantity > 3500);

    const totalOtherValue = belowAverageObjects.reduce(
      (sum: number, item: any) => sum + item.totalQuantity,
      0
    );

    const modifiedArray = [
      ...normalData,
      { chemicalName: "Other", totalQuantity: totalOtherValue },
    ];

    return modifiedArray;
  }, [data]);

  return (
    <Card className="relative p-[20px] border]">
      {isLoading ? (
        <Loader className="h-[250px] lg:h-[450px]" />
      ) : data ? (
        <div className="h-[250px] mx-auto w-full lg:h-[450px]">
          <Chart
            chartOptions={{
              ...chartOptions,
              labels: calculatedData?.map((item: any) => item.chemicalName),
            }}
            chartData={calculatedData?.map((item: any) => item.totalQuantity)}
            type="pie"
          />
        </div>
      ) : (
        <NoRecord />
      )}
    </Card>
  );
};

export default memo(PieChart);
