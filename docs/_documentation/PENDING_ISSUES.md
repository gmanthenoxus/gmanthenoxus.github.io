# Pending Issues & Tasks

**Last Updated**: October 3, 2025 - 14:35 UTC  
**Purpose**: Track known issues and pending tasks

---

## 🔴 High Priority Issues

### Issue #1: Sitemap Not Generating

**Reported**: October 3, 2025 - 14:30 UTC  
**Status**: 🔴 Open  
**Priority**: High  
**Category**: Build/Deployment

**Description**:
The `jekyll-sitemap` plugin was added to `_config.yml` but `sitemap.xml` is not being generated during build.

**Expected Behavior**:
- `sitemap.xml` should be automatically generated in `_site/` directory
- Should be accessible at `/sitemap.xml`

**Current Behavior**:
- No `sitemap.xml` file generated
- Footer link to `/sitemap.xml` returns 404

**Investigation Needed**:
1. Verify jekyll-sitemap gem is installed in Gemfile
2. Check if plugin is loading correctly
3. Review build output for errors
4. Test with clean build (`bundle exec jekyll clean && bundle exec jekyll build`)

**Files Involved**:
- `docs/_config.yml` (line 15 - plugin added)
- `docs/Gemfile` (may need to add gem)
- `docs/_includes/footer.html` (line 102 - sitemap link)

**Possible Solutions**:
1. Add `gem 'jekyll-sitemap'` to Gemfile
2. Run `bundle install`
3. Rebuild site
4. Alternative: Create manual sitemap.xml if plugin fails

**Workaround**:
- Temporarily comment out sitemap link in footer
- Or create manual sitemap.xml

**Assigned To**: To be investigated  
**Target Resolution**: Next development session

---

## 🟡 Medium Priority Tasks

### Task #1: About Page Refactoring

**Added**: October 3, 2025 - 14:35 UTC  
**Status**: 🟡 Not Started  
**Priority**: Medium  
**Category**: Page Refactoring

**Description**:
Refactor About page to use unified component system, following the same process as Homepage.

**Requirements**:
- Apply unified card components
- Apply unified button components
- Remove duplicate CSS
- Ensure responsive design
- Test all breakpoints

**Estimated Effort**: 3-4 hours

**Dependencies**:
- Unified component system (✅ Complete)
- Homepage refactoring (✅ Complete - use as reference)

**Next Steps**:
1. Audit current About page
2. Create refactoring plan
3. Apply unified components
4. Test and verify
5. Update checklist

---

### Task #2: Blog Listing Page Refactoring

**Added**: October 3, 2025 - 14:35 UTC  
**Status**: 🟡 Not Started  
**Priority**: Medium  
**Category**: Page Refactoring

**Description**:
Refactor Blog listing page to use unified component system.

**Requirements**:
- Apply unified card components for blog posts
- Apply unified pagination components
- Remove duplicate CSS
- Ensure responsive design

**Estimated Effort**: 2-3 hours

**Dependencies**:
- Unified component system (✅ Complete)
- Homepage refactoring (✅ Complete)

---

## 🟢 Low Priority Tasks

### Task #3: Navigation Bar Enhancement

**Added**: October 3, 2025 - 14:35 UTC  
**Status**: 🟢 Not Started  
**Priority**: Low  
**Category**: Component Enhancement

**Description**:
Current navigation works well but could be enhanced with:
- Active page indicator improvements
- Smooth transitions
- Mobile menu animations
- Accessibility improvements

**Estimated Effort**: 2 hours

**Dependencies**:
- None (can be done anytime)

---

### Task #4: Add More Legal Pages

**Added**: October 3, 2025 - 14:35 UTC  
**Status**: 🟢 Not Started  
**Priority**: Low  
**Category**: Content

**Description**:
Consider adding additional legal/info pages:
- Cookie Policy
- Accessibility Statement
- Credits/Attribution page

**Estimated Effort**: 1-2 hours

---

## 📋 Completed Issues

### ✅ Issue: Projects Link Inconsistency

**Reported**: October 3, 2025 - 14:20 UTC  
**Resolved**: October 3, 2025 - 14:30 UTC  
**Resolution Time**: 10 minutes

**Description**: Navigation and footer used `/builds`, homepage used `/projects`

**Solution**: Standardized all links to `/projects`

**Files Modified**:
- `docs/_includes/header.html`
- `docs/_includes/footer.html`

---

### ✅ Issue: Missing Legal Pages

**Reported**: October 3, 2025 - 14:20 UTC  
**Resolved**: October 3, 2025 - 14:30 UTC  
**Resolution Time**: 10 minutes

**Description**: Footer linked to non-existent privacy and terms pages

**Solution**: Created professional legal pages

**Files Created**:
- `docs/privacy.html`
- `docs/terms.html`

---

## 📊 Issue Statistics

**Total Open Issues**: 1  
**Total Open Tasks**: 4  
**Total Resolved**: 2  
**Average Resolution Time**: 10 minutes

---

## 🔄 Update Log

### October 3, 2025

**14:35 UTC** - Document Created
- Created PENDING_ISSUES.md
- Added sitemap generation issue
- Added 4 pending tasks
- Documented 2 completed issues

---

## 📝 How to Use This Document

### Reporting New Issues
1. Add to appropriate priority section
2. Include: Date, Status, Priority, Category
3. Provide clear description
4. List investigation steps
5. Update issue statistics

### Updating Issues
1. Change status as work progresses
2. Add investigation findings
3. Document solutions when resolved
4. Move to Completed section when done
5. Update timestamps

### Task Management
1. Review regularly during development
2. Prioritize based on impact
3. Update estimates as needed
4. Track dependencies
5. Move completed tasks to archive

---

**Next Review**: When starting next development session

