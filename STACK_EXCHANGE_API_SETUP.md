# Stack Exchange API Setup Guide

This guide helps you set up Stack Exchange API authentication to enable live data fetching for your portfolio's Stack Exchange card.

## Why Use an API Key?

Without an API key:
- **300 requests per day** limit per IP address
- Higher chance of being rate-limited or blocked

With an API key:
- **10,000 requests per day** per key
- More reliable access
- Better rate limiting handling

## How to Get a Stack Exchange API Key

1. **Visit Stack Apps**: Go to [https://stackapps.com/apps/oauth/register](https://stackapps.com/apps/oauth/register)

2. **Register Your Application**:
   - **Application Name**: `Portfolio Website - [Your Name]`
   - **Description**: `Personal portfolio website displaying Stack Exchange contributions`
   - **OAuth Domain**: `localhost` (for development) or your domain
   - **Application Website**: Your portfolio URL

3. **Get Your Key**: After registration, you'll receive a client key

## Setup Instructions

1. **Add API Key to Environment**:
   ```bash
   # In your .env.local file
   STACK_EXCHANGE_API_KEY=your_client_key_here
   ```

2. **Restart Development Server**:
   ```bash
   npm run dev
   ```

3. **Verify Setup**: 
   - Check browser console for API quota messages
   - Look for "LIVE DATA" indicator on the Stack Exchange card

## Rate Limits & Best Practices

- **Daily Quota**: 10,000 requests with API key
- **Per Second**: Max 30 requests/second (hard limit)
- **Backoff**: Respect backoff values returned by API
- **User-Agent**: Already configured in the service

## Troubleshooting

- **Still seeing static data?** Check browser console for error messages
- **Rate limited?** Wait for quota reset (24-hour period)
- **Invalid key?** Verify the key is correct in `.env.local`

## Fallback Behavior

The system is designed to gracefully fall back to static data if:
- API key is not provided
- Rate limits are exceeded
- API is temporarily unavailable
- Network issues occur

This ensures your portfolio always displays accurate Stack Exchange information, even without live API access.