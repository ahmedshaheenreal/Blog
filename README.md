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
<br/>
src/
├── models/  Sequelize models (User, Post, Category, Comment) <br/>
├── controllers/  Business logic <br/>
├── routes/  Express routes <br/>
├── middleware/  Error handling, JWT auth, validations <br/>
├── utils/  Helper functions (e.g., database config) <br/>
├── config/  DB config and environment setup <br/>
├── index.ts  App entry point <br/>
├── tests/  Unit tests <br/>
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

### 3. Configure Environment

```bash
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_password
JWT_SECRET=your_secret_key
```
### 4. Start the Server

```bash
npm run dev

```

###API Endpoints (Simplified)

##🧑 Users
#POST /api/users – Register new user

#POST /api/users/login – Authenticate user (returns JWT)

#GET /api/users – Get all users (auth required)

#GET /api/users/:id – Get user by ID

#PUT /api/users/:id – Update user

D#ELETE /api/users/:id – Delete user

##📝 Posts
#POST /api/posts – Create post (auth required)

#GET /api/posts – Get all posts

#GET /api/posts/:id – Get post by ID

#PUT /api/posts/:id – Update post

#DELETE /api/posts/:id – Delete post

#POST /api/posts/:id/categories – Add categories

#GET /api/posts/:id/comments – Get comments

##💬 Comments
#POST /api/posts/:id/comments – Add comment (auth required)
