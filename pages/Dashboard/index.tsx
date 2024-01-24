"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Widget from "@/components/Widget";
import GeoChart from "@/components/Charts/GeoChart";
import { getDashboardData } from "@/services";
import { APIResponse, Payload } from "@/common/types";
import Loader from "@/components/Loader";
import { UserContext } from "@/components/MainLayout";
import NoRecord from "@/components/NoRecord";
import PieChart from "@/components/Charts/PieChart";

const Dashboard = () => {
  const router = useRouter();
  const { contextValue } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Payload<any> | any>();

  useEffect(() => {
    const getDashboardDetails = async () => {
      try {
        setIsLoading(true);
        const result: APIResponse<any> = await getDashboardData({
          exporterName: contextValue?.name,
          fromDate: "2022-01-01",
          toDate: "2023-01-01",
        });
        setData(result.payload);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    contextValue?.name && getDashboardDetails();
  }, [contextValue?.name]);

  const geoChartData = useMemo(
    () =>
      data?.countryList?.reduce(
        (pre: any[], curr: any) => {
          return [
            ...pre,
            [curr.countryName, curr.chemicalCount, curr.importerCount],
          ];
        },
        [["Country", "Total Chemicals", "Total Importers"]]
      ),
    [data]
  );

  const getCards = useMemo(
    () => [
      {
        icon: { name: "test-tube", className: "h-7 w-7" },
        title: "Chemicals",
        subtitle: data?.chemicalCount || "00",
      },
      {
        icon: { name: "world", className: "h-7 w-7" },
        title: "Regions",
        subtitle: data?.countryCount || "00",
      },
      {
        icon: { name: "business", className: "h-6 w-6" },
        title: "Buyers",
        subtitle: data?.buyersCount || "00",
      },
    ],
    [data]
  );

  const geoChartEvent = useCallback(
    ({ chartWrapper }: any) => {
      const chart = chartWrapper.getChart()?.getSelection();
      if (!chart || chart.length === 0) return;

      const selectedCountry =
        geoChartData[chart[0]?.row] && geoChartData[chart[0]?.row + 1][0];

      router.push(`country/${selectedCountry}`, {
        scroll: true,
      });
    },
    [geoChartData, router]
  );

  const metadata = useMemo(
    () => ({
      exporterName: contextValue?.name,
      fromDate: "2022-01-01",
      toDate: "2023-01-01",
    }),
    [contextValue?.name]
  );

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="px-2 ml-[6px] shrink text-[27px] font-bold flex justify-between">
          <h2>Dashboard</h2>
          <h2 className="capitalize">
            {contextValue?.name.toLocaleLowerCase()}
          </h2>
        </div>
        {/* Card widget */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-3">
          {getCards.map((card, index) => (
            <Widget
              key={`dashbord-card-${index}`}
              loading={isLoading}
              {...card}
            />
          ))}
        </div>
      </div>

      <Card className="bg-white w-full flex overflow-hidden h-[450px] rounded-3xl py-2 text-center">
        {isLoading ? (
          <Loader className="h-[450px]" />
        ) : geoChartData ? (
          <GeoChart
            data={geoChartData || []}
            options={{
              sizeAxis: { minValue: 1, maxSize: 12 },
              colorAxis: { colors: ["blue"] },
              legend: "none",
            }}
            chartEvents={[
              {
                eventName: "select",
                callback: geoChartEvent,
              },
            ]}
          />
        ) : (
          <NoRecord className="h-[450px]" />
        )}
      </Card>

      <PieChart
        body={metadata}
        chartOptions={{
          chart: {
            width: 380,
            type: "pie",
          },
          title: {
            text: "Chemical Quality",
            align: "center",
            style: {
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: undefined,
              color: "#1B254B",
            },
          },
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
          tooltip: {
            style: {
              fontSize: "12px",
              fontFamily: undefined,
            },
            theme: "dark",
            onDatasetHover: {
              style: {
                fontSize: "12px",
                fontFamily: undefined,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Dashboard;
