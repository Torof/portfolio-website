# Dual Deployment Guide

This portfolio supports both traditional Web2 hosting and IPFS/Web3 deployment. The asset loading system automatically switches between local assets and IPFS URLs based on the deployment target.

## 🌐 Web2 Deployment (scottdevines.dev)

**Fast loading with local assets**

### Development
```bash
npm run dev:web2
```

### Build for Production
```bash
npm run build:web2
```

### Preview Build
```bash
npm run preview:web2
```

### Deployment Targets
- **Vercel**: Connect GitHub repo, set build command to `npm run build:web2`
- **Netlify**: Set build command to `npm run build:web2`, publish directory to `out`
- **Traditional hosting**: Upload `out` folder contents

---

## 🔗 IPFS/Web3 Deployment (scottdevines.eth)

**Web3-compatible with IPFS assets**

### Development
```bash
npm run dev:ipfs
```

### Build for Production
```bash
npm run build:ipfs
```

### Preview Build
```bash
npm run preview:ipfs
```

### Deployment Targets
- **Fleek**: Connect GitHub repo, set build command to `npm run build:ipfs`
- **IPFS Manual**: Upload `out` folder to Pinata, Web3.Storage, etc.
- **ENS**: Point scottdevines.eth to IPFS hash

---

## 🔄 How Asset Loading Works

The `getAssetUrl()` utility function automatically chooses the right asset source:

### Web2 Mode (`NEXT_PUBLIC_DEPLOYMENT_TARGET=web2`)
```typescript
getAssetUrl('/logos/react.svg') 
// Returns: '/logos/react.svg' (local asset)
```

### IPFS Mode (`NEXT_PUBLIC_DEPLOYMENT_TARGET=ipfs`)
```typescript
getAssetUrl('/logos/react.svg')
// Returns: 'https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/react.svg'
```

---

## 📁 Asset Organization

- **Flags**: 2 assets (EN/FR language switcher)
- **Logos**: 34 assets (tech stack, companies, institutions)
- **Screenshots**: 3 assets (project placeholders)
- **Profile**: 1 asset (profile image)
- **Total**: 40 assets with IPFS fallback

---

## 🚀 Quick Deploy Commands

### Deploy to Vercel (Web2)
1. Connect GitHub repo to Vercel
2. Set build command: `npm run build:web2`
3. Deploy to scottdevines.dev

### Deploy to Fleek (IPFS)
1. Connect GitHub repo to Fleek
2. Set build command: `npm run build:ipfs`
3. Deploy to IPFS
4. Point scottdevines.eth to IPFS hash

---

## 🐛 Debugging

Check deployment mode:
```typescript
import { getDeploymentInfo } from './src/lib/utils/assetLoader';
console.log(getDeploymentInfo());
```

Returns:
```json
{
  "target": "ipfs",
  "isIPFS": true, 
  "totalAssets": 40,
  "uploadedAssets": 40
}
```

---

## 📝 Environment Variables

Set in your deployment platform:

### Web2 Deployment
```env
NEXT_PUBLIC_DEPLOYMENT_TARGET=web2
```

### IPFS Deployment  
```env
NEXT_PUBLIC_DEPLOYMENT_TARGET=ipfs
```

---

## 🎯 Benefits

- **Fast Web2**: Local assets load instantly
- **Web3 Compatible**: All assets available on IPFS
- **Single Codebase**: One repo, two deployment modes
- **Automatic Switching**: Environment-based asset loading
- **Fallback Support**: IPFS mode falls back to local if needed