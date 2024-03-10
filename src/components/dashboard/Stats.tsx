import React from "react";
import { KpiCard } from "./KpiCard";
import { IChartDatum } from "../../interfaces";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { GetListResponse } from "@refinedev/core";

type TStats = {
  dailyRevenue?: GetListResponse<IChartDatum>;
  dailyOrders?: GetListResponse<IChartDatum>;
  newCustomers?: GetListResponse<IChartDatum>;
  activeTab?: string;
  isLoading: boolean;
};

const Stats = ({ dailyRevenue, dailyOrders, newCustomers, activeTab, isLoading }: TStats) => {
  return (
    <div className="w-full mx-auto mb-4 flex flex-col justify-center items-stretch md:flex-row md:justify-between drop-shadow-md">
      <div className="w-full mx-auto md:flex-1 md:mr-2">
        <KpiCard
          isLoading={isLoading}
          title="Net return value"
          data={dailyRevenue}
          formatTotal={(value: number | string) => `$ ${value}`}
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
          activeTab={activeTab}
        />
      </div>
      <div className="w-full mx-auto md:flex-1">
        <KpiCard
          title="Online store sessions"
          data={dailyOrders}
          colors={{
            stroke: "rgb(255, 159, 64)",
            fill: "rgba(255, 159, 64, 0.2)",
          }}
        />
      </div>
      <div className="w-full mx-auto md:flex-1 md:ml-2">
        <KpiCard
          title="Total orders"
          data={newCustomers}
          colors={{
            stroke: "rgb(76, 175, 80)",
            fill: "rgba(76, 175, 80, 0.2)",
          }}
        />
      </div>
    </div>
  );
};

export default Stats;
