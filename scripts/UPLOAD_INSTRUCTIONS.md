# IPFS Asset Upload Instructions

## Step 1: Upload Assets to IPFS

You have 40 assets to upload. Here are your options:

### Option A: Upload using Pinata (Recommended)
1. Go to https://app.pinata.cloud
2. Create a free account
3. Upload each asset file and note the CID
4. Update the CIDs in `scripts/ipfs-asset-mapping.json`

### Option B: Upload using Web3.Storage
1. Go to https://web3.storage
2. Create a free account  
3. Upload each asset file and note the CID
4. Update the CIDs in `scripts/ipfs-asset-mapping.json`

### Option C: Bulk Upload Script (Advanced)
If you have a Pinata API key, you can use a bulk upload script:
```bash
# Set your Pinata JWT
export PINATA_JWT="your_pinata_jwt_here"
npm run upload-assets-to-ipfs
```

## Step 2: Update the Mapping File

Edit `scripts/ipfs-asset-mapping.json` and replace all "REPLACE_WITH_ACTUAL_CID" with actual CIDs from IPFS.

Example:
```json
{
  "/flags/en.svg": {
    "localPath": "flags/en.svg",
    "ipfsCID": "QmYourActualCIDHere",
    "ipfsUrl": "https://gateway.pinata.cloud/ipfs/QmYourActualCIDHere",
    "uploaded": true
  }
}
```

## Step 3: Apply IPFS URLs

Run the script to update your codebase:
```bash
npm run apply-ipfs-assets
```

## Asset List to Upload:

- flags/fr.svg
- flags/en.svg
- logos/v0-vercel.svg
- logos/udemy.webp
- logos/typescript.svg
- logos/thegraph.svg
- logos/tasc.svg
- logos/tailwindcss.svg
- logos/solidity.svg
- logos/solana.svg
- logos/rust.svg
- logos/reactjs.svg
- logos/rareskills.svg
- logos/polkadot.svg
- logos/perplexity.svg
- logos/nodejs.svg
- logos/nextjs.svg
- logos/ledgity-logo.svg
- logos/html-5.svg
- logos/hardhat.svg
- logos/github-copilot.svg
- logos/future-institution.jpeg
- logos/freelance.svg
- logos/foundry.svg
- logos/ethereum.svg
- logos/ethcon-korea.png
- logos/eth-global.ico
- logos/cursor.svg
- logos/css-3.svg
- logos/consensys.svg
- logos/claude.svg
- logos/chiliz.png
- logos/chatgpt.svg
- logos/bitcoin-vietnam-logo.png
- logos/bash.svg
- logos/alyra.png
- screenshots/web-default.svg
- screenshots/solidity-default.svg
- screenshots/code-default.svg
- profile.jpg

## Quick Upload Checklist:

- [ ] flags/fr.svg
- [ ] flags/en.svg
- [ ] logos/v0-vercel.svg
- [ ] logos/udemy.webp
- [ ] logos/typescript.svg
- [ ] logos/thegraph.svg
- [ ] logos/tasc.svg
- [ ] logos/tailwindcss.svg
- [ ] logos/solidity.svg
- [ ] logos/solana.svg
- [ ] logos/rust.svg
- [ ] logos/reactjs.svg
- [ ] logos/rareskills.svg
- [ ] logos/polkadot.svg
- [ ] logos/perplexity.svg
- [ ] logos/nodejs.svg
- [ ] logos/nextjs.svg
- [ ] logos/ledgity-logo.svg
- [ ] logos/html-5.svg
- [ ] logos/hardhat.svg
- [ ] logos/github-copilot.svg
- [ ] logos/future-institution.jpeg
- [ ] logos/freelance.svg
- [ ] logos/foundry.svg
- [ ] logos/ethereum.svg
- [ ] logos/ethcon-korea.png
- [ ] logos/eth-global.ico
- [ ] logos/cursor.svg
- [ ] logos/css-3.svg
- [ ] logos/consensys.svg
- [ ] logos/claude.svg
- [ ] logos/chiliz.png
- [ ] logos/chatgpt.svg
- [ ] logos/bitcoin-vietnam-logo.png
- [ ] logos/bash.svg
- [ ] logos/alyra.png
- [ ] screenshots/web-default.svg
- [ ] screenshots/solidity-default.svg
- [ ] screenshots/code-default.svg
- [ ] profile.jpg
