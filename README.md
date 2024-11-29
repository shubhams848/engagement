# Employee Engagement Forum

A modern web application for managing employee feedback, appreciation, and engagement analytics.

## Features

- 👥 User Management (Admin, Manager, Employee roles)
- 📝 Consider System (Feedback)
- 🌟 Continue System (Appreciation)
- 📊 Analytics Dashboard
- 🔒 Role-based Access Control
- 📱 Responsive Design

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Context API for State Management
- Lucide React for Icons

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher
- AWS Account (for cloud deployment)
- MySQL or PostgreSQL (for database)

## Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd employee-engagement-forum
```

2. Install dependencies:
```bash
npm install
```

3. Set up the local database:
   - Install MySQL or PostgreSQL
   - Create a new database
   - Update database configuration in `.env`

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

## Database Integration

### Option 1: MySQL Setup

1. Install MySQL:
```bash
sudo apt-get update
sudo apt-get install mysql-server
```

2. Create database and user:
```sql
CREATE DATABASE engagement_forum;
CREATE USER 'forum_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON engagement_forum.* TO 'forum_user'@'localhost';
FLUSH PRIVILEGES;
```

3. Database Schema:

```sql
-- Users table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role ENUM('user', 'manager', 'admin') NOT NULL,
    manager_id VARCHAR(36),
    team_id VARCHAR(36),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (manager_id) REFERENCES users(id)
);

-- Feedback table
CREATE TABLE feedback (
    id VARCHAR(36) PRIMARY KEY,
    type ENUM('consider', 'continue') NOT NULL,
    category VARCHAR(50) NOT NULL,
    sender_id VARCHAR(36) NOT NULL,
    recipient_id VARCHAR(36) NOT NULL,
    message TEXT NOT NULL,
    sentiment ENUM('positive', 'neutral', 'negative'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (recipient_id) REFERENCES users(id)
);
```

### Option 2: PostgreSQL Setup

1. Install PostgreSQL:
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

2. Create database and user:
```sql
CREATE DATABASE engagement_forum;
CREATE USER forum_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE engagement_forum TO forum_user;
```

3. Database Schema:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(20) CHECK (role IN ('user', 'manager', 'admin')) NOT NULL,
    manager_id UUID REFERENCES users(id),
    team_id UUID,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Feedback table
CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(20) CHECK (type IN ('consider', 'continue')) NOT NULL,
    category VARCHAR(50) NOT NULL,
    sender_id UUID NOT NULL REFERENCES users(id),
    recipient_id UUID NOT NULL REFERENCES users(id),
    message TEXT NOT NULL,
    sentiment VARCHAR(20) CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## AWS Deployment Guide

### 1. Database Setup (Amazon RDS)

1. Create an RDS instance:
   - Go to AWS Console → RDS
   - Choose MySQL or PostgreSQL
   - Select appropriate tier (t3.micro for development)
   - Configure security groups to allow application access

2. Update environment variables:
```env
DB_HOST=your-rds-endpoint
DB_PORT=3306
DB_NAME=engagement_forum
DB_USER=admin
DB_PASSWORD=your_password
```

### 2. Backend API (AWS Elastic Beanstalk)

1. Create Elastic Beanstalk environment:
   - Go to AWS Console → Elastic Beanstalk
   - Create new application
   - Choose Node.js platform
   - Upload application code

2. Configure environment variables in Elastic Beanstalk

3. Update security groups to allow RDS access

### 3. Frontend Deployment (Amazon S3 + CloudFront)

1. Create S3 bucket:
```bash
aws s3 mb s3://your-bucket-name
```

2. Build and deploy frontend:
```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name
```

3. Configure CloudFront:
   - Create distribution
   - Point to S3 bucket
   - Enable HTTPS
   - Configure custom domain (optional)

### 4. Domain and SSL (Route 53 + ACM)

1. Register domain in Route 53 (or use existing)
2. Request SSL certificate in ACM
3. Configure DNS records
4. Update CloudFront distribution

## Environment Variables

Create a `.env` file:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=engagement_forum
DB_USER=forum_user
DB_PASSWORD=your_password

# AWS (Production)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# Application
VITE_API_URL=http://localhost:3000
NODE_ENV=development
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to AWS (requires configuration)

## Categories

### Consider (Feedback) Types
- Skill Development
- Communication
- Time Management
- Quality of Work
- Innovation and Initiative
- Team Collaboration
- Leadership
- Customer-Centricity
- Compliance and Ethics
- Adaptability

### Continue (Appreciation) Types
- Team Contributions
- Outstanding Performance
- Creativity and Innovation
- Leadership Excellence
- Commitment and Dedication
- Customer Impact
- Learning and Growth
- Workplace Values

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for your own purposes.