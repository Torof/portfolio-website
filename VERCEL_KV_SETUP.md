# Vercel KV Setup for Persistent View Counter

This project uses Vercel KV (Redis) for persistent view counter storage.

## Setup Instructions

### 1. Create Vercel KV Database

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to the **Storage** tab
3. Click **Create Database**
4. Select **KV** (Key-Value Store)
5. Choose a name (e.g., `portfolio-views`)
6. Select a region close to your users
7. Click **Create**

### 2. Connect to Your Project

1. After creating the database, click **Connect Project**
2. Select your portfolio project
3. Choose the environment (Production, Preview, Development)
4. Click **Connect**

This will automatically add the required environment variables to your Vercel project:
- `KV_URL`
- `KV_REST_API_URL` 
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### 3. Local Development

For local development, you have two options:

#### Option A: Use Vercel Environment Variables
```bash
# Pull environment variables from Vercel
vercel env pull .env.local
```

#### Option B: Manual Setup
Create `.env.local` with your KV credentials:
```env
KV_URL="your-kv-url"
KV_REST_API_URL="your-kv-rest-api-url"
KV_REST_API_TOKEN="your-kv-rest-api-token"
KV_REST_API_READ_ONLY_TOKEN="your-kv-rest-api-read-only-token"
```

### 4. Fallback Behavior

The view counter system includes automatic fallbacks:

- **With KV**: Data persists across deployments and restarts
- **Without KV**: Falls back to in-memory storage (resets on restart)
- **Development**: Usually uses fallback unless KV is configured

### 5. Testing

You can test the view counter by:

1. Visiting pages to increment views
2. Checking the ViewStats component for analytics
3. Using the API directly:
   ```bash
   # Get views for a page
   curl "http://localhost:3000/api/views?page=home"
   
   # Reset all views (testing only)
   curl -X DELETE "http://localhost:3000/api/views"
   ```

## Features

✅ **Persistent Storage**: Views survive deployments and restarts  
✅ **Unique Visitor Tracking**: Distinguishes between total views and unique visitors  
✅ **Automatic Fallback**: Works without KV configuration  
✅ **Real-time Updates**: View counts update immediately  
✅ **Per-page Analytics**: Track views for individual pages  

## KV Data Structure

The system uses two Redis hashes:

### `page_views` (Hash)
```redis
HGETALL page_views
# Returns: { "home": "42", "projects": "28", "vibe-coding": "15" }
```

### `unique_visitors` (Hash)
```redis
HGETALL unique_visitors  
# Returns: { "home": ["visitor1", "visitor2"], "projects": ["visitor1"] }
```

## Monitoring

- View the KV database in your Vercel Dashboard
- Monitor usage and performance
- Set up alerts for high usage if needed
- Free tier includes generous limits for personal projects

## Production Deployment

When you deploy to Vercel, the KV integration automatically works if you've connected the database to your project. No additional configuration needed!