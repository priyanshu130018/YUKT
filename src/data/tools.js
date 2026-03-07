import {
  FiClock, FiWatch, FiPlayCircle, FiAlertCircle, FiCalendar,
  FiCpu, FiTrendingUp, FiPercent, FiActivity, FiDollarSign,
  FiToggleLeft, FiThermometer, FiRefreshCw, FiGlobe,
  FiFileText, FiType, FiAlignLeft, FiScissors,
  FiShield, FiLock, FiCode,
  FiDroplet, FiZap, FiHash, FiLink,
  FiImage, FiMinimize2, FiRepeat, FiInfo,
  FiVideo, FiFilm,
  FiFile, FiLayers, FiDownload,
} from 'react-icons/fi';

// Re-export missing icons with safe names
export const CATEGORIES = [
  { id: 'time-tools',       label: 'Time Tools',       color: '#1a1a1a',  bg: 'rgba(0,0,0,0.05)' },
  { id: 'calculators',      label: 'Calculators',       color: '#1a1a1a',  bg: 'rgba(0,0,0,0.05)' },
  { id: 'converters',       label: 'Converters',        color: '#1a1a1a',  bg: 'rgba(0,0,0,0.05)' },
  { id: 'text-tools',       label: 'Text Tools',        color: '#1a1a1a',  bg: 'rgba(0,0,0,0.05)' },
  { id: 'utility-tools',    label: 'Utility Tools',     color: '#1a1a1a',  bg: 'rgba(0,0,0,0.05)' },
  { id: 'image-tools',      label: 'Image Tools',       color: '#1a1a1a',  bg: 'rgba(0,0,0,0.05)' },
  { id: 'pdf-tools',        label: 'PDF Tools',         color: '#1a1a1a',  bg: 'rgba(0,0,0,0.05)' },
];

export const TOOLS = [
  // Time Tools
  { id: 'clock',          name: 'Digital Clock',         category: 'time-tools',      path: '/clock',           icon: FiClock,       description: 'Live digital clock with world time zones' },
  { id: 'timer',          name: 'Timer',                  category: 'time-tools',      path: '/timer',           icon: FiWatch,       description: 'Countdown timer with circular progress' },
  { id: 'stopwatch',      name: 'Stopwatch',              category: 'time-tools',      path: '/stopwatch',       icon: FiPlayCircle,  description: 'Precise stopwatch with lap recording' },
  { id: 'countdown',      name: 'Countdown Timer',        category: 'time-tools',      path: '/countdown',       icon: FiAlertCircle, description: 'Countdown to any future date or event' },
  { id: 'age-calculator', name: 'Age Calculator',         category: 'time-tools',      path: '/age-calculator',  icon: FiCalendar,    description: 'Calculate exact age, total days & hours' },

  // Calculators
  { id: 'calculator',             name: 'Basic Calculator',       category: 'calculators', path: '/calculator',             icon: FiCpu,         description: 'Standard arithmetic calculator' },
  { id: 'scientific-calculator',  name: 'Scientific Calculator',  category: 'calculators', path: '/scientific-calculator',  icon: FiActivity,    description: 'Advanced calculator with trig, log, sqrt' },
  { id: 'percentage-calculator',  name: 'Percentage Calculator',  category: 'calculators', path: '/percentage-calculator',  icon: FiPercent,     description: 'Three modes of percentage calculations' },
  { id: 'bmi-calculator',         name: 'BMI Calculator',         category: 'calculators', path: '/bmi-calculator',         icon: FiTrendingUp,  description: 'Body Mass Index with metric/imperial' },
  { id: 'emi-calculator',         name: 'Loan / EMI Calculator',  category: 'calculators', path: '/emi-calculator',         icon: FiDollarSign,  description: 'Calculate monthly EMI and total cost' },

  // Converters
  { id: 'unit-converter',        name: 'Unit Converter',         category: 'converters', path: '/unit-converter',         icon: FiToggleLeft,  description: 'Length, weight, volume, area, speed' },
  { id: 'temperature-converter', name: 'Temperature Converter',  category: 'converters', path: '/temperature-converter',  icon: FiThermometer, description: '°C, °F, Kelvin live conversion' },
  { id: 'currency-converter',    name: 'Currency Converter',     category: 'converters', path: '/currency-converter',     icon: FiRefreshCw,   description: '13 major currencies with reference rates' },
  { id: 'timezone-converter',    name: 'Timezone Converter',     category: 'converters', path: '/timezone-converter',     icon: FiGlobe,       description: 'World clock for 9 major cities' },

  // Text Tools
  { id: 'word-counter',      name: 'Word Counter',      category: 'text-tools', path: '/word-counter',      icon: FiFileText,   description: 'Words, chars, sentences, reading time' },
  { id: 'character-counter', name: 'Character Counter', category: 'text-tools', path: '/character-counter', icon: FiType,       description: 'Char frequency analysis & breakdown' },
  { id: 'case-converter',    name: 'Case Converter',    category: 'text-tools', path: '/case-converter',    icon: FiAlignLeft,  description: 'UPPER, lower, Title, camelCase, snake_case' },
  { id: 'remove-spaces',     name: 'Remove Extra Spaces', category: 'text-tools', path: '/remove-spaces',  icon: FiScissors,   description: 'Clean up extra whitespace and blank lines' },

  // Utility Tools
  { id: 'color-picker',         name: 'Color Picker',          category: 'utility-tools', path: '/color-picker',         icon: FiDroplet,  description: 'HEX, RGB, HSL converter with shade palette' },
  { id: 'gradient-generator',   name: 'Gradient Generator',    category: 'utility-tools', path: '/gradient-generator',   icon: FiZap,      description: 'CSS linear/radial gradient builder' },
  { id: 'json-formatter',       name: 'JSON Formatter',        category: 'utility-tools', path: '/json-formatter',       icon: FiCode,     description: 'Prettify & minify JSON with validation' },

  // Image Tools
  { id: 'image-resizer',          name: 'Image Resizer',           category: 'image-tools', path: '/image-resizer',          icon: FiImage,      description: 'Resize images with aspect ratio lock' },
  { id: 'image-compressor',       name: 'Image Compressor',        category: 'image-tools', path: '/image-compressor',       icon: FiMinimize2,  description: 'Compress images with quality control' },
  { id: 'image-format-converter', name: 'Image Format Converter',  category: 'image-tools', path: '/image-format-converter', icon: FiRepeat,     description: 'Convert PNG, JPEG, WebP, BMP' },
  { id: 'image-metadata',         name: 'Image Metadata Viewer',   category: 'image-tools', path: '/image-metadata',         icon: FiInfo,       description: 'View image dimensions, size, and details' },


  // PDF Tools
  { id: 'pdf-merger',    name: 'PDF Merger',       category: 'pdf-tools', path: '/pdf-merger',    icon: FiLayers,   description: 'Merge multiple PDF files into one' },
  { id: 'pdf-to-image',  name: 'PDF to Image',     category: 'pdf-tools', path: '/pdf-to-image',  icon: FiDownload, description: 'Convert PDF pages to PNG images' },
  { id: 'image-to-pdf',  name: 'Images to PDF',    category: 'pdf-tools', path: '/image-to-pdf',  icon: FiFile,     description: 'Combine images into a PDF document' },
];

export const TOOLS_BY_CATEGORY = CATEGORIES.reduce((acc, cat) => {
  acc[cat.id] = TOOLS.filter(t => t.category === cat.id);
  return acc;
}, {});

export const getToolById = (id) => TOOLS.find(t => t.id === id);
export const getCategory = (id) => CATEGORIES.find(c => c.id === id);
export const searchTools = (query) => {
  const q = query.toLowerCase();
  return TOOLS.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q)
  );
};
