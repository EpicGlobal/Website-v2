#!/usr/bin/env python3
"""
Theme Renaming Script
Renames: soft-dark -> leaf, leaf -> water across the codebase
"""

import os
import re

def replace_in_file(filepath):
    """Replace theme names in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Use temporary placeholders to avoid double-replacement
        temp_leaf = '___TEMP_LEAF___'
        temp_water = '___TEMP_WATER___'
        
        # Step 1: Replace soft-dark with temp placeholder
        content = content.replace('soft-dark', temp_leaf)
        
        # Step 2: Replace leaf with temp placeholder (using word boundaries where appropriate)
        # For CSS classes
        content = re.sub(r'\bleaf:', temp_water + ':', content)
        content = re.sub(r'\.leaf\b', '.' + temp_water, content)
        content = re.sub(r"'leaf'", "'" + temp_water + "'", content)
        content = re.sub(r'"leaf"', '"' + temp_water + '"', content)
        content = re.sub(r'=== "leaf"', '=== "' + temp_water + '"', content)
        content = re.sub(r'html\.leaf', 'html.' + temp_water, content)
        
        # Step 3: Replace temp placeholders with final values
        content = content.replace(temp_leaf, 'leaf')
        content = content.replace(temp_water, 'water')
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Updated: {filepath}")
            return True
        return False
    
    except Exception as e:
        print(f"✗ Error processing {filepath}: {e}")
        return False

def walk_directory(directory):
    """Walk through directory and update all relevant files"""
    updated_count = 0
    skip_dirs = {'node_modules', '.git', 'dist', 'build', '__pycache__'}
    
    for root, dirs, files in os.walk(directory):
        # Remove directories we want to skip
        dirs[:] = [d for d in dirs if d not in skip_dirs]
        
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css', '.jsx', '.js')):
                filepath = os.path.join(root, file)
                if replace_in_file(filepath):
                    updated_count += 1
    
    return updated_count

if __name__ == '__main__':
    print("Starting theme renaming...")
    print("soft-dark → leaf")
    print("leaf → water")
    print("-" * 50)
    
    count = walk_directory('./src')
    
    print("-" * 50)
    print(f"\n✓ Completed! Updated {count} files.")
