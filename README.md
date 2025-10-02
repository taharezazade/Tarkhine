# 🚀 React + Vite

This template provides a **minimal and fast setup** to get React working with Vite, including **Hot Module Replacement (HMR)** and some ESLint rules for smooth development.

---

## 🔌 Official React Plugins

Currently, two official React plugins are available:

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)**
  Uses **Babel** for Fast Refresh, providing a fast and seamless development experience.

- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)**
  Uses **SWC** for Fast Refresh, offering ultra-fast compilation with lower resource usage.

---

## ⚡ React Compiler

The React Compiler is **not enabled** in this template.
To enable it and use new React features, see the [React Compiler documentation](https://react.dev/learn/react-compiler/installation).

---

## 🛠️ Expanding ESLint Configuration

For building a **production-ready application**, it is recommended to use **TypeScript** along with type-aware lint rules.
For more information on integrating TypeScript with [`typescript-eslint`](https://typescript-eslint.io), check out the official Vite TS template: [React + TS Template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts).

---

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
# or
yarn
# or
pnpm install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

---

## 📄 Project Structure

```
├─ public/        # Static files
├─ src/           # React source code
│  ├─ assets/     # Images, fonts, and other resources
│  ├─ components/ # React components
│  ├─ App.jsx     # Main app component
│  └─ main.jsx    # React mount point
├─ index.html     # Main HTML template
├─ vite.config.js # Vite configuration
└─ package.json   # Dependencies and scripts
```

---

## 🔗 Useful Links

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [ESLint + TypeScript](https://typescript-eslint.io/)
