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
    // Convert to relative path
    return `href="./${p1}"`;
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
  
  console.log(`Found ${htmlFiles.length} HTML files to process.\n`);
  
  // Process each HTML file
  htmlFiles.forEach(file => {
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