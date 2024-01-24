import React from "react";
import { Paginator, PaginatorContext } from "primereact/paginator";
import { TablePaginatorProps } from "@/common/types";

const TablePaginator = ({
  onPageChange,
  paginatorData,
  totalRecords,
  rowsPerPageOptions = [10, 20, 30],
  ...props
}: TablePaginatorProps) => {
  return (
    <Paginator
      className="border border-t-0 rounded-t-none rounded-b-xl"
      first={paginatorData.first}
      rows={paginatorData.rows}
      totalRecords={totalRecords}
      rowsPerPageOptions={rowsPerPageOptions}
      onPageChange={onPageChange}
      pt={{
        pageButton: ({ context }: { context: PaginatorContext }) => ({
          className: context.active
            ? "bg-brand-500 text-white min-w-[37px] h-[37px] ml-1"
            : "hover:bg-brand-200 hover:text-white min-w-[37px] h-[37px] ml-1",
        }),
      }}
      {...props}
    />
  );
};

export default TablePaginator;
