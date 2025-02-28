# Pricing Slider

An interactive pricing slider component with cash flow simulation and value proposition evaluation capabilities.

## Features

- Dynamic pricing slider with monthly subscription and per-sale cost calculations
- Admin panel for configuring pricing parameters
- Cash flow simulator with:
  - Input configuration
  - Current state analysis
  - 12-month projection
- Value proposition evaluator comparing traditional costs vs platform costs
- Real-time calculations and visualizations

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Radix UI Components

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── AdminPanel.jsx
│   ├── PricingSlider.jsx
│   ├── ValueProposition.jsx
│   ├── CashFlowSimulator/
│   │   ├── index.jsx
│   │   ├── InputsTab.jsx
│   │   ├── CurrentTab.jsx
│   │   └── ProjectionTab.jsx
│   └── ui/
│       ├── button.jsx
│       ├── card.jsx
│       ├── input.jsx
│       ├── popover.jsx
│       ├── slider.jsx
│       └── tabs.jsx
├── utils/
│   └── calculations.jsx
├── App.jsx
├── index.jsx
└── index.css
```

## Deployment

The project is automatically deployed to GitHub Pages when changes are pushed to the main branch.
