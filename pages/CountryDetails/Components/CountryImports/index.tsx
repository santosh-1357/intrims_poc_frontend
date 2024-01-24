import { useCallback, useMemo, useState } from "react";
import Table from "@/components/Table";
import { getCountryImportData } from "@/services";
import { APIResponse, CountryImport, Paging, Payload } from "@/common/types";
import { TABS, countryImporterColumns, lineChartTools } from "@/common/data";
import LineChart from "@/components/Charts/LineChart";
import { generateChartOptions } from "@/common/utils";
import BarChart from "@/components/Charts/BarChart";

type CountryImportsProps = {
  countryName: string;
  exporterName: string;
};

const CountryImports = ({
  countryName: importerCountry,
  exporterName,
}: CountryImportsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countryImports, setCountryImports] = useState<
    Payload<CountryImport> | any
  >();

  const metadata = useMemo(
    () => ({
      importerCountry,
      exporterName,
      fromDate: "2022-01-01",
      toDate: "2023-01-01",
    }),
    [importerCountry, exporterName]
  );

  const getImportList = useCallback(
    async (paging: Paging) => {
      try {
        setIsLoading(true);
        const result: APIResponse<CountryImport> = await getCountryImportData({
          metadata,
          paging,
        });
        setCountryImports(result.payload);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [metadata]
  );

  return (
    <>
      <Table
        data={countryImports?.data}
        totalRecord={countryImports?.metaData?.totalRecords}
        loading={isLoading}
        getPagingData={getImportList}
        columns={countryImporterColumns}
        downloadFilename={`${importerCountry} - IMPORTS`}
      />

      <LineChart
        body={{ ...metadata, tabName: TABS.IMPORT_TAB }}
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
        body={{ ...metadata, tabName: TABS.IMPORT_TAB }}
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
    </>
  );
};

export default CountryImports;
