# Noxus' Hub - Personal Portfolio Website

A modern, interactive personal portfolio website showcasing projects, hobbies, and blog posts. Built with Jekyll and hosted on GitHub Pages.

## 🌟 Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Interactive Homepage**: Tabbed navigation with smooth transitions
- **Blog System**: Jekyll-powered blog with post categories and dates
- **Project Showcase**: Dedicated section for technical projects and builds
- **Hobby Collection**: Personal interests and passion projects
- **Contact Integration**: Easy ways to connect and collaborate
- **Modern UI**: Clean, professional design with engaging animations

## 🚀 Live Site

Visit the live website: [https://gmanthenoxus.github.io](https://gmanthenoxus.github.io)

## 🛠️ Tech Stack

- **Static Site Generator**: Jekyll
- **Hosting**: GitHub Pages
- **Styling**: Custom CSS with modern design principles
- **JavaScript**: Vanilla JS for interactive elements
- **Markdown**: Content management with front matter

## 📁 Project Structure

```
gmanthenoxus.github.io/
├── README.md
└── docs/                    # Jekyll site root
    ├── _config.yml         # Jekyll configuration
    ├── _data/              # Data files for dynamic content
    ├── _hobbies/           # Hobby collection pages
    ├── _includes/          # Reusable HTML components
    ├── _layouts/           # Page templates
    ├── _posts/             # Blog posts
    ├── _projects/          # Project collection pages
    ├── _sass/              # Sass stylesheets
    ├── assets/             # Static assets (images, CSS, JS)
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

### Adding Blog Posts

Create new markdown files in `docs/_posts/` with the naming convention: `YYYY-MM-DD-title.md`

```markdown
---
layout: post
title: "Your Post Title"
date: 2024-01-01
category: "Category Name"
image: "/assets/images/post-image.jpg"
---

Your post content here...
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

### Styling

- Main styles are in `docs/_sass/`
- Custom CSS can be added to `docs/assets/css/`
- The site uses a modern, responsive design system

### Layout Templates

Modify templates in `docs/_layouts/` to change page structures:
- `default.html` - Base template
- `post.html` - Blog post template
- `project.html` - Project page template
- `hobby.html` - Hobby page template

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

## 🤝 Contributing

This is a personal portfolio website, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some improvement'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## 📧 Contact

- **Email**: thisisnoxus@gmail.com
- **GitHub**: [@gmanthenoxus](https://github.com/gmanthenoxus)
- **Website**: [https://gmanthenoxus.github.io](https://gmanthenoxus.github.io)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built using Jekyll and GitHub Pages*