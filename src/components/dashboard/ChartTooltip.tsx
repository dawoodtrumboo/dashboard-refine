import React from "react";
export const ChartTooltip = ({
  active,
  payload,
  label,
  coordinate,
  colors,
  kpi,
}: any) => {
  if (active && payload && payload.length) {
    const dataPoint1 = payload[0].payload;
    const dataPoint2 = payload[1].payload;

    const tooltipStyle = {
      left: coordinate.x, // Adjust positioning
      top: coordinate.y, // Adjust positioning
    };

    return (
      <div
        className="p-4 flex flex-col justify-center items-start border rounded-lg text-gray-700 "
        style={tooltipStyle}
      >
        <div
          style={{
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: "10px solid transparent",
            borderBottom: "10px solid transparent",
            borderRight: "10px solid rgba(0, 0, 0, 0.7)",
            left: "-10px",
          }}
        />
        <div className="flex items-center gap-2">
          <span className={`border-[1px] w-[12px] rounded-full`} style={{ border: `1px solid #00C1FF` }}>

          </span>
          <p className="text-xs">

            {`${kpi}: ${dataPoint1.value}`}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className={`border-[1px] w-[12px] rounded-full`} style={{ border: `1px dashed #00C1FF45` }}>

          </span>
          <p className="text-xs">

            {`${kpi}: ${dataPoint2.value}`}
          </p>
        </div>

      </div>
    );
  }

  return null;
};
