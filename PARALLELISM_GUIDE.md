# ⚡ Test Parallelism & Splitting Guide

## 🎯 What is Test Parallelism?

**Test Parallelism** allows CircleCI to run your tests across multiple containers simultaneously, dramatically reducing total test time.

### **How It Works**

```
WITHOUT Parallelism:
┌─────────────────────────────────┐
│  Single Container               │
│  ├─ Homepage tests (2 min)      │
│  ├─ Dashboard tests (2 min)     │
│  └─ Profile tests (2 min)       │
│  Total: ~6 minutes              │
└─────────────────────────────────┘

WITH Parallelism (3 containers):
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ Container 1   │ │ Container 2   │ │ Container 3   │
│ Homepage      │ │ Dashboard     │ │ Profile       │
│ tests         │ │ tests         │ │ tests         │
│ (2 min)       │ │ (2 min)       │ │ (2 min)       │
└───────────────┘ └───────────────┘ └───────────────┘
     ⚡ All run simultaneously! ⚡
Total: ~2 minutes (3x faster!)
```

---

## 📊 Performance Comparison

| Configuration | Containers | Test Time | Speedup |
|--------------|------------|-----------|---------|
| Sequential | 1 | ~6-9 min | 1x |
| Parallel | 3 | ~2-3 min | **3x** |
| Parallel | 4 | ~2 min | **4x** |

**Note:** Actual speedup depends on test distribution and container startup time.

---

## 🔧 How We Implemented It

### **1. Added Parallelism Setting**

```yaml
visual-regression-test:
  parallelism: 3  # Run across 3 containers
```

### **2. Test Splitting by File Size**

```bash
TESTFILES=$(find tests/visual -name "*.spec.js" | circleci tests split --split-by=filesize)
```

**CircleCI automatically:**
- Lists all test files
- Divides them across containers
- Balances load by file size
- Each container runs its assigned tests

### **3. Container Assignment**

```
Container 0: tests/visual/homepage.spec.js
Container 1: tests/visual/dashboard.spec.js
Container 2: tests/visual/profile.spec.js
```

---

## 🎯 Test Splitting Strategies

CircleCI offers multiple splitting strategies:

### **1. By Filesize (Current)**
```bash
circleci tests split --split-by=filesize
```
- ✅ Best for tests of varying complexity
- ✅ Balances load across containers
- ✅ Good default choice

### **2. By Name**
```bash
circleci tests split --split-by=name
```
- Alphabetical distribution
- Consistent but may not balance load

### **3. By Timing (Advanced)**
```bash
circleci tests split --split-by=timings --timings-type=filename
```
- Uses historical test timing data
- ✅ Most optimized
- Requires test result history

---

## 📸 Artifacts in Parallel Runs

**All artifacts from all containers are collected!**

Each container:
1. Runs its assigned tests
2. Generates screenshots
3. Uploads artifacts to CircleCI

**You'll see artifacts from ALL containers in one place!**

```
Artifacts (from all 3 containers):
├─ Container 0 artifacts
│  └─ screenshots/homepage/
├─ Container 1 artifacts
│  └─ screenshots/dashboard/
└─ Container 2 artifacts
   └─ screenshots/profile/
```

---

## 💰 Cost Considerations

### **Free Tier (CircleCI Free)**
- 6,000 credits/month
- Parallelism available
- Perfect for this project!

### **Example Usage:**
- 1 container = 10 credits/minute
- 3 containers (parallel) = 30 credits/minute
- But runs 3x faster!

**Sequential:** 6 min × 10 = 60 credits
**Parallel (3):** 2 min × 30 = 60 credits

**Same cost, but 3x faster!** 🚀

---

## 🎛️ Adjusting Parallelism

### **Increase Parallelism (More Speed)**

```yaml
parallelism: 4  # 4 containers
```

**When to use:**
- You have many test files
- Tests take a long time
- You want maximum speed

### **Decrease Parallelism (Save Credits)**

```yaml
parallelism: 2  # 2 containers
```

**When to use:**
- Few test files
- Credit budget constraints
- Tests are already fast

### **Disable Parallelism**

```yaml
# Remove or comment out parallelism line
# parallelism: 3
```

**When to use:**
- Debugging issues
- Single-file test changes
- Learning/development

---

## 🔍 Viewing Parallel Runs

### **In CircleCI UI:**

1. **Pipeline View** shows all containers:
   ```
   visual-regression-test
   ├─ Container 0 (2:15)
   ├─ Container 1 (2:20)
   └─ Container 2 (2:10)
   ```

2. **Click any container** to see its logs

3. **Each container shows:**
   - Which tests it ran
   - Test results
   - Screenshot generation
   - Artifact upload

4. **Artifacts tab** shows artifacts from ALL containers combined

---

## 🐛 Troubleshooting

### **Issue: Tests Not Splitting Evenly**

**Problem:** One container finishes much faster than others

**Solutions:**
```bash
# Switch to timing-based splitting
circleci tests split --split-by=timings --timings-type=filename
```

### **Issue: Container Sees No Tests**

**Problem:** Container prints "No tests assigned to this container"

**Cause:** More containers than test files
**Solution:** Reduce `parallelism` to match test file count

### **Issue: Screenshots Missing from Some Tests**

**Problem:** Some containers don't upload artifacts

**Check:**
- All containers completed successfully
- `store_artifacts` step ran on all containers
- Look for errors in specific container logs

### **Issue: Port Conflicts in Parallel**

**Don't worry!** Each container is isolated with its own:
- File system
- Network
- Port 5000 (Flask)

No conflicts between containers! ✅

---

## 📊 Monitoring Performance

### **Key Metrics to Watch:**

1. **Total Pipeline Time**
   - Before parallelism: ~6-9 min
   - After parallelism: ~2-3 min

2. **Container Balance**
   - All containers should finish around the same time
   - If one is much slower, adjust splitting strategy

3. **Credit Usage**
   - Check CircleCI dashboard
   - Monitor monthly credit consumption

---

## 🎓 Advanced Tips

### **1. Run Different Browsers in Parallel**

```yaml
parallelism: 3

# Container 0: Chromium
# Container 1: Firefox  
# Container 2: Mobile
```

```bash
BROWSERS=("chromium-desktop" "firefox-desktop" "mobile")
BROWSER=${BROWSERS[$CIRCLE_NODE_INDEX]}
npx playwright test --project=$BROWSER
```

### **2. Parallel + Sharding**

Combine CircleCI parallelism with Playwright sharding:

```bash
npx playwright test --shard=$((CIRCLE_NODE_INDEX + 1))/$CIRCLE_NODE_TOTAL
```

### **3. Dynamic Parallelism**

Adjust parallelism based on number of changed files:

```yaml
parallelism: << pipeline.parameters.parallelism >>
```

---

## 📈 Real-World Benefits

### **For This Project:**
- **3 test files** → **3 containers** = Perfect match!
- Each container runs 1 test file
- Maximum efficiency

### **For Larger Projects:**
- 30 test files → 6 containers = 5 tests each
- 100 test files → 10 containers = 10 tests each
- Scales linearly with test count

---

## 🎯 Best Practices

1. **Match Parallelism to Test Count**
   - Don't use 10 containers for 3 tests
   - Aim for 3-5 tests per container

2. **Use Timing-Based Splitting**
   - More accurate load balancing
   - Requires a few runs to collect timing data

3. **Monitor Container Balance**
   - All containers should finish around same time
   - Adjust if one is significantly slower

4. **Start Small, Scale Up**
   - Begin with 2-3 containers
   - Increase as needed
   - Watch credit usage

5. **Combine with Caching**
   - Cache `node_modules`
   - Cache Playwright browsers
   - Cache Python dependencies

---

## 🚀 Future Enhancements

Consider adding:

- **Matrix builds** (test multiple Node/Python versions)
- **Browser parallelism** (Chrome, Firefox, Safari simultaneously)
- **Viewport parallelism** (Desktop, Tablet, Mobile)
- **Environment parallelism** (staging, production comparison)

---

## 📚 Resources

- [CircleCI Parallelism Docs](https://circleci.com/docs/parallelism-faster-jobs/)
- [CircleCI Test Splitting](https://circleci.com/docs/test-splitting-tutorial/)
- [Playwright Sharding](https://playwright.dev/docs/test-parallel#shard-tests-between-multiple-machines)

---

## ✅ Checklist

Your project now has:

- [x] Parallelism enabled (3 containers)
- [x] Test splitting by filesize
- [x] All artifacts collected from parallel runs
- [x] Container information in logs
- [x] Optimized for speed

**Expected speedup: 2-3x faster! ⚡**

---

*Last Updated: October 2025*
*Part of VRT CircleCI Demo Project*

