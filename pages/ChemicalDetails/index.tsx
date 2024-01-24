"use client";
import { useCallback, useContext, useMemo, useState } from "react";
import Card from "@/components/Card";
import Table from "@/components/Table";
import { UserContext } from "@/components/MainLayout";
import { getChemicalData } from "@/services";
import { APIResponse, ChemicalData, Paging, Payload } from "@/common/types";
import { TABS, cemicalColumns, lineChartTools } from "@/common/data";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import { generateChartOptions } from "@/common/utils";

const ChemicalDetails = ({ chemicalName, ritcCode, importerCountry }: any) => {
  const { contextValue } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chemicalDetails, setChemicalDetails] = useState<
    Payload<ChemicalData> | any
  >();

  const metadata = useMemo(
    () => ({
      ritcCode,
      chemicalName,
      importerCountry,
      exporterName: contextValue?.name,
      fromDate: "2022-01-01",
      toDate: "2023-01-01",
    }),
    [chemicalName, contextValue?.name, importerCountry, ritcCode]
  );

  const getList = useCallback(
    async (paging: Paging) => {
      try {
        setIsLoading(true);
        const result: APIResponse<ChemicalData> = await getChemicalData({
          metadata,
          paging,
        });
        setChemicalDetails(result.payload);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [metadata]
  );

  return (
    <Card className="mt-1 bg-white w-full overflow-hidden rounded-3xl pt-2 px-2">
      <h2 className="text-2xl p-2 font-bold capitalize">
        {chemicalName?.toLocaleLowerCase()}
      </h2>

      <div className="flex flex-col gap-2 pb-2">
        <Table
          data={chemicalDetails?.data}
          totalRecord={chemicalDetails?.metaData?.totalRecords}
          loading={isLoading}
          getPagingData={getList}
          columns={cemicalColumns}
          downloadFilename={chemicalName}
        />

        <LineChart
          body={{ ...metadata, tabName: TABS.CHEMICAL_TAB }}
          chartOptions={generateChartOptions(
            "Quantity Export Chart",
            "Quantity(tonnes)",
            "line",
            {
              tools: lineChartTools,
              autoSelected: "zoom",
            }
          )}
        />

        <BarChart
          body={{ ...metadata, tabName: TABS.CHEMICAL_TAB }}
          chartOptions={generateChartOptions(
            "Amount Chart",
            "₹ Amount (thousand)",
            "bar",
            {
              tools: {
                download: false,
              },
            }
          )}
        />
      </div>
    </Card>
  );
};

export default ChemicalDetails;
