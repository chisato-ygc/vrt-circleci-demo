# 🚀 Complete Setup Guide - VRT CircleCI Demo

This guide walks you through setting up the Visual Regression Testing project from scratch.

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] Python 3.9 or higher installed
- [ ] Node.js 18 or higher installed
- [ ] Git installed
- [ ] GitHub account created
- [ ] CircleCI account (free tier is fine)
- [ ] Terminal/Command line access

### Check Your Versions

```bash
# Check Python version
python3 --version
# Should show: Python 3.9.x or higher

# Check Node.js version
node --version
# Should show: v18.x.x or higher

# Check npm version
npm --version
# Should show: 9.x.x or higher

# Check Git version
git --version
# Should show: git version 2.x.x
```

## 🎬 Step-by-Step Setup

### Step 1: Navigate to Project Directory

```bash
cd ~/vrt-circleci-demo
```

### Step 2: Install Python Dependencies

```bash
# Install Flask and other Python packages
pip3 install -r requirements.txt

# Verify installation
pip3 list | grep Flask
```

**Expected output:**
```
Flask==2.3.3
```

### Step 3: Install Node.js Dependencies

```bash
# Install Playwright and testing tools
npm install

# This will take a few minutes as it downloads browser binaries
```

### Step 4: Install Playwright Browsers

```bash
# Install Chromium, Firefox, and WebKit
npx playwright install

# This downloads ~500MB of browser binaries
```

**Expected output:**
```
Downloading browsers...
✔ chromium installed
✔ firefox installed
✔ webkit installed
```

### Step 5: Test the Flask Application

```bash
# Start the Flask app
python3 app/app.py
```

**Expected output:**
```
🚀 Starting VRT Demo App on http://localhost:5000
📊 Dashboard: http://localhost:5000/dashboard
👤 Profile: http://localhost:5000/profile
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
```

**Open your browser and visit:**
- http://localhost:5000/ (Homepage)
- http://localhost:5000/dashboard (Dashboard)
- http://localhost:5000/profile (Profile)

**You should see beautiful, styled pages!** 🎨

Press `Ctrl+C` to stop the server.

### Step 6: Generate Baseline Screenshots

```bash
# This creates the "correct" reference screenshots
npx playwright test --update-snapshots
```

**What happens:**
1. Playwright starts the Flask app automatically
2. Opens Chromium browser
3. Visits each page
4. Takes screenshots
5. Saves them as baselines

**Expected output:**
```
Running 16 tests using 1 worker
✓ homepage.spec.js:X:X › Homepage Visual Tests › should match homepage full page screenshot
✓ homepage.spec.js:X:X › Homepage Visual Tests › should match hero section
...
16 passed (XX seconds)
```

**Check the screenshots were created:**
```bash
ls -la tests/visual/*.spec.js-snapshots/
```

You should see folders with `.png` files.

### Step 7: Run Visual Regression Tests

```bash
# Run all VRT tests
npm test
```

**Expected output:**
```
✓ All tests passed! (16 passed)
```

Since we just created the baselines, all tests should pass.

### Step 8: View Test Report

```bash
# Open the interactive HTML report
npm run report
```

This opens a browser with a beautiful report showing:
- Which tests passed/failed
- Screenshots taken
- Test execution time
- Browser information

## 🔄 Git Setup

### Step 9: Initialize Git Repository

```bash
# Initialize git
git init

# Check current status
git status
```

### Step 10: Create .gitignore

Already created! It excludes:
- `node_modules/`
- `venv/`
- `test-results/`
- `.env`

### Step 11: Make First Commit

```bash
# Add all files
git add .

# Check what will be committed
git status

# Commit
git commit -m "Initial commit: VRT CircleCI Demo Project

- Flask app with 3 beautiful pages
- Playwright VRT tests for all pages
- CircleCI config with artifact uploads
- Complete documentation"

# Verify commit
git log --oneline
```

### Step 12: Create GitHub Repository

**Option A: Via GitHub Website**

1. Go to https://github.com
2. Click "+" → "New repository"
3. Name: `vrt-circleci-demo`
4. Description: "Visual Regression Testing Demo with CircleCI"
5. Keep it Public
6. **Do NOT** initialize with README (we already have one)
7. Click "Create repository"

**Option B: Via GitHub CLI** (if installed)

```bash
gh repo create vrt-circleci-demo --public --source=. --remote=origin
```

### Step 13: Push to GitHub

```bash
# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/vrt-circleci-demo.git

# Verify remote
git remote -v

# Push to GitHub
git push -u origin main
```

**Check on GitHub:** Visit your repository and verify all files are there!

## 🎯 CircleCI Setup

### Step 14: Connect CircleCI to GitHub

1. **Go to CircleCI:**
   - Visit https://circleci.com/
   - Click "Sign Up" or "Log In"
   - Choose "Sign Up with GitHub"
   - Authorize CircleCI to access your repositories

2. **You'll see the CircleCI dashboard**

### Step 15: Set Up Your Project

1. **In CircleCI, click "Projects"** in the left sidebar

2. **Find your repository:**
   - Scroll down or search for `vrt-circleci-demo`
   - Click "Set Up Project" button

3. **CircleCI detects your config:**
   - It finds `.circleci/config.yml`
   - Click "Start Building" or "Use Existing Config"

4. **First pipeline runs automatically!** 🎉

### Step 16: Watch the Pipeline Run

**You'll see two jobs:**
1. `setup-and-test` - Tests Flask app
2. `visual-regression-test` - Runs VRT tests

**Click on the pipeline to see details.**

**Expected duration:** 3-5 minutes

### Step 17: View Screenshots in CircleCI UI! 📸

**This is the magic moment!**

1. **Wait for pipeline to complete** (green checkmark ✅)

2. **Click on the `visual-regression-test` job**

3. **Click the "ARTIFACTS" tab** at the top

4. **You'll see folders:**
   ```
   📁 screenshots/
     ├── homepage/
     ├── dashboard/
     └── profile/
   📊 playwright-report/
   🖼️ failure-screenshots/
   ```

5. **Click on any folder → Click on a `.png` file**

6. **The screenshot opens in your browser!** 🎉

You can now:
- View all your screenshots
- Compare baseline vs current
- Download any image
- Share links with team members

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Flask app runs locally (http://localhost:5000)
- [ ] All 3 pages display correctly in browser
- [ ] Playwright tests run locally (`npm test`)
- [ ] Baseline screenshots created (check `tests/visual/`)
- [ ] Git repository created and pushed to GitHub
- [ ] CircleCI connected to GitHub repository
- [ ] CircleCI pipeline runs successfully
- [ ] Screenshots visible in CircleCI Artifacts tab
- [ ] HTML report accessible in artifacts

## 🎨 Testing the VRT System

Now let's verify VRT catches visual changes!

### Step 18: Make a Visual Change

```bash
# Edit the CSS file
# Change line 5 in app/static/css/styles.css
# From: --primary-color: #667eea;
# To:   --primary-color: #ff0000;
```

**Or use this command:**
```bash
sed -i '' 's/#667eea/#ff0000/g' app/static/css/styles.css
```

### Step 19: Run Tests Locally

```bash
npm test
```

**Expected result:** Tests should FAIL! ❌

Playwright will show:
```
✗ Tests failed!
Expected screenshot to match, but it didn't.
Diff: XX% pixels differ
```

### Step 20: View the Differences

```bash
npm run report
```

The report shows:
- **Expected:** Original purple color
- **Actual:** New red color
- **Diff:** Highlighted differences

### Step 21: Push and See in CircleCI

```bash
# Commit the change
git add app/static/css/styles.css
git commit -m "Test: Change primary color to red"
git push

# Go to CircleCI and watch it detect the visual change!
```

**In CircleCI Artifacts, you'll see:**
- Original baseline (purple)
- Current screenshot (red)
- Diff image (highlighting changes)

### Step 22: Revert the Change

```bash
# Change it back to purple
sed -i '' 's/#ff0000/#667eea/g' app/static/css/styles.css

# Or update baselines if you want to keep red
npm run update-snapshots
```

## 🎓 What You've Learned

Congratulations! You now know how to:

✅ Set up a Flask web application
✅ Write Playwright visual regression tests
✅ Configure CircleCI for automated testing
✅ Store and view screenshots as artifacts
✅ Detect visual changes automatically
✅ Review and manage baseline screenshots
✅ Integrate VRT into CI/CD pipeline

## 🚀 Next Steps

1. **Add more pages** to your Flask app
2. **Write more VRT tests** for those pages
3. **Test different browsers** (Firefox, Mobile)
4. **Add responsive design tests** (different viewports)
5. **Integrate with deployment** (deploy if tests pass)

## 🐛 Common Issues and Solutions

### Issue: "Module not found: Flask"
**Solution:** 
```bash
pip3 install -r requirements.txt
```

### Issue: "Playwright browser not found"
**Solution:**
```bash
npx playwright install
```

### Issue: Tests fail immediately
**Solution:** Make sure Flask app is not already running on port 5000
```bash
lsof -ti:5000 | xargs kill -9
```

### Issue: Can't see artifacts in CircleCI
**Solution:** 
- Wait for job to complete fully
- Check "Artifacts" tab (not "Test Results")
- Make sure the job didn't fail before artifact upload

### Issue: Screenshots look different locally vs CircleCI
**Solution:** 
- This is expected (different OS/fonts)
- Use CircleCI screenshots as baselines
- Or run `--update-snapshots` on CircleCI

## 📞 Need Help?

- Check the [main README](README.md)
- Review [Playwright docs](https://playwright.dev/)
- Check [CircleCI docs](https://circleci.com/docs/)

---

**You're all set!** 🎉 Happy Visual Regression Testing!

