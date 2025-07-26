#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to apply IPFS asset URLs to the codebase
function applyIPFSAssets() {
  console.log('🔄 Applying IPFS asset URLs to codebase...\n');
  
  const mappingFile = path.join(__dirname, 'ipfs-asset-mapping.json');
  
  if (!fs.existsSync(mappingFile)) {
    console.error('❌ Asset mapping file not found. Run: npm run generate-ipfs-map first.');
    process.exit(1);
  }
  
  const mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));
  
  // Check if CIDs have been updated
  const unuploadedAssets = Object.entries(mapping).filter(([path, data]) => 
    data.ipfsCID === "REPLACE_WITH_ACTUAL_CID" || !data.uploaded
  );
  
  if (unuploadedAssets.length > 0) {
    console.log('⚠️  Warning: Some assets have not been uploaded to IPFS yet:');
    unuploadedAssets.forEach(([path]) => console.log(`  - ${path}`));
    console.log('\nPlease upload these assets and update their CIDs in the mapping file.');
    console.log('Do you want to continue anyway? (y/N)');
    
    // For now, let's continue with a warning
    console.log('Continuing with available CIDs...\n');
  }
  
  // Files to update
  const filesToUpdate = [
    'src/lib/data/techStack.ts',
    'src/lib/data/experiences.ts', 
    'src/lib/data/education.ts',
    'src/lib/data/personalInfo.ts',
    'src/lib/services/projects.ts',
    'src/components/NavBar.tsx'
  ];
  
  let totalReplacements = 0;
  
  filesToUpdate.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    let fileReplacements = 0;
    
    // Replace asset paths with IPFS URLs
    Object.entries(mapping).forEach(([originalPath, data]) => {
      if (data.uploaded && data.ipfsCID !== "REPLACE_WITH_ACTUAL_CID") {
        // Replace various formats of the path
        const patterns = [
          `'${originalPath}'`,
          `"${originalPath}"`,
          `\`${originalPath}\``,
          `'${originalPath.substring(1)}'`, // without leading slash
          `"${originalPath.substring(1)}"`,  // without leading slash
          `\`${originalPath.substring(1)}\``  // without leading slash
        ];
        
        patterns.forEach(pattern => {
          const replacement = `"${data.ipfsUrl}"`;
          if (content.includes(pattern)) {
            content = content.replace(new RegExp(escapeRegExp(pattern), 'g'), replacement);
            fileReplacements++;
          }
        });
      }
    });
    
    if (fileReplacements > 0) {
      fs.writeFileSync(fullPath, content);
      console.log(`✅ Updated ${filePath} (${fileReplacements} replacements)`);
      totalReplacements += fileReplacements;
    } else {
      console.log(`ℹ️  No changes needed in ${filePath}`);
    }
  });
  
  console.log(`\n🎉 Complete! Made ${totalReplacements} total replacements.`);
  console.log('\n📝 Next steps:');
  console.log('1. Test your website locally: npm run dev');
  console.log('2. Build for production: npm run build');
  console.log('3. Commit and push changes');
  
  // Generate a summary report
  const reportFile = path.join(__dirname, 'ipfs-replacement-report.json');
  const report = {
    timestamp: new Date().toISOString(),
    totalReplacements,
    assetsUploaded: Object.values(mapping).filter(data => data.uploaded).length,
    totalAssets: Object.keys(mapping).length,
    filesUpdated: filesToUpdate.filter(filePath => {
      // Check if file was actually updated by checking if it exists and has our IPFS URLs
      const fullPath = path.join(__dirname, '..', filePath);
      if (!fs.existsSync(fullPath)) return false;
      const content = fs.readFileSync(fullPath, 'utf8');
      return content.includes('gateway.pinata.cloud/ipfs/') || content.includes('ipfs.io/ipfs/');
    })
  };
  
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  console.log(`📊 Replacement report saved: ${reportFile}`);
}

// Helper function to escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Run the script
applyIPFSAssets();