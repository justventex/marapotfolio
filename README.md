# Mara Dobbelfeld — Design Portfolio

A modern, highly interactive, and responsive portfolio website designed for a creative Interactive Media Designer. Built with a focus on stunning typography, fluid animations, and a premium user experience across all devices.

## ✨ Features

- **Custom Cursor & Interactions:** A bespoke circular cursor that adapts to interactive elements.
- **Smooth Page Transitions:** Seamless navigation between pages using Barba.js.
- **Dynamic Scroll Animations:** Elements fade in elegantly as they scroll into view (Intersection Observer).
- **Fully Responsive Design:** A flawless experience from ultra-wide desktop monitors down to mobile devices, featuring a custom glassmorphism full-screen hamburger menu on mobile.
- **Premium Aesthetics:** Bold typography (Anton SC & Antonio), a striking color palette (Black, Yellow, Green), and modern layout techniques (CSS Grid, Flexbox).

## 🛠 Tech Stack

- **HTML5:** Semantic and accessible structure.
- **CSS3:** Vanilla CSS utilizing custom properties (variables), Flexbox, CSS Grid, and media queries for responsive design.
- **JavaScript (ES6):** Vanilla JavaScript for DOM manipulation, custom cursor logic, intersection observers, and mobile menu toggles.
- **Barba.js:** For seamless, SPA-like page transitions.

## 📂 Project Structure

```text
├── assets/
│   └── images/       # All project images and placeholders
├── css/
│   └── styles.css    # Global stylesheet, design tokens, and media queries
├── js/
│   └── script.js     # Interaction logic, cursor tracking, and scroll observers
├── index.html        # Home / Hero page
├── about.html        # About / Biography page
├── work.html         # Selected Work / Gallery page
├── project.html      # Detailed Case Study template
└── README.md         # Project documentation
```

## 🚀 Setup & Installation

To run this project locally, you don't need any complex build tools. You just need a simple local web server to handle the Barba.js page transitions (which require `http://` or `https://` protocols rather than `file://`).

1. **Clone the repository:**
   ```bash
   git clone https://github.com/justventex/marapotfolio.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd marapotfolio
   ```
3. **Run a local server:**
   - **Using VS Code:** Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and click "Go Live".
   - **Using Node.js / NPX:** Run `npx serve .` in the terminal.
   - **Using Python:** Run `python -m http.server 8000` in the terminal.
4. **Open your browser** and visit `http://localhost:8000` (or the port provided by your server).

## 🎨 Design System

- **Primary Colors:** 
  - Green (`#3A7D44`)
  - Yellow (`#FCFF42`)
  - Black (`#000000`) / White (`#FFFFFF`)
- **Typography:**
  - Display Font: `Anton SC`
  - Body Font: `Antonio`

## 👨‍💻 Contributing

If you are taking over this project, all core styles are centralized in `css/styles.css`. The CSS is heavily modularized using CSS Variables at the top of the file. Interaction logic is centralized in `js/script.js`, specifically within the `initInteractions()` function which is re-triggered on every page transition.
