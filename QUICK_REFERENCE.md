# 🚀 Quick Reference Guide

## Essential Commands

### Flask Application

```bash
# Start the Flask app
python app/app.py

# Start with specific port
PORT=8000 python app/app.py

# Access the app
open http://localhost:5000/
```

### Visual Regression Testing

```bash
# Run all VRT tests
npm test

# Run with UI mode (interactive)
npm run test:ui

# Run in debug mode
npm run test:debug

# Run with browser visible
npm run test:headed

# Run specific browser
npm run test:chrome
npm run test:firefox
npm run test:mobile

# Generate/Update baseline screenshots
npm run update-snapshots

# View HTML report
npm run report
```

### Git Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Your message"

# Push to GitHub
git push origin main

# View commit history
git log --oneline

# Create new branch
git checkout -b feature-name
```

### CircleCI

```bash
# Validate CircleCI config locally
circleci config validate

# Process config (see expanded version)
circleci config process .circleci/config.yml
```

## 📂 Important Files

### Configuration Files
- `playwright.config.js` - Playwright configuration
- `.circleci/config.yml` - CircleCI pipeline
- `requirements.txt` - Python dependencies
- `package.json` - Node.js dependencies

### Application Files
- `app/app.py` - Main Flask application
- `app/templates/*.html` - HTML templates
- `app/static/css/styles.css` - Styles
- `app/static/js/app.js` - JavaScript

### Test Files
- `tests/visual/homepage.spec.js` - Homepage tests
- `tests/visual/dashboard.spec.js` - Dashboard tests
- `tests/visual/profile.spec.js` - Profile tests

## 🎯 Common Workflows

### Daily Development

```bash
# 1. Start app
python app/app.py

# 2. Make changes to code

# 3. Run tests
npm test

# 4. View results
npm run report
```

### Making Visual Changes

```bash
# 1. Edit CSS/HTML
# Edit files in app/static/css or app/templates

# 2. Run tests (will fail if visuals changed)
npm test

# 3. Review differences
npm run report

# 4. Accept changes (update baselines)
npm run update-snapshots

# 5. Commit
git add .
git commit -m "Update: Changed button color"
git push
```

### Setting Up on New Machine

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/vrt-circleci-demo.git
cd vrt-circleci-demo

# 2. Run quick start script
chmod +x quick-start.sh
./quick-start.sh

# 3. Generate baselines
npm run update-snapshots
```

## 🎨 URLs

### Local Development
- Homepage: http://localhost:5000/
- Dashboard: http://localhost:5000/dashboard
- Profile: http://localhost:5000/profile
- Health Check: http://localhost:5000/api/health

### CircleCI
- Dashboard: https://app.circleci.com/
- Your Project: https://app.circleci.com/pipelines/github/YOUR_USERNAME/vrt-circleci-demo

## 📸 Screenshot Locations

### Baseline Screenshots (committed to Git)
```
tests/visual/
├── homepage.spec.js-snapshots/
├── dashboard.spec.js-snapshots/
└── profile.spec.js-snapshots/
```

### Test Results (not committed)
```
test-results/
├── screenshots/    # Failure screenshots
├── videos/        # Failure videos
├── traces/        # Debug traces
└── report/        # HTML report
```

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000
lsof -ti:5000

# Kill process
lsof -ti:5000 | xargs kill -9
```

### Tests Failing Locally
```bash
# Regenerate baselines
npm run update-snapshots

# Clear test cache
rm -rf test-results/
```

### Playwright Browsers Not Found
```bash
# Reinstall browsers
npx playwright install --force
```

### CircleCI Not Detecting Config
```bash
# Validate config
circleci config validate

# Check file location
ls -la .circleci/config.yml
```

## 💡 Tips

### Best Practices
1. Always commit baseline screenshots
2. Review visual diffs before accepting
3. Wait for animations before screenshots
4. Test multiple browsers/viewports
5. Store artifacts in CI/CD

### Performance
- Use `--workers=1` for consistent screenshots
- Disable animations: `animations: 'disabled'`
- Use `networkidle` for page loading
- Add appropriate `waitForTimeout` for stability

### Debugging
- Use `--debug` to step through tests
- Use `--headed` to see browser
- Check `test-results/traces` for detailed logs
- View `test-results/videos` for failure videos

## 📚 Documentation Links

- [Playwright Documentation](https://playwright.dev/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [CircleCI Documentation](https://circleci.com/docs/)
- [Visual Regression Testing Guide](https://playwright.dev/docs/test-snapshots)

---

**Last Updated:** October 2025

