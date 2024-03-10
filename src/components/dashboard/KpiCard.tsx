import React from "react";

type TKpiCardProps = {
  title: string;
  data: any;
  colors: {
    stroke: string;
    fill: string;
  };
  activeTab: string;
  isLoading: boolean;
  formatTotal?: (value: number | string) => typeof value;
};

export const KpiCard = ({
  title,
  data,
  colors,
  activeTab,
  isLoading,
  formatTotal = (value) => value,
}: TKpiCardProps) => {
  const total = data?.data?.total;
  const trend = data?.data?.trend;
  const calc = Math.round((trend / total) * 100);
  const percent = total > trend ? `+ ${calc}%` : `- ${calc}%`;
  const textColor = total > trend ? "seagreen" : "crimson";
  return (
    <div
      className={`stat my-2 py-4 flex-1 rounded hover:bg-[#fbfbfb] transition-colors ease-in-out ${activeTab?.includes(title) ? 'bg-[#fbfbfb]' : 'bg-transparent'}`}


    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="stat-title text-l font-semibold border-b-[2px] border-dotted">{title}</div>
        <div className="hover:bg-gray-400 transition-colors ease-in-out w-5 h-5 rounded flex items-center justify-center">

          <svg className="p-0 m-0" width={12} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /></svg>


        </div>
      </div>
      {
        data
          ?
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '600' }}>

              {formatTotal(total ?? "...")}
            </div>
            <div className="stat-desc my-2 flex">
              <span className="mx-1 text-l flex gap-1" style={{ color: 'gray' }}>
                {percent.includes('+') ? (
                  <>
                    <svg fill="currentColor" width={8} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" /></svg>                {percent.replace('+', '')}
                  </>
                ) : percent.includes('-') ? (
                  <>
                    <svg width={8} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg>                {percent.replace('-', '')}
                  </>
                ) : (
                  percent
                )}
              </span>

            </div>
          </div>
          :
          <div className="skeleton h-6 w-1/2 mt-2 bg-[#e6e6e6] rounded-md"></div>
      }



    </div>
  );
};
