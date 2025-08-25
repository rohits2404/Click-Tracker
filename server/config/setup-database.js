import "dotenv/config";
import { Pool } from 'pg';

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

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully');
    }
});

async function setupDatabase() {
    try {
        console.log('Setting up database...');

        // Create tables
        await pool.query(`
            CREATE TABLE IF NOT EXISTS affiliates (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS campaigns (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS clicks (
                id SERIAL PRIMARY KEY,
                affiliate_id INTEGER REFERENCES affiliates(id),
                campaign_id INTEGER REFERENCES campaigns(id),
                click_id VARCHAR(255) NOT NULL,
                timestamp TIMESTAMP DEFAULT NOW(),
                UNIQUE(affiliate_id, campaign_id, click_id)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS conversions (
                id SERIAL PRIMARY KEY,
                click_id INTEGER REFERENCES clicks(id),
                amount DECIMAL(10,2) NOT NULL,
                currency VARCHAR(3) NOT NULL,
                timestamp TIMESTAMP DEFAULT NOW()
            );
        `);

        console.log('Tables created successfully');

        // Check if data already exists
        const affiliateCount = await pool.query('SELECT COUNT(*) FROM affiliates');
    
        if (parseInt(affiliateCount.rows[0].count) === 0) {
            console.log('Seeding database with sample data...');

        // Insert sample affiliates
            await pool.query(`
                INSERT INTO affiliates (name) VALUES 
                ('TechGuru Marketing'),
                ('Digital Dynamo'),
                ('Growth Masters'),
                ('Lead Legends')
            `);

            // Insert sample campaigns
            await pool.query(`
                INSERT INTO campaigns (name) VALUES 
                ('Summer Sale 2024'),
                ('Black Friday Blitz'),
                ('Holiday Special'),
                ('New Year Launch'),
                ('Spring Collection')
            `);

            console.log('Sample data inserted successfully');
        } else {
            console.log('Database already contains data, skipping seeding');
        }

        console.log('Database setup completed successfully!');
    
    } catch (error) {
        console.error('Database setup error:', error);
    } finally {
        await pool.end();
    }
}

// Run setup if this file is executed directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
    setupDatabase();
}

export default setupDatabase;