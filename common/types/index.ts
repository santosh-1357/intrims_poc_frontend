import { PaginatorPageChangeEvent, PaginatorProps } from "primereact/paginator";
import { ReactNode } from "react";

/* Components Props Types */
export interface CardProps {
  className?: string;
  loading?: boolean;
  children: ReactNode;
}

export interface MainChartProps {
  chartData: any[];
  chartOptions: any;
  type?: "line" | "bar" | "pie";
  body?: any;
}

export interface ChartProps {
  chartOptions: any;
  body?: any;
}

export interface ExportButtonProps {
  data: Array<{ [key: string]: string | number }>;
  fileName?: string;
}

export interface TableProps {
  data: Array<any>;
  totalRecord?: number;
  loading?: boolean;
  getPagingData: (data: Paging) => void;
  columns?: any[];
  downloadFilename?: string;
}

export interface TablePaginatorProps extends PaginatorProps {
  paginatorData: { first: number; rows: number } | PaginatorPageChangeEvent;
  totalRecords: number;
}

export interface WidgetProps {
  icon: any;
  title: string;
  subtitle: string;
  tips?: string;
  loading?: boolean;
}

export interface AppBreadcrumbProps {
  className?: string;
}

/* Data Types */
export interface CurrentUser {
  name: string;
}

export interface Paging {
  pageNumber: number;
  pageSize: number;
}

export interface CountryExport {
  chemicalName: string;
  chemicalCode: number;
  totalImporter: number;
  totalQuantity: number;
  totalAmount: number;
}

export interface CountryImport {
  importerId: number;
  importerName: string;
  chemicalCount: number;
  totalQuantity: number;
  totalAmount: number;
}

export interface ChemicalData {
  importerName: string;
  totalQuantity: number;
  totalAmount: number;
}

export interface Chemical {
  chemicalName: string;
  chemicalCode: number;
  totalImporter: number;
  totalQuantity: number;
  totalAmount: number;
}

export interface ImporterDetails {
  importerId: number;
  importerName: string;
  chemicalCount: number;
  totalQuantity: number;
  totalAmount: number;
}

export interface ChartData {
  name: string;
  data: number[];
}

export interface MonthlyChartData {
  monthArray: string[];
  chartData: ChartData[];
}

/* API Service Types */
interface PaginationMetaData {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export interface Payload<T> {
  data: T[];
  metaData?: PaginationMetaData;
}

export interface APIResponse<T> {
  payload: Payload<T>;
  status: null | string;
  message: null | string;
  token: null | string;
  errors: null | string;
}
