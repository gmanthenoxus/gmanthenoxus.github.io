# Link Audit Report

**Date**: October 2025  
**Status**: Issues Found - Requires Fixes

---

## Summary

Found **3 critical link mismatches** across navigation, homepage, and footer that need to be fixed.

---

## Issues Found

### 🔴 CRITICAL: Projects Link Mismatch

**Problem**: Navigation and footer use different URLs for Projects page

**Current State**:
- **Navigation** (`_includes/header.html` line 43): `/builds`
- **Homepage CTA** (`index.html` line 179): `/projects`
- **Footer** (`_includes/footer.html` line 56): `/builds`
- **Actual file**: `projects.html` (no permalink set)
- **Collection permalink**: `/builds/:path/` (for individual projects)

**Jekyll Behavior**:
- `projects.html` will be accessible at `/projects.html` or `/projects/`
- Individual projects in `_projects/` collection will be at `/builds/project-name/`

**Issue**: Inconsistent URLs - some links point to `/builds`, others to `/projects`

**Recommended Fix**: 
- **Option A** (Recommended): Use `/projects` everywhere (matches the actual file)
  - Change navigation link from `/builds` to `/projects`
  - Change footer link from `/builds` to `/projects`
  - Keep homepage CTA as `/projects` ✅
  
- **Option B**: Use `/builds` everywhere (matches collection permalink)
  - Add `permalink: /builds/` to `projects.html`
  - Keep navigation and footer as `/builds` ✅
  - Change homepage CTA from `/projects` to `/builds`

---

### ⚠️ MINOR: Missing Pages

**Footer Links to Non-Existent Pages**:
1. `/privacy` - File does not exist
2. `/terms` - File does not exist
3. `/sitemap.xml` - File does not exist (Jekyll can generate this with plugin)

**Recommendation**: 
- Create placeholder pages for Privacy and Terms
- Add `jekyll-sitemap` plugin to generate sitemap.xml automatically

---

## Complete Link Inventory

### Navigation Bar (`_includes/header.html`)

| Link Text | URL | Target File | Status |
|-----------|-----|-------------|--------|
| Home | `/` | `index.html` | ✅ Valid |
| About | `/about` | `about.html` | ✅ Valid |
| Blog | `/blog` | `blog.html` | ✅ Valid |
| Projects | `/builds` | `projects.html` | ⚠️ Mismatch |
| Hobbies | `/hobbies` | `hobbies.html` | ✅ Valid |
| Contact | `/contact` | `contact.html` | ✅ Valid |

---

### Homepage (`index.html`)

| Link Text | URL | Target | Status |
|-----------|-----|--------|--------|
| View All Posts | `/blog` | `blog.html` | ✅ Valid |
| Explore All Hobbies | `/hobbies` | `hobbies.html` | ✅ Valid |
| Get In Touch | `/contact` | `contact.html` | ✅ Valid |
| View Projects | `/projects` | `projects.html` | ⚠️ Mismatch |
| Blog post links | `{{ post.url }}` | Dynamic | ✅ Valid |
| Hobby links | `{{ hobby.url }}` | Dynamic | ✅ Valid |

---

### Footer (`_includes/footer.html`)

| Link Text | URL | Target File | Status |
|-----------|-----|-------------|--------|
| Home | `/` | `index.html` | ✅ Valid |
| About | `/about` | `about.html` | ✅ Valid |
| Blog | `/blog` | `blog.html` | ✅ Valid |
| Projects | `/builds` | `projects.html` | ⚠️ Mismatch |
| Hobbies | `/hobbies` | `hobbies.html` | ✅ Valid |
| Contact | `/contact` | `contact.html` | ✅ Valid |
| Privacy | `/privacy` | N/A | ❌ Missing |
| Terms | `/terms` | N/A | ❌ Missing |
| Sitemap | `/sitemap.xml` | N/A | ❌ Missing |
| GitHub | `https://github.com/{{ site.github_username }}` | External | ✅ Valid |
| Email | `mailto:{{ site.email }}` | Email | ✅ Valid |

---

## Recommended Actions

### Priority 1: Fix Projects Link Inconsistency

**Choose one approach and apply consistently:**

**Approach A: Use `/projects` (Recommended)**
```yaml
# No changes needed to projects.html
# Fix navigation and footer to use /projects
```

**Approach B: Use `/builds`**
```yaml
# Add to projects.html front matter:
permalink: /builds/
# Fix homepage CTA to use /builds
```

### Priority 2: Create Missing Pages

1. Create `privacy.html` with privacy policy
2. Create `terms.html` with terms of service
3. Add `jekyll-sitemap` plugin for automatic sitemap generation

### Priority 3: Add Redirects (Optional)

Consider adding redirects so both `/projects` and `/builds` work:
- Use Jekyll redirect plugin
- Or add both pages pointing to same content

---

## Testing Checklist

After fixes:
- [ ] Click every navigation link - verify correct page loads
- [ ] Click every homepage link - verify correct page loads
- [ ] Click every footer link - verify correct page loads
- [ ] Test on local build first
- [ ] Test on deployed site
- [ ] Check browser console for 404 errors
- [ ] Verify social media links open correctly
- [ ] Test email link opens mail client

---

## Files to Modify

1. `docs/_includes/header.html` - Line 43 (Projects link)
2. `docs/index.html` - Line 179 (Projects CTA button)
3. `docs/_includes/footer.html` - Line 56 (Projects link)
4. `docs/projects.html` - Add permalink if using `/builds`
5. Create `docs/privacy.html` (new file)
6. Create `docs/terms.html` (new file)
7. `docs/_config.yml` - Add jekyll-sitemap plugin

---

**Recommendation**: Go with **Approach A** (use `/projects` everywhere) as it's simpler and matches the actual filename.

