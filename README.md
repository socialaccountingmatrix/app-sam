# App-SAM

**App-SAM** is an open-source React application that allows economists, researchers, and data analysts to **build, edit, and visualize Social Accounting Matrices (SAM)** interactively. It aims to provide a user-friendly platform for macroeconomic modeling, policy analysis, and data exploration.

---

## 🚀 Features

### ✅ Current Features

- Spreadsheet-like interface for creating and editing SAMs
- Row and column balancing tools

### 🛠️ Planned / Upcoming Features

- Import and export data (CSV, Excel, JSON)
- Interactive visualization of economic linkages
- Ready for integration with CGE (Computable General Equilibrium) or input-output models
- Version tracking and undo/redo support

---

## 🛠️ Tech Stack

**Note:** Currently, App-SAM is a **completely frontend-based application**.

- **Frontend:** React + Vite
- **Spreadsheet / Data Grid:** FortuneSheet
- **State Management:** Redux
- **Styling:** Tailwind CSS

---

## 💻 Installation

1. Clone the repository:

```bash
git clone https://github.com/socialaccountingmatrix/app-sam.git
cd app-sam
```

2. Install Dependencies

Make sure you are using **Node.js version 20**.

```bash
node -v
# Should output v20.x.x
```

If it is as expected:

```bash
npm install
```

3. Run dev server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```
