# 🌐 Todo App – Finals_Q2 (Frontend)

This is the frontend of the Todo application built using **React + TypeScript (Vite)**.

---

# 🚀 Project Overview

The frontend allows users to:

* Create, update, delete todos
* Manage task status
* Enforce structured workflow (Focus-Flow)
* Detect backend tampering
* Perform proof-of-work before submission

---

# 🧩 Architecture Summary

The frontend follows a **component-based architecture**:

* **Pages** → TodoPage, AboutPage
* **Components** → TodoList, TodoItem, AddTodoForm, EditTodoModal
* **Context API** → Global state (TodoContext)
* **Custom Hook** → useTodos

### Key Patterns:

* Component-based design
* Context API for global state
* Custom hooks abstraction
* Immutable updates

---

# ⚙️ Setup Instructions

```bash
cd TodoAppFrontend
npm install
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

# 🔥 Core Features

* React Router navigation
* Context API state management
* react-hook-form usage
* Immutable updates
* Theming system

---

# 🧠 Advanced Features

## Focus-Flow System

* Max 5 active tasks
* FIFO completion order
* Completed tasks auto-delete after 15 seconds

---

## Blockchain Validation

* Calls backend `/verify`
* Displays:

```
REDACTED / TAMPERED
```

if integrity fails

---

## ⛏️ Proof-of-Work

Before sending data:

```
SHA256(title | nonce) starts with "00"
```

* Mining happens on frontend
* Backend validates proof

---

# 🧪 Technical Audit Fixes

### ❌ Wrong delete logic

```js
setTodos(prev => prev.filter(t => t.title !== id));
```

✔️ Fixed:

```js
setTodos(prev => prev.filter(t => t.id !== id));
```

---

### ❌ Wrong update logic

```js
const updated = todos.filter(...)
```

✔️ Fixed:

```js
setTodos(prev => prev.map(t => t.id === updated.id ? updated : t));
```

---

### ❌ Wrong key usage

```jsx
key={index}
```

✔️ Fixed:

```jsx
key={t.id}
```

---

# 📌 Summary

This frontend demonstrates:

* Modern React architecture
* Efficient form handling
* Clean state management
* Advanced validation features

---

# 👨‍💻 Author

**Ronan Justine D. Ga**
