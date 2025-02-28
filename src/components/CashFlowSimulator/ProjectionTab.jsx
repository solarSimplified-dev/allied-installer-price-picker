import React from 'react';

export default function ProjectionTab({
  projectionData,
  totalSumRevenue,
  totalSumCosts,
  totalSumProfit,
  finalSubs,
}) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table
          className="min-w-full divide-y"
          style={{ borderColor: "#BFBFBA" }}
        >
          <thead style={{ backgroundColor: "#E5E4DF" }}>
            <tr>
              <th
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "#666663" }}
              >
                Month
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "#666663" }}
              >
                Subscribers
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "#666663" }}
              >
                Revenue
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "#666663" }}
              >
                Costs
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "#666663" }}
              >
                Profit
              </th>
            </tr>
          </thead>
          <tbody
            className="divide-y"
            style={{ backgroundColor: "#FAFAF7", borderColor: "#BFBFBA" }}
          >
            {projectionData.map((month) => {
              return (
                <tr key={month.month}>
                  <td
                    className="px-3 py-2 whitespace-nowrap text-sm font-medium"
                    style={{ color: "#191919" }}
                  >
                    {month.month}
                  </td>
                  <td
                    className="px-3 py-2 whitespace-nowrap text-sm"
                    style={{ color: "#666663" }}
                  >
                    {month.subscriptions.toLocaleString()}
                  </td>
                  <td
                    className="px-3 py-2 whitespace-nowrap text-sm"
                    style={{ color: "#666663" }}
                  >
                    ${month.totalRevenue.toLocaleString()}
                  </td>
                  <td
                    className="px-3 py-2 whitespace-nowrap text-sm"
                    style={{ color: "#666663" }}
                  >
                    ${month.totalCosts.toLocaleString()}
                  </td>
                  <td
                    className="px-3 py-2 whitespace-nowrap text-sm font-medium"
                    style={{ color: month.profit >= 0 ? "#228B22" : "#BF4043" }}
                  >
                    ${month.profit.toLocaleString()}
                  </td>
                </tr>
              );
            })}
            {/* Totals row */}
            <tr>
              <td
                className="px-3 py-2 whitespace-nowrap text-sm font-medium"
                style={{ color: "#191919" }}
              >
                Totals
              </td>
              <td
                className="px-3 py-2 whitespace-nowrap text-sm"
                style={{ color: "#666663" }}
              >
                {finalSubs.toLocaleString()}
              </td>
              <td
                className="px-3 py-2 whitespace-nowrap text-sm"
                style={{ color: "#666663" }}
              >
                ${totalSumRevenue.toLocaleString()}
              </td>
              <td
                className="px-3 py-2 whitespace-nowrap text-sm"
                style={{ color: "#666663" }}
              >
                ${totalSumCosts.toLocaleString()}
              </td>
              <td
                className="px-3 py-2 whitespace-nowrap text-sm font-medium"
                style={{ color: totalSumProfit >= 0 ? "#228B22" : "#BF4043" }}
              >
                ${totalSumProfit.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
