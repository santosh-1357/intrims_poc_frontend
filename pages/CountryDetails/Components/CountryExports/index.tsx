"use client";
import Table from "@/components/Table";
import LineChart from "@/components/Charts/LineChart";
import { getCountryExportData } from "@/services";
import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import {
  APIResponse,
  Chemical,
  CountryExport,
  Paging,
  Payload,
} from "@/common/types";
import { TABS, countryExportColumns, lineChartTools } from "@/common/data";
import { generateChartOptions } from "@/common/utils";
import BarChart from "@/components/Charts/BarChart";

type CountryExportsProps = {
  countryName: string;
  exporterName: string;
};

const CountryExports = ({
  countryName: importerCountry,
  exporterName,
}: CountryExportsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countryExports, setCountryExports] = useState<
    Payload<CountryExport> | any
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

  const getExportList = useCallback(
    async (paging: Paging) => {
      try {
        setIsLoading(true);
        const result: APIResponse<CountryExport> = await getCountryExportData({
          metadata,
          paging,
        });
        setCountryExports(result.payload);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [metadata]
  );

  const onChemicalNameBody = (rowData: Chemical) => (
    <div className="h-full w-full capitalize cursor-pointer hover:text-brand-500">
      <Link
        href={{
          pathname: `/chemical/${rowData.chemicalName}`,
          query: {
            importerCountry,
            ritcCode: rowData.chemicalCode,
          },
        }}
      >
        {rowData.chemicalName}
      </Link>
    </div>
  );

  return (
    <>
      <Table
        data={countryExports?.data}
        totalRecord={countryExports?.metaData?.totalRecords}
        loading={isLoading}
        getPagingData={getExportList}
        columns={[
          {
            field: "chemicalName",
            header: "Chemical Name",
            sortable: true,
            filter: true,
            filterPlaceholder: "Search name",
            body: onChemicalNameBody,
          },
          ...countryExportColumns,
        ]}
        downloadFilename={`${importerCountry} - `}
      />

      <LineChart
        body={{ ...metadata, tabName: TABS.EXPORT_TAB }}
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
        body={{ ...metadata, tabName: TABS.EXPORT_TAB }}
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

export default CountryExports;
