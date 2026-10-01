import type { ChartOptions } from "chart.js";

export const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      labels: {
        color: "#90A3BF",
        font: {
          family: "Plus Jakarta Sans",
        },
      },
    },
  },
};

export const doughnutChartOptions = {
  ...commonChartOptions,
} satisfies ChartOptions<"doughnut">;

export const barChartOptions = {
  ...commonChartOptions,
} satisfies ChartOptions<"bar">;

export const lineChartOptions = {
  ...commonChartOptions,
} satisfies ChartOptions<"line">;

export const radarChartOptions = {
  ...commonChartOptions,
} satisfies ChartOptions<"radar">;
