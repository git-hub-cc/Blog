# Pure Front-End Static Blog Template

This is a lightweight, elegant, and full-featured pure front-end static blog template. It's built with basic HTML, CSS, and Vanilla JavaScript, requiring no complex build tools or backend services. Simply upload the files to any static hosting platform (like GitHub Pages, Vercel, Netlify, or your own server) to have your own blog up and running.

The design of this template is inspired by the [Stack theme](https://github.com/CaiJimmy/hugo-theme-stack) and has been simplified and customized.

[中文版](./README-cn.md)

## ✨ Features

*   **Purely Static, Zero Dependencies**: No Node.js, no database, no build process. Deployment is simple.
*   **Responsive Design**: Perfectly adapts to desktop, tablet, and mobile devices.
*   **Light/Dark Mode**: Supports manual switching and automatically adapts to your OS preference. Remembers user's choice.
*   **Single Page Application (SPA)**: Uses URL Hash for routing, providing a smooth, refresh-free page switching experience.
*   **Markdown Support**: Posts are written in Markdown and rendered in real-time on the client side using `marked.js`.
*   **Code Syntax Highlighting**: Supports syntax highlighting for various programming languages using `highlight.js`, including a one-click copy-to-clipboard button.
*   **Client-side Search**: Built-in instant search for post titles and summaries.
*   **Post Categories**: Easily filter posts by category through the navigation menu.
*   **Pagination**: Automatically paginates the post list when the number of posts exceeds a set limit.
*   **Custom Pages**: Supports creating standalone pages like "About Me".
*   **Custom Error Pages**: Provides well-designed `404` and `50x` error pages.

## 🚀 Quick Start

Setting up your own blog with this template is very simple.

### 1. Get the Code

Clone or download this project to your local machine.

```bash
git clone https://github.com/git-hub-cc/blog
```

### 2. Customize Basic Information

Open the `index.html` file and modify the following content according to your needs:

*   **Site Title**: Modify the `<title>` tag and the content within `.site-name`.
*   **Avatar**: Replace the `src` path of the `.site-logo` (`blog/img/head/my.png`).
*   **Site Description**: Modify the text within `.site-description`.
*   **Navigation Menu**: Add or modify category links in `.site-nav`. The `data-nav-id` attribute should correspond to the `category` value in `posts.json`.
*   **Social Links**: Modify the `<a>` tags in `.social-links` to point to your own social media profiles.
*   **Copyright/Footer Info**: Modify the text within `.copyright`.

### 3. Publish a New Post

Publishing a new post is a two-step process:

**Step 1: Create a Markdown File**

Create a new `.md` file in the `blog/md/` directory (or a subdirectory, like `blog/md/programming/`). You can use any Markdown editor you like for writing.

**Step 2: Update the Post Index**

Open the `blog/posts.json` file and add a new JSON object to the **very beginning** of the array to describe your new post. The object should contain the following fields:

*   `file` (string): **Required**. The path to the Markdown file, relative to the `blog/md/` directory.
*   `title` (string): **Required**. The title of the post.
*   `date` (string): **Required**. The publication date, recommended format is `YYYY-MM-DD`.
*   `summary` (string): **Required**. A short summary of the post, which will be displayed on the post list page.
*   `category` (string): **Required**. The category of the post. This value needs to match the `data-nav-id` attribute of a navigation link in `index.html` for the current category to be highlighted.

For example, to add a new post named `my-new-post.md`:

```json
[
  {
    "file": "life/my-new-post.md",
    "title": "My New Post",
    "date": "2024-05-21",
    "summary": "This is my first post about life, documenting some interesting things.",
    "category": "life" 
  }
]
```
> **Note**: `posts.json` is an array. The object for a new post should be added to the beginning of the array to ensure the post list is sorted in reverse chronological order.

### 4. Modify the "About" Page

Simply edit the `blog/md/about.md` file to update the content of the "About" page.

### 5. Deploy

Upload the entire project folder to any web server or hosting platform that supports static files.

*   **GitHub Pages**: Push the code to your GitHub repository and enable the Pages feature in the repository settings.
*   **Vercel/Netlify**: Link your GitHub repository directly, and the platform will handle the deployment automatically.
*   **Cloud Server**: Use a web server like Nginx or Apache and point the root directory to the project folder.

## 📁 File Structure

Here is the main file structure of the project with explanations:

```
.
├── index.html              # Main entry point and layout file
├── 40x.html                # Custom 404 error page
├── 50x.html                # Custom 500 error page
├── README.md               # Project README file
└── blog/
    ├── css/
    │   └── style.css       # Global stylesheet
    ├── js/
    │   └── app.js          # Core JavaScript logic
    ├── lib/                # Third-party libraries
    │   ├── marked.min.js   # Markdown parsing library
    │   ├── highlight.min.js # Code highlighting library
    │   └── atom-one-dark.min.css # Theme for highlight.js
    ├── md/
    │   ├── about.md        # Source file for the "About" page
    │   └── ...             # Directory for your post .md files
    ├── img/
    │   └── ...             # Directory for image assets
    └── posts.json          # Post index "database"
```

## 🔧 Dependencies and Acknowledgements

This project relies on the following excellent open-source libraries:

*   [marked.js](https://github.com/markedjs/marked): A low-level compiler for parsing Markdown without caching or blocking for long periods.
*   [highlight.js](https://github.com/highlightjs/highlight.js): A versatile syntax highlighter.

The UI design is inspired by the [Hugo Stack Theme](https://github.com/CaiJimmy/hugo-theme-stack).