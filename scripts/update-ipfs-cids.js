#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Update IPFS CIDs with provided folder URLs
function updateIPFSCIDs() {
  console.log('🔄 Updating IPFS CIDs with new folder URLs...\n');
  
  const mappingFile = path.join(__dirname, 'ipfs-asset-mapping.json');
  const mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));
  
  // New folder CIDs
  const logosFolderCID = 'bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa';
  const screenshotsFolderCID = 'bafybeia3uzg6u4j5jdlfqvhprm6ih4fubuk3hrre4emwmqdehgprj2e7hm';
  const baseUrl = 'https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs';
  
  let updatedCount = 0;
  
  // Update all logos
  Object.keys(mapping).forEach(assetPath => {
    const asset = mapping[assetPath];
    
    if (assetPath.startsWith('/logos/')) {
      const filename = path.basename(assetPath);
      asset.ipfsCID = `${logosFolderCID}/${filename}`;
      asset.ipfsUrl = `${baseUrl}/${logosFolderCID}/${filename}`;
      asset.uploaded = true;
      updatedCount++;
      console.log(`✅ Updated ${assetPath}`);
    }
    
    if (assetPath.startsWith('/screenshots/')) {
      const filename = path.basename(assetPath);
      asset.ipfsCID = `${screenshotsFolderCID}/${filename}`;
      asset.ipfsUrl = `${baseUrl}/${screenshotsFolderCID}/${filename}`;
      asset.uploaded = true;
      updatedCount++;
      console.log(`✅ Updated ${assetPath}`);
    }
  });
  
  // Write updated mapping
  fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2));
  
  console.log(`\n🎉 Updated ${updatedCount} assets with IPFS CIDs!`);
  console.log('\n📋 Summary:');
  console.log(`- Logos folder: ${logosFolderCID}`);
  console.log(`- Screenshots folder: ${screenshotsFolderCID}`);
  console.log(`- Total uploaded assets: ${Object.values(mapping).filter(a => a.uploaded).length}`);
  console.log(`- Remaining assets: ${Object.values(mapping).filter(a => !a.uploaded).length}`);
}

updateIPFSCIDs();