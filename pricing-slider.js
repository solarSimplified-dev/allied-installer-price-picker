// Utility functions
function sliderValueToMonthly(sliderVal, minMonthly, maxMonthly) {
  const t = sliderVal / 100;
  const monthly = Math.exp(
    Math.log(minMonthly) + (Math.log(maxMonthly) - Math.log(minMonthly)) * t
  );
  return monthly;
}

function monthlyToPerSale(
  monthly,
  alpha,
  basePerSale,
  monthlyOffset,
  minCostPerSale,
  minMonthly,
  maxMonthly
) {
  // Normalize monthly to a value between 0 and 1
  // This ensures we're working with a relative position between min and max monthly
  const normalizedMonthly =
    (Math.log(monthly) - Math.log(minMonthly)) /
    (Math.log(maxMonthly) - Math.log(minMonthly));

  // Apply alpha and offset to shape the curve, but only to the normalized value
  let t = normalizedMonthly;

  // Convert offset to a normalized fraction
  const normalizedOffset = monthlyOffset / (maxMonthly - minMonthly);
  t = Math.max(0, Math.min(1, t + normalizedOffset));

  // Apply alpha (changes the curve steepness)
  t = Math.pow(t, alpha);

  // Interpolate between max and min per-sale costs
  const cost = basePerSale - t * (basePerSale - minCostPerSale);

  return cost;
}

function calculateProjection(
  initialSubscriptions,
  salesPerSubscription,
  monthlyPrice,
  perSaleCost,
  growthRate,
  churnRate,
  customerLifetime,
  operatingCosts,
  acquisitionCost
) {
  const months = 12;
  const projection = [];

  let currentSubscriptions = initialSubscriptions;

  for (let month = 0; month < months; month++) {
    const churnedCustomers = Math.round(
      currentSubscriptions * (churnRate / 100)
    );
    const newCustomers = Math.round(
      currentSubscriptions * (growthRate / 100)
    );
    currentSubscriptions = currentSubscriptions - churnedCustomers + newCustomers;

    const monthlySales = Math.round(currentSubscriptions * salesPerSubscription);

    const subscriptionRevenue = currentSubscriptions * monthlyPrice;
    const salesRevenue = monthlySales * perSaleCost;
    const totalRevenue = subscriptionRevenue + salesRevenue;

    const acquisitionCosts = newCustomers * acquisitionCost;
    const totalCosts = operatingCosts + acquisitionCosts;

    const profit = totalRevenue - totalCosts;

    const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
    const roi = totalCosts > 0 ? (profit / totalCosts) * 100 : 0;

    projection.push({
      month: month + 1,
      subscriptions: currentSubscriptions,
      sales: monthlySales,
      subscriptionRevenue,
      salesRevenue,
      totalRevenue,
      operatingCosts,
      acquisitionCosts,
      totalCosts,
      profit,
      profitMargin,
      roi,
    });
  }

  return projection;
}

// Main Component
function PricingSelectorAdminWithTooltips() {
  const [sliderVal, setSliderVal] = React.useState(0);
  const [alpha, setAlpha] = React.useState(0.25);
  const [basePerSale, setBasePerSale] = React.useState(5000);
  const [monthlyOffset, setMonthlyOffset] = React.useState(0);
  const [minMonthly, setMinMonthly] = React.useState(1);
  const [maxMonthly, setMaxMonthly] = React.useState(50000);
  const [minCostPerSale, setMinCostPerSale] = React.useState(0);

  // New state for Value Proposition Evaluator
  const [traditionalCAC, setTraditionalCAC] = React.useState(5000);

  // Cash flow simulator state
  const [initialSubscriptions, setInitialSubscriptions] = React.useState(100);
  const [salesPerSubscription, setSalesPerSubscription] = React.useState(5);
  const [growthRate, setGrowthRate] = React.useState(10);
  const [churnRate, setChurnRate] = React.useState(5);
  const [customerLifetime, setCustomerLifetime] = React.useState(12);
  const [operatingCosts, setOperatingCosts] = React.useState(10000);
  const [acquisitionCost, setAcquisitionCost] = React.useState(500);
  const [projectionData, setProjectionData] = React.useState([]);

  // Calculate pricing values
  const monthly = sliderValueToMonthly(sliderVal, minMonthly, maxMonthly);
  const perSale = monthlyToPerSale(
    monthly,
    alpha,
    basePerSale,
    monthlyOffset,
    minCostPerSale,
    minMonthly,
    maxMonthly
  );

  const monthlyDisplay = Math.round(monthly);
  const perSaleDisplay = Math.round(perSale);

  // currentSales => number of new paying sales
  const currentSales = initialSubscriptions * salesPerSubscription;

  // subscription revenue + sales revenue
  const subscriptionRevenue = initialSubscriptions * monthlyDisplay;
  const salesRevenue = currentSales * perSaleDisplay;
  const totalRevenue = subscriptionRevenue + salesRevenue;

  const newCustomers = Math.round(initialSubscriptions * (growthRate / 100));
  const acquisitionCosts = newCustomers * acquisitionCost;
  const totalCosts = operatingCosts + acquisitionCosts;

  const profit = totalRevenue - totalCosts;
  const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
  const roi = totalCosts > 0 ? (profit / totalCosts) * 100 : 0;

  React.useEffect(() => {
    const newProjectionData = calculateProjection(
      initialSubscriptions,
      salesPerSubscription,
      monthlyDisplay,
      perSaleDisplay,
      growthRate,
      churnRate,
      customerLifetime,
      operatingCosts,
      acquisitionCost
    );
    setProjectionData(newProjectionData);
  }, [
    initialSubscriptions,
    salesPerSubscription,
    monthlyDisplay,
    perSaleDisplay,
    growthRate,
    churnRate,
    customerLifetime,
    operatingCosts,
    acquisitionCost
  ]);

  // Totals for the 12-month table
  const totalSumRevenue = projectionData.reduce((acc, m) => acc + m.totalRevenue, 0);
  const totalSumCosts = projectionData.reduce((acc, m) => acc + m.totalCosts, 0);
  const totalSumProfit = totalSumRevenue - totalSumCosts;
  const finalSubs = projectionData.length
    ? projectionData[projectionData.length - 1].subscriptions
    : 0;

  // Value Proposition Evaluator calculations
  // Compare status quo with 'traditionalCAC' to your solution's monthly + per-sale.

  const statusQuoCost = currentSales * traditionalCAC;
  const yourSolutionCost = monthlyDisplay + currentSales * perSaleDisplay;
  const monthlySavings = statusQuoCost - yourSolutionCost;
  const savingsPercentage = statusQuoCost > 0 ? (monthlySavings / statusQuoCost) * 100 : 0;
  const valuePropositionROI = yourSolutionCost > 0 ? (monthlySavings / yourSolutionCost) * 100 : 0;
  const effectiveCAC = currentSales > 0 ? yourSolutionCost / currentSales : 0;
  const annualSavings = monthlySavings * 12;

  return (
    <div className="p-6 grid place-content-center gap-6" style={{ backgroundColor: "#F0F0EB" }}>
      {/* Admin Panel Card */}
      <Card
        className="max-w-xl mx-auto p-4 shadow-lg rounded-2xl"
        style={{ backgroundColor: "#FAFAF7", borderColor: "#BFBFBA" }}
      >
        <CardContent>
          <h2 className="text-xl font-semibold mb-4" style={{ color: "#191919" }}>
            Admin Panel
          </h2>
          <div className="grid gap-4 mb-2 sm:grid-cols-2">
            <div>
              <label
                className="block mb-1 text-sm font-medium flex items-center"
                style={{ color: "#262625" }}
              >
                Alpha
                <Popover>
                  <PopoverTrigger>
                    <HelpCircle
                      className="inline-block w-4 h-4 ml-2 cursor-pointer"
                      style={{ color: "#666663" }}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-64 p-2"
                    style={{ backgroundColor: "#FAFAF7", borderColor: "#BFBFBA" }}
                  >
                    <p className="text-sm" style={{ color: "#262625" }}>
                      Controls the shape of the curve between Min and Max $/Sale.
                      Values &lt; 1 make the curve more concave (drops quickly at first).
                      Values &gt; 1 make the curve more convex (drops slowly at first).
                      Alpha = 1 creates a linear relationship.
                    </p>
                  </PopoverContent>
                </Popover>
              </label>
              <Input
                type="number"
                step="0.01"
                value={alpha}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setAlpha(isNaN(val) ? 0 : val);
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
                Max $/Sale
              </label>
              <Input
                type="number"
                value={basePerSale}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setBasePerSale(isNaN(val) ? 0 : val);
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
                className="block mb-1 text-sm font-medium flex items-center"
                style={{ color: "#262625" }}
              >
                Offset
                <Popover>
                  <PopoverTrigger>
                    <HelpCircle
                      className="inline-block w-4 h-4 ml-2 cursor-pointer"
                      style={{ color: "#666663" }}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-64 p-2"
                    style={{ backgroundColor: "#FAFAF7", borderColor: "#BFBFBA" }}
                  >
                    <p className="text-sm" style={{ color: "#262625" }}>
                      Shifts the curve left or right while maintaining the Min/Max boundaries.
                      Positive values shift the curve left (costs drop faster at lower monthly values).
                      Negative values shift the curve right (costs drop slower at lower monthly values).
                    </p>
                  </PopoverContent>
                </Popover>
              </label>
              <Input
                type="number"
                step="0.01"
                value={monthlyOffset}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setMonthlyOffset(isNaN(val) ? 0 : val);
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
                Min $/Month
              </label>
              <Input
                type="number"
                value={minMonthly}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setMinMonthly(isNaN(val) ? 1 : val);
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
                Max $/Month
              </label>
              <Input
                type="number"
                value={maxMonthly}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setMaxMonthly(isNaN(val) ? 1 : val);
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
                Min $/Sale
              </label>
              <Input
                type="number"
                value={minCostPerSale}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setMinCostPerSale(isNaN(val) ? 0 : val);
                }}
                style={{
                  backgroundColor: "#FAFAF7",
                  borderColor: "#BFBFBA",
                  color: "#191919",
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pick Your Price Card */}
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
            Pick Your Price
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="mb-2 text-sm" style={{ color: "#262625" }}>
              Move the slider to adjust your Monthly Subscription and Per-Sale Cost.
            </p>
            <Slider
              className="my-4"
              style={{
                "--slider-track": "#BFBFBA",
                "--slider-range": "#228B22",
                "--slider-thumb": "#D4A27F",
              }}
              defaultValue={[sliderVal]}
              max={100}
              step={1}
              onValueChange={(val) => setSliderVal(val[0])}
            />
            <div className="flex justify-between items-center">
              <div className="text-left">
                <p className="text-sm" style={{ color: "#666663" }}>
                  Monthly Subscription
                </p>
                <p className="text-xl font-semibold" style={{ color: "#191919" }}>
                  ${monthlyDisplay.toLocaleString()}/month
                </p>
              </div>
              <div className="text-left">
                <p className="text-sm" style={{ color: "#666663" }}>Per-Sale Cost</p>
                <p className="text-xl font-semibold" style={{ color: "#191919" }}>
                  ${perSaleDisplay.toLocaleString()}/sale
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <Button
              className="w-full"
              style={{ backgroundColor: "#CC785C", color: "#FFFFFF" }}
            >
              Get Started
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      {/* Cash Flow Simulator */}
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
                      style={{ backgroundColor: "#FAF
