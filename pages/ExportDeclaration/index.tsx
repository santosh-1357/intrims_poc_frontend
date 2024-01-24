"use client";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { CHEMICAL } from "@/common/data";
import Card from "@/components/Card";
import { UserContext } from "@/components/MainLayout";
import { getExportDeclaration, getPDFDropDownData } from "@/services";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Nullable } from "primereact/ts-helpers";
import toast from "react-hot-toast";

interface DropdownDataType {
  chemicalList: any[];
  countryList: any[];
}

const ExportDeclaration = () => {
  const { contextValue } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Nullable<Date>>(null);
  const [endDate, setEndDate] = useState<Nullable<Date>>(null);
  const [selectedChemical, setSelectedChemical] = useState<any>();
  const [selectedCountry, setSelectedCountry] = useState<any>();
  const [dropdownData, setDropdownData] = useState<DropdownDataType>({
    chemicalList: [],
    countryList: [],
  });

  const getGenratedPDF = async () => {
    try {
      setIsLoading(true);
      const data: any = {
        exporterName: contextValue?.name,
        fromDate: moment(startDate).format("yy-MM-DD"),
        importerCountry: selectedCountry?.countryName,
        toDate: moment(endDate).format("yy-MM-DD"),
        chemicalName: selectedChemical?.chemicalName,
      };

      if (selectedChemical?.chemicalCode !== CHEMICAL.ALL) {
        data.ritcCode = selectedChemical?.chemicalCode;
      }
      const result = await getExportDeclaration(data);
      if (result) {
        setIsLoading(false);
        toast.success("Export declaration has been generated successfully.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Error while exporting PDF");
      console.log(error);
    }
  };

  useEffect(() => {
    const getDropDownData = async () => {
      try {
        const { payload } = await getPDFDropDownData({
          exporterName: contextValue?.name,
          fromDate: moment(startDate).format("yy-MM-DD"),
          toDate: moment(endDate).format("yy-MM-DD"),
        });
        if (payload?.chemicalList) {
          setDropdownData({
            ...payload,
            chemicalList: [
              {
                chemicalName: CHEMICAL.ALL,
                // chemicalCode: CHEMICAL.ALL,
              },
              ...payload?.chemicalList,
            ],
          });
        } else {
          toast.error("Data not available for this date range.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (startDate && endDate) {
      getDropDownData();
    }
  }, [startDate, endDate, contextValue?.name]);

  return (
    <Card className="p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-brand-500">
        Export Declaration
      </h1>

      <div className="columns-1 lg:columns-3 my-2">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600" htmlFor="start-date">
            Start Date
          </label>
          <Calendar
            inputId="start-date"
            required
            placeholder="DD/MM/YYYY"
            className="border p-2 rounded-lg text-sm outline-none"
            minDate={new Date(2015, 0, 1)}
            maxDate={new Date()}
            dateFormat="dd/mm/yy"
            value={startDate}
            onChange={(e) => setStartDate(e.value)}
            showIcon
            readOnlyInput
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600" htmlFor="start-end">
            End Date
          </label>
          <Calendar
            inputId="start-end"
            required
            placeholder="DD/MM/YYYY"
            className="border p-2 rounded-lg text-sm outline-none"
            minDate={new Date(2015, 0, 1)}
            maxDate={new Date()}
            dateFormat="dd/mm/yy"
            value={endDate}
            onChange={(e) => setEndDate(e.value)}
            showIcon
            readOnlyInput
          />
        </div>
      </div>

      <div className="columns-1 lg:columns-3 my-2">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600" htmlFor="chemical-drop">
            Select Chemical
          </label>
          <Dropdown
            inputId="chemical-drop"
            placeholder="Select chemical"
            value={selectedChemical}
            onChange={(e) => setSelectedChemical(e.value)}
            options={dropdownData?.chemicalList.map((item) => ({
              ...item,
              lableForSearch: `${item?.chemicalName}${
                item?.chemicalCode ? "\t-\t" + item?.chemicalCode : ""
              }`,
            }))}
            optionLabel="lableForSearch"
            defaultChecked
            filter={!!dropdownData?.chemicalList.length}
            defaultValue="all"
            className="rounded-lg border flex items-center"
            emptyMessage={
              <p className="text-sm text-gray-500 tracking-normal text-center">
                {startDate && endDate
                  ? "Please reselect the date range"
                  : "Select the date range"}
              </p>
            }
            style={{
              height: "36px",
              fontSize: "12px",
            }}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600" htmlFor="country-drop">
            Select Country
          </label>
          <Dropdown
            inputId="country-drop"
            placeholder="Select country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.value)}
            options={dropdownData?.countryList}
            optionLabel="countryName"
            defaultChecked
            filter={!!dropdownData?.countryList.length}
            defaultValue="all"
            className="rounded-lg border flex items-center"
            emptyMessage={
              <p className="text-sm text-gray-500 tracking-normal text-center">
                {startDate && endDate
                  ? "Please reselect the date range"
                  : "Select the date range"}
              </p>
            }
            style={{
              height: "36px",
              fontSize: "12px",
            }}
          />
        </div>
      </div>

      <div className="columns-1 lg:columns-3 my-2">
        <Button
          loading={isLoading}
          disabled={
            !startDate || !endDate || !selectedChemical || !selectedCountry
          }
          className="flex tracking-wide w-full justify-center gap-2 text-white bg-brand-500 hover:bg-brand-600 font-medium rounded-lg  px-5 py-2 focus:outline-none"
          onClick={getGenratedPDF}
        >
          Export PDF
        </Button>
      </div>
    </Card>
  );
};

export default ExportDeclaration;
