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
  statusQuoCost,
  yourSolutionCost,
  monthlySavings,
  savingsPercentage,
  valuePropositionROI,
  effectiveCAC,
  annualSavings,
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
            Compare the cost of traditional acquisition (Status Quo) vs. using our platform.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 mb-4">
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
            <div
              className="p-3 rounded-md"
              style={{ backgroundColor: "#E5E4DF", marginTop: "auto" }}
            >
              <p className="text-sm" style={{ color: "#666663" }}>
                Leads are free on our platform, with an average 10% lead-to-customer conversion rate, eliminating costly lead generation.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-4" style={{ backgroundColor: "#E5E4DF" }}>
            <div className="p-4 rounded-md">
              <h3 className="font-medium mb-2" style={{ color: "#191919" }}>Status Quo</h3>
              <p className="text-sm mb-1" style={{ color: "#666663" }}>
                Cost with Traditional CAC
              </p>
              <p className="text-xl font-bold" style={{ color: "#191919" }}>
                ${statusQuoCost.toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-md">
              <h3 className="font-medium mb-2" style={{ color: "#191919" }}>
                Our Platform
              </h3>
              <p className="text-sm mb-1" style={{ color: "#666663" }}>
                Monthly + Per-Sale
              </p>
              <p className="text-xl font-bold" style={{ color: "#191919" }}>
                ${yourSolutionCost.toLocaleString()}
              </p>
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
                    { name: "Status Quo", cost: statusQuoCost },
                    { name: "Our Platform", cost: yourSolutionCost },
                  ]}
                >
                  <XAxis dataKey="name" stroke="#666663" tick={{ fill: "#666663" }} />
                  <YAxis stroke="#666663" tick={{ fill: "#666663" }} />
                  <RechartTooltip
                    formatter={(value) => `$${Number(value).toLocaleString()}`}
                    contentStyle={{ backgroundColor: "#FAFAF7", borderColor: "#BFBFBA" }}
                    labelStyle={{ color: "#191919" }}
                  />
                  <Bar dataKey="cost" fill="#228B22" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
