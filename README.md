# CommercifyWeb

CommercifyWeb is a comprehensive e-commerce solution consisting of an admin dashboard and a client-facing web application.

## Project Structure

```
COMMERCIFYWEB/
├── admin/                 # Admin dashboard application
├── client/                # Client-facing web application
├── mysql-init-scripts/    # MySQL initialization scripts
├── node_modules/          # Node.js modules
├── .env                   # Environment variables (not in version control)
├── .env.example           # Example environment variable file
├── .gitignore             # Git ignore file
├── docker-compose.yml     # Docker Compose configuration
├── package.json           # Project dependencies and scripts
└── README.md              # This file
```

## Prerequisites

- Node.js (v14 or later)
- Docker and Docker Compose
- Git

## Setup Guide

1. **Clone the repository:**

   ```bash
   git clone https://github.com/gkhaavik/CommercifyWeb.git
   cd CommercifyWeb
   ```

2. **Set up environment variables:**

   Copy the `.env.example` file to `.env` and fill in the necessary values:

   ```bash
   cp .env.example .env
   ```


3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the Docker containers:**

   ```bash
   docker compose up -d
   ```

   This will start the MySQL database and nessecary all backend services.

5. **Initialize the database:**

   The MySQL initialization scripts in the `mysql-init-scripts/` directory will be automatically executed when the MySQL container starts for the first time.

6. **Start the development servers:**

   ```bash
   npm run dev
   ```

   This command will start both the admin dashboard and client application in development mode.

   - Admin dashboard: http://localhost:3000
   - Client application: http://localhost:3001

## Accessing the Applications

- Admin Dashboard: http://localhost:3000
- Client Web Application: http://localhost:3001

To access the admin dashboard from the client application, navigate to http://localhost:3001/admin

## Development

- To work on the admin dashboard, navigate to the `admin/` directory.
- To work on the client application, navigate to the `client/` directory.
- Both applications are built with Next.js and can be developed independently.

## Contributing