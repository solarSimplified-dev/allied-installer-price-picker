import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InputsTab from './InputsTab';
import CurrentTab from './CurrentTab';
import ProjectionTab from './ProjectionTab';

export default function CashFlowSimulator({
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
  subscriptionRevenue,
  salesRevenue,
  totalRevenue,
  acquisitionCosts,
  totalCosts,
  profit,
  profitMargin,
  roi,
  projectionData,
  totalSumRevenue,
  totalSumCosts,
  totalSumProfit,
  finalSubs,
}) {
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

          <TabsContent value="inputs">
            <InputsTab
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
            />
          </TabsContent>

          <TabsContent value="current">
            <CurrentTab
              subscriptionRevenue={subscriptionRevenue}
              salesRevenue={salesRevenue}
              totalRevenue={totalRevenue}
              operatingCosts={operatingCosts}
              acquisitionCosts={acquisitionCosts}
              totalCosts={totalCosts}
              profit={profit}
              profitMargin={profitMargin}
              roi={roi}
            />
          </TabsContent>

          <TabsContent value="projection">
            <ProjectionTab
              projectionData={projectionData}
              totalSumRevenue={totalSumRevenue}
              totalSumCosts={totalSumCosts}
              totalSumProfit={totalSumProfit}
              finalSubs={finalSubs}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
