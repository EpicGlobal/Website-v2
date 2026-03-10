#!/usr/bin/env python3
import os
import re

# Define the replacements (from lime to cyan/blue)
replacements = [
    # Main background gradients
    (r'soft-dark:from-lime-400', 'soft-dark:from-[#00A8EA]'),
    (r'soft-dark:via-lime-100', 'soft-dark:via-cyan-100'),
    (r'soft-dark:from-lime-200', 'soft-dark:from-cyan-200'),
    (r'soft-dark:to-lime-300', 'soft-dark:to-cyan-300'),
    
    # Button and accent gradients
    (r'soft-dark:from-lime-500', 'soft-dark:from-cyan-500'),
    (r'soft-dark:via-lime-400', 'soft-dark:via-cyan-400'),
    (r'soft-dark:to-lime-500', 'soft-dark:to-cyan-500'),
    (r'soft-dark:to-lime-600', 'soft-dark:to-cyan-600'),
    (r'soft-dark:from-lime-600', 'soft-dark:from-cyan-600'),
    (r'soft-dark:to-lime-700', 'soft-dark:to-cyan-700'),
    (r'soft-dark:from-lime-700', 'soft-dark:from-cyan-700'),
    (r'soft-dark:to-lime-800', 'soft-dark:to-cyan-800'),
    
    # Hover states
    (r'soft-dark:hover:from-lime-600', 'soft-dark:hover:from-cyan-600'),
    (r'soft-dark:hover:to-lime-700', 'soft-dark:hover:to-cyan-700'),
    (r'soft-dark:hover:from-lime-700', 'soft-dark:hover:from-cyan-700'),
    (r'soft-dark:hover:to-lime-800', 'soft-dark:hover:to-cyan-800'),
    (r'soft-dark:hover:bg-lime-600', 'soft-dark:hover:bg-cyan-600'),
    
    # Borders
    (r'soft-dark:border-lime-600', 'soft-dark:border-cyan-600'),
    (r'soft-dark:border-lime-800', 'soft-dark:border-cyan-800'),
    
    # Shadows
    (r'soft-dark:shadow-lime-500', 'soft-dark:shadow-cyan-500'),
    
    # Text colors - need to stay dark for contrast, keep as is or adjust
    (r'soft-dark:text-lime-700', 'soft-dark:text-cyan-700'),
    (r'soft-dark:text-lime-800', 'soft-dark:text-cyan-800'),
    (r'soft-dark:text-lime-600', 'soft-dark:text-cyan-600'),
    
    # Group hover states
    (r'soft-dark:group-hover:text-lime-600', 'soft-dark:group-hover:text-cyan-600'),
    (r'soft-dark:group-hover:bg-lime-500', 'soft-dark:group-hover:bg-cyan-500'),
    
    # Background colors
    (r'soft-dark:bg-lime-500', 'soft-dark:bg-cyan-500'),
    (r'soft-dark:bg-lime-700', 'soft-dark:bg-cyan-700'),
]

# Find all .tsx files
for root, dirs, files in os.walk('/src'):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r') as f:
                    content = f.read()
                
                original_content = content
                for old, new in replacements:
                    content = re.sub(old, new, content)
                
                if content != original_content:
                    with open(filepath, 'w') as f:
                        f.write(content)
                    print(f"Updated: {filepath}")
            except Exception as e:
                print(f"Error processing {filepath}: {e}")

print("Replacement complete!")
