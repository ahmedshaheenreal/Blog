# 📝 Blog API (TypeScript + Node.js + Sequelize)

A scalable, RESTful backend API for a blogging platform. This system enables users to create posts, 
assign categories, and manage comments. Built using Node.js, Express, Sequelize ORM with MySQL, and TypeScript.

---

## 🚀 Features

- User registration and JWT-based authentication
- CRUD operations for users, posts, categories, and comments
- Post-category many-to-many relationship
- Comment system linked to both users and posts
- Modular codebase with clean architecture (MVC)
- Error handling and input validation
- Unit testing with high coverage
- Docker support (optional)
- GitHub workflows for CI/CD

---

## 🧱 Technologies Used

- **Backend:** Node.js, Express.js, TypeScript
- **ORM:** Sequelize
- **Database:** MySQL
- **Authentication:** JWT
- **Testing:** Jest or similar
- **Dev Tools:** Docker, GitHub Actions

---

## 🗂️ Project Structure

src/
├── models/  Sequelize models (User, Post, Category, Comment)
├── controllers/  Business logic
├── routes/  Express routes
├── middleware/  Error handling, JWT auth, validations
├── utils/  Helper functions (e.g., database config)
├── config/  DB config and environment setup
├── index.ts  App entry point
├── tests/  Unit tests
---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ahmedshaheenreal/Blog.git
cd Blog
```
### 2. Install Dependencies


```bash
npm install
```
