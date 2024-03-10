import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { ChartTooltip } from "../../components/dashboard/ChartTooltip";
import { IChartDatum } from "../../interfaces";
import { DatePicker, Radio } from 'antd';



type TResponsiveAreaChartProps = {
  kpi: string;
  colors: {
    stroke: string;
    fill: string;
  };
  rangeOne: [Moment, Moment] | null;
  rangeTwo: [Moment, Moment] | null;
};

export const ResponsiveAreaChart = ({
  kpi,
  colors,
  rangeOne,
  rangeTwo
}: TResponsiveAreaChartProps) => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {

      const response = await fetch(`https://mocki.io/v1/cff719fc-d11a-4245-9352-4f78a16a9e98`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
        console.log(result)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  const filteredDataRangeOne = rangeOne ? data.filter((datum) => {
    const startDate = new Date(rangeOne[0]);
    const endDate = new Date(rangeOne[1]);
    const datumDate = new Date(datum.date);

    return datumDate >= startDate && datumDate <= endDate;
  }) : data;

  const filteredDataRangeTwo = rangeTwo ? data.filter((datum) => {
    const startDate = new Date(rangeTwo[0]);
    const endDate = new Date(rangeTwo[1]);
    const datumDate = new Date(datum.date);

    return datumDate >= startDate && datumDate <= endDate;
  }) : data;





  return (
    <ResponsiveContainer height={200}>
      <AreaChart
        data={filteredDataRangeOne}
        height={400}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid stroke="#e2e2e2" strokeDasharray="0" vertical={false} />
        <XAxis
          dataKey="date"
          tickCount={filteredDataRangeOne.length > filteredDataRangeTwo.length ? filteredDataRangeOne.length : filteredDataRangeTwo.length}
          domain={[0, "auto"]}
          interval="preserveStartEnd"
          tick={{
            stroke: "light-grey",
            strokeWidth: 0.5,
            fontSize: "10px",
          }}
          tickLine={false}
          // Hide X-axis line
          axisLine={{ stroke: "transparent" }}
        />
        <YAxis
          tickCount={3}
          tickLine={false}
          tick={{
            stroke: "light-grey",
            strokeWidth: 0.5,
            fontSize: "10px",
          }}
          // Hide Y-axis line
          axisLine={{ stroke: "transparent" }}
          interval="preserveStartEnd"
          domain={[0, "auto"]}
          tickFormatter={(tickValue) => {
            if (tickValue >= 1000) {
              return `${tickValue / 1000}k`;
            }
            return tickValue;
          }}
        />
        <Tooltip
          content={<ChartTooltip kpi={kpi} colors={colors} />}
          wrapperStyle={{
            backgroundColor: "white",
            boxShadow: "0 0 1px 1px #eee",
            border: "none",
            borderRadius: "10px",
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          strokeDasharray="5 5"
          stroke="#00C1FF45"
          strokeWidth={2}
          fill="transparent"
          data={filteredDataRangeTwo} />


        <Area
          type="monotone"
          dataKey="value"
          stroke="#00C1FF"
          strokeWidth={2}
          fill={colors?.fill}

        />




      </AreaChart>
    </ResponsiveContainer>


  );
};
