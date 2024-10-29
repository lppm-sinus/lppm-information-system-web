import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

const ChartKin = (props) => {
  const chartConfig = {
    total: {
      label: props.dataKey,
      color: "#0E1D46",
    },
  };

  return (
    <div className="mt-5">
      <ChartContainer
        config={chartConfig}
        className="min-h-96 max-h-[700px] w-full"
      >
        <BarChart
          accessibilityLayer
          data={props.data}
          layout="vertical"
          margin={{
            right: 50,
          }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis dataKey={props.label} type="category" hide />
          <XAxis dataKey={props.dataKey} type="number" hide />
          <Bar
            dataKey={props.dataKey}
            fill="#0E1D46"
            radius={4}
            layout="vertical"
            barSize={50}
          >
            <LabelList
              dataKey={props.label}
              position="insideLeft"
              offset={20}
              className="fill-white text-xs md:text-base"
            />
            <LabelList
              dataKey={props.dataKey}
              position="right"
              offset={8}
              className="fill-foreground text-sm"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ChartKin;
