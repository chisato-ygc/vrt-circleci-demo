# 🎨 Visual Regression Testing with CircleCI

A complete demonstration project showing how to implement Visual Regression Testing (VRT) using Playwright and visualize screenshots in CircleCI's UI.

## 🎯 Project Overview

This project demonstrates:
- ✅ **Visual Regression Testing** with Playwright
- ✅ **Automated Screenshot Comparison** across browsers
- ✅ **CircleCI Integration** with artifact visualization
- ✅ **Beautiful Flask Web App** with 3 pages
- ✅ **Complete CI/CD Pipeline** for VRT

## 📸 What is Visual Regression Testing?

Visual Regression Testing (VRT) captures screenshots of your application and compares them against baseline images to detect unintended visual changes.

**Benefits:**
- Catch CSS bugs before production
- Ensure responsive design works correctly
- Detect layout shifts and UI breaks
- Validate cross-browser consistency

## 🏗️ Project Structure

```
vrt-circleci-demo/
├── app/
│   ├── app.py                      # Flask application
│   ├── templates/
│   │   ├── base.html              # Base template
│   │   ├── home.html              # Homepage
│   │   ├── dashboard.html         # Dashboard page
│   │   └── profile.html           # Profile page
│   └── static/
│       ├── css/
│       │   └── styles.css         # Application styles
│       └── js/
│           └── app.js             # JavaScript
├── tests/
│   └── visual/
│       ├── homepage.spec.js       # Homepage VRT tests
│       ├── dashboard.spec.js      # Dashboard VRT tests
│       └── profile.spec.js        # Profile VRT tests
├── .circleci/
│   └── config.yml                 # CircleCI configuration
├── playwright.config.js           # Playwright configuration
├── requirements.txt               # Python dependencies
├── package.json                   # Node.js dependencies
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 18+
- Git

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd ~/vrt-circleci-demo
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

4. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

### Running the Application

1. **Start the Flask application:**
   ```bash
   python app/app.py
   ```

2. **Visit in your browser:**
   - Homepage: http://localhost:5000/
   - Dashboard: http://localhost:5000/dashboard
   - Profile: http://localhost:5000/profile

## 🧪 Running Visual Regression Tests

### Generate Baseline Screenshots (First Time)

```bash
# This creates the "correct" reference screenshots
npx playwright test --update-snapshots
```

### Run VRT Tests

```bash
# Run all tests
npm test

# Run with UI mode (interactive)
npm run test:ui

# Run in debug mode
npm run test:debug

# Run specific browser
npm run test:chrome
npm run test:firefox
npm run test:mobile
```

### View Test Report

```bash
npm run report
```

## 🎯 CircleCI Integration

### Setting Up CircleCI

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: VRT CircleCI Demo"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/vrt-circleci-demo.git
   git push -u origin main
   ```

2. **Connect to CircleCI:**
   - Go to https://circleci.com/
   - Sign in with GitHub
   - Click "Projects" → Find your repo
   - Click "Set Up Project"

3. **View Results:**
   - CircleCI automatically detects `.circleci/config.yml`
   - Pipeline runs on every push
   - **Click "Artifacts" tab to view screenshots!** 📸

### 🖼️ Viewing Screenshots in CircleCI

After the pipeline runs, go to the CircleCI build and click the **"Artifacts"** tab. You'll see:

```
📁 screenshots/
  ├── homepage/           # All homepage screenshots
  ├── dashboard/          # All dashboard screenshots
  └── profile/            # All profile screenshots
📊 playwright-report/     # Interactive HTML report
🖼️ failure-screenshots/   # Visual diffs (if any)
🎥 failure-videos/        # Videos of failures (if any)
```

**Click on any image to view it directly in your browser!**

## 📊 What Gets Tested

### Homepage Tests
- ✅ Full page screenshot
- ✅ Hero section
- ✅ Features section
- ✅ Stats section
- ✅ Navigation bar

### Dashboard Tests
- ✅ Full dashboard view
- ✅ Metric cards (Users, Revenue, Growth, Satisfaction)
- ✅ Chart section
- ✅ Recent activity section

### Profile Tests
- ✅ Full profile page
- ✅ Profile sidebar with avatar
- ✅ User information section
- ✅ Project list

## 🎨 Making Visual Changes

To test the VRT system, try making a visual change:

1. **Edit the CSS** (e.g., change a color in `app/static/css/styles.css`):
   ```css
   :root {
       --primary-color: #ff0000; /* Changed from #667eea */
   }
   ```

2. **Run the tests:**
   ```bash
   npm test
   ```

3. **View the diff:** Playwright will show you the visual difference!

4. **Update baselines if intentional:**
   ```bash
   npm run update-snapshots
   ```

## 📚 Learning Resources

### What You'll Learn
1. **Visual Regression Testing** concepts and best practices
2. **Playwright** for browser automation
3. **Screenshot comparison** algorithms
4. **CircleCI Artifacts** for storing and viewing test results
5. **CI/CD for frontend** testing
6. **Flask web development** with modern UI

### Key Concepts

**Baseline Screenshots:** The "correct" reference images
**Current Screenshots:** Screenshots from the latest test run
**Diff Images:** Highlighted differences between baseline and current
**Artifacts:** Files stored by CircleCI that you can download/view

## 🔧 Configuration

### Playwright Configuration

Edit `playwright.config.js` to:
- Add more browsers
- Change viewport sizes
- Adjust screenshot thresholds
- Configure test timeouts

### CircleCI Configuration

Edit `.circleci/config.yml` to:
- Add more jobs
- Change artifact storage paths
- Add deployment steps
- Configure notifications

## 🎓 Best Practices

1. **Always commit baseline screenshots** to version control
2. **Review visual diffs carefully** before accepting changes
3. **Use meaningful test descriptions**
4. **Wait for animations** to complete before screenshots
5. **Disable animations** in screenshots for consistency
6. **Test multiple browsers** and viewports
7. **Store artifacts** for every build for debugging

## 🐛 Troubleshooting

### Tests failing on first run?
Run `npx playwright test --update-snapshots` to generate baselines.

### App not starting in tests?
Make sure Flask is running: `python app/app.py`

### Screenshots look different locally vs CI?
This is expected! Fonts and rendering can differ. Use CircleCI's screenshots as the baseline.

### Can't see artifacts in CircleCI?
Make sure your pipeline completed. Artifacts appear in the "Artifacts" tab after job completion.

## 🎉 Next Steps

1. ✅ Run the app locally
2. ✅ Generate baseline screenshots
3. ✅ Push to GitHub
4. ✅ Set up CircleCI
5. ✅ View screenshots in CircleCI UI
6. ✅ Make a visual change and see it caught!

## 📝 License

MIT License - Feel free to use this for learning!

## 🙏 Credits

Created as a learning project for understanding Visual Regression Testing with CircleCI.

---

**Happy Testing!** 🎨📸

