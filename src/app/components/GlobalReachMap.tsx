import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { geoPath, geoMercator } from 'd3-geo';
import { feature } from 'topojson-client';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

// Country data with marketplaces
const countryData = [
  // North America
  {
    country: 'United States',
    code: 'USA',
    region: 'North America',
    marketplaces: ['Amazon', 'Walmart', 'TikTok Shop', 'eBay', 'Coupang US Global'],
    color: '#22d3ee',
  },
  {
    country: 'Canada',
    code: 'CAN',
    region: 'North America',
    marketplaces: ['Amazon', 'eBay'],
    color: '#22d3ee',
  },
  
  {
    country: 'Mexico',
    code: 'MEX',
    region: 'Central America',
    marketplaces: ['Amazon', 'Mercado Libre', 'TikTok Shop', 'Shopify'],
    color: '#22d3ee',
  },
  
  // South America
  {
    country: 'Argentina',
    code: 'ARG',
    region: 'South America',
    marketplaces: ['Mercado Libre'],
    color: '#22d3ee',
  },
  {
    country: 'Colombia',
    code: 'COL',
    region: 'South America',
    marketplaces: ['Mercado Libre'],
    color: '#22d3ee',
  },
  
  // Europe
  {
    country: 'Ireland',
    code: 'IRL',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'United Kingdom',
    code: 'GBR',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Portugal',
    code: 'PRT',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Spain',
    code: 'ESP',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'France',
    code: 'FRA',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Netherlands',
    code: 'NLD',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Belgium',
    code: 'BEL',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Luxembourg',
    code: 'LUX',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Germany',
    code: 'DEU',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Italy',
    code: 'ITA',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Denmark',
    code: 'DNK',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Sweden',
    code: 'SWE',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Poland',
    code: 'POL',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Czechia',
    code: 'CZE',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Slovakia',
    code: 'SVK',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Hungary',
    code: 'HUN',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Romania',
    code: 'ROU',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Bulgaria',
    code: 'BGR',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Greece',
    code: 'GRC',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Cyprus',
    code: 'CYP',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Malta',
    code: 'MLT',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Austria',
    code: 'AUT',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Slovenia',
    code: 'SVN',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Croatia',
    code: 'HRV',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Lithuania',
    code: 'LTU',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Latvia',
    code: 'LVA',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Estonia',
    code: 'EST',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Finland',
    code: 'FIN',
    region: 'Europe',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  
  // APAC
  {
    country: 'Australia',
    code: 'AUS',
    region: 'APAC',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'China',
    code: 'CHN',
    region: 'APAC',
    marketplaces: ['JINGDONG (JD)', 'Pin Duo Duo', 'Taobao', 'TikTok Shop', 'Little Red Book', 'We Chat', 'Tmall'],
    color: '#22d3ee',
  },
  {
    country: 'India',
    code: 'IND',
    region: 'APAC',
    marketplaces: ['Amazon'],
    color: '#22d3ee',
  },
  {
    country: 'Japan',
    code: 'JPN',
    region: 'APAC',
    marketplaces: ['Amazon', 'Rakuten'],
    color: '#22d3ee',
  },
  {
    country: 'Malaysia',
    code: 'MYS',
    region: 'APAC',
    marketplaces: ['Shopee', 'Lazada'],
    color: '#22d3ee',
  },
  {
    country: 'Philippines',
    code: 'PHL',
    region: 'APAC',
    marketplaces: ['Shopee', 'Lazada'],
    color: '#22d3ee',
  },
  {
    country: 'Singapore',
    code: 'SGP',
    region: 'APAC',
    marketplaces: ['Amazon', 'Shopee', 'Lazada'],
    color: '#22d3ee',
  },
  {
    country: 'South Korea',
    code: 'KOR',
    region: 'APAC',
    marketplaces: ['Coupang', 'Naver'],
    color: '#22d3ee',
  },
];

export function GlobalReachMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [worldMapData, setWorldMapData] = useState<any>(null);
  const [allCountries, setAllCountries] = useState<any[]>([]);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs to avoid stale state in wheel handler
  const zoomRef = useRef(zoom);
  const panRef = useRef(pan);
  
  // Detect current theme
  const [currentTheme, setCurrentTheme] = useState<string>('moon');
  
  useEffect(() => {
    const updateTheme = () => {
      // Check both data-theme attribute and classes
      const themeAttr = document.documentElement.getAttribute('data-theme');
      const hasSoftDarkClass = document.documentElement.classList.contains('soft-dark');
      const hasSunClass = document.documentElement.classList.contains('sun');
      const hasOrangeClass = document.documentElement.classList.contains('orange');
      const hasWaterClass = document.documentElement.classList.contains('water');
      
      // Map CSS classes to semantic theme names
      if (hasSoftDarkClass || themeAttr === 'soft-dark') {
        setCurrentTheme('leaf'); // soft-dark class = LEAF theme (lime green)
      } else if (hasOrangeClass || themeAttr === 'orange') {
        setCurrentTheme('fire'); // orange class = FIRE theme (orange)
      } else if (hasWaterClass || themeAttr === 'water') {
        setCurrentTheme('water'); // water class = WATER theme (emerald)
      } else {
        setCurrentTheme('moon'); // dark class = MOON theme (cyan)
      }
    };
    
    updateTheme();
    
    // Watch for both attribute and class changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Theme-based colors
  const getThemeColors = () => {
    if (currentTheme === 'leaf') {
      return {
        countryFill: '#ADF32D', // Brand lime green for LEAF theme
        countryFillHover: '#9DE01A', // Slightly darker on hover
        countryFillOpacity: 'rgba(173, 243, 45, 0.6)', // Brand lime with opacity
        countryStroke: '#9DE01A', // Darker lime for borders
        markerFill: '#8BC920', // Darker for markers
        markerPulse: 'rgba(173, 243, 45, 0.4)', // Brand lime with opacity
        glowColor: 'rgba(173, 243, 45, 0.9)', // Brand lime glow
      };
    }
    if (currentTheme === 'fire') {
      return {
        countryFill: '#FF9900', // Brand orange
        countryFillHover: '#FF8000', // Slightly darker on hover
        countryFillOpacity: 'rgba(255, 153, 0, 0.6)', // Brand orange with opacity
        countryStroke: '#FF8000', // Darker orange for borders
        markerFill: '#FF6600', // Darker for markers
        markerPulse: 'rgba(255, 153, 0, 0.4)', // Brand orange with opacity
        glowColor: 'rgba(255, 153, 0, 0.9)', // Brand orange glow
      };
    }
    if (currentTheme === 'water') {
      return {
        countryFill: '#10B981', // Emerald-500 for WATER theme
        countryFillHover: '#059669', // Emerald-600
        countryFillOpacity: 'rgba(16, 185, 129, 0.6)', // Emerald with opacity
        countryStroke: '#059669', // Emerald-600 for borders
        markerFill: '#047857', // Emerald-700 for markers
        markerPulse: 'rgba(16, 185, 129, 0.4)', // Emerald with opacity
        glowColor: 'rgba(16, 185, 129, 0.9)', // Emerald glow
      };
    }
    // Default cyan colors for dark/moon theme
    return {
      countryFill: '#22d3ee',
      countryFillHover: '#22d3ee',
      countryFillOpacity: 'rgba(34, 211, 238, 0.6)',
      countryStroke: '#22d3ee',
      markerFill: '#22d3ee',
      markerPulse: 'rgba(34, 211, 238, 0.3)',
      glowColor: 'rgba(34, 211, 238, 0.8)',
    };
  };
  
  const themeColors = getThemeColors();
  
  const projection = geoMercator().scale(145).translate([450, 280]);
  const pathGenerator = geoPath().projection(projection);

  // Sync refs with state
  useEffect(() => { zoomRef.current = zoom; }, [zoom]);
  useEffect(() => { panRef.current = pan; }, [pan]);

  // Map of country codes (world atlas uses numeric codes)
  const countryCodeMap: Record<string, string> = {
    // North America
    '840': 'USA', // United States
    '124': 'CAN', // Canada
    
    // Central America
    '320': 'GTM', // Guatemala
    '484': 'MEX', // Mexico
    
    // South America
    '032': 'ARG', // Argentina
    '170': 'COL', // Colombia
    
    // Europe
    '040': 'AUT', // Austria
    '056': 'BEL', // Belgium
    '100': 'BGR', // Bulgaria
    '191': 'HRV', // Croatia
    '196': 'CYP', // Cyprus
    '203': 'CZE', // Czech Republic
    '208': 'DNK', // Denmark
    '233': 'EST', // Estonia
    '246': 'FIN', // Finland
    '250': 'FRA', // France
    '276': 'DEU', // Germany
    '300': 'GRC', // Greece
    '348': 'HUN', // Hungary
    '372': 'IRL', // Ireland
    '380': 'ITA', // Italy
    '428': 'LVA', // Latvia
    '440': 'LTU', // Lithuania
    '442': 'LUX', // Luxembourg
    '470': 'MLT', // Malta
    '528': 'NLD', // Netherlands
    '616': 'POL', // Poland
    '620': 'PRT', // Portugal
    '642': 'ROU', // Romania
    '703': 'SVK', // Slovakia
    '705': 'SVN', // Slovenia
    '724': 'ESP', // Spain
    '752': 'SWE', // Sweden
    '826': 'GBR', // United Kingdom
    
    // APAC
    '036': 'AUS', // Australia
    '156': 'CHN', // China
    '356': 'IND', // India
    '392': 'JPN', // Japan
    '458': 'MYS', // Malaysia
    '608': 'PHL', // Philippines
    '702': 'SGP', // Singapore
    '410': 'KOR', // South Korea
    
    // Middle East & Africa
    '818': 'EGY', // Egypt
    '682': 'SAU', // Saudi Arabia
    '710': 'ZAF', // South Africa
    '784': 'ARE', // United Arab Emirates
  };

  useEffect(() => {
    // Fetch world map data from CDN
      fetch('//unpkg.com/world-atlas/countries-110m.json')
      .then((response) => response.json())
      .then((data) => {
        const countries = feature(data, data.objects.countries) as unknown as { features: any[] };
        setWorldMapData(countries);
        setAllCountries(countries.features);
      })
      .catch((error) => console.error('Error loading world map:', error));
  }, []);

  // Native wheel listener for smooth zoom without page scroll
  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const MIN_ZOOM = 0.6;
    const MAX_ZOOM = 8;

    // Tune this: smaller = slower zoom, larger = faster zoom
    const ZOOM_SENSITIVITY = 0.0018;

    const onWheel = (event: WheelEvent) => {
      // Stop the page from moving
      event.preventDefault();
      event.stopPropagation();

      const rect = svg.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const currentZoom = zoomRef.current;
      const currentPan = panRef.current;

      // Normalize delta across devices
      // deltaMode: 0=pixels, 1=lines, 2=pages
      let deltaY = event.deltaY;
      if (event.deltaMode === 1) deltaY *= 16;       // line -> px (approx)
      else if (event.deltaMode === 2) deltaY *= 800; // page -> px (approx)

      // Exponential zoom for smoothness
      // Negative deltaY = zoom in, positive = zoom out
      // Boost sensitivity for pinch-to-zoom (ctrlKey)
      const sensitivity = event.ctrlKey ? ZOOM_SENSITIVITY * 1.8 : ZOOM_SENSITIVITY;
      const zoomFactor = Math.exp(-deltaY * sensitivity);
      let newZoom = currentZoom * zoomFactor;

      // Clamp
      newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newZoom));

      // Keep the point under the cursor stationary
      const pointX = (mouseX - currentPan.x) / currentZoom;
      const pointY = (mouseY - currentPan.y) / currentZoom;

      const newPan = {
        x: mouseX - pointX * newZoom,
        y: mouseY - pointY * newZoom,
      };

      // Constrain pan
      const constrainedPan = constrainPan(newPan, newZoom);

      zoomRef.current = newZoom;
      panRef.current = constrainedPan;

      setZoom(newZoom);
      setPan(constrainedPan);
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel as any);
    };
  }, []);

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom * 1.2);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => prevZoom / 1.2);
  };

  const handleMaximize = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging) {
      const currentPan = {
        x: pan.x + event.clientX - dragStart.x,
        y: pan.y + event.clientY - dragStart.y,
      };
      setPan(currentPan);
      setDragStart({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Constrain pan to keep map visible
  const constrainPan = (newPan: { x: number; y: number }, currentZoom: number) => {
    const viewWidth = 900;
    const viewHeight = 450;
    
    // Calculate bounds based on zoom level
    const maxPanX = (currentZoom - 1) * viewWidth * 0.5;
    const maxPanY = (currentZoom - 1) * viewHeight * 0.5;
    const minPanX = -maxPanX;
    const minPanY = -maxPanY;
    
    return {
      x: Math.max(minPanX, Math.min(maxPanX, newPan.x)),
      y: Math.max(minPanY, Math.min(maxPanY, newPan.y)),
    };
  };

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] dark:from-white/5 dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-white/20 leaf:border-white/20 water:border-white/30">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[rgb(0,0,0)] dark:text-white water:text-[#101828]">Global Marketplace Reach</h2>
        <p className="text-[rgb(54,65,83)] dark:text-gray-400 soft-dark:text-[#101828] light:text-[#101828] orange:text-[#101828] water:text-gray-700">Hover over countries to see available marketplaces</p>
      </div>

      {/* Map Container */}
      <div 
        ref={containerRef}
        className="relative w-full bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-xl overflow-hidden overscroll-contain"
        style={{ touchAction: "none", height: "600px" }}
      >
        {/* Animated Background Pulse Effects - Lime Green for soft-dark/LEAF theme */}
        <motion.div
          className="absolute top-0 left-0 h-full soft-dark:block hidden"
          style={{
            background: 'linear-gradient(to right, transparent 0%, transparent 48%, rgba(173, 243, 45, 0.08) 49%, rgba(173, 243, 45, 0.12) 50%, rgba(173, 243, 45, 0.08) 51%, transparent 52%, transparent 100%)',
            width: '200%',
          }}
          animate={{
            x: ['-100%', '0%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Animated Background Pulse Effects - Cyan for dark/moon theme */}
        <motion.div
          className="absolute top-0 left-0 h-full dark:block soft-dark:hidden light:hidden orange:hidden water:hidden"
          style={{
            background: 'linear-gradient(to right, transparent 0%, transparent 48%, rgba(6, 182, 212, 0.08) 49%, rgba(6, 182, 212, 0.12) 50%, rgba(6, 182, 212, 0.08) 51%, transparent 52%, transparent 100%)',
            width: '200%',
          }}
          animate={{
            x: ['-100%', '0%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Animated Background Pulse Effects - Orange for fire/orange theme */}
        <motion.div
          className="absolute top-0 left-0 h-full orange:block hidden"
          style={{
            background: 'linear-gradient(to right, transparent 0%, transparent 48%, rgba(255, 153, 0, 0.08) 49%, rgba(255, 153, 0, 0.12) 50%, rgba(255, 153, 0, 0.08) 51%, transparent 52%, transparent 100%)',
            width: '200%',
          }}
          animate={{
            x: ['-100%', '0%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Animated Background Pulse Effects - Emerald for WATER theme */}
        <motion.div
          className="absolute top-0 left-0 h-full water:block hidden"
          style={{
            background: 'linear-gradient(to right, transparent 0%, transparent 48%, rgba(16, 185, 129, 0.08) 49%, rgba(16, 185, 129, 0.12) 50%, rgba(16, 185, 129, 0.08) 51%, transparent 52%, transparent 100%)',
            width: '200%',
          }}
          animate={{
            x: ['-100%', '0%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <svg
          viewBox="0 0 900 450"
          className="w-full h-full relative z-10"
          ref={svgRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Background */}
          <rect x="0" y="0" width="900" height="450" fill="transparent" />

          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* Grid lines for visual appeal */}
            <g opacity="0.1">
              {[...Array(18)].map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={i * 25}
                  x2="900"
                  y2={i * 25}
                  stroke="white"
                  strokeWidth="0.5"
                />
              ))}
              {[...Array(36)].map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * 25}
                  y1="0"
                  x2={i * 25}
                  y2="450"
                  stroke="white"
                  strokeWidth="0.5"
                />
              ))}
            </g>

            {/* Country Paths */}
            {worldMapData && (
              <g>
                {worldMapData.features.map((feature: any, index: number) => {
                  const country = countryData.find((c) => c.code === countryCodeMap[feature.id]);
                  const isHovered = hoveredCountry === countryCodeMap[feature.id];
                  const pathData = pathGenerator(feature);
                  
                  // Skip if path generation failed
                  if (!pathData) return null;
                  
                  // Filter out French Guiana (France's overseas territory in South America)
                  // French Guiana shares country code 250 with France but is in South America
                  if (feature.id === '254' || feature.id === '250') {
                    try {
                      const bounds = pathGenerator.bounds(feature);
                      if (bounds) {
                        const [[x1, y1], [x2, y2]] = bounds;
                        // French Guiana appears in the western hemisphere on the map (x < 450)
                        // and is relatively small, while mainland France is much larger
                        const width = x2 - x1;
                        const isFrenchGuiana = x1 < 450 && x2 < 500 && width < 40;
                        if (isFrenchGuiana) {
                          return null;
                        }
                      }
                    } catch (e) {
                      // If bounds calculation fails, continue rendering
                    }
                  }

                  return (
                    <motion.path
                      key={`${feature.id || 'country'}-${index}`}
                      d={pathData}
                      fill={country ? (isHovered ? themeColors.countryFillHover : themeColors.countryFillOpacity) : 'rgba(100, 116, 139, 0.3)'}
                      stroke={country ? themeColors.countryStroke : 'rgba(148, 163, 184, 0.4)'}
                      strokeWidth={country ? '1.5' : '0.5'}
                      className={country ? 'cursor-pointer transition-all duration-300' : ''}
                      onMouseEnter={() => country && setHoveredCountry(countryCodeMap[feature.id])}
                      onMouseLeave={() => country && setHoveredCountry(null)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.05 + index * 0.002 }}
                      style={{
                        filter: isHovered && country ? `drop-shadow(0 0 10px ${themeColors.glowColor})` : 'none',
                      }}
                    />
                  );
                })}
              </g>
            )}

            {/* Markers for countries */}
            {countryData.map((country, index) => {
              // Calculate marker positions based on lat/lng with the same projection
              const markerPositions: Record<string, { lat: number; lng: number }> = {
                // North America
                USA: { lat: 40.7608, lng: -111.8910 },
                CAN: { lat: 56.1304, lng: -106.3468 },
                
                // Central America
                GTM: { lat: 15.7835, lng: -90.2308 },
                MEX: { lat: 23.6345, lng: -102.5528 },
                
                // South America
                ARG: { lat: -38.4161, lng: -63.6167 },
                COL: { lat: 4.5709, lng: -74.2973 },
                
                // Europe
                AUT: { lat: 47.5162, lng: 14.5501 },
                BEL: { lat: 50.5039, lng: 4.4699 },
                BGR: { lat: 42.7339, lng: 25.4858 },
                HRV: { lat: 45.1000, lng: 15.2000 },
                CYP: { lat: 35.1264, lng: 33.4299 },
                CZE: { lat: 49.8175, lng: 15.4729 },
                DNK: { lat: 56.0057, lng: 10.0904 },
                EST: { lat: 58.5953, lng: 25.0136 },
                FIN: { lat: 61.9241, lng: 25.7482 },
                FRA: { lat: 48.8566, lng: 2.3522 },
                DEU: { lat: 52.5200, lng: 13.4050 },
                GRC: { lat: 39.0742, lng: 21.8243 },
                HUN: { lat: 47.1625, lng: 19.5033 },
                IRL: { lat: 53.4129, lng: -8.2439 },
                ITA: { lat: 41.9028, lng: 12.4964 },
                LVA: { lat: 56.8796, lng: 24.6032 },
                LTU: { lat: 55.1694, lng: 23.8813 },
                LUX: { lat: 49.6116, lng: 6.1300 },
                MLT: { lat: 35.9375, lng: 14.3754 },
                NLD: { lat: 52.1326, lng: 5.2913 },
                POL: { lat: 51.9194, lng: 19.1451 },
                PRT: { lat: 39.3999, lng: -8.2245 },
                ROU: { lat: 45.9432, lng: 24.9668 },
                SVK: { lat: 48.6690, lng: 19.6990 },
                SVN: { lat: 46.1512, lng: 14.9955 },
                ESP: { lat: 40.4168, lng: -3.7038 },
                SWE: { lat: 60.1282, lng: 18.6435 },
                CHE: { lat: 46.8182, lng: 8.2275 },
                TUR: { lat: 38.9637, lng: 35.2433 },
                GBR: { lat: 51.5074, lng: -0.1278 },
                
                // APAC
                AUS: { lat: -25.2744, lng: 133.7751 },
                CHN: { lat: 35.8617, lng: 104.1954 },
                IND: { lat: 20.5937, lng: 78.9629 },
                JPN: { lat: 36.2048, lng: 138.2529 },
                MYS: { lat: 4.2105, lng: 101.9758 },
                PHL: { lat: 12.8797, lng: 121.7740 },
                SGP: { lat: 1.3521, lng: 103.8198 },
                KOR: { lat: 37.5665, lng: 126.9780 },
                
                // Middle East & Africa
                EGY: { lat: 26.8206, lng: 30.8025 },
                SAU: { lat: 23.8859, lng: 45.0792 },
                ZAF: { lat: -30.5595, lng: 22.9375 },
                ARE: { lat: 23.4241, lng: 53.8478 },
              };

              const coords = markerPositions[country.code];
              if (!coords) return null;

              const projected = projection([coords.lng, coords.lat]);
              if (!projected) return null;

              const [x, y] = projected;

              return (
                <g key={`marker-${country.code}`}>
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={hoveredCountry === country.code ? 6 / zoom : 4 / zoom}
                    fill={themeColors.markerFill}
                    stroke="white"
                    strokeWidth={2 / zoom}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredCountry(country.code)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  />
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={12 / zoom}
                    fill={themeColors.markerPulse}
                    stroke="none"
                    className="pointer-events-none"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                </g>
              );
            })}
          </g>
        </svg>

        {/* Tooltip */}
        {hoveredCountry && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 z-50 bg-slate-900/95 dark:bg-slate-900/95 soft-dark:bg-white/95 light:bg-white orange:bg-slate-900/95 water:bg-white/95 backdrop-blur-xl border border-cyan-500/30 dark:border-cyan-500/30 soft-dark:border-lime-600/30 light:border-cyan-500/30 orange:border-cyan-500/30 water:border-emerald-600/30 rounded-lg p-4 shadow-xl shadow-cyan-500/20 soft-dark:shadow-lime-500/20 water:shadow-emerald-500/20"
          >
            {countryData
              .filter((c) => c.code === hoveredCountry)
              .map((country) => (
                <div key={country.code}>
                  <h3 className="text-lg font-bold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-white water:text-[#101828] mb-1">{country.country}</h3>
                  <p className="text-xs text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-cyan-400 water:text-emerald-700 mb-3">{country.region}</p>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-700 orange:text-gray-400 water:text-[#101828] font-semibold mb-2">Available Marketplaces:</p>
                    {country.marketplaces.map((marketplace) => (
                      <div
                        key={marketplace}
                        className="flex items-center gap-2 text-sm text-gray-300 dark:text-gray-300 soft-dark:text-gray-800 light:text-gray-800 orange:text-gray-300 water:text-[#101828]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 dark:bg-cyan-400 soft-dark:bg-lime-600 light:bg-cyan-600 orange:bg-cyan-400 water:bg-emerald-600" />
                        {marketplace}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </motion.div>
        )}

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleZoomIn}
            className="bg-slate-900/95 dark:bg-slate-900/95 soft-dark:bg-white/95 light:bg-white orange:bg-white/95 water:bg-white/95 backdrop-blur-xl border border-cyan-500/30 dark:border-cyan-500/30 soft-dark:border-lime-600/30 light:border-cyan-500/30 orange:border-orange-600/30 water:border-emerald-600/30 rounded-lg p-2 hover:bg-cyan-500/10 soft-dark:hover:bg-lime-600/10 orange:hover:bg-orange-600/10 water:hover:bg-emerald-600/10 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 water:text-emerald-700" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleZoomOut}
            className="bg-slate-900/95 dark:bg-slate-900/95 soft-dark:bg-white/95 light:bg-white orange:bg-white/95 water:bg-white/95 backdrop-blur-xl border border-cyan-500/30 dark:border-cyan-500/30 soft-dark:border-lime-600/30 light:border-cyan-500/30 orange:border-orange-600/30 water:border-emerald-600/30 rounded-lg p-2 hover:bg-cyan-500/10 soft-dark:hover:bg-lime-600/10 orange:hover:bg-orange-600/10 water:hover:bg-emerald-600/10 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 water:text-emerald-700" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleMaximize}
            className="bg-slate-900/95 dark:bg-slate-900/95 soft-dark:bg-white/95 light:bg-white orange:bg-white/95 water:bg-white/95 backdrop-blur-xl border border-cyan-500/30 dark:border-cyan-500/30 soft-dark:border-lime-600/30 light:border-cyan-500/30 orange:border-orange-600/30 water:border-emerald-600/30 rounded-lg p-2 hover:bg-cyan-500/10 soft-dark:hover:bg-lime-600/10 orange:hover:bg-orange-600/10 water:hover:bg-emerald-600/10 transition-colors"
            title="Reset View"
          >
            <Maximize2 className="w-5 h-5 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 water:text-emerald-700" />
          </motion.button>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-cyan-500/40 dark:bg-cyan-500/40 soft-dark:bg-lime-700/60 light:bg-cyan-500/40 orange:bg-orange-600/40 water:bg-emerald-500/60 border border-cyan-500 dark:border-cyan-500 soft-dark:border-lime-800 light:border-cyan-500 orange:border-orange-600 water:border-emerald-600" />
          <span className="text-gray-400 dark:text-gray-400 soft-dark:text-gray-900 light:text-gray-700 orange:text-[#101828] water:text-[#101828]">Active Markets</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 dark:bg-cyan-400 soft-dark:bg-lime-900 light:bg-cyan-600 orange:bg-orange-600 water:bg-emerald-600" />
          <span className="text-gray-400 dark:text-gray-400 soft-dark:text-gray-900 light:text-gray-700 orange:text-[#101828] water:text-[#101828]">Market Locations</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-white/5 dark:bg-white/5 soft-dark:bg-white/10 light:bg-gray-50 orange:bg-white/5 water:bg-white/10 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 water:text-emerald-700">41</div>
          <div className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] water:text-[#101828] mt-1">Countries</div>
        </div>
        <div className="bg-white/5 dark:bg-white/5 soft-dark:bg-white/10 light:bg-gray-50 orange:bg-white/5 water:bg-white/10 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 water:text-emerald-700">
            {new Set(countryData.flatMap((c) => c.marketplaces)).size}
          </div>
          <div className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] water:text-[#101828] mt-1">Marketplaces</div>
        </div>
        <div className="bg-white/5 dark:bg-white/5 soft-dark:bg-white/10 light:bg-gray-50 orange:bg-white/5 water:bg-white/10 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 water:text-emerald-700">5</div>
          <div className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] water:text-[#101828] mt-1">Regions</div>
        </div>
      </div>
    </div>
  );
}
