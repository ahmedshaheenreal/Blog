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

## API Endpoints (Simplified)
<ul>
  <li><strong>Users</strong>
    <ul>
      <li>POST /api/users – Register new user</li>
      <li>POST /api/users/login – Authenticate user (returns JWT)</li>
      <li>GET /api/users – Get all users (auth required)</li>
      <li>GET /api/users/:id – Get user by ID</li>
      <li>PUT /api/users/:id – Update user</li>
      <li>DELETE /api/users/:id – Delete user</li>
    </ul>
  </li>

  <li><strong>Posts</strong>
    <ul>
      <li>POST /api/posts – Create post (auth required)</li>
      <li>GET /api/posts – Get all posts</li>
      <li>GET /api/posts/:id – Get post by ID</li>
      <li>PUT /api/posts/:id – Update post</li>
      <li>DELETE /api/posts/:id – Delete post</li>
      <li>POST /api/posts/:id/categories – Add categories</li>
      <li>GET /api/posts/:id/comments – Get comments</li>
    </ul>
  </li>

  <li><strong>Comments</strong>
    <ul>
      <li>POST /api/posts/:id/comments – Add comment (auth required)</li>
    </ul>
  </li>
</ul>



## 🔄 Relationships
<li>User ↔ Posts: One-to-Many</li>

<li>Post ↔ Categories: Many-to-Many</li>

<li>Post ↔ Comments: One-to-Many</li>

<li>User ↔ Comments: One-to-Many</li>

## 🧪 Sample Test Cases
#### 1. Create User
```json
POST /api/users
{ "username": "testuser", "email": "test@example.com", "password": "pass" }
```


#### 2. Login
```json
POST /api/users/login
{ "email": "test@example.com", "password": "pass" }

```

#### 3.Create Post

```json
POST /api/posts
Header: Authorization: Bearer <token>
Body: { "userId": 1, "title": "My First Post", "content": "..." }
```



 #### 3.Create Post

```json
POST /api/posts
Header: Authorization: Bearer <token>
Body: { "userId": 1, "title": "My First Post", "content": "..." }

```


 #### 3.Invalid User Post

```json
POST /api/posts
{ "userId": 99, "title": "Invalid", "content": "..." }
→ 400 Bad Request


```


## 🧪 Testing
```bash
npm test
```
#### Covered: 
<li>Auth & registration</li>

<li>Post CRUD</li>

<li>Category & Comment logic</li>

<li>Error handling</li>



##  📄 License

This project is licensed under the MIT License.



### 👨‍💻 Author
#### Ahmed Shaheen


