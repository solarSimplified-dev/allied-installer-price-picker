import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { HelpCircle } from "lucide-react";

export default function AdminPanel({
  alpha,
  setAlpha,
  basePerSale,
  setBasePerSale,
  monthlyOffset,
  setMonthlyOffset,
  minMonthly,
  setMinMonthly,
  maxMonthly,
  setMaxMonthly,
  minCostPerSale,
  setMinCostPerSale,
}) {
  return (
    <Card
      className="w-full p-4 shadow-lg rounded-2xl"
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
                    Controls the shape of the curve between Min and Max Acquisition Cost.
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
              Max Acquisition Cost
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
                    Positive values shift the curve left (costs drop faster at lower subscription values).
                    Negative values shift the curve right (costs drop slower at lower subscription values).
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
              Min Subscription
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
              Max Subscription
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
              Min Acquisition Cost
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
  );
}
