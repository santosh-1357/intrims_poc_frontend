// For the ApexCharts option genration
export const generateChartOptions = (
  title: string,
  yaxisTitle: string,
  chartType: "line" | "bar",
  toolbarOptions: any
) => ({
  title: {
    text: title,
    align: "center",
    style: {
      fontSize: "18px",
      fontWeight: "bold",
      fontFamily: undefined,
      color: "#1B254B",
    },
  },
  chart: {
    type: chartType,
    toolbar: toolbarOptions,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#000000",
    },
    theme: "dark",
    x: {
      format: "dd/MM/yy HH:mm",
    },
    y: {
      formatter: (value: number) => (value === 0 ? "Zero" : value),
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
  },
  xaxis: {
    categories: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
  },
  yaxis: {
    title: {
      text: yaxisTitle,
      style: {
        colors: "#A3AED0",
      },
    },
  },
});

// Debounce Function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return function debounced(...args: Parameters<T>): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
