import React, { useState, useEffect } from 'react';
import AdminPanel from './components/AdminPanel';
import PricingSlider from './components/PricingSlider';
import CashFlowSimulator from './components/CashFlowSimulator';
import ValueProposition from './components/ValueProposition';
import { sliderValueToMonthly, monthlyToPerSale, calculateProjection } from './utils/calculations';

export default function App() {
  // Admin panel state
  const [sliderVal, setSliderVal] = useState(0);
  const [alpha, setAlpha] = useState(0.25);
  const [basePerSale, setBasePerSale] = useState(4999);
  const [monthlyOffset, setMonthlyOffset] = useState(0);
  const [minMonthly, setMinMonthly] = useState(1);
  const [maxMonthly, setMaxMonthly] = useState(50000);
  const [minCostPerSale, setMinCostPerSale] = useState(0);

  // Value Proposition state
  const [traditionalCAC, setTraditionalCAC] = useState(5000);
  const [leadConversionRate, setLeadConversionRate] = useState(10);
  const [valuePropositionSales, setValuePropositionSales] = useState(500); // Average number of sales per month

  // Cash flow simulator state
  const [initialSubscriptions, setInitialSubscriptions] = useState(100);
  const [salesPerSubscription, setSalesPerSubscription] = useState(5);
  const [growthRate, setGrowthRate] = useState(10);
  const [churnRate, setChurnRate] = useState(5);
  const [customerLifetime, setCustomerLifetime] = useState(12);
  const [operatingCosts, setOperatingCosts] = useState(10000);
  const [acquisitionCost, setAcquisitionCost] = useState(500);
  const [projectionData, setProjectionData] = useState([]);

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

  // Calculate current state metrics
  const currentSales = initialSubscriptions * salesPerSubscription;
  const subscriptionRevenue = initialSubscriptions * monthlyDisplay;
  const salesRevenue = currentSales * perSaleDisplay;
  const totalRevenue = subscriptionRevenue + salesRevenue;

  const newCustomers = Math.round(initialSubscriptions * (growthRate / 100));
  const acquisitionCosts = newCustomers * acquisitionCost;
  const totalCosts = operatingCosts + acquisitionCosts;

  const profit = totalRevenue - totalCosts;
  const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
  const roi = totalCosts > 0 ? (profit / totalCosts) * 100 : 0;

  // Calculate value proposition metrics
  const leadsNeeded = Math.ceil(valuePropositionSales * (100 / leadConversionRate));
  const statusQuoCost = valuePropositionSales * traditionalCAC;
  const yourSolutionCost = monthlyDisplay + valuePropositionSales * perSaleDisplay;
  const monthlySavings = statusQuoCost - yourSolutionCost;
  const savingsPercentage = statusQuoCost > 0 ? (monthlySavings / statusQuoCost) * 100 : 0;
  const valuePropositionROI = yourSolutionCost > 0 ? (monthlySavings / yourSolutionCost) * 100 : 0;
  const effectiveCAC = valuePropositionSales > 0 ? yourSolutionCost / valuePropositionSales : 0;
  const annualSavings = monthlySavings * 12;

  // Update projection data when inputs change
  useEffect(() => {
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

  // Calculate projection totals
  const totalSumRevenue = projectionData.reduce((acc, m) => acc + m.totalRevenue, 0);
  const totalSumCosts = projectionData.reduce((acc, m) => acc + m.totalCosts, 0);
  const totalSumProfit = totalSumRevenue - totalSumCosts;
  const finalSubs = projectionData.length
    ? projectionData[projectionData.length - 1].subscriptions
    : 0;

  return (
    <div className="p-6 grid place-content-center gap-6" style={{ backgroundColor: "#F0F0EB" }}>
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

      <PricingSlider
        sliderVal={sliderVal}
        setSliderVal={setSliderVal}
        monthlyDisplay={monthlyDisplay}
        perSaleDisplay={perSaleDisplay}
      />

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
        subscriptionRevenue={subscriptionRevenue}
        salesRevenue={salesRevenue}
        totalRevenue={totalRevenue}
        acquisitionCosts={acquisitionCosts}
        totalCosts={totalCosts}
        profit={profit}
        profitMargin={profitMargin}
        roi={roi}
        projectionData={projectionData}
        totalSumRevenue={totalSumRevenue}
        totalSumCosts={totalSumCosts}
        totalSumProfit={totalSumProfit}
        finalSubs={finalSubs}
      />

      <ValueProposition
        traditionalCAC={traditionalCAC}
        setTraditionalCAC={setTraditionalCAC}
        leadConversionRate={leadConversionRate}
        setLeadConversionRate={setLeadConversionRate}
        valuePropositionSales={valuePropositionSales}
        setValuePropositionSales={setValuePropositionSales}
        statusQuoCost={statusQuoCost}
        yourSolutionCost={yourSolutionCost}
        monthlySavings={monthlySavings}
        savingsPercentage={savingsPercentage}
        valuePropositionROI={valuePropositionROI}
        effectiveCAC={effectiveCAC}
        annualSavings={annualSavings}
        leadsNeeded={leadsNeeded}
      />
    </div>
  );
}
