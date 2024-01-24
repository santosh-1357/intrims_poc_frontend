import { ColumnProps } from "primereact/column";

// enum
export enum TABS {
  EXPORT_TAB = "export",
  IMPORT_TAB = "import",
  CHEMICAL_TAB = "chemical",
}

export enum CHART_FORMATE {
  ALL = "all",
  TOP5 = "t5",
}

export enum CHEMICAL {
  ALL = "ALL",
}

export const chartFormate = [
  { name: "All", code: CHART_FORMATE.ALL },
  { name: "Top 5", code: CHART_FORMATE.TOP5 },
];

export const chartColors = ["#4318FF", "#80d9ff"];

export const lineChartTools = {
  download: false,
  selection: true,
  zoom: true,
  zoomin: true,
  zoomout: true,
  pan: true,
  reset: true,
  customIcons: [],
};

// ----------------------------------------------Table Cloumns------------------------------------------------

// Country Wise Chemical Export
export const countryExportColumns: Array<ColumnProps> = [
  {
    field: "chemicalCode",
    header: "HS Code",
    sortable: true,
    filter: true,
    filterPlaceholder: "Search code",
    align: "center",
  },
  {
    field: "totalImporter",
    header: "Total Importer",
    sortable: true,
    align: "center",
  },
  {
    field: "totalQuantity",
    header: "Total Quantity(tonne)",
    sortable: true,
    align: "right",
  },
  {
    field: "totalAmount",
    header: "Total Amount(₹ Thousand)",
    sortable: true,
    align: "right",
  },
];

// Country Wise Chemical Importer
export const countryImporterColumns: Array<ColumnProps> = [
  {
    field: "importerId",
    header: "Importer Id",
    sortable: true,
    align: "center",
  },
  {
    field: "importerName",
    header: "Importer Name",
    sortable: true,
    filter: true,
    filterPlaceholder: "Search Name",
  },
  {
    field: "chemicalCount",
    header: "Chemical Count",
    sortable: true,
    align: "center",
  },
  {
    field: "totalQuantity",
    header: "Total Quantity(Tonne)",
    sortable: true,
    align: "right",
  },
  {
    field: "totalAmount",
    header: "Total Amount(₹ Thousand)",
    sortable: true,
    align: "right",
  },
];

// Chemical Details
export const cemicalColumns: Array<ColumnProps> = [
  {
    field: "importerName",
    header: "Importer Name",
    sortable: true,
    filter: true,
    filterPlaceholder: "Search name",
  },
  {
    field: "totalQuantity",
    header: "Total Quantity(Tonne)",
    sortable: true,
    align: "right",
  },
  {
    field: "totalAmount",
    header: "Total Amount(₹ Thousand)",
    sortable: true,
    align: "right",
  },
];
