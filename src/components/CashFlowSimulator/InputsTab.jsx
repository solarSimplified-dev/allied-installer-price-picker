import React from 'react';
import { Input } from "@/components/ui/input";

export default function InputsTab({
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
}) {
  return (
    <div className="space-y-4">
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
    </div>
  );
}
