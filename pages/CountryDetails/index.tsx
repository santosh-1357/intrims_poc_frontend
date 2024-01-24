"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import Card from "@/components/Card";
import Icon from "@/components/Icons";
import Widget from "@/components/Widget";
import CountryExports from "./Components/CountryExports";
import CountryImports from "./Components/CountryImports";
import { APIResponse, Payload } from "@/common/types";
import { getCountryCount } from "@/services";
import { UserContext } from "@/components/MainLayout";
import { TABS } from "@/common/data";

type CountryDetailsProps = {
  countryName: string;
};

const CountryDetails = ({ countryName }: CountryDetailsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>(TABS.EXPORT_TAB);
  const [data, setData] = useState<Payload<any> | any>();

  const { contextValue } = useContext(UserContext);

  useEffect(() => {
    const getCountryDetails = async () => {
      try {
        const result: APIResponse<any> = await getCountryCount({
          exporterName: contextValue?.name,
          importerCountry: countryName,
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

    contextValue?.name && countryName && getCountryDetails();
  }, [contextValue?.name, countryName]);

  const getCards = useMemo(
    () => [
      {
        icon: { name: "test-tube", className: "h-7 w-7" },
        title: "Total Chemical",
        subtitle: data?.chemicalCount || "00",
      },
      {
        icon: { name: "business", className: "h-7 w-7 p-1" },
        title: "Total Importer",
        subtitle: data?.importerCount || "00",
      },
      {
        icon: { name: "boxes", className: "h-7 w-7" },
        title: "Total Quantity",
        subtitle: data?.totalQuantity || "00",
        tips: "In Tonnes",
      },
      {
        icon: { name: "money", className: "h-7 w-7" },
        title: "Total Amount(₹)",
        subtitle: data?.totalAmount ? `${data?.totalAmount}` : "00",
        tips: "In Thousands",
      },
    ],
    [data]
  );

  return (
    <div>
      {/* Card widget */}
      <div className="mt-1 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {getCards.map((card, index) => (
          <Widget key={`country-card-${index}`} loading={isLoading} {...card} />
        ))}
      </div>

      <Card className="mt-3 bg-white w-full overflow-hidden rounded-3xl pt-2 px-2">
        <div className="flex justify-between md:text-lg pt-3 px-2 font-semibold">
          <div className="flex items-center gap-7 capitalize">
            <button
              onClick={() => setCurrentTab(TABS.EXPORT_TAB)}
              className={`flex items-center gap-2 outline-none pr-4 ${
                currentTab === TABS.EXPORT_TAB
                  ? "text-brand-500 border-b-2 border-brand-500"
                  : "text-gray-400"
              }`}
            >
              <Icon name="exports" /> Chemical Details
            </button>

            <button
              onClick={() => setCurrentTab(TABS.IMPORT_TAB)}
              className={`flex items-center gap-2 outline-none pr-4 ${
                currentTab === TABS.IMPORT_TAB
                  ? "text-brand-500 border-b-2 border-brand-500"
                  : "text-gray-400"
              }`}
            >
              <Icon name="exports" className="rotate-90 scale-y-[-1]" />{" "}
              Importer
            </button>
          </div>

          <h2 className="text-2xl font-bold capitalize">
            {countryName?.toLocaleLowerCase()}
          </h2>
        </div>

        <div className="border" />

        <div className="flex flex-col gap-2 pb-2">
          {currentTab === TABS.EXPORT_TAB ? (
            <CountryExports
              countryName={countryName}
              exporterName={contextValue?.name}
            />
          ) : (
            <CountryImports
              countryName={countryName}
              exporterName={contextValue?.name}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default CountryDetails;
