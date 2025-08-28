# Development Guide

Comprehensive guide for developing, maintaining, and deploying the portfolio website. This document covers local development setup, content management workflows, and deployment procedures.

## 🚀 Quick Start

### **Prerequisites**
- **Ruby** (version 2.7 or higher)
- **Bundler** gem (`gem install bundler`)
- **Git** for version control
- **Node.js** (optional, for additional tooling)

### **Local Development Setup**

1. **Clone and Navigate**
   ```bash
   git clone https://github.com/gmanthenoxus/gmanthenoxus.github.io.git
   cd gmanthenoxus.github.io/docs
   ```

2. **Install Dependencies**
   ```bash
   bundle install
   ```

3. **Start Development Server**
   ```bash
   bundle exec jekyll serve
   ```

4. **View Site**
   - Open `http://localhost:4000` in your browser
   - Site auto-rebuilds on file changes
   - Use `Ctrl+C` to stop the server

### **Development Commands**

```bash
# Standard development server
bundle exec jekyll serve

# Development with drafts and future posts
bundle exec jekyll serve --drafts --future

# Development with live reload
bundle exec jekyll serve --livereload

# Build for production
bundle exec jekyll build

# Clean build artifacts
bundle exec jekyll clean
```

## 📁 Project Architecture

### **Directory Structure**
```
docs/
├── _config.yml           # Jekyll configuration
├── _data/               # YAML data files
│   └── hobbies.yml      # Hobby metadata
├── _hobbies/            # Hobby collection pages
├── _includes/           # Reusable HTML components
│   ├── header.html      # Site header
│   └── footer.html      # Site footer
├── _layouts/            # Page templates
│   ├── default.html     # Base layout
│   ├── hobby.html       # Hobby page layout
│   ├── posts.html       # Blog post layout
│   └── post-*.html      # Specialized blog templates
├── _posts/              # Blog posts
├── _projects/           # Project collection pages
├── _sass/               # SCSS stylesheets
│   ├── _variables.scss  # Design tokens
│   ├── _base.scss       # Base styles
│   ├── _components.scss # UI components
│   └── _homepage.scss   # Homepage styles
├── _templates/          # Blog post templates
├── assets/              # Static assets
│   ├── css/main.scss    # Main stylesheet
│   ├── js/              # JavaScript files
│   └── images/          # Image assets
├── *.html               # Main pages
├── Gemfile              # Ruby dependencies
└── Gemfile.lock         # Locked versions
```

### **Key Configuration Files**

#### **`_config.yml`**
```yaml
# Site settings
title: "Noxus' Hub"
description: "Personal portfolio showcasing projects and passions"
url: "https://gmanthenoxus.github.io"
baseurl: ""

# Build settings
markdown: kramdown
highlighter: rouge
theme: minima
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

# Collections
collections:
  hobbies:
    output: true
    permalink: /hobbies/:name/
  projects:
    output: true
    permalink: /projects/:name/

# Defaults
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "posts"
  - scope:
      path: ""
      type: "hobbies"
    values:
      layout: "hobby"
  - scope:
      path: ""
      type: "projects"
    values:
      layout: "post"
```

#### **`Gemfile`**
```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.3.0"
gem "minima", "~> 2.5"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Windows and JRuby does not include zoneinfo files
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
```

## 📝 Content Management

### **Blog Posts**

#### **Creating New Posts**
1. **Choose Template**: Select from `_templates/` directory
2. **Copy to `_posts/`**: Use naming format `YYYY-MM-DD-title.md`
3. **Update Front Matter**: Fill in all required fields
4. **Write Content**: Replace placeholder content with your writing

#### **Front Matter Structure**
```yaml
---
layout: post-listicle  # or posts, post-case-study, post-how-to
title: "Your Post Title"
subtitle: "Optional subtitle"
date: 2024-01-01
category: "tech"  # tech, journey, passion
image: "/assets/images/blog/post-image.jpg"
excerpt: "Brief description for previews"
read_time: "5 min read"
featured: true  # Optional, for featured posts
tags: [tag1, tag2, tag3]

# Template-specific fields
tldr: "One-sentence summary"  # For listicles
key_takeaways:  # For listicles
  - "Main insight"
  - "Another takeaway"

results:  # For case studies
  metric1: "Value"
  metric2: "Value"

prerequisites:  # For how-to guides
  - "Requirement 1"
  - "Requirement 2"

developer_challenge:  # Optional for all templates
  type: "Build"  # Build, Design, Analysis
  difficulty: 3  # 1-5 stars
  description: "Challenge description"
  requirements:
    - "Requirement 1"
    - "Requirement 2"
  bonus: "Optional bonus challenge"
---
```

### **Projects**

#### **Adding New Projects**
1. **Create File**: `_projects/project-name.md`
2. **Use Template**: Follow existing project structure
3. **Include Sections**:
   - Problem statement and solution
   - Key features with technical details
   - Implementation examples
   - Results and impact metrics
   - Challenges overcome
   - Future roadmap
   - Technology stack

#### **Project Front Matter**
```yaml
---
layout: post
title: "Project Name"
date: 2024-01-01
hobby: category  # sports, sneakers, fitness, etc.
description: "Brief description for cards"
image: "/assets/images/projects/project-name.jpg"
status: "completed"  # completed, development, planning
tech_stack: ["Tech1", "Tech2", "Tech3"]
github: "https://github.com/username/repo"
demo: "https://project-demo.com"
categories: [category1, category2]
tags: [tag1, tag2, tag3]
---
```

### **Hobbies**

#### **Adding New Hobbies**
1. **Create Page**: `_hobbies/hobby-name.md`
2. **Update Data**: Add entry to `_data/hobbies.yml`
3. **Follow Template**: Use comprehensive hobby template structure
4. **Include All Sections**:
   - Rotating quotes (4)
   - Personal statistics (4)
   - World statistics (4)
   - Personal journey
   - Fun facts (4)
   - Interactive trivia (2)
   - Current projects (1-2)
   - External platforms
   - Empty states

#### **Hobby Data Entry**
```yaml
# _data/hobbies.yml
- name: "Hobby Name"
  slug: "hobby-slug"
  emoji: "🎯"
  color: "#HEX_COLOR"
  description: "Brief description"
  featured_image: "/assets/images/hobby-bg.jpg"
  url: "/hobbies/hobby-name/"
```

## 🎨 Styling and Design

### **SCSS Architecture**
- **Variables**: `_sass/_variables.scss` - Design tokens and configuration
- **Base**: `_sass/_base.scss` - Foundation styles and resets
- **Components**: `_sass/_components.scss` - Reusable UI components
- **Homepage**: `_sass/_homepage.scss` - Homepage-specific styles

### **Adding New Styles**
1. **Use Variables**: Reference existing design tokens
2. **Follow BEM**: Use Block-Element-Modifier methodology
3. **Mobile First**: Write mobile styles first, enhance for larger screens
4. **Component Based**: Create reusable components when possible

### **Color System**
```scss
// Primary colors
$primary-green: #008753;
$primary-blue: #012169;
$primary-dark: #2D3747;

// Gradients
$gradient-primary: linear-gradient(135deg, $primary-green 0%, $primary-blue 100%);
```

## 🚀 Deployment

### **Automatic Deployment**
The site automatically deploys to GitHub Pages when changes are pushed to the main branch:

1. **Push Changes**: `git push origin main`
2. **GitHub Actions**: Automatically builds Jekyll site
3. **Deploy**: Site updates at `https://gmanthenoxus.github.io`

### **Manual Build**
```bash
# Build for production
bundle exec jekyll build

# Built site is in _site/ directory
# Can be deployed to any static hosting service
```

### **Environment Variables**
```yaml
# _config.yml production settings
url: "https://gmanthenoxus.github.io"
baseurl: ""

# Development settings (override in _config_dev.yml)
url: "http://localhost:4000"
baseurl: ""
```

## 🔧 Maintenance

### **Regular Tasks**
- **Update Dependencies**: `bundle update` monthly
- **Check Links**: Verify external links are still valid
- **Optimize Images**: Compress images for web performance
- **Review Analytics**: Monitor site performance and user engagement

### **Content Audits**
- **Blog Posts**: Review and update outdated information
- **Projects**: Update status and add new achievements
- **Hobbies**: Refresh statistics and add new projects
- **External Links**: Verify social media and platform links

### **Performance Monitoring**
- **Lighthouse Scores**: Maintain 95+ scores across all metrics
- **Core Web Vitals**: Monitor loading, interactivity, and visual stability
- **Mobile Performance**: Ensure fast loading on mobile devices
- **Accessibility**: Regular accessibility audits and improvements

## 🐛 Troubleshooting

### **Common Issues**

#### **Jekyll Build Errors**
```bash
# Clear cache and rebuild
bundle exec jekyll clean
bundle exec jekyll build

# Update dependencies
bundle update
```

#### **SCSS Compilation Errors**
- Check syntax in SCSS files
- Verify variable names and imports
- Use Jekyll's error messages to locate issues

#### **Missing Dependencies**
```bash
# Reinstall gems
bundle install

# Update Ruby if needed
rbenv install 3.0.0  # or latest version
rbenv global 3.0.0
```

### **Development Tips**
- **Use Drafts**: Create posts in `_drafts/` for work-in-progress content
- **Future Posts**: Set future dates and use `--future` flag for testing
- **Live Reload**: Use `--livereload` for automatic browser refresh
- **Incremental Builds**: Use `--incremental` for faster rebuilds

## 📊 Analytics and SEO

### **SEO Optimization**
- **Meta Tags**: Automatically generated by jekyll-seo-tag
- **Sitemap**: Generated by jekyll-sitemap plugin
- **Structured Data**: JSON-LD markup for rich snippets
- **Open Graph**: Social media preview optimization

### **Performance Optimization**
- **Image Optimization**: Use WebP format when possible
- **CSS Minification**: Automatic in production builds
- **JavaScript Optimization**: Minimize and defer non-critical scripts
- **Caching**: Leverage browser caching for static assets

---

**Development Environment**: Jekyll 4.3+ with Ruby 2.7+
**Deployment**: Automatic GitHub Pages deployment
**Performance**: Optimized for 95+ Lighthouse scores
**Maintenance**: Regular updates and content audits
