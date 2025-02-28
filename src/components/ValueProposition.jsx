import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
} from "recharts";

export default function ValueProposition({
  traditionalCAC,
  setTraditionalCAC,
  leadConversionRate,
  setLeadConversionRate,
  valuePropositionSales,
  setValuePropositionSales,
  statusQuoCost,
  yourSolutionCost,
  monthlySavings,
  savingsPercentage,
  valuePropositionROI,
  effectiveCAC,
  annualSavings,
  leadsNeeded,
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
          Value Proposition Evaluator
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="mb-4 text-sm" style={{ color: "#262625" }}>
            Compare the traditional customer acquisition cost vs. our costs.
          </p>
          <div className="grid gap-4 sm:grid-cols-3 mb-4">
            <div>
              <label className="block mb-1 text-sm font-medium" style={{ color: "#262625" }}>
                Monthly Sales
              </label>
              <Input
                type="number"
                min="1"
                value={valuePropositionSales}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setValuePropositionSales(isNaN(val) ? 0 : Math.max(1, val));
                }}
                style={{
                  backgroundColor: "#FAFAF7",
                  borderColor: "#BFBFBA",
                  color: "#191919",
                }}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium" style={{ color: "#262625" }}>
                Traditional CAC ($)
              </label>
              <Input
                type="number"
                value={traditionalCAC}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setTraditionalCAC(isNaN(val) ? 0 : val);
                }}
                style={{
                  backgroundColor: "#FAFAF7",
                  borderColor: "#BFBFBA",
                  color: "#191919",
                }}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium" style={{ color: "#262625" }}>
                Conversion Rate (%)
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={leadConversionRate}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setLeadConversionRate(isNaN(val) ? 0 : Math.min(100, Math.max(0, val)));
                }}
                style={{
                  backgroundColor: "#FAFAF7",
                  borderColor: "#BFBFBA",
                  color: "#191919",
                }}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-4" style={{ backgroundColor: "#E5E4DF" }}>
            <div className="p-4 rounded-md">
              <h3 className="font-medium mb-2" style={{ color: "#191919" }}>Them</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm mb-1" style={{ color: "#666663" }}>
                    Leads Required for {valuePropositionSales.toLocaleString()} Sales
                  </p>
                  <p className="text-lg font-semibold" style={{ color: "#191919" }}>
                    {leadsNeeded.toLocaleString()} leads
                  </p>
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: "#666663" }}>
                    Total Cost
                  </p>
                  <p className="text-xl font-bold" style={{ color: "#191919" }}>
                    ${statusQuoCost.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-md">
              <h3 className="font-medium mb-2" style={{ color: "#191919" }}>
                Us
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm mb-1" style={{ color: "#666663" }}>
                    RFP's Accepted
                  </p>
                  <p className="text-lg font-semibold" style={{ color: "#191919" }}>
                    {leadsNeeded.toLocaleString()} free leads <span style={{ color: "#228B22" }}> </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: "#666663" }}>
                    Total Cost
                  </p>
                  <p className="text-xl font-bold" style={{ color: "#191919" }}>
                    ${yourSolutionCost.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div
              className="p-4 rounded-md"
              style={{ backgroundColor: "#E5E4DF" }}
            >
              <h3 className="font-medium mb-2" style={{ color: "#191919" }}>
                Savings & ROI
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#666663" }}>Monthly Savings:</span>
                  <span
                    className="font-medium"
                    style={{ color: monthlySavings >= 0 ? "#228B22" : "#BF4043" }}
                  >
                    ${monthlySavings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#666663" }}>Savings %:</span>
                  <span
                    className="font-medium"
                    style={{ color: savingsPercentage >= 0 ? "#228B22" : "#BF4043" }}
                  >
                    {savingsPercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#666663" }}>Value Prop ROI:</span>
                  <span
                    className="font-medium"
                    style={{ color: valuePropositionROI >= 0 ? "#228B22" : "#BF4043" }}
                  >
                    {valuePropositionROI.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t" style={{ borderColor: "#BFBFBA" }}>
                  <span className="text-sm font-medium" style={{ color: "#191919" }}>
                    Effective CAC:
                  </span>
                  <span className="font-bold" style={{ color: "#191919" }}>
                    ${effectiveCAC.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#666663" }}>Annual Savings:</span>
                  <span
                    className="font-medium"
                    style={{ color: annualSavings >= 0 ? "#228B22" : "#BF4043" }}
                  >
                    ${annualSavings.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Chart comparing Status Quo vs Our Platform */}
            <div className="p-4 rounded-md" style={{ backgroundColor: "#E5E4DF" }}>
              <h3 className="font-medium mb-2" style={{ color: "#191919" }}>Cost Comparison</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={[
                    { name: "Them", cost: statusQuoCost, leads: leadsNeeded },
                    { name: "Us", cost: yourSolutionCost, leads: leadsNeeded },
                  ]}
                >
                  <XAxis dataKey="name" stroke="#666663" tick={{ fill: "#666663" }} />
                  <YAxis stroke="#666663" tick={{ fill: "#666663" }} />
                  <RechartTooltip
                    formatter={(value, name, props) => {
                      if (name === 'cost') return `$${Number(value).toLocaleString()}`;
                      if (name === 'leads') return `${Number(value).toLocaleString()} leads`;
                      return value;
                    }}
                    contentStyle={{ backgroundColor: "#FAFAF7", borderColor: "#BFBFBA" }}
                    labelStyle={{ color: "#191919" }}
                  />
                  <Bar 
                    dataKey="cost" 
                    fill={(entry, index) => {
                      if (statusQuoCost > yourSolutionCost) {
                        return index === 0 ? "#BF4043" : "#228B22";
                      } else {
                        return index === 1 ? "#BF4043" : "#228B22";
                      }
                    }}
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
