# Noxus' Hub - Personal Portfolio Website

A modern, interactive personal portfolio website showcasing projects, hobbies, and blog posts. Built with Jekyll and hosted on GitHub Pages, featuring a comprehensive blog template system and developer challenges.

## � **What Makes This Special**

✨ **4 Specialized Blog Templates** - Listicle, Case Study, How-To, and Standard layouts
🚀 **Developer Challenges** - Interactive coding challenges with difficulty ratings
🎨 **Modern UI System** - Green-to-blue gradient theme with smooth animations
📱 **Mobile-First Design** - Responsive layouts that work beautifully on all devices
⚡ **Performance Optimized** - Fast loading with 95+ Lighthouse scores

## �🌟 Features

### 🎨 **Design & UI**
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI**: Clean, professional design with green-to-blue gradient theme
- **Interactive Animations**: Smooth transitions, hover effects, and micro-interactions
- **Consistent Branding**: Unified color scheme and typography throughout

### 🏠 **Homepage**
- **Interactive Tabbed Navigation**: Smooth transitions between sections
- **Hero Section**: Eye-catching introduction with scroll animations
- **Project Previews**: Grid layout showcasing latest work
- **Hobby Showcase**: Personal interests with engaging visuals
- **CTA Sections**: Strategic calls-to-action with gradient buttons

### 📝 **Advanced Blog System**
- **Multiple Post Templates**: Specialized layouts for different content types
- **Developer Challenges**: Interactive coding challenges with difficulty ratings
- **Smart Filtering**: Category-based post filtering with animations
- **Enhanced Typography**: Optimized reading experience with proper hierarchy
- **Featured Posts**: Highlight important content with special styling

## 🚀 Live Site

Visit the live website: [https://gmanthenoxus.github.io](https://gmanthenoxus.github.io)

### 🚀 **Project & Hobby Showcase**
- **Project Collection**: Dedicated section for technical projects and builds
- **Hobby Collection**: Personal interests and passion projects
- **Dynamic Content**: Data-driven content management
- **Rich Media Support**: Images, videos, and interactive elements

### 🔗 **Integration & Contact**
- **Contact Forms**: Easy ways to connect and collaborate
- **Social Links**: Professional networking integration
- **Newsletter Signup**: Community engagement features
- **SEO Optimized**: Meta tags and structured data

## 🛠️ Tech Stack

- **Static Site Generator**: Jekyll 4.3+
- **Hosting**: GitHub Pages with automatic deployment
- **Styling**: SCSS with modular architecture and CSS Grid/Flexbox
- **JavaScript**: Vanilla JS for interactive elements and animations
- **Markdown**: Content management with YAML front matter
- **Template Engine**: Liquid templating for dynamic content

## 📁 Project Structure

```
gmanthenoxus.github.io/
├── README.md
├── blogTemplate.md         # Blog template guide and strategy
└── docs/                   # Jekyll site root
    ├── _config.yml         # Jekyll configuration
    ├── _data/              # Data files for dynamic content
    ├── _hobbies/           # Hobby collection pages
    ├── _includes/          # Reusable HTML components
    ├── _layouts/           # Page templates
    │   ├── default.html    # Base layout
    │   ├── posts.html      # Standard blog post layout
    │   ├── post-listicle.html    # Listicle template
    │   ├── post-case-study.html  # Case study template
    │   └── post-how-to.html      # How-to guide template
    ├── _posts/             # Blog posts
    ├── _projects/          # Project collection pages
    ├── _sass/              # Modular SCSS stylesheets
    │   ├── _variables.scss # Color and spacing variables
    │   ├── _base.scss      # Base styles and resets
    │   ├── _components.scss # Reusable components
    │   └── _homepage.scss  # Homepage-specific styles
    ├── _templates/         # Blog post templates
    │   ├── README.md       # Template selection guide
    │   ├── listicle-template.md    # Listicle template
    │   ├── case-study-template.md  # Case study template
    │   └── how-to-template.md      # How-to template
    ├── assets/             # Static assets
    │   ├── css/main.scss   # Main stylesheet
    │   ├── js/             # JavaScript files
    │   └── images/         # Image assets
    ├── index.html          # Homepage
    ├── about.html          # About page
    ├── blog.html           # Blog listing page
    ├── builds.html         # Projects listing page
    ├── contact.html        # Contact page
    ├── hobbies.html        # Hobbies listing page
    ├── Gemfile             # Ruby dependencies
    └── Gemfile.lock        # Locked dependency versions
```

## 🏃‍♂️ Quick Start

### Prerequisites

- Ruby (version 2.7 or higher)
- Bundler gem
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/gmanthenoxus/gmanthenoxus.github.io.git
   cd gmanthenoxus.github.io
   ```

2. **Navigate to the docs directory**
   ```bash
   cd docs
   ```

3. **Install dependencies**
   ```bash
   bundle install
   ```

4. **Start the development server**
   ```bash
   bundle exec jekyll serve
   ```

5. **View the site**
   Open your browser and go to `http://localhost:4000`

### Making Changes

The site will automatically rebuild when you make changes to files. Simply refresh your browser to see updates.

## 📝 Content Management

### Blog Template System

The site features a comprehensive blog template system with specialized layouts for different content types:

#### **Available Templates:**

1. **📝 Listicle Template** (`post-listicle`)
   - Perfect for "X Ways to..." posts and actionable tip lists
   - Features: TL;DR boxes, key takeaways, interactive checklists
   - Use: `layout: post-listicle`

2. **📊 Case Study Template** (`post-case-study`)
   - Ideal for success stories and transformation narratives
   - Features: Results metrics, methodology breakdown, tools analysis
   - Use: `layout: post-case-study`

3. **🎯 How-To Template** (`post-how-to`)
   - Best for step-by-step tutorials and guides
   - Features: Prerequisites, troubleshooting, related guides
   - Use: `layout: post-how-to`

4. **📄 Standard Template** (`posts`)
   - General-purpose blog post layout
   - Features: Clean typography, enhanced readability
   - Use: `layout: posts`

#### **Developer Challenges**

All templates support developer challenges to engage your technical audience:

```yaml
developer_challenge:
  type: "Build"        # Build, Design, or Analysis
  difficulty: 3        # 1-5 star rating
  description: "Challenge description"
  requirements:
    - "Requirement 1"
    - "Requirement 2"
  bonus: "Optional bonus challenge"
  submission_url: "#"  # Link to submission form
```

### Creating Blog Posts

#### **Using Templates:**

1. **Choose your template** from `docs/_templates/`
2. **Copy to `_posts/`** with naming: `YYYY-MM-DD-title.md`
3. **Fill in front matter** and replace placeholder content
4. **Publish** and enjoy beautiful formatting!

#### **Example Front Matter:**

```markdown
---
layout: post-listicle
title: "7 Game-Changing Development Habits"
subtitle: "Simple practices that boost productivity"
date: 2024-01-01
category: "tech"  # tech, journey, passion
image: "/assets/images/blog/your-image.jpg"
excerpt: "Hook sentence that previews the value"
read_time: "5 min read"
featured: true
tldr: "One-sentence summary for busy readers"
key_takeaways:
  - "Main insight readers will remember"
  - "Another key takeaway"
action_items:
  - "Specific action readers can take"
  - "Another actionable step"
developer_challenge:
  type: "Build"
  difficulty: 3
  description: "Build a productivity tracker app"
  requirements:
    - "Track daily habits"
    - "Show progress charts"
  bonus: "Add social sharing features"
tags: [productivity, development, habits]
---

Your content here...
```

### Adding Projects

Create new markdown files in `docs/_projects/` with project details:

```markdown
---
layout: project
title: "Project Name"
description: "Brief project description"
tech_stack: ["Technology 1", "Technology 2"]
github_url: "https://github.com/username/repo"
live_url: "https://project-demo.com"
---

Detailed project description...
```

### Adding Hobbies

Create new markdown files in `docs/_hobbies/` or update `docs/_data/hobbies.yml`:

```yaml
- name: "Hobby Name"
  description: "Hobby description"
  emoji: "🎯"
  featured_image: "/assets/images/hobby-image.jpg"
  url: "/hobbies/hobby-name/"
```

## 🎨 Customization

### Site Configuration

Edit `docs/_config.yml` to update:
- Site title and description
- Contact information
- Social media links
- Build settings
- Color themes and branding

### Styling System

The site uses a modular SCSS architecture:

- **`docs/_sass/_variables.scss`** - Colors, spacing, breakpoints
- **`docs/_sass/_base.scss`** - Base styles and resets
- **`docs/_sass/_components.scss`** - Reusable UI components
- **`docs/_sass/_homepage.scss`** - Homepage-specific styles
- **`docs/assets/css/main.scss`** - Main stylesheet with imports

#### **Color Theme:**
- **Primary**: `#2D3747` (Dark gray)
- **Accent**: `#008753` (Green)
- **Accent Secondary**: `#012169` (Blue)
- **Background**: `#F7FAFC` (Light gray)

### Layout Templates

The site includes specialized templates:

#### **Blog Templates:**
- `post-listicle.html` - Interactive listicle layout
- `post-case-study.html` - Results-focused case studies
- `post-how-to.html` - Step-by-step tutorial layout
- `posts.html` - Standard blog post template

#### **Page Templates:**
- `default.html` - Base template with navigation
- `project.html` - Project showcase template
- `hobby.html` - Hobby page template

### Template Features

Each blog template includes:
- **Enhanced typography** with proper hierarchy
- **Interactive components** (checklists, metrics, etc.)
- **Developer challenges** with difficulty ratings
- **Mobile-responsive design** with touch-friendly elements
- **SEO optimization** with structured data

## 🚀 Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the main branch. The deployment process:

1. Push changes to the main branch
2. GitHub Actions builds the Jekyll site
3. Site is deployed to `https://gmanthenoxus.github.io`

### Manual Deployment

If needed, you can build the site locally:

```bash
cd docs
bundle exec jekyll build
```

The built site will be in the `docs/_site/` directory.

## 🎯 Key Features Showcase

### **Blog Template System**
- **4 specialized templates** for different content types
- **Developer challenges** with interactive elements
- **Difficulty ratings** (1-5 stars) for technical content
- **Template selection guide** for easy content creation

### **Interactive UI Components**
- **TL;DR boxes** with lightning bolt icons and gradients
- **Results metrics** with animated counters
- **Action checklists** with interactive checkboxes
- **Challenge boxes** with rocket icons and CTAs

### **Responsive Design**
- **Mobile-first approach** with touch-friendly elements
- **Flexible grid systems** that adapt to content
- **Smooth animations** and micro-interactions
- **Consistent branding** across all devices

### **Developer Experience**
- **Modular SCSS architecture** for maintainable styles
- **Template inheritance** for consistent layouts
- **Hot reload** development with Jekyll serve
- **Automated deployment** with GitHub Actions

## 🤝 Contributing

This is a personal portfolio website, but suggestions and improvements are welcome!

### **Areas for Contribution:**
- **New blog templates** for different content types
- **UI/UX improvements** and accessibility enhancements
- **Performance optimizations** and SEO improvements
- **New interactive components** and animations

### **How to Contribute:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Test locally with `bundle exec jekyll serve`
5. Commit your changes (`git commit -am 'Add some improvement'`)
6. Push to the branch (`git push origin feature/improvement`)
7. Create a Pull Request with detailed description

## 📧 Contact

- **Email**: thisisnoxus@gmail.com
- **GitHub**: [@gmanthenoxus](https://github.com/gmanthenoxus)
- **Website**: [https://gmanthenoxus.github.io](https://gmanthenoxus.github.io)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Performance & SEO

- **Lighthouse Score**: 95+ across all metrics
- **Mobile-First Design**: Optimized for all devices
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Fast Loading**: Optimized images and minimal JavaScript
- **Accessibility**: WCAG 2.1 AA compliant

## 📊 Analytics & Tracking

The site includes:
- **Google Analytics** integration (optional)
- **Performance monitoring** with Core Web Vitals
- **User engagement** tracking for blog posts
- **Conversion tracking** for contact forms

---

*Built with ❤️ using Jekyll, SCSS, and modern web technologies*

**Template System**: Comprehensive blog templates with developer challenges
**UI Framework**: Custom design system with gradient themes
**Deployment**: Automated GitHub Pages deployment
**Performance**: Optimized for speed and accessibility