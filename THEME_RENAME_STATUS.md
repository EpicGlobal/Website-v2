# Theme Renaming Status

## Renaming Pattern
- `soft-dark` → `leaf` (Sky blue theme)
- `leaf` → `water` (Lime green theme)

## ✅ COMPLETED Files

### Core Configuration
- [x] `/src/app/context/ThemeContext.tsx` - Type definitions and theme logic
- [x] `/src/styles/theme.css` - @variant declarations and CSS classes

### Components
- [x] `/src/app/components/ThemeToggle.tsx` - Theme toggle UI
- [x] `/src/app/components/Footer.tsx` - All theme class references
- [x] `/src/app/components/Navbar.tsx` - Navigation and logo logic
- [x] `/src/app/components/Ticker.tsx` - Marquee theme classes
- [x] `/src/app/components/AnimatedStats.tsx` - Stats section
- [x] `/src/app/components/Globe.tsx` - Globe canvas theme detection
- [x] `/src/app/components/ParticlesBackground.tsx` - Particle theme colors
- [x] `/src/app/components/SectionDivider.tsx` - SVG divider themes

## ⏳ REMAINING Files To Update

### Large Component Files
- [ ] `/src/app/components/CtaButton.tsx` - 26+ theme class references
- [ ] `/src/app/components/StickyCtaMobile.tsx` - 12+ references
- [ ] `/src/app/components/ExitIntentPopup.tsx` - 10+ references
- [ ] `/src/app/components/GlobalReachMap.tsx` - 50+ theme class references
- [ ] `/src/app/components/GlobalReachGlobe.tsx` - 3+ references

### Page Files (High Priority - User Facing)
- [ ] `/src/app/pages/Home.tsx` - 40+ theme class references
- [ ] `/src/app/pages/About.tsx` - 15+ references
- [ ] `/src/app/pages/CaseStudies.tsx` - 10+ references
- [ ] `/src/app/pages/Contact.tsx` - 10+ references
- [ ] `/src/app/pages/WhatWeAre.tsx` - 8+ references
- [ ] `/src/app/pages/KnowledgeBase.tsx` - 20+ references

## How to Complete

### Option 1: Python Script (Recommended)
```bash
python3 /update-themes.py
```

### Option 2: Bash Script
```bash
chmod +x /batch-update.sh
./batch-update.sh
```

### Option 3: Manual Find & Replace
Use your IDE's find-and-replace with regex:
1. Find: `soft-dark:` → Replace: `__TEMP_LEAF__:`
2. Find: `\bleaf:` → Replace: `__TEMP_WATER__:`
3. Find: `__TEMP_LEAF__` → Replace: `leaf`
4. Find: `__TEMP_WATER__` → Replace: `water`

Repeat for:
- `.soft-dark` → `.leaf`
- `.leaf` → `.water`
- `'soft-dark'` → `'leaf'`
- `'leaf'` → `'water'`
- `"soft-dark"` → `"leaf"`
- `"leaf"` → `"water"`
- `theme === 'soft-dark'` → `theme === 'leaf'`
- `theme === 'leaf'` → `theme === 'water'`

## Next Steps
I'll continue updating the remaining files manually now.
