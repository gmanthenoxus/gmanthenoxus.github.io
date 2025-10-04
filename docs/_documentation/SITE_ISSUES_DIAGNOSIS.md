# Site Issues Diagnosis & Solutions

**Created**: October 4, 2025 - 00:30 UTC  
**Status**: 🔍 Diagnosing  
**Priority**: High

---

## 🐛 Reported Issues

### Issue 1: Blog Post Not Showing Up
**Problem**: The blog post card isn't appearing on the blog page  
**File**: `_posts/2025-09-03-the-49-project-quest.md`

**Diagnosis**:
- ✅ File exists in correct location (`_posts/`)
- ✅ Filename format is correct (`YYYY-MM-DD-title.md`)
- ✅ Front matter exists with required fields
- ✅ Layout `post-journey` exists in `_layouts/`
- ✅ Blog page (`blog.html`) has correct Liquid logic
- ⚠️ **Date mismatch**: Filename has `2025-09-03` but front matter has `2025-09-04`
- ⚠️ **Site needs rebuild**: Changes may not be reflected without rebuilding

**Solution**:
1. Fix date consistency (filename vs front matter)
2. Rebuild the site with `bundle exec jekyll build`
3. Clear browser cache and test

### Issue 2: Hobby Links Redirect to Hobbies Page
**Problem**: Clicking on hobby cards redirects to `/hobbies` instead of individual hobby pages like `/hobbies/anime/`

**Diagnosis**:
- ✅ Hobby files exist in `_hobbies/` directory
- ✅ Permalink structure is correct in `_config.yml`: `/hobbies/:name/`
- ✅ Links in HTML are correctly formatted: `/hobbies/anime/`, `/hobbies/sports/`, etc.
- ✅ Layout `hobby` exists in `_layouts/`
- ⚠️ **README.md in _hobbies folder**: Might cause confusion (though it has no front matter)
- ⚠️ **Site needs rebuild**: Collection changes require rebuild

**Solution**:
1. Rebuild the site with `bundle exec jekyll build`
2. Verify `_site/hobbies/` directory contains individual hobby folders
3. Test each hobby link after rebuild

---

## 🔧 Root Cause Analysis

### Primary Issue: Site Not Rebuilt After Changes
**Impact**: High  
**Likelihood**: Very High

Jekyll is a **static site generator**, which means:
- Changes to content files (`.md`, `.html`) require rebuilding
- Changes to `_config.yml` **always** require rebuilding
- Changes to collections require rebuilding
- The `_site/` directory contains the generated static files

**What happens without rebuild**:
- New posts don't appear
- Collection pages (hobbies, projects) don't update
- Configuration changes don't take effect
- Links may point to non-existent pages

### Secondary Issue: Date Inconsistency in Blog Post
**Impact**: Medium  
**Likelihood**: Medium

The blog post has:
- **Filename**: `2025-09-03-the-49-project-quest.md`
- **Front matter**: `date: 2025-09-04`

Jekyll uses the filename date by default, but front matter date can override it. This inconsistency might cause:
- Confusion in sorting
- Potential display issues
- Incorrect date shown on the post

---

## ✅ Step-by-Step Solution

### Step 1: Fix Blog Post Date
```bash
cd /Users/noxus/Documents/MyHub/gmanthenoxus.github.io/docs
```

**Option A**: Update front matter to match filename
```yaml
# In _posts/2025-09-03-the-49-project-quest.md
date: 2025-09-03  # Changed from 2025-09-04
```

**Option B**: Rename file to match front matter
```bash
mv _posts/2025-09-03-the-49-project-quest.md _posts/2025-09-04-the-49-project-quest.md
```

**Recommendation**: Use Option A (update front matter) since September 3rd is the original date.

### Step 2: Rebuild the Site
```bash
cd /Users/noxus/Documents/MyHub/gmanthenoxus.github.io/docs
bundle exec jekyll build
```

**Expected output**:
```
Configuration file: /path/to/_config.yml
            Source: /path/to/docs
       Destination: /path/to/docs/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
       Jekyll Feed: Generating feed for posts
                    done in X.XXX seconds.
 Auto-regeneration: disabled. Use --watch to enable.
```

### Step 3: Verify Generated Files
```bash
# Check if blog post was generated
ls -la _site/blog/

# Check if hobby pages were generated
ls -la _site/hobbies/

# Should see directories like:
# _site/hobbies/anime/
# _site/hobbies/sports/
# _site/hobbies/fitness/
# etc.
```

### Step 4: Start Development Server
```bash
bundle exec jekyll serve
```

**Expected output**:
```
Server address: http://127.0.0.1:4000/
Server running... press ctrl-c to stop.
```

### Step 5: Test in Browser
1. Open `http://localhost:4000/blog`
   - ✅ Verify blog post card appears
   - ✅ Verify featured post section shows the post
   - ✅ Verify date displays correctly

2. Open `http://localhost:4000/hobbies`
   - ✅ Verify all hobby cards are visible
   - ✅ Click on each hobby card
   - ✅ Verify it goes to `/hobbies/anime/`, `/hobbies/sports/`, etc.
   - ✅ Verify individual hobby pages load correctly

3. Clear browser cache if issues persist:
   - Chrome/Edge: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - Firefox: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - Safari: `Cmd+Option+E` (Mac)

---

## 🚨 Common Jekyll Issues & Solutions

### Issue: "Could not find bundler"
**Solution**:
```bash
gem install bundler
bundle install
```

### Issue: "Dependency Error: Yikes!"
**Solution**:
```bash
bundle update
bundle install
```

### Issue: Changes not reflecting
**Solution**:
1. Stop the server (`Ctrl+C`)
2. Delete `_site/` directory: `rm -rf _site/`
3. Rebuild: `bundle exec jekyll build`
4. Restart server: `bundle exec jekyll serve`

### Issue: "Permission denied"
**Solution**:
```bash
sudo bundle exec jekyll build
# or
sudo bundle exec jekyll serve
```

### Issue: Port 4000 already in use
**Solution**:
```bash
# Kill existing Jekyll process
lsof -ti:4000 | xargs kill -9

# Or use different port
bundle exec jekyll serve --port 4001
```

---

## 📋 Verification Checklist

After rebuilding, verify:

### Blog Page (`/blog`)
- [ ] Blog post card appears in "Recent Posts" section
- [ ] Featured post section shows the post (if `featured: true`)
- [ ] Post date displays correctly
- [ ] Post category badge shows "🚀 Journey"
- [ ] Clicking post card navigates to post page
- [ ] Post page loads without errors

### Hobbies Page (`/hobbies`)
- [ ] All 7 hobby cards are visible
- [ ] Each card has correct emoji and color
- [ ] Clicking "Anime" goes to `/hobbies/anime/`
- [ ] Clicking "Sports" goes to `/hobbies/sports/`
- [ ] Clicking "Fitness" goes to `/hobbies/fitness/`
- [ ] Clicking "Games" goes to `/hobbies/games/`
- [ ] Clicking "Food" goes to `/hobbies/food/`
- [ ] Clicking "Sneakers" goes to `/hobbies/sneakers/`
- [ ] Clicking "Tech" goes to `/hobbies/tech/`

### Individual Hobby Pages
- [ ] Each hobby page loads without 404 error
- [ ] Hero section displays with correct color theme
- [ ] Rotating quotes work
- [ ] Statistics dashboard displays
- [ ] Projects section shows (or empty state)
- [ ] "Back to Hobbies" link works

---

## 🔍 Debugging Commands

### Check if post is being processed
```bash
bundle exec jekyll build --verbose 2>&1 | grep "49-project-quest"
```

### Check if hobbies are being processed
```bash
bundle exec jekyll build --verbose 2>&1 | grep "hobbies"
```

### List all generated pages
```bash
find _site -name "*.html" | sort
```

### Check Jekyll version
```bash
bundle exec jekyll --version
```

### Check Ruby version
```bash
ruby --version
```

---

## 📝 Next Steps

1. **Immediate**: Fix blog post date and rebuild site
2. **Test**: Verify all links work after rebuild
3. **Document**: Update this file with results
4. **Continue**: Resume About page redesign work

---

**Status**: Awaiting user to rebuild site and test  
**Expected Resolution Time**: 5-10 minutes  
**Confidence Level**: High (95%)

