# Installation Guide

Complete step-by-step instructions for installing and running ImageProcessor.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation Methods](#installation-methods)
3. [Verification](#verification)
4. [Troubleshooting](#troubleshooting)
5. [Production Deployment](#production-deployment)

## System Requirements

### Minimum Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (or yarn/pnpm)
- **Browser**: Any modern browser with WebAssembly support
- **Disk Space**: 500MB for node_modules
- **Internet**: Required for OpenCV.js CDN

### Recommended Setup

- **Node.js**: 20.x LTS or newer
- **npm**: Latest version
- **Browser**: Chrome 90+ or Firefox 88+
- **Disk Space**: 2GB free
- **RAM**: 4GB minimum, 8GB recommended

### Supported Operating Systems

- Windows 10/11
- macOS 10.15+
- Linux (Ubuntu 18.04+, Debian 10+)
- WSL2 (Windows Subsystem for Linux)

## Installation Methods

### Method 1: Standard npm Installation (Recommended)

#### Step 1: Clone or Download Project

```bash
# Clone from GitHub (if you have git)
git clone https://github.com/yourusername/image-processor.git
cd image-processor

# OR download and extract ZIP, then navigate to folder
cd image-processor
```

#### Step 2: Install Dependencies

```bash
# Using npm (comes with Node.js)
npm install

# Alternative: Using yarn
yarn install

# Alternative: Using pnpm
pnpm install
```

This command installs all required packages from `package.json`:
- React 19 and Next.js 16
- shadcn/ui components
- TailwindCSS
- Lucide React icons
- And other dependencies

**Installation time**: 2-5 minutes depending on internet speed

#### Step 3: Run Development Server

```bash
# Start the development server
npm run dev

# Server will start at http://localhost:3000
```

You'll see output like:
```
> next dev
  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  
✓ Ready in 2.5s
```

#### Step 4: Open in Browser

1. Open your web browser
2. Go to `http://localhost:3000`
3. Wait for OpenCV.js to load (10-30 seconds first time)
4. Start editing images!

---

### Method 2: Using Yarn

If you prefer Yarn package manager:

```bash
# Install Yarn globally (if not installed)
npm install -g yarn

# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Run production version
yarn start
```

---

### Method 3: Using pnpm

For faster package management:

```bash
# Install pnpm globally (if not installed)
npm install -g pnpm

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run production version
pnpm start
```

---

### Method 4: Docker Installation

For containerized deployment:

#### Step 1: Install Docker

- **Windows/Mac**: Download [Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Linux**: `sudo apt-get install docker.io`

#### Step 2: Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Step 3: Build and Run

```bash
# Build Docker image
docker build -t image-processor .

# Run container
docker run -p 3000:3000 image-processor

# Access at http://localhost:3000
```

---

### Method 5: Vercel Deployment (Production)

Deploy directly to Vercel:

#### Step 1: Prepare GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/image-processor.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Accept default settings (Next.js is auto-detected)
5. Click "Deploy"

Your app will be live at `https://your-project.vercel.app`

---

## Post-Installation Setup

### Verify Installation

Run verification commands:

```bash
# Check Node version
node --version
# Should be v18.0.0 or higher

# Check npm version
npm --version
# Should be 9.0.0 or higher

# Check app is working
npm run dev
# Should start without errors
```

### First Run Checklist

- [ ] Node.js installed (version 18+)
- [ ] Dependencies installed (`npm install` completed)
- [ ] Development server running (`npm run dev`)
- [ ] Browser can access `http://localhost:3000`
- [ ] Page loads without errors
- [ ] Can upload an image
- [ ] Can apply filters
- [ ] Can export image

---

## Verification

### Test the Installation

#### 1. Server is Running

```bash
npm run dev
```

Expected output:
```
▲ Next.js 16.0.0
✓ Ready in 1.5s
```

#### 2. Page Loads

Open `http://localhost:3000` in browser. You should see:
- "ImageProcessor" header
- Upload area in center
- "Drag or click to upload" text

#### 3. Upload Works

1. Click upload area
2. Select an image file
3. Image should appear in canvas

#### 4. Filters Work

1. After uploading, click a filter button
2. Image should change
3. No error messages should appear

#### 5. Export Works

1. Click "Export" button
2. Select format and quality
3. Click "Download"
4. File should download to your computer

If all steps work, installation is successful! ✓

---

## Environment Configuration

### Development Environment

Default `.env.local` (auto-created):

```env
# Development settings
NEXT_PUBLIC_API_URL=http://localhost:3000

# Add your env vars here if needed
```

### Production Environment

Create `.env.production` for production builds:

```env
NEXT_PUBLIC_API_URL=https://your-domain.com
```

---

## Building for Production

### Create Optimized Build

```bash
# Build optimized version
npm run build

# Takes 1-3 minutes, creates `.next` folder

# Output shows:
# ✓ Compiled client and server successfully
# ✓ Linting and type checking
# ✓ Collecting page data
```

### Test Production Build Locally

```bash
# Start production server locally
npm start

# Visit http://localhost:3000
# Should feel snappier than development mode
```

### Deploy to Vercel

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy
vercel

# Or push to GitHub - Vercel auto-deploys from main branch
```

---

## Troubleshooting Installation

### Issue: "npm: command not found"

**Problem**: Node.js not installed.

**Solution**:
1. Download from [nodejs.org](https://nodejs.org)
2. Install Node.js (includes npm)
3. Restart terminal/IDE
4. Try `npm --version` again

### Issue: "EACCES: permission denied"

**Problem**: Permission issues on Linux/Mac.

**Solution**:
```bash
# Fix npm permissions (Mac/Linux)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Then try npm install again
npm install
```

### Issue: "npm ERR! code ERESOLVE"

**Problem**: Dependency conflict.

**Solution**:
```bash
# Try installing with legacy peer deps
npm install --legacy-peer-deps

# Or clear cache and retry
npm cache clean --force
npm install
```

### Issue: "Port 3000 already in use"

**Problem**: Another app is using port 3000.

**Solution**:
```bash
# Use different port
npm run dev -- -p 3001

# Now visit http://localhost:3001

# Or kill the process using port 3000
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -i :3000
```

### Issue: "Cannot find module '@/lib/opencv-utils'"

**Problem**: Build system can't find imports.

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
npm install

# Try again
npm run dev
```

### Issue: "OpenCV.js failed to load"

**Problem**: CDN is inaccessible.

**Solution**:
1. Check internet connection
2. Check if `docs.opencv.org` is accessible
3. Try from different network
4. Try in different browser

---

## Upgrade Guide

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all packages safely
npm update

# Update to latest major versions (careful!)
npm upgrade

# Update specific package
npm install package-name@latest
```

### Upgrading Node.js

```bash
# Check current version
node --version

# Update Node.js
# Windows/Mac: Use installer from nodejs.org
# Linux: sudo apt-get install --upgrade nodejs

# Verify update
node --version
```

---

## Development Tools Setup

### Recommended VS Code Extensions

Install in Visual Studio Code:

1. **ES7+ React/Redux/React-Native snippets**
   - By dsznajder.es7-react-js-snippets

2. **Prettier - Code formatter**
   - By Prettier

3. **ESLint**
   - By Microsoft

4. **Tailwind CSS IntelliSense**
   - By bradlc

### Setup Prettier

Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Setup ESLint

Already configured in `eslint.config.js`. Just use:

```bash
npm run lint
```

---

## Next Steps

1. **Read GETTING_STARTED.md** - Learn how to use the app
2. **Explore features** - Try all filters and tools
3. **Check README.md** - Understand architecture
4. **Review code** - Learn how image processing works
5. **Deploy** - Get your app online

---

## Getting Help

### Common Issues

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for:
- OpenCV loading issues
- Image upload problems
- Performance issues
- Browser compatibility

### Resources

- [Node.js docs](https://nodejs.org/docs)
- [Next.js docs](https://nextjs.org/docs)
- [React docs](https://react.dev)
- [OpenCV.js docs](https://docs.opencv.org/4.7.0/d5/d10/tutorial_js_root.html)

### Report Issues

1. Check TROUBLESHOOTING.md first
2. Search GitHub issues
3. Open new issue with:
   - Node/npm versions
   - Operating system
   - Error messages
   - Steps to reproduce

---

## Quick Reference

### Common Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run code linting
npm run type-check   # Check TypeScript types
```

### File Structure

```
image-processor/
├── app/              # Next.js app router
├── components/       # React components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── public/           # Static files
├── package.json      # Dependencies
└── tsconfig.json     # TypeScript config
```

---

## Installation Complete! 🎉

You're ready to start editing images!

1. Run `npm run dev`
2. Open `http://localhost:3000`
3. Upload an image
4. Start creating!

For detailed usage, see [GETTING_STARTED.md](GETTING_STARTED.md)
