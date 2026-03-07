import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from '../pages/Home/Home';
import Favorites from '../pages/Favorites/Favorites';
import RecentTools from '../pages/RecentTools/RecentTools';
import ToolHistory from '../pages/ToolHistory/ToolHistory';
import Analytics from '../pages/Analytics/Analytics';

// Static Pages
import About from '../pages/Static/About';
import Contact from '../pages/Static/Contact';
import Privacy from '../pages/Static/Privacy';
import Terms from '../pages/Static/Terms';

// Time Tools
import Clock from '../tools/time-tools/Clock';
import Timer from '../tools/time-tools/Timer';
import Stopwatch from '../tools/time-tools/Stopwatch';
import CountdownTimer from '../tools/time-tools/CountdownTimer';
import AgeCalculator from '../tools/time-tools/AgeCalculator';

// Calculators
import Calculator from '../tools/calculators/Calculator';
import ScientificCalculator from '../tools/calculators/ScientificCalculator';
import PercentageCalculator from '../tools/calculators/PercentageCalculator';
import BMICalculator from '../tools/calculators/BMICalculator';
import EMICalculator from '../tools/calculators/EMICalculator';

// Converters
import UnitConverter from '../tools/converters/UnitConverter';
import TemperatureConverter from '../tools/converters/TemperatureConverter';
import CurrencyConverter from '../tools/converters/CurrencyConverter';
import TimezoneConverter from '../tools/converters/TimezoneConverter';

// Text Tools
import WordCounter from '../tools/text-tools/WordCounter';
import CharacterCounter from '../tools/text-tools/CharacterCounter';
import CaseConverter from '../tools/text-tools/CaseConverter';
import RemoveSpaces from '../tools/text-tools/RemoveSpaces';

// Utility Tools
import ColorPicker from '../tools/utility-tools/ColorPicker';
import GradientGenerator from '../tools/utility-tools/GradientGenerator';
import JsonFormatter from '../tools/utility-tools/JsonFormatter';

// Image Tools
import ImageResizer from '../tools/image-tools/ImageResizer';
import ImageCompressor from '../tools/image-tools/ImageCompressor';
import ImageConverter from '../tools/image-tools/ImageConverter';
import ImageMetadata from '../tools/image-tools/ImageMetadata';

// PDF Tools
import PDFMerge from '../tools/pdf-tools/PDFMerge';
import PDFtoImage from '../tools/pdf-tools/PDFtoImage';
import ImageToPDF from '../tools/pdf-tools/ImageToPDF';

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 rounded-full border-2 border-[#1a1a1a] border-t-transparent animate-spin"/>
  </div>
);

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
    <p className="text-8xl font-black text-[#1a1a1a] dark:text-white mb-4">404</p>
    <p className="text-gray-900 text-xl font-bold mb-2 uppercase tracking-widest">Page Registry Deficiency</p>
    <a href="/" className="text-[#1a1a1a] dark:text-white hover:underline mt-4 font-black text-sm uppercase">← Return to Home</a>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recent-tools" element={<RecentTools />} />
        <Route path="/tool-history" element={<ToolHistory />} />
        <Route path="/analytics" element={<Analytics />} />

        {/* Static Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Time Tools */}
        <Route path="/clock"          element={<Clock />} />
        <Route path="/timer"          element={<Timer />} />
        <Route path="/stopwatch"      element={<Stopwatch />} />
        <Route path="/countdown"      element={<CountdownTimer />} />
        <Route path="/age-calculator" element={<AgeCalculator />} />

        {/* Calculators */}
        <Route path="/calculator"            element={<Calculator />} />
        <Route path="/scientific-calculator" element={<ScientificCalculator />} />
        <Route path="/percentage-calculator" element={<PercentageCalculator />} />
        <Route path="/bmi-calculator"        element={<BMICalculator />} />
        <Route path="/emi-calculator"        element={<EMICalculator />} />

        {/* Converters */}
        <Route path="/unit-converter"        element={<UnitConverter />} />
        <Route path="/temperature-converter" element={<TemperatureConverter />} />
        <Route path="/currency-converter"    element={<CurrencyConverter />} />
        <Route path="/timezone-converter"    element={<TimezoneConverter />} />

        {/* Text Tools */}
        <Route path="/word-counter"      element={<WordCounter />} />
        <Route path="/character-counter" element={<CharacterCounter />} />
        <Route path="/case-converter"    element={<CaseConverter />} />
        <Route path="/remove-spaces"     element={<RemoveSpaces />} />

        {/* Utility Tools */}
        <Route path="/color-picker"       element={<ColorPicker />} />
        <Route path="/gradient-generator" element={<GradientGenerator />} />
        <Route path="/json-formatter"     element={<JsonFormatter />} />

        {/* Image Tools */}
        <Route path="/image-resizer"          element={<ImageResizer />} />
        <Route path="/image-compressor"       element={<ImageCompressor />} />
        <Route path="/image-format-converter" element={<ImageConverter />} />
        <Route path="/image-metadata"         element={<ImageMetadata />} />

        {/* PDF Tools */}
        <Route path="/pdf-merger"    element={<PDFMerge />} />
        <Route path="/pdf-to-image"  element={<PDFtoImage />} />
        <Route path="/image-to-pdf"  element={<ImageToPDF />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
