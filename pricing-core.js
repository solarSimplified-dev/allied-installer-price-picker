// Main pricing slider component

function PricingSlider({ 
  sliderVal, 
  setSliderVal, 
  monthlyDisplay, 
  perSaleDisplay 
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

function AdminPanel({
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
  setMinCostPerSale
}) {
  return (
    <Card
      className="max-w-xl mx-auto p-4 shadow-lg rounded-2xl"
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
                    Controls the shape of the curve between Min and Max $/Sale.
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
              Max $/Sale
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
                    Positive values shift the curve left (costs drop faster at lower monthly values).
                    Negative values shift the curve right (costs drop slower at lower monthly values).
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
              Min $/Month
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
              Max $/Month
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
              Min $/Sale
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
