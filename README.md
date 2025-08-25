# Affiliate Postback System MVP

A complete Server-to-Server (S2S) postback tracking system for affiliate marketing, built with Node.js, Express, PostgreSQL, and Next.js.

## 🎯 What is a Postback?

In affiliate marketing, Server-to-Server (S2S) postbacks are used to track conversions without relying on browser cookies or pixels. Instead, the advertiser's server directly notifies the affiliate's server when a conversion occurs.

### Example Flow:
1. **User clicks affiliate link**: `https://affiliate-system.com/click?affiliate_id=1&campaign_id=10&click_id=abc123`
2. **System stores the click** in the database
3. **User makes a purchase** on the advertiser's site
4. **Advertiser fires postback**: `https://affiliate-system.com/postback?affiliate_id=1&click_id=abc123&amount=100&currency=USD`
5. **System validates and stores** the conversion
6. **Affiliate sees conversion** in their dashboard

## ✨ Features

- **Click Tracking**: Store affiliate clicks with affiliate_id, campaign_id, and click_id
- **Postback Endpoint**: Receive and validate conversion notifications
- **Affiliate Dashboard**: Real-time view of clicks, conversions, and revenue
- **Unique Postback URLs**: Each affiliate gets their own tracking URL format
- **Fraud Prevention**: Validates conversions against valid clicks only
- **Modern UI**: Beautiful, responsive dashboard built with Next.js and Tailwind CSS

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   PostgreSQL    │
│   (Next.js)     │◄──►│   (Express)     │◄──►│   Database      │
│   Port: 3000    │    │   Port: 3001    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd affiliate-postback-system
npm run install:all
```

### 2. Database Setup

#### Create PostgreSQL Database
```sql
CREATE DATABASE affiliate_system;
```

#### Configure Environment
```bash
cd backend
cp env.example .env
# Edit .env with your database credentials
```

#### Run Database Setup
```bash
npm run setup:db
```

### 3. Start the System

#### Development Mode (Both Backend & Frontend)
```bash
npm run dev
```

#### Production Mode
```bash
npm run start
```

The system will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

## 📊 Database Schema

### Tables

#### `affiliates`
- `id` (PK) - Unique affiliate identifier
- `name` - Affiliate company name
- `created_at` - Timestamp

#### `campaigns`
- `id` (PK) - Unique campaign identifier
- `name` - Campaign name
- `created_at` - Timestamp

#### `clicks`
- `id` (PK) - Unique click identifier
- `affiliate_id` (FK) - References affiliates.id
- `campaign_id` (FK) - References campaigns.id
- `click_id` (string) - Unique click ID per affiliate/campaign
- `timestamp` - When the click occurred

#### `conversions`
- `id` (PK) - Unique conversion identifier
- `click_id` (FK) - References clicks.id
- `amount` (decimal) - Conversion amount
- `currency` (string) - Currency code (USD, EUR, etc.)
- `timestamp` - When the conversion occurred

## 🔌 API Endpoints

### Click Tracking
```
GET /click?affiliate_id=1&campaign_id=10&click_id=abc123
```
Stores a new click event.

### Postback
```
GET /postback?affiliate_id=1&click_id=abc123&amount=100&currency=USD
```
Records a conversion for a valid click.

### Affiliate Data
```
GET /api/affiliate/:id
```
Returns clicks, conversions, and revenue for an affiliate.

### Health Check
```
GET /health
```
Returns system status.

## 🧪 Testing the System

### 1. Manual Testing

#### Track a Click
```bash
curl "http://localhost:3001/click?affiliate_id=1&campaign_id=1&click_id=test123"
```

#### Record a Conversion
```bash
curl "http://localhost:3001/postback?affiliate_id=1&click_id=test123&amount=99.99&currency=USD"
```

### 2. Automated Testing

```bash
node test-system.js
```

This will run through the complete flow and validate all endpoints.

## 🎨 Frontend Features

### Affiliate Dashboard
- **Affiliate Selection**: Choose from available affiliates
- **Postback URL Display**: Shows unique tracking URL for each affiliate
- **Click Tracking URLs**: Campaign-specific tracking URLs
- **Real-time Stats**: Clicks, conversions, revenue, and conversion rate
- **Data Tables**: Recent clicks and conversions with timestamps

### Responsive Design
- Mobile-friendly interface
- Modern UI with Tailwind CSS
- Interactive elements and hover states
- Clean, professional appearance

## 🔒 Security Features

- **Input Validation**: All parameters are validated
- **Click Verification**: Conversions only accepted for valid clicks
- **Duplicate Prevention**: One conversion per click
- **Affiliate Isolation**: Affiliates can only see their own data
- **SQL Injection Protection**: Parameterized queries

## 📈 Business Logic

### Conversion Validation
1. Verifies `click_id` exists in database
2. Ensures click belongs to specified `affiliate_id`
3. Prevents duplicate conversions
4. Returns appropriate error messages

### Revenue Calculation
- Tracks total revenue across all conversions
- Calculates conversion rates
- Provides real-time analytics

## 🚀 Deployment

### Environment Variables
```bash
# Backend (.env)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=affiliate_system
DB_USER=postgres
DB_PASSWORD=your_password
PORT=3001
CORS_ORIGIN=http://localhost:3000

# Frontend (next.config.js)
# API rewrites configured for localhost:3001
```

### Production Considerations
- Use environment-specific database credentials
- Configure CORS for production domains
- Set up proper logging and monitoring
- Use HTTPS in production
- Consider rate limiting for public endpoints

## 🛠️ Development

### Project Structure
```
affiliate-postback-system/
├── backend/                 # Express server
│   ├── server.js           # Main server file
│   ├── scripts/            # Database setup
│   └── package.json        # Backend dependencies
├── frontend/               # Next.js app
│   ├── app/                # App router components
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind configuration
├── test-system.js          # System testing script
└── package.json            # Root package.json
```

### Available Scripts
```bash
npm run dev              # Start both backend and frontend in dev mode
npm run dev:backend      # Start only backend
npm run dev:frontend     # Start only frontend
npm run setup:db         # Setup database and seed data
npm run test             # Run system tests
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Support

For questions or issues:
1. Check the documentation above
2. Review the test script for usage examples
3. Check the console logs for error details
4. Ensure PostgreSQL is running and accessible

## 🎉 Success Metrics

This MVP successfully demonstrates:
- ✅ Complete S2S postback flow
- ✅ Click tracking and validation
- ✅ Conversion recording and fraud prevention
- ✅ Real-time affiliate dashboard
- ✅ Unique URL generation
- ✅ Clean, maintainable code
- ✅ Comprehensive testing
- ✅ Production-ready architecture

The system is ready for production use with proper environment configuration and security measures.