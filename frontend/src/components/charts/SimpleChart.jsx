import { BarChart } from "@mui/x-charts/BarChart";
import { styled } from "@mui/system";
const SimpleChart = () => {
  const BarChartStyled = styled(BarChart)({
    "&.MuiChartsAxis-tickLabel": {
      fill: "rgba(231, 227, 252, 0.9)",
    },
  });

  return (
    <div>
      <BarChartStyled
        xAxis={[
          {
            id: "barCategories",
            data: ["bar A", "bar B", "bar C"],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: [2, 5, 3],
          },
        ]}
        width={500}
        height={300}
        sx={{
          fill: "rgba(231, 227, 252, 0.5)",
        }}
      />
    </div>
  );
};

export default SimpleChart;
