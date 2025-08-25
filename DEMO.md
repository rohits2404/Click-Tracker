# 🚀 Live Demo Guide

This guide will walk you through testing the complete affiliate postback system in real-time.

## 🎯 Demo Overview

We'll simulate the complete affiliate marketing flow:
1. **Click Tracking** - Simulate a user clicking an affiliate link
2. **Conversion Postback** - Simulate an advertiser sending a conversion notification
3. **Dashboard View** - See the results in real-time

## 🛠️ Prerequisites

- ✅ PostgreSQL running with `affiliate_system` database
- ✅ Backend server running on port 3001
- ✅ Frontend running on port 3000
- ✅ Database setup completed

## 📱 Step-by-Step Demo

### Step 1: Start the System

```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend  
cd frontend
npm run dev
```

### Step 2: Access the Dashboard

Open your browser and go to: **http://localhost:3000**

You should see:
- Affiliate selection cards
- System header with title
- Instructions section

### Step 3: Select an Affiliate

1. Click on **"TechGuru Marketing"** (ID: 1)
2. You'll see:
   - Your unique postback URL
   - Click tracking URLs for each campaign
   - Empty dashboard (no data yet)

### Step 4: Simulate Click Tracking

Open a new terminal and run:

```bash
# Simulate a user clicking an affiliate link
curl "http://localhost:3001/click?affiliate_id=1&campaign_id=1&click_id=demo_click_001"
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Click tracked successfully",
  "data": {
    "id": 1,
    "affiliate_id": 1,
    "campaign_id": 1,
    "click_id": "demo_click_001",
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

### Step 5: Simulate Conversion Postback

```bash
# Simulate an advertiser sending a conversion notification
curl "http://localhost:3001/postback?affiliate_id=1&click_id=demo_click_001&amount=149.99&currency=USD"
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Conversion tracked successfully",
  "data": {
    "id": 1,
    "click_id": 1,
    "amount": "149.99",
    "currency": "USD",
    "timestamp": "2024-01-01T12:05:00.000Z"
  }
}
```

### Step 6: View Results in Dashboard

1. **Refresh** the dashboard in your browser
2. You should now see:
   - **Total Clicks**: 1
   - **Total Conversions**: 1
   - **Conversion Rate**: 100%
   - **Total Revenue**: $149.99
   - **Recent Clicks** table with your click
   - **Recent Conversions** table with your conversion

### Step 7: Test Multiple Clicks and Conversions

```bash
# Track more clicks
curl "http://localhost:3001/click?affiliate_id=1&campaign_id=2&click_id=demo_click_002"
curl "http://localhost:3001/click?affiliate_id=1&campaign_id=1&click_id=demo_click_003"

# Track more conversions
curl "http://localhost:3001/postback?affiliate_id=1&click_id=demo_click_002&amount=299.99&currency=USD"
curl "http://localhost:3001/postback?affiliate_id=1&click_id=demo_click_003&amount=79.99&currency=USD"
```

### Step 8: Test Error Handling

```bash
# Try to convert a non-existent click
curl "http://localhost:3001/postback?affiliate_id=1&click_id=fake_click&amount=100&currency=USD"

# Try to convert with wrong affiliate_id
curl "http://localhost:3001/postback?affiliate_id=999&click_id=demo_click_001&amount=100&currency=USD"

# Try to convert the same click twice
curl "http://localhost:3001/postback?affiliate_id=1&click_id=demo_click_001&amount=200&currency=USD"
```

## 🎭 Advanced Demo Scenarios

### Scenario 1: Multiple Affiliates

1. Select **"Digital Dynamo"** (ID: 2)
2. Track clicks and conversions for this affiliate
3. Switch back to **"TechGuru Marketing"** to see isolated data

### Scenario 2: Campaign Performance

1. Track clicks across different campaigns
2. Compare conversion rates between campaigns
3. Analyze revenue by campaign

### Scenario 3: Real-time Monitoring

1. Keep the dashboard open
2. Run click/conversion commands in another terminal
3. Watch the dashboard update in real-time

## 🔍 What to Look For

### ✅ Success Indicators
- Click tracking returns success status
- Conversion postbacks are accepted
- Dashboard shows real-time updates
- Data isolation between affiliates
- Proper error handling for invalid requests

### 🚨 Error Handling
- Invalid affiliate_id returns 400 error
- Non-existent click_id returns 400 error
- Duplicate conversions are rejected
- Missing parameters return validation errors

### 📊 Data Integrity
- Clicks and conversions are properly linked
- Revenue calculations are accurate
- Timestamps are recorded correctly
- Conversion rates are calculated properly

## 🧪 Automated Testing

Run the complete test suite:

```bash
node test-system.js
```

This will test all endpoints and validate the complete flow.

## 🎯 Demo Checklist

- [ ] System starts without errors
- [ ] Dashboard loads and displays affiliates
- [ ] Click tracking works
- [ ] Conversion postbacks work
- [ ] Dashboard updates in real-time
- [ ] Error handling works correctly
- [ ] Data isolation works
- [ ] All API endpoints respond properly

## 🆘 Troubleshooting

### Dashboard Not Loading
- Check if frontend is running on port 3000
- Check browser console for errors
- Verify backend is running on port 3001

### API Calls Failing
- Check if backend is running
- Verify database connection
- Check .env configuration

### No Data Showing
- Run database setup script
- Check if sample data was inserted
- Verify database tables exist

## 🎉 Demo Success!

When everything works correctly, you've successfully demonstrated:

1. **Complete S2S Postback Flow** ✅
2. **Real-time Click Tracking** ✅
3. **Conversion Validation** ✅
4. **Affiliate Dashboard** ✅
5. **Data Isolation** ✅
6. **Error Handling** ✅

Your affiliate postback system MVP is working perfectly! 🚀