/**
 * Theme Renaming Script
 * Renames: soft-dark -> leaf, leaf -> water across the codebase
 */

const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // We need to be careful about order to avoid double-replacement
    // Strategy: Use temporary placeholders
    
    // Step 1: Replace soft-dark with temp placeholder
    const temp1 = '__TEMP_LEAF__';
    const temp2 = '__TEMP_WATER__';
    
    if (content.includes('soft-dark')) {
      content = content.replace(/soft-dark/g, temp1);
      modified = true;
    }
    
    // Step 2: Replace leaf with temp placeholder  
    if (content.includes('leaf')) {
      content = content.replace(/\bleaf\b/g, temp2);
      modified = true;
    }
    
    // Step 3: Replace temp placeholders with final values
    content = content.replace(new RegExp(temp1, 'g'), 'leaf');
    content = content.replace(new RegExp(temp2, 'g'), 'water');
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', 'dist', 'build'].includes(file)) {
        walkDir(filePath, callback);
      }
    } else if (stat.isFile()) {
      const ext = path.extname(file);
      if (['.tsx', '.ts', '.css', '.jsx', '.js'].includes(ext)) {
        callback(filePath);
      }
    }
  });
}

console.log('Starting theme renaming...');
let count = 0;

walkDir('./src', (filePath) => {
  if (replaceInFile(filePath)) {
    count++;
  }
});

console.log(`\nCompleted! Updated ${count} files.`);
