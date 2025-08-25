import "dotenv/config";
import express from 'express';
import { Pool } from "pg";
import cors from 'cors';
import setupDatabase from "./config/setup-database.js";

const app = express();

const PORT = process.env.PORT || 5000;

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'affiliate_system',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'your_password',
    ssl: {
        rejectUnauthorized: false,
        require: true
    },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
});

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

// Database connection
setupDatabase();

// Click tracking endpoint
app.get('/click', async (req, res) => {
    try {
        const { affiliate_id, campaign_id, click_id } = req.query;
    
        if (!affiliate_id || !campaign_id || !click_id) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing required parameters: affiliate_id, campaign_id, click_id'
            });
        }

        // Check if affiliate and campaign exist
        const affiliateCheck = await pool.query(
            'SELECT id FROM affiliates WHERE id = $1',
            [affiliate_id]
        );

        const campaignCheck = await pool.query(
            'SELECT id FROM campaigns WHERE id = $1',
            [campaign_id]
        );

        if (affiliateCheck.rows.length === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid affiliate_id'
            });
        }

        if (campaignCheck.rows.length === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid campaign_id'
            });
        }

        // Store the click
        const result = await pool.query(
            'INSERT INTO clicks (affiliate_id, campaign_id, click_id, timestamp) VALUES ($1, $2, $3, NOW()) RETURNING *',
            [affiliate_id, campaign_id, click_id]
        );

        res.json({
            status: 'success',
            message: 'Click tracked successfully',
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Click tracking error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
});

// Postback endpoint
app.get('/postback', async (req, res) => {
    try {
        const { affiliate_id, click_id, amount, currency } = req.query;
        
        if (!affiliate_id || !click_id || !amount || !currency) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing required parameters: affiliate_id, click_id, amount, currency'
            });
        }

        // Validate that the click exists for the given affiliate
        const clickCheck = await pool.query(
            'SELECT id FROM clicks WHERE click_id = $1 AND affiliate_id = $2',
            [click_id, affiliate_id]
        );

        if (clickCheck.rows.length === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid click_id or click does not belong to this affiliate'
            });
        }

        // Check if conversion already exists for this click
        const existingConversion = await pool.query(
            'SELECT id FROM conversions WHERE click_id = $1',
            [clickCheck.rows[0].id]
        );

        if (existingConversion.rows.length > 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Conversion already exists for this click'
            });
        }

        // Store the conversion
        const result = await pool.query(
            'INSERT INTO conversions (click_id, amount, currency, timestamp) VALUES ($1, $2, $3, NOW()) RETURNING *',
            [clickCheck.rows[0].id, amount, currency]
        );

        res.json({
            status: 'success',
            message: 'Conversion tracked successfully',
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Postback error:', error);
        res.status(500).json({
        status: 'error',
        message: 'Internal server error'
        });
    }
});

// Get affiliates list
app.get('/api/affiliates', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM affiliates ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching affiliates:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get campaigns list
app.get('/api/campaigns', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM campaigns ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get affiliate data (clicks and conversions)
app.get('/api/affiliate/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Get clicks
        const clicksResult = await pool.query(`
            SELECT c.*, camp.name as campaign_name 
            FROM clicks c 
            JOIN campaigns camp ON c.campaign_id = camp.id 
            WHERE c.affiliate_id = $1 
            ORDER BY c.timestamp DESC
        `, [id]);

        // Get conversions
        const conversionsResult = await pool.query(`
            SELECT conv.*, c.click_id as original_click_id, c.affiliate_id
            FROM conversions conv 
            JOIN clicks c ON conv.click_id = c.id 
            WHERE c.affiliate_id = $1 
            ORDER BY conv.timestamp DESC
        `, [id]);

        // Calculate total revenue
        const totalRevenue = conversionsResult.rows.reduce((sum, conv) => {
            return sum + parseFloat(conv.amount);
        }, 0);

        res.json({
            affiliate_id: id,
            clicks: clicksResult.rows,
            conversions: conversionsResult.rows,
            total_revenue: totalRevenue,
            total_clicks: clicksResult.rows.length,
            total_conversions: conversionsResult.rows.length
        });

    } catch (error) {
        console.error('Error fetching affiliate data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Click tracking: http://localhost:${PORT}/click`);
    console.log(`Postback: http://localhost:${PORT}/postback`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});

export default app;