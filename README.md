# COMMERCIFY-WEB

COMMERCIFY-WEB is a comprehensive e-commerce solution with separate client and admin interfaces, built using Next.js.

## Project Structure

```
COMMERCIFY-WEB/
├── .next/                 # Next.js build output
├── mysql-init-scripts/    # MySQL initialization scripts
├── node_modules/          # Node.js dependencies
├── src/                   # Source code
│   └── app/               # Main application code!
│       ├── (client)/      # Client-facing application (your own implementation)
│       ├── admin/         # Admin dashboard
│       ├── public/        # Static resources (fonts, images, svgs)
│       ├── components/    # Shared React components
│       ├── context/       # React context providers
│       ├── lib/           # Utility functions and libraries
│       └── types/         # TypeScript type definitions
├── .env                   # Environment variables (not in version control)
├── .env.example           # Example environment variable file
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore file
├── docker-compose.yml     # Docker Compose configuration
├── next.config.mjs        # Next.js configuration
├── package.json           # Project dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
├── README.md              # This file
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Prerequisites

- Node.js (v14 or later)
- Docker and Docker Compose
- Git

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/gkhaavik/CommercifyWeb.git
   cd CommercifyWeb
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:

   ```
   cp .env.example .env
   ```

   Edit the `.env` file and fill in the necessary values.

4. Start the Docker services:

   ```
   docker-compose up -d
   ```

5. Run the MySQL initialization scripts (if needed):
   The scripts in `mysql-init-scripts/` will be automatically executed when the MySQL container starts for the first time.

## Development

To run the development server:

```
npm run dev
```

This will start the Next.js development server. The application will be available at:

- Client: http://localhost:3000
- Demo: http://localhost:3000/demo
- Admin: http://localhost:3000/admin

## Building for Production

To create a production build:

```
npm run build
```

## Running in Production

To start the production server:

```
npm start
```

## Testing

(Add information about running tests once they are set up)

## Contributing
