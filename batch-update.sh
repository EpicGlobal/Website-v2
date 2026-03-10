#!/bin/bash
# Batch update script for remaining theme renaming
# This script renames: soft-dark -> leaf, leaf -> water

set -e  # Exit on error

echo "=== Batch Theme Renaming Script ==="
echo "Renaming: soft-dark → leaf, leaf → water"
echo ""

# List of files to update
FILES=(
  "src/app/components/CtaButton.tsx"
  "src/app/components/StickyCtaMobile.tsx"
  "src/app/components/ExitIntentPopup.tsx"
  "src/app/components/GlobalReachMap.tsx"
  "src/app/components/GlobalReachGlobe.tsx"
  "src/app/pages/Home.tsx"
  "src/app/pages/About.tsx"
  "src/app/pages/CaseStudies.tsx"
  "src/app/pages/Contact.tsx"
  "src/app/pages/WhatWeAre.tsx"
  "src/app/pages/KnowledgeBase.tsx"
)

# Function to replace themes in a file
replace_themes() {
  local file="$1"
  
  if [ ! -f "$file" ]; then
    echo "⚠️  File not found: $file"
    return 1
  fi
  
  # Create a temporary file
  local tmp_file="${file}.tmp"
  
  # Use perl for more reliable in-place replacement
  perl -pe '
    # Replace soft-dark: with __TEMP_LEAF__:
    s/soft-dark:/__TEMP_LEAF__:/g;
    # Replace leaf: with __TEMP_WATER__:
    s/\bleaf:/__TEMP_WATER__:/g;
    
    # Replace class names
    s/\.soft-dark\b/.__TEMP_LEAF__/g;
    s/\.leaf\b/.__TEMP_WATER__/g;
    
    # Replace string literals
    s/"soft-dark"/"__TEMP_LEAF__"/g;
    s/"leaf"/"__TEMP_WATER__"/g;
    s/'\''soft-dark'\''/'\''__TEMP_LEAF__'\''/g;
    s/'\''leaf'\''/'\''__TEMP_WATER__'\''/g;
    
    # Replace theme === checks
    s/=== "soft-dark"/=== "__TEMP_LEAF__"/g;
    s/=== "leaf"/=== "__TEMP_WATER__"/g;
    
    # Replace html. prefixes
    s/html\.soft-dark/html.__TEMP_LEAF__/g;
    s/html\.leaf\b/html.__TEMP_WATER__/g;
    
    # Now replace temporary placeholders with final values
    s/__TEMP_LEAF__/leaf/g;
    s/__TEMP_WATER__/water/g;
  ' "$file" > "$tmp_file"
  
  # Move the temporary file back
  mv "$tmp_file" "$file"
  
  echo "✓ Updated: $file"
}

# Process each file
count=0
for file in "${FILES[@]}"; do
  if replace_themes "$file"; then
    ((count++))
  fi
done

echo ""
echo "=== Complete ==="
echo "✓ Updated $count files"
