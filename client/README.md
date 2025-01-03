# POS System

A Point of Sale (POS) system built with React + Vite, designed for managing sales transactions and inventory.

## Clone Repository
```bash
# Clone the repository
git clone https://github.com/PriyadasunKC/pos_system.git

# Navigate to project directory
cd pos_system
```

## Install Dependencies
```bash
# Install project dependencies
npm install

# If you encounter any peer dependency issues, you can try
npm install --legacy-peer-deps
```

## Run Development Server
```bash
# Start the development server
npm run dev

# The application will be available at http://localhost:5173 by default
```

## Build for Production
```bash
# Create a production build
npm run build

# The build files will be available in the dist directory
```

## Preview Production Build
```bash
# Preview the production build locally
npm run preview
```

## Project Structure
```
pos_system/
├── src/                # Source files
│   ├── components/     # React components
│   ├── assets/        # Static assets
│   ├── styles/        # CSS styles
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── public/            # Public static files
├── index.html         # HTML template
└── package.json       # Project dependencies and scripts
```

## Common Issues & Solutions

### Installation Issues
```bash
# If you encounter installation problems, try:
rm -rf node_modules
rm package-lock.json
npm install --legacy-peer-deps
```

### Port Already in Use
```bash
# For Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# For Mac/Linux:
lsof -i :5173
kill -9 <PID>
```

## Development Guidelines

1. Always pull the latest changes before starting work:
```bash
git pull origin main
```

2. Create a new branch for your features:
```bash
git checkout -b feature/your-feature-name
```

3. Before committing, make sure to:
   - Run the development server and test your changes
   - Check for any console errors
   - Ensure code formatting is consistent
