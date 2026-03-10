#!/bin/bash

# This script renames theme classes across the codebase
# soft-dark -> leaf
# leaf -> water

# Find all .tsx, .ts, .css files and replace patterns
find ./src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) -exec sed -i '' \
  -e 's/soft-dark:/leaf:/g' \
  -e 's/leaf:/water:/g' \
  -e 's/\.soft-dark/.leaf/g' \
  -e 's/\.leaf\b/.water/g' \
  -e "s/'soft-dark'/'leaf'/g" \
  -e "s/'leaf'/'water'/g" \
  -e 's/"soft-dark"/"leaf"/g' \
  -e 's/"leaf"/"water"/g' \
  -e 's/theme === "soft-dark"/theme === "leaf"/g' \
  -e 's/theme === "leaf"/theme === "water"/g' \
  {} \;

echo "Theme renaming complete!"
