import React, { useState, useMemo, Moment, useEffect } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { IChartDatum, TTab } from "../../interfaces";
import PickerSizesDemo from "./PickerSizeDemo";
import moment from 'moment';
import Stats from "./Stats";

const filters: CrudFilter[] = [
  {
    field: "start",
    operator: "eq",
    value: dayjs()?.subtract(7, "days")?.startOf("day"),
  },
  {
    field: "end",
    operator: "eq",
    value: dayjs().startOf("day"),
  },
];

// type TTabViewProps = {
//   tabs: TTab[];
// };

export const TabView = ({ }: TTabViewProps) => {

  const [activeTab, setActiveTab] = useState("Net return value");
  const [rangeOne, setRangeOne] = useState<[Moment, Moment] | null>(null);
  const [rangeTwo, setRangeTwo] = useState<[Moment, Moment] | null>(null);


  useEffect(() => {
    setRangeOne([
      moment("2024-01-01"),
      moment("2024-01-18"),
    ]);
    setRangeTwo([
      moment("2024-02-01"),
      moment("2024-02-18")
    ])
  }, [])
  const { data: dailyRevenue } = useList<IChartDatum>({
    resource: "dailyRevenue",
    filters,
  });

  const { data: dailyOrders } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters,
  });

  const { data: newCustomers } = useList<IChartDatum>({
    resource: "newCustomers",
    filters,
  });

  const useMemoizedChartData = (d: any) => {
    return useMemo(() => {
      return d?.data?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        value: item?.value,
      }));
    }, [d]);
  };

  const memoizedRevenueData = useMemoizedChartData(dailyRevenue);


  return (
    <div className="mx-auto py-4 bg-white border rounded-lg drop-shadow-md">
      <div className="px-5">
        <Stats
          activeTab={activeTab}
          dailyRevenue={dailyRevenue}
          dailyOrders={dailyOrders}
          newCustomers={newCustomers}
        />
      </div>

      <div className="mx-auto">
        {/* {tabs?.map((tab: TTab, index: number) => (
          <TabPanel key={tab?.id} isActive={index === activeTab}>
            {tab?.content}
          </TabPanel>

        ))} */}

        <ResponsiveAreaChart
          kpi="Daily revenue"
          rangeOne={rangeOne}
          rangeTwo={rangeTwo}
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "none",
          }}
        />

      </div>
      <div className="w-full flex justify-center md:justify-end px-5 gap-3 flex-wrap">
        <PickerSizesDemo value={rangeOne} setRange={setRangeOne} color="#00C1FF" border="solid" />
        <PickerSizesDemo value={rangeTwo} setRange={setRangeTwo} color="#00C1FF45" border="dashed" />
      </div>
    </div>
  );
};
