import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

export const getDashboardData = async (payload: any) => {
  const { data } = await axiosInstance.post<any, AxiosResponse<any, any>, any>(
    "/dashboard/export_data",
    payload
  );
  return data;
};

export const getPieChartData = async (payload: any) => {
  const { data } = await axiosInstance.post<any, AxiosResponse<any, any>, any>(
    "/data/pie-chart",
    payload
  );
  return data;
};

export const getCountryExportData = async (payload: any) => {
  const { data } = await axiosInstance.post<any, AxiosResponse<any, any>, any>(
    "/dashboard/country/export",
    payload
  );
  return data;
};

export const getCountryImportData = async (payload: any) => {
  const { data } = await axiosInstance.post<any, AxiosResponse<any, any>, any>(
    "/dashboard/country/import",
    payload
  );
  return data;
};

export const getLineChartData = async (payload: any) => {
  const { data } = await axiosInstance.post<any, AxiosResponse<any, any>, any>(
    "/data/line-chart",
    payload
  );
  return data;
};

export const getBarChartData = async (payload: any) => {
  const { data } = await axiosInstance.post<any, AxiosResponse<any, any>, any>(
    "/data/bar-chart",
    payload
  );
  return data;
};

export const getCountryCount = async (payload: any) => {
  const { data } = await axiosInstance.post<any, AxiosResponse<any, any>, any>(
    "/dashboard/country/count",
    payload
  );
  return data;
};

export const getChemicalData = async (payload: any) => {
  const { data } = await axiosInstance.post<any, AxiosResponse<any, any>, any>(
    "/dashboard/country/chemical",
    payload
  );
  return data;
};

export const getExportDeclaration = async (payload: any) => {
  const { data } = await axiosInstance.post(
    "/pdf/export-declaration",
    payload,
    {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        responseType: "arraybuffer",
      },
    }
  );
  return data;
};

export const getPDFDropDownData = async (payload: any) => {
  const { data } = await axiosInstance.post<any, AxiosResponse<any, any>, any>(
    "/pdf/drop-down",
    payload
  );
  return data;
};
