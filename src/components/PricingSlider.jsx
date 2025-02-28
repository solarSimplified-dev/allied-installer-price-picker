import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export default function PricingSlider({
  sliderVal,
  setSliderVal,
  monthlyDisplay,
  perSaleDisplay,
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
  );
}
