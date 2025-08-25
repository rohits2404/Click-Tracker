# Database Setup Guide

This guide will help you set up PostgreSQL for the Affiliate Postback System.

## 🐘 PostgreSQL Installation

### Windows
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer
3. Choose installation directory
4. Set a password for the `postgres` user
5. Keep default port (5432)
6. Complete installation

### macOS
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql

# Or download from postgresql.org
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## 🗄️ Database Creation

### 1. Access PostgreSQL
```bash
# Windows: Use pgAdmin (GUI) or command prompt
# macOS/Linux: Use terminal
sudo -u postgres psql
```

### 2. Create Database
```sql
CREATE DATABASE affiliate_system;
```

### 3. Create User (Optional)
```sql
CREATE USER affiliate_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE affiliate_system TO affiliate_user;
```

### 4. Exit PostgreSQL
```sql
\q
```

## ⚙️ Environment Configuration

### 1. Copy Environment File
```bash
cd backend
cp env.example .env
```

### 2. Edit .env File
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=affiliate_system
DB_USER=postgres          # or affiliate_user if created
DB_PASSWORD=your_password # password you set during installation

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## 🚀 Run Database Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Run Setup Script
```bash
npm run setup:db
```

This will:
- Create all necessary tables
- Insert sample affiliates and campaigns
- Verify database connection

### 3. Verify Setup
```bash
# Connect to database
psql -U postgres -d affiliate_system

# List tables
\dt

# Check sample data
SELECT * FROM affiliates;
SELECT * FROM campaigns;

# Exit
\q
```

## 🔍 Troubleshooting

### Connection Issues
```bash
# Check if PostgreSQL is running
# Windows: Check Services app
# macOS: brew services list
# Linux: sudo systemctl status postgresql

# Test connection
psql -U postgres -h localhost -d affiliate_system
```

### Permission Issues
```bash
# Grant permissions
sudo -u postgres psql
GRANT ALL PRIVILEGES ON DATABASE affiliate_system TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
```

### Port Conflicts
```bash
# Check if port 5432 is in use
netstat -an | grep 5432

# Change port in postgresql.conf if needed
# Then update .env file accordingly
```

## 📊 Database Schema Preview

After running the setup script, you'll have these tables:

### affiliates
| id | name | created_at |
|----|------|------------|
| 1  | TechGuru Marketing | 2024-01-01 00:00:00 |
| 2  | Digital Dynamo | 2024-01-01 00:00:00 |
| 3  | Growth Masters | 2024-01-01 00:00:00 |
| 4  | Lead Legends | 2024-01-01 00:00:00 |

### campaigns
| id | name | created_at |
|----|------|------------|
| 1  | Summer Sale 2024 | 2024-01-01 00:00:00 |
| 2  | Black Friday Blitz | 2024-01-01 00:00:00 |
| 3  | Holiday Special | 2024-01-01 00:00:00 |
| 4  | New Year Launch | 2024-01-01 00:00:00 |
| 5  | Spring Collection | 2024-01-01 00:00:00 |

## ✅ Verification

Run the test script to verify everything is working:

```bash
node test-system.js
```

You should see:
- ✅ Database connected successfully
- ✅ Health Check: OK
- ✅ Click Tracked: success
- ✅ Conversion Tracked: success
- ✅ All tests completed successfully!

## 🆘 Common Issues

### "password authentication failed"
- Check your password in the .env file
- Ensure you're using the correct user

### "connection refused"
- PostgreSQL service not running
- Wrong port number
- Firewall blocking connection

### "database does not exist"
- Run the database creation SQL
- Check database name in .env file

### "permission denied"
- User doesn't have access to database
- Check user privileges

## 🔗 Useful Commands

```bash
# Start PostgreSQL service
# Windows: net start postgresql
# macOS: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Stop PostgreSQL service
# Windows: net stop postgresql
# macOS: brew services stop postgresql
# Linux: sudo systemctl stop postgresql

# Check status
# Windows: sc query postgresql
# macOS: brew services list | grep postgresql
# Linux: sudo systemctl status postgresql

# Backup database
pg_dump -U postgres affiliate_system > backup.sql

# Restore database
psql -U postgres affiliate_system < backup.sql
```

## 🎯 Next Steps

After successful database setup:

1. **Start Backend**: `npm run dev:backend`
2. **Start Frontend**: `npm run dev:frontend`
3. **Test System**: `node test-system.js`
4. **Access Dashboard**: http://localhost:3000

Your affiliate postback system is now ready to use! 🎉