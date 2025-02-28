export function sliderValueToMonthly(sliderVal, minMonthly, maxMonthly) {
  const t = sliderVal / 100;
  const monthly = Math.exp(
    Math.log(minMonthly) + (Math.log(maxMonthly) - Math.log(minMonthly)) * t
  );
  return monthly;
}

export function monthlyToPerSale(
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

export function calculateProjection(
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
    // Use exact values for calculations
    const churnedCustomers = currentSubscriptions * (churnRate / 100);
    const newCustomers = currentSubscriptions * (growthRate / 100);
    currentSubscriptions = currentSubscriptions - churnedCustomers + newCustomers;

    const exactMonthlySales = currentSubscriptions * salesPerSubscription;

    const subscriptionRevenue = currentSubscriptions * monthlyPrice;
    const salesRevenue = exactMonthlySales * perSaleCost;
    const totalRevenue = subscriptionRevenue + salesRevenue;

    const acquisitionCosts = newCustomers * acquisitionCost;
    const totalCosts = operatingCosts + acquisitionCosts;

    const profit = totalRevenue - totalCosts;

    const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
    const roi = totalCosts > 0 ? (profit / totalCosts) * 100 : 0;

    // Round only for display in the returned object
    projection.push({
      month: month + 1,
      subscriptions: Math.round(currentSubscriptions),
      sales: Math.round(exactMonthlySales),
      subscriptionRevenue: Math.round(subscriptionRevenue),
      salesRevenue: Math.round(salesRevenue),
      totalRevenue: Math.round(totalRevenue),
      operatingCosts: Math.round(operatingCosts),
      acquisitionCosts: Math.round(acquisitionCosts),
      totalCosts: Math.round(totalCosts),
      profit: Math.round(profit),
      profitMargin: Math.round(profitMargin * 10) / 10, // Round to 1 decimal place
      roi: Math.round(roi * 10) / 10, // Round to 1 decimal place
    });
  }

  return projection;
}
