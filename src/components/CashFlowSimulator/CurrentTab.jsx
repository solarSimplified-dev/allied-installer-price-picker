import React from 'react';

export default function CurrentTab({
  subscriptionRevenue,
  salesRevenue,
  totalRevenue,
  operatingCosts,
  acquisitionCosts,
  totalCosts,
  profit,
  profitMargin,
  roi,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div
        className="p-4 rounded-md"
        style={{ backgroundColor: "#E5E4DF" }}
      >
        <h3 className="font-medium mb-2" style={{ color: "#191919" }}>
          Revenue
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm" style={{ color: "#666663" }}>
              Subscription Revenue:
            </span>
            <span className="font-medium" style={{ color: "#191919" }}>
              ${subscriptionRevenue.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm" style={{ color: "#666663" }}>
              Sales Revenue:
            </span>
            <span className="font-medium" style={{ color: "#191919" }}>
              ${salesRevenue.toLocaleString()}
            </span>
          </div>
          <div
            className="flex justify-between pt-2 border-t"
            style={{ borderColor: "#BFBFBA" }}
          >
            <span
              className="text-sm font-medium"
              style={{ color: "#191919" }}
            >
              Total Revenue:
            </span>
            <span className="font-bold" style={{ color: "#191919" }}>
              ${totalRevenue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div
        className="p-4 rounded-md"
        style={{ backgroundColor: "#E5E4DF" }}
      >
        <h3 className="font-medium mb-2" style={{ color: "#191919" }}>
          Costs
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm" style={{ color: "#666663" }}>
              Operating Costs:
            </span>
            <span className="font-medium" style={{ color: "#191919" }}>
              ${operatingCosts.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm" style={{ color: "#666663" }}>
              Acquisition Costs:
            </span>
            <span className="font-medium" style={{ color: "#191919" }}>
              ${acquisitionCosts.toLocaleString()}
            </span>
          </div>
          <div
            className="flex justify-between pt-2 border-t"
            style={{ borderColor: "#BFBFBA" }}
          >
            <span
              className="text-sm font-medium"
              style={{ color: "#191919" }}
            >
              Total Costs:
            </span>
            <span className="font-bold" style={{ color: "#191919" }}>
              ${totalCosts.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div
        className="p-4 rounded-md sm:col-span-2"
        style={{ backgroundColor: "#E5E4DF" }}
      >
        <h3 className="font-medium mb-2" style={{ color: "#191919" }}>
          Key Metrics
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div
            className="text-center p-3 rounded-md shadow-sm"
            style={{ backgroundColor: "#FAFAF7" }}
          >
            <p className="text-sm" style={{ color: "#666663" }}>
              Monthly Profit
            </p>
            <p
              className="text-xl font-bold"
              style={{ color: profit >= 0 ? "#228B22" : "#BF4043" }}
            >
              ${profit.toLocaleString()}
            </p>
          </div>
          <div
            className="text-center p-3 rounded-md shadow-sm"
            style={{ backgroundColor: "#FAFAF7" }}
          >
            <p className="text-sm" style={{ color: "#666663" }}>
              Profit Margin
            </p>
            <p
              className="text-xl font-bold"
              style={{ color: profitMargin >= 0 ? "#228B22" : "#BF4043" }}
            >
              {profitMargin.toFixed(1)}%
            </p>
          </div>
          <div
            className="text-center p-3 rounded-md shadow-sm"
            style={{ backgroundColor: "#FAFAF7" }}
          >
            <p className="text-sm" style={{ color: "#666663" }}>
              ROI
            </p>
            <p
              className="text-xl font-bold"
              style={{ color: roi >= 0 ? "#228B22" : "#BF4043" }}
            >
              {roi.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
