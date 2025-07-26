/**
 * Asset loader utility for dual deployment support
 * Switches between local assets (Web2) and IPFS assets (Web3) based on environment
 */

// Import the IPFS mapping
import ipfsMapping from '../../../scripts/ipfs-asset-mapping.json';

export interface AssetMapping {
  [key: string]: {
    localPath: string;
    ipfsCID: string;
    ipfsUrl: string;
    uploaded: boolean;
  };
}

const IPFS_MAPPING = ipfsMapping as AssetMapping;

/**
 * Get the appropriate asset URL based on deployment target
 * @param localPath - The local asset path (e.g., '/logos/react.svg')
 * @returns The correct URL for the current deployment environment
 */
export function getAssetUrl(localPath: string): string {
  // Check if we're in IPFS mode via environment variable
  const isIPFSMode = process.env.NEXT_PUBLIC_DEPLOYMENT_TARGET === 'ipfs';
  
  // If not in IPFS mode, return local path
  if (!isIPFSMode) {
    return localPath;
  }
  
  // In IPFS mode, try to find the IPFS URL
  const asset = IPFS_MAPPING[localPath];
  
  if (asset && asset.uploaded && asset.ipfsUrl) {
    return asset.ipfsUrl;
  }
  
  // Fallback to local path if IPFS URL not available
  console.warn(`IPFS URL not found for asset: ${localPath}, falling back to local path`);
  return localPath;
}

/**
 * Helper function to get multiple asset URLs
 * @param localPaths - Array of local asset paths
 * @returns Array of appropriate URLs for current deployment
 */
export function getAssetUrls(localPaths: string[]): string[] {
  return localPaths.map(getAssetUrl);
}

/**
 * Check if we're currently in IPFS deployment mode
 * @returns boolean indicating IPFS mode
 */
export function isIPFSDeployment(): boolean {
  return process.env.NEXT_PUBLIC_DEPLOYMENT_TARGET === 'ipfs';
}

/**
 * Get deployment info for debugging
 * @returns object with deployment information
 */
export function getDeploymentInfo() {
  return {
    target: process.env.NEXT_PUBLIC_DEPLOYMENT_TARGET || 'web2',
    isIPFS: isIPFSDeployment(),
    totalAssets: Object.keys(IPFS_MAPPING).length,
    uploadedAssets: Object.values(IPFS_MAPPING).filter(asset => asset.uploaded).length
  };
}