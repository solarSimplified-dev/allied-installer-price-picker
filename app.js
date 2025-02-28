// Main application component that integrates all the modules

function PricingSelectorAdminWithTooltips() {
  // State for pricing slider
  const [sliderVal, setSliderVal] = React.useState(0);
  const [alpha, setAlpha] = React.useState(0.25);
  const [basePerSale, setBasePerSale] = React.useState(5000);
  const [monthlyOffset, setMonthlyOffset] = React.useState(0);
  const [minMonthly, setMinMonthly] = React.useState(1);
  const [maxMonthly, setMaxMonthly] = React.useState(50000);
  const [minCostPerSale, setMinCostPerSale] = React.useState(0);

  // State for Value Proposition Evaluator
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

  // Calculate projection data when inputs change
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

  return (
    <div className="p-6 grid place-content-center gap-6" style={{ backgroundColor: "#F0F0EB" }}>
      {/* Admin Panel */}
      <AdminPanel
        alpha={alpha}
        setAlpha={setAlpha}
        basePerSale={basePerSale}
        setBasePerSale={setBasePerSale}
        monthlyOffset={monthlyOffset}
        setMonthlyOffset={setMonthlyOffset}
        minMonthly={minMonthly}
        setMinMonthly={setMinMonthly}
        maxMonthly={maxMonthly}
        setMaxMonthly={setMaxMonthly}
        minCostPerSale={minCostPerSale}
        setMinCostPerSale={setMinCostPerSale}
      />

      {/* Pricing Slider */}
      <PricingSlider
        sliderVal={sliderVal}
        setSliderVal={setSliderVal}
        monthlyDisplay={monthlyDisplay}
        perSaleDisplay={perSaleDisplay}
      />

      {/* Cash Flow Simulator */}
      <CashFlowSimulator
        initialSubscriptions={initialSubscriptions}
        setInitialSubscriptions={setInitialSubscriptions}
        salesPerSubscription={salesPerSubscription}
        setSalesPerSubscription={setSalesPerSubscription}
        growthRate={growthRate}
        setGrowthRate={setGrowthRate}
        churnRate={churnRate}
        setChurnRate={setChurnRate}
        customerLifetime={customerLifetime}
        setCustomerLifetime={setCustomerLifetime}
        operatingCosts={operatingCosts}
        setOperatingCosts={setOperatingCosts}
        acquisitionCost={acquisitionCost}
        setAcquisitionCost={setAcquisitionCost}
        monthlyDisplay={monthlyDisplay}
        perSaleDisplay={perSaleDisplay}
        projectionData={projectionData}
        subscriptionRevenue={subscriptionRevenue}
        salesRevenue={salesRevenue}
        totalRevenue={totalRevenue}
        acquisitionCosts={acquisitionCosts}
        totalCosts={totalCosts}
        profit={profit}
        profitMargin={profitMargin}
        roi={roi}
      />

      {/* Value Proposition Evaluator */}
      <ValuePropositionEvaluator
        traditionalCAC={traditionalCAC}
        setTraditionalCAC={setTraditionalCAC}
        currentSales={currentSales}
        monthlyDisplay={monthlyDisplay}
        perSaleDisplay={perSaleDisplay}
      />
    </div>
  );
}
