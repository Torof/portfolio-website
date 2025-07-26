#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to generate IPFS asset mapping
function generateIPFSAssetMap() {
  console.log('🔍 Scanning for assets to upload to IPFS...\n');
  
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Find all asset files
  const assetPatterns = [
    'flags/**/*.{svg,png,jpg,jpeg,webp}',
    'logos/**/*.{svg,png,jpg,jpeg,webp,ico}',
    'screenshots/**/*.{svg,png,jpg,jpeg,webp}',
    '*.{jpg,png,svg,ico}'
  ];
  
  const allAssets = [];
  
  assetPatterns.forEach(pattern => {
    const files = glob.sync(pattern, {
      cwd: publicDir,
      absolute: false
    });
    allAssets.push(...files);
  });
  
  console.log(`Found ${allAssets.length} assets to upload:\n`);
  
  // Generate mapping template
  const mapping = {};
  allAssets.forEach(asset => {
    const relativePath = `/${asset}`;
    mapping[relativePath] = {
      localPath: asset,
      ipfsCID: "REPLACE_WITH_ACTUAL_CID",
      ipfsUrl: "https://gateway.pinata.cloud/ipfs/REPLACE_WITH_ACTUAL_CID",
      uploaded: false
    };
    console.log(`  ${asset}`);
  });
  
  // Write mapping template
  const mappingFile = path.join(__dirname, 'ipfs-asset-mapping.json');
  fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2));
  
  console.log(`\n✅ Generated asset mapping template: ${mappingFile}`);
  
  // Generate instructions
  const instructionsFile = path.join(__dirname, 'UPLOAD_INSTRUCTIONS.md');
  const instructions = `# IPFS Asset Upload Instructions

## Step 1: Upload Assets to IPFS

You have ${allAssets.length} assets to upload. Here are your options:

### Option A: Upload using Pinata (Recommended)
1. Go to https://app.pinata.cloud
2. Create a free account
3. Upload each asset file and note the CID
4. Update the CIDs in \`scripts/ipfs-asset-mapping.json\`

### Option B: Upload using Web3.Storage
1. Go to https://web3.storage
2. Create a free account  
3. Upload each asset file and note the CID
4. Update the CIDs in \`scripts/ipfs-asset-mapping.json\`

### Option C: Bulk Upload Script (Advanced)
If you have a Pinata API key, you can use a bulk upload script:
\`\`\`bash
# Set your Pinata JWT
export PINATA_JWT="your_pinata_jwt_here"
npm run upload-assets-to-ipfs
\`\`\`

## Step 2: Update the Mapping File

Edit \`scripts/ipfs-asset-mapping.json\` and replace all "REPLACE_WITH_ACTUAL_CID" with actual CIDs from IPFS.

Example:
\`\`\`json
{
  "/flags/en.svg": {
    "localPath": "flags/en.svg",
    "ipfsCID": "QmYourActualCIDHere",
    "ipfsUrl": "https://gateway.pinata.cloud/ipfs/QmYourActualCIDHere",
    "uploaded": true
  }
}
\`\`\`

## Step 3: Apply IPFS URLs

Run the script to update your codebase:
\`\`\`bash
npm run apply-ipfs-assets
\`\`\`

## Asset List to Upload:

${allAssets.map(asset => `- ${asset}`).join('\n')}

## Quick Upload Checklist:

${allAssets.map(asset => `- [ ] ${asset}`).join('\n')}
`;

  fs.writeFileSync(instructionsFile, instructions);
  console.log(`✅ Generated upload instructions: ${instructionsFile}`);
  
  console.log('\n📋 Next steps:');
  console.log('1. Upload assets to IPFS using Pinata, Web3.Storage, or similar');
  console.log('2. Update the CIDs in scripts/ipfs-asset-mapping.json');
  console.log('3. Run: npm run apply-ipfs-assets');
}

// Run the script
generateIPFSAssetMap();