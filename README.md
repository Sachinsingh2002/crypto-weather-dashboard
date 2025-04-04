# 🌐 Crypto Weather Nexus

**Crypto Weather Nexus** is a modern, fully responsive web application that combines the world of cryptocurrency with live weather updates. Whether you're a crypto enthusiast or just someone checking the weather before heading out — this application gives you a seamless, visually appealing experience for both!

Built using the latest web technologies like **Next.js 13+ (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**, this app is a solid foundation for developers who want to build scalable, modular applications.

---

## ✨ Key Features

### 🪙 Cryptocurrency Info
- View individual details for top cryptocurrencies.
- Navigate to dynamic pages for each coin using their IDs.
- Responsive cards display prices, market cap, and changes.

### ☁️ Weather Insights
- Check real-time weather conditions by city.
- Beautifully designed weather cards with icons.
- Dynamic route for each city using Next.js routing.

### 🌓 Theming and UI
- Light and dark mode support with smooth transitions.
- Uses `theme-provider.tsx` for toggling between themes.
- Clean, consistent UI powered by `shadcn/ui`.

---

## 🧠 Design Decisions

### Next.js App Router
- Utilized the `/app` directory structure introduced in Next.js 13+ for better routing and layout composition.
- Implements file-based routing for both `/city/[id]` and `/crypto/[id]`.

### Tailwind CSS
- Highly customizable and utility-first.
- Used for rapid prototyping and fine-grained control over design.

### TypeScript
- Static type checking ensures fewer runtime errors and better developer experience.

### Shadcn/UI
- Provides modular, accessible, and themeable components out of the box.
- Ensures design consistency across all screens.

### PNPM over NPM/Yarn
- Faster installations and better workspace management.
- Ensures dependency locking with `pnpm-lock.yaml`.

---

## 🏗️ Project Structure

```
crypto-weather-nexus/
├── app/                 # Main application routes and layouts
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── globals.css      # Global Tailwind styles
│   ├── city/[id]/       # Dynamic city weather page
│   └── crypto/[id]/     # Dynamic crypto details page
├── components/          # Reusable components (navbar, UI elements, theme providers)
├── public/              # Static assets
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project metadata and scripts
├── pnpm-lock.yaml       # Dependency lock file
```

---

## 🔧 Setup Instructions

### Prerequisites
- **Node.js** v18 or later
- **PNPM** package manager

### Install PNPM (if not already installed)
```bash
npm install -g pnpm
```

---

### 🚀 Getting Started

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/crypto-weather-nexus.git
cd crypto-weather-nexus
```

2. **Install Dependencies**
```bash
pnpm install
```

3. **Run the Development Server**
```bash
pnpm dev
```
Now open your browser and navigate to [http://localhost:3000](http://localhost:3000)

---

## 🧪 Scripts & Utilities

| Script         | Description                         |
|----------------|-------------------------------------|
| `pnpm dev`     | Starts the development server       |
| `pnpm build`   | Builds the app for production       |
| `pnpm start`   | Runs the production build           |
| `pnpm lint`    | Lints the code using ESLint         |
| `pnpm format`  | Formats the code using Prettier     |

---

## ✅ Best Practices Followed

- Atomic component structure for better scalability.
- Theme management using `useTheme` from `next-themes`.
- Clean and readable code with proper TypeScript interfaces.
- File and folder naming conventions for maintainability.

---

## 💡 Future Improvements

- Add search functionality for cities and crypto assets.
- Integrate historical data and charts using Chart.js or Recharts.
- Add persistent theme storage using `localStorage` or cookies.
- Multi-language support (i18n).

---

## 🧩 Tech Stack Summary

| Tech          | Purpose                          |
|---------------|----------------------------------|
| Next.js       | React Framework for SSR/SSG      |
| Tailwind CSS  | Styling with utility-first CSS   |
| TypeScript    | Static typing                    |
| shadcn/ui     | Modular UI components            |
| PNPM          | Fast package manager             |

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use it, fork it, or contribute!

---

## 👨‍💻 Author

**[Your Name]**  
Connect with me on [LinkedIn](#) | [GitHub](#) | [Twitter](#)

---

> Built with ❤️ using modern web tools.
