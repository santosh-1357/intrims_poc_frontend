"use client";
import { useEffect, useMemo, useState } from "react";
import { TableProps } from "@/common/types";
import { DataTable } from "primereact/datatable";
import { Column, ColumnProps } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
import { InputText } from "primereact/inputtext";
import {
  PaginatorCurrentPageReportOptions,
  PaginatorPageChangeEvent,
} from "primereact/paginator";
import TablePaginator from "./TablePaginator";
import { ExcelExportButton } from "../ExportFile";
import Card from "../Card";
import Icon from "../Icons";
import Loader from "../Loader";
import NoRecord from "../NoRecord";

const Table = ({
  data = [],
  totalRecord = 0,
  loading = false,
  getPagingData,
  columns = [],
  downloadFilename,
}: TableProps) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [paginatorData, setPaginatorData] = useState<
    PaginatorPageChangeEvent | any
  >({
    first: 0,
    rows: 10,
  });
  const [currentPage, setCurrentPage] = useState<string>("1");
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press enter to jump to this page."
  );

  useEffect(() => {
    getPagingData({
      pageNumber: paginatorData.page + 1 || 1,
      pageSize: paginatorData.rows,
    });
  }, [paginatorData]);

  const tableData = useMemo(
    () =>
      data && data.length
        ? data?.filter((item: any) =>
            JSON.stringify(item)
              .toLowerCase()
              .includes(searchKeyword.toLowerCase())
          )
        : [],
    [searchKeyword, data]
  );

  const header = (
    <div className="flex items-center justify-between gap-2">
      <div className="relative h-[35px] rounded-lg bg-white p-1 shadow-xl shadow-shadow-500">
        <div className="flex h-full items-center">
          <p className="pl-2 text-xl">
            <Icon name="search" className="h-4 w-4 text-gray-400" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            disabled={!data?.length}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="block px-2 h-full w-full rounded-r-full disabled:bg-white text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 sm:w-fit"
          />

          {data?.length > 0 && (
            <p
              className={`mr-2 cursor-pointer rounded-full p-1 text-xl ${
                searchKeyword.length
                  ? "bg-brand-400 text-white"
                  : "text-gray-600 "
              }`}
              onClick={() => setSearchKeyword("")}
            >
              <Icon name="close" className="h-3 w-3" />
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Tooltip
          p-tooltip-text
          mouseTrack
          className="bg-brand-400 text-white"
        />
        {/* <CSVExportButton data={data} fileName={downloadFilename} /> */}
        <ExcelExportButton data={data} fileName={downloadFilename} />
      </div>
    </div>
  );

  const onPageInputKeyDown = (
    eventKey: string,
    options: PaginatorCurrentPageReportOptions
  ) => {
    if (eventKey === "Enter" && currentPage) {
      const page = parseInt(currentPage);

      if (page <= 0 || page > options.totalPages) {
        setPageInputTooltip(`Only 1 to ${options.totalPages} pages available.`);
      } else {
        setPaginatorData({
          first: options.rows * (page - 1),
          rows: options.rows,
          page: page - 1,
          pageCount: options.totalPages,
        });
        setPageInputTooltip("Press enter to jump to this page.");
      }
    }
  };

  const paginatorTemplate = {
    layout:
      "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",
    CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => (
      <span className="mx-3" style={{ userSelect: "none" }}>
        Go to
        <InputText
          size="2"
          disabled={!tableData.length}
          className="gray-600 ml-1 border-2 border-solid p-1"
          value={currentPage}
          tooltip={pageInputTooltip}
          onKeyDown={(e) => onPageInputKeyDown(e.key, options)}
          onChange={(e) => setCurrentPage(e.target.value)}
        />
      </span>
    ),
  };

  return (
    <Card className="w-full mt-[12px] flex flex-row justify-between">
      <DataTable
        tableStyle={{ minWidth: "100%" }}
        className="border border-b-0"
        loading={loading}
        loadingIcon={<Loader />}
        value={tableData}
        size="small" // small/normal/large
        header={header}
        emptyMessage={<NoRecord />}
      >
        {columns.map(({ field, header, ...rest }: ColumnProps) => (
          <Column
            key={field}
            field={field}
            header={header}
            sortableDisabled={!tableData.length}
            className="sm:text-[12px] sm:font-semibold"
            {...rest}
          />
        ))}
      </DataTable>
      <TablePaginator
        paginatorData={paginatorData}
        onPageChange={setPaginatorData}
        totalRecords={totalRecord}
        template={paginatorTemplate}
      />
    </Card>
  );
};

export default Table;
