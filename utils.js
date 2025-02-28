// Utility functions for pricing slider

// Convert slider value to monthly price using logarithmic scale
function sliderValueToMonthly(sliderVal, minMonthly, maxMonthly) {
  const t = sliderVal / 100;
  const monthly = Math.exp(
    Math.log(minMonthly) + (Math.log(maxMonthly) - Math.log(minMonthly)) * t
  );
  return monthly;
}

// Calculate per-sale cost based on monthly subscription
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

// Calculate 12-month projection based on inputs
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
