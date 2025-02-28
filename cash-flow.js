// Cash Flow Simulator Component

function CashFlowSimulator({
  initialSubscriptions,
  setInitialSubscriptions,
  salesPerSubscription,
  setSalesPerSubscription,
  growthRate,
  setGrowthRate,
  churnRate,
  setChurnRate,
  customerLifetime,
  setCustomerLifetime,
  operatingCosts,
  setOperatingCosts,
  acquisitionCost,
  setAcquisitionCost,
  monthlyDisplay,
  perSaleDisplay,
  projectionData,
  subscriptionRevenue,
  salesRevenue,
  totalRevenue,
  acquisitionCosts,
  totalCosts,
  profit,
  profitMargin,
  roi
}) {
  // Totals for the 12-month table
  const totalSumRevenue = projectionData.reduce((acc, m) => acc + m.totalRevenue, 0);
  const totalSumCosts = projectionData.reduce((acc, m) => acc + m.totalCosts, 0);
  const totalSumProfit = totalSumRevenue - totalSumCosts;
  const finalSubs = projectionData.length
    ? projectionData[projectionData.length - 1].subscriptions
    : 0;

  return (
    <Card
      className="max-w-xl mx-auto p-4 shadow-lg rounded-2xl"
      style={{ backgroundColor: "#FAFAF7", borderColor: "#BFBFBA" }}
    >
      <CardContent>
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold mb-4"
          style={{ color: "#191919" }}
        >
          Cash Flow Simulator
        </motion.h1>

        <Tabs defaultValue="inputs" className="w-full">
          <TabsList
            className="grid w-full grid-cols-3 mb-4"
            style={{ backgroundColor: "#E5E4DF" }}
          >
            <TabsTrigger value="inputs" style={{ color: "#191919" }}>
              Inputs
            </TabsTrigger>
            <TabsTrigger value="current" style={{ color: "#191919" }}>
              Current State
            </TabsTrigger>
            <TabsTrigger value="projection" style={{ color: "#191919" }}>
              12-Month Projection
            </TabsTrigger>
          </TabsList>

          {/* Inputs Tab */}
          <TabsContent value="inputs" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  className="block mb-1 text-sm font-medium"
                  style={{ color: "#262625" }}
                >
                  Initial Subscriptions
                </label>
                <Input
                  type="number"
                  value={initialSubscriptions}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setInitialSubscriptions(isNaN(val) ? 0 : val);
                  }}
                  style={{
                    backgroundColor: "#FAFAF7",
                    borderColor: "#BFBFBA",
                    color: "#191919",
                  }}
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium"
                  style={{ color: "#262625" }}
                >
                  Sales Per Subscription
                </label>
                <Input
                  type="number"
                  value={salesPerSubscription}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setSalesPerSubscription(isNaN(val) ? 0 : val);
                  }}
                  style={{
                    backgroundColor: "#FAFAF7",
                    borderColor: "#BFBFBA",
                    color: "#191919",
                  }}
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium"
                  style={{ color: "#262625" }}
                >
                  Monthly Growth Rate (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={growthRate}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setGrowthRate(isNaN(val) ? 0 : val);
                  }}
                  style={{
                    backgroundColor: "#FAFAF7",
                    borderColor: "#BFBFBA",
                    color: "#191919",
                  }}
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium"
                  style={{ color: "#262625" }}
                >
                  Monthly Churn Rate (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={churnRate}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setChurnRate(isNaN(val) ? 0 : val);
                  }}
                  style={{
                    backgroundColor: "#FAFAF7",
                    borderColor: "#BFBFBA",
                    color: "#191919",
                  }}
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium"
                  style={{ color: "#262625" }}
                >
                  Avg. Customer Lifetime (months)
                </label>
                <Input
                  type="number"
                  value={customerLifetime}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setCustomerLifetime(isNaN(val) ? 0 : val);
                  }}
                  style={{
                    backgroundColor: "#FAFAF7",
                    borderColor: "#BFBFBA",
                    color: "#191919",
                  }}
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium"
                  style={{ color: "#262625" }}
                >
                  Monthly Operating Costs ($)
                </label>
                <Input
                  type="number"
                  value={operatingCosts}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setOperatingCosts(isNaN(val) ? 0 : val);
                  }}
                  style={{
                    backgroundColor: "#FAFAF7",
                    borderColor: "#BFBFBA",
                    color: "#191919",
                  }}
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium"
                  style={{ color: "#262625" }}
                >
                  Cost Per Acquisition ($)
                </label>
                <Input
                  type="number"
                  value={acquisitionCost}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setAcquisitionCost(isNaN(val) ? 0 : val);
                  }}
                  style={{
                    backgroundColor: "#FAFAF7",
                    borderColor: "#BFBFBA",
                    color: "#191919",
                  }}
                />
              </div>
            </div>
            <div
              className="mt-4 p-3 rounded-md"
              style={{ backgroundColor: "#E5E4DF" }}
            >
              <p className="text-sm" style={{ color: "#666663" }}>
                These inputs, combined with your pricing settings above, will be used to calculate your cash flow metrics.
              </p>
            </div>
          </TabsContent>

          {/* Current State Tab */}
          <TabsContent value="current">
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
          </TabsContent>

          {/* Projection Tab */}
          <TabsContent value="projection">
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
