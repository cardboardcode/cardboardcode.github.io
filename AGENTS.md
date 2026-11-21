# AGENTS.md

This file provides guidance to AI coding agents (e.g., Claude Code, Goose) when working with code in this repository.

## Project Overview

This is a personal website/blog built with Jekyll on GitHub Pages. The site features programming tutorials, art discussions, and personal project showcases. Content is written in Markdown and uses the minima theme with a dark skin.

## Development Commands

### Running Locally

```bash
# Install dependencies
bundle install

# Start local development server (Jekyll will rebuild on file changes)
bundle exec jekyll serve
```

The server will be available at `http://localhost:4000` by default.

### Building

```bash
# Build the site (outputs to _site/)
bundle exec jekyll build
```

## Project Structure

- `_posts/` - Blog post Markdown files (YYYY-MM-DD format in filename)
- `_layouts/` - Jekyll layouts (`default.html`, `post.html`)
- `_includes/` - Reusable template snippets (`toc.html`, `comments.html`)
- `assets/scripts/` - Custom JavaScript files (e.g., `ternaryPlot.js`)
- `css/` - Custom stylesheets (e.g., `image-popup.css`)
- `html/` - Standalone HTML files for visualizations/demos
- `_config.yml` - Site configuration including theme and plugins

## Key Architecture

### Post Format

Posts use Jekyll frontmatter with the `post.html` layout. Example:

```yaml
---
layout: post
title: "Post Title"
permalink: /custom-url/
categories: tag1,tag2
---
```

The `post.html` layout includes:
- Table of contents (via `toc.html` include)
- Floating layout with content and comments
- Disqus comments support (controlled by `site.disqus.shortname`)

### Custom JavaScript

Custom scripts in `assets/scripts/` are designed to be used standalone in HTML files, not as Jekyll assets. They typically implement:
- Interactive visualizations (e.g., `ternaryPlot.js`)
- User interface enhancements (e.g., `copyCode.js`)

Use these by including them directly in HTML files or by creating a custom layout.

### Theme Customization

The site uses the `jekyll-minima` theme with:
- Dark skin (`minima: skin: dark`)
- Kramdown markdown with GFM parser
- Rouge syntax highlighting

Customizations are made in `_config.yml` and through custom layouts/includes in this repository.