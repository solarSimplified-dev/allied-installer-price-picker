// UI Components

// Card Components
const Card = ({ className, children, style }) => {
  return (
    <div className={`card ${className || ''}`} style={style}>
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

// Slider Component
const Slider = ({ className, style, defaultValue, max, step, onValueChange }) => {
  const [value, setValue] = React.useState(defaultValue[0]);
  
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    onValueChange([newValue]);
  };
  
  return (
    <div className={`my-4 ${className || ''}`}>
      <input
        type="range"
        min="0"
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        style={style}
      />
    </div>
  );
};

// Button Component
const Button = ({ className, style, children, onClick }) => {
  return (
    <button 
      className={`button ${className || ''}`} 
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Input Component
const Input = ({ type, value, onChange, style, step }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      step={step}
      className="input"
      style={style}
    />
  );
};

// Tabs Components
const TabsContext = React.createContext();

const Tabs = ({ defaultValue, className, children }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ className, children, style }) => {
  return (
    <div className={`tabs ${className || ''}`} style={style}>
      {children}
    </div>
  );
};

const TabsTrigger = ({ value, style, children }) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  
  return (
    <button
      className={`tab ${activeTab === value ? 'active' : ''}`}
      onClick={() => setActiveTab(value)}
      style={style}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, className }) => {
  const { activeTab } = React.useContext(TabsContext);
  
  if (activeTab !== value) return null;
  
  return <div className={className}>{children}</div>;
};

// Popover Components
const PopoverContext = React.createContext();

const Popover = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="popover">{children}</div>
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = ({ children }) => {
  const { isOpen, setIsOpen } = React.useContext(PopoverContext);
  
  return (
    <div onClick={() => setIsOpen(!isOpen)}>
      {children}
    </div>
  );
};

const PopoverContent = ({ className, style, children }) => {
  const { isOpen } = React.useContext(PopoverContext);
  
  if (!isOpen) return null;
  
  return (
    <div className={`popover-content ${className || ''}`} style={style}>
      {children}
    </div>
  );
};

// Icon Component
const HelpCircle = ({ className, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );
};

// Motion Component (simplified version of framer-motion)
const motion = {
  h1: ({ initial, animate, className, style, children }) => {
    return <h1 className={className} style={style}>{children}</h1>;
  },
  div: ({ initial, animate, transition, className, style, children }) => {
    return <div className={className} style={style}>{children}</div>;
  }
};

// Recharts Components
// Access Recharts from the global scope
const BarChart = window.Recharts.BarChart;
const Bar = window.Recharts.Bar;
const XAxis = window.Recharts.XAxis;
const YAxis = window.Recharts.YAxis;
const RechartTooltip = window.Recharts.Tooltip;
const ResponsiveContainer = window.Recharts.ResponsiveContainer;
