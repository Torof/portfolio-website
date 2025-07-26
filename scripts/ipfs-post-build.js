#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to fix paths in HTML files
function fixPathsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changesMade = false;
  
  // Replace absolute paths with relative paths
  // For href attributes (excluding external URLs and anchors)
  const originalContent = content;
  content = content.replace(/href="\/([^"]*?)"/g, (match, p1) => {
    // Skip external URLs and anchors
    if (p1.startsWith('http') || p1.startsWith('#') || p1.startsWith('//')) {
      return match;
    }
    // Handle root path
    if (p1 === '') {
      return `href="./"`;
    }
    // Convert to relative path and add .html extension if it's a page
    const pagePaths = ['experience', 'education', 'projects', 'vibe-coding', 'contact'];
    if (pagePaths.includes(p1)) {
      return `href="./${p1}.html"`;
    }
    return `href="./${p1}"`;
  });
  
  // Also fix any relative paths without .html extensions
  content = content.replace(/href="\.\/([^"\.]*?)"/g, (match, p1) => {
    const pagePaths = ['experience', 'education', 'projects', 'vibe-coding', 'contact'];
    if (pagePaths.includes(p1)) {
      return `href="./${p1}.html"`;
    }
    return match;
  });
  
  // For src attributes (excluding external URLs)
  content = content.replace(/src="\/([^"]*?)"/g, (match, p1) => {
    // Skip external URLs
    if (p1.startsWith('http') || p1.startsWith('//')) {
      return match;
    }
    // Convert to relative path
    return `src="./${p1}"`;
  });
  
  // Fix any remaining absolute paths in other attributes
  content = content.replace(/action="\/([^"]*?)"/g, (match, p1) => {
    if (p1.startsWith('http') || p1.startsWith('#') || p1.startsWith('//')) {
      return match;
    }
    return `action="./${p1}"`;
  });
  
  // Fix content attributes that might contain absolute paths
  content = content.replace(/content="\/([^"]*?)"/g, (match, p1) => {
    if (p1.startsWith('http') || p1.startsWith('#') || p1.startsWith('//')) {
      return match;
    }
    return `content="./${p1}"`;
  });
  
  // Fix JSON data with absolute paths (for embedded JavaScript data)
  content = content.replace(/"\/([^"]*?\.(png|jpg|jpeg|svg|gif))"/g, (match, p1) => {
    // Skip external URLs
    if (p1.startsWith('http') || p1.startsWith('//')) {
      return match;
    }
    return `"./${p1}"`;
  });
  
  // Fix thumbnail paths in JavaScript data specifically
  content = content.replace(/"thumbnail":"\/([^"]*?)"/g, (match, p1) => {
    return `"thumbnail":"./${p1}"`;
  });
  
  // Also fix any other JSON paths like screenshots, logos, etc.
  content = content.replace(/("[\w]*"):("\/[^"]*?\.(png|jpg|jpeg|svg|gif|webp)")/g, (match, key, path) => {
    // Extract the path without quotes
    const pathValue = path.replace(/"/g, '');
    // Skip external URLs
    if (pathValue.startsWith('//') || pathValue.includes('http')) {
      return match;
    }
    return `${key}:".${pathValue}"`;
  });
  
  // Additional fix for escaped slash patterns in JSON
  content = content.replace(/\\"thumbnail\\":\\"\\\/([^"]*?)\\"/g, (match, p1) => {
    return `\\"thumbnail\\":\\"./${p1}\\"`;
  });
  
  changesMade = content !== originalContent;
  
  // Write the fixed content back
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed paths in: ${filePath}${changesMade ? ' ✓' : ' (no changes)'}`);
}

// Main function
async function main() {
  console.log('🔧 Fixing absolute paths for IPFS deployment...\n');
  
  const buildDir = path.join(__dirname, '..', 'out');
  
  // Find all HTML files in the build directory
  const htmlFiles = glob.sync('**/*.html', {
    cwd: buildDir,
    absolute: true
  });
  
  // Find all JavaScript files in the _next/static/chunks directory
  const jsFiles = glob.sync('_next/static/chunks/**/*.js', {
    cwd: buildDir,
    absolute: true
  });
  
  console.log(`Found ${htmlFiles.length} HTML files and ${jsFiles.length} JavaScript files to process.\n`);
  
  // Process each HTML file
  htmlFiles.forEach(file => {
    fixPathsInFile(file);
  });
  
  // Process each JavaScript file
  jsFiles.forEach(file => {
    fixPathsInFile(file);
  });
  
  console.log('\n✅ Successfully fixed all absolute paths for IPFS deployment!');
  
  // Create ipfs redirect if it doesn't exist
  const ipfsDir = path.join(buildDir, 'ipfs');
  if (!fs.existsSync(ipfsDir)) {
    fs.mkdirSync(ipfsDir, { recursive: true });
    const redirectHtml = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url=../">
  <script>window.location.href = "../";</script>
</head>
<body>
  <p>Redirecting to main site...</p>
</body>
</html>`;
    fs.writeFileSync(path.join(ipfsDir, 'index.html'), redirectHtml);
    console.log('✅ Created IPFS redirect directory');
  }
}

// Run the script
main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});