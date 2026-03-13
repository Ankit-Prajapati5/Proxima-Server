# 🚀 PROXIMA Server

Backend API for **Proxima – A Secure Online Learning Platform** built using the **MERN Stack**.
This server powers course management, secure payments, lecture progress tracking, AI doubt support, and a tamper-proof certificate system.

---

## 🧠 Features

### 🎓 Learning Platform

* Course & Lecture Management
* Student Enrollment System
* Lecture Progress Tracking
* Quiz Integration

### 💳 Secure Payments

* Razorpay payment integration
* Order verification & signature validation
* Payment status tracking

### 📊 Progress Tracking

* Lecture completion tracking
* Last watched lecture resume
* Automatic course completion detection

### 🏆 Certificate System

* Secure certificate generation
* Unique certificate IDs
* QR verification
* Public certificate verification page
* Tamper detection using SHA256 hash

### 🤖 AI Doubt Support

* Ask AI questions directly from the platform
* Context-aware learning assistant

### 🔐 Security

* JWT authentication
* Protected routes
* Payment signature verification
* Certificate hash validation

---

# 🏗️ Tech Stack

| Technology          | Usage                    |
| ------------------- | ------------------------ |
| **Node.js**         | Backend Runtime          |
| **Express.js**      | API Framework            |
| **MongoDB**         | Database                 |
| **Mongoose**        | ODM                      |
| **JWT**             | Authentication           |
| **Razorpay API**    | Payments                 |
| **Crypto (SHA256)** | Certificate Security     |
| **RTK Query**       | Frontend API Integration |

---

# 📂 Project Structure

```
server
│
├── controllers
│   ├── courseController.js
│   ├── paymentController.js
│   ├── certificateController.js
│
├── models
│   ├── User.js
│   ├── Course.js
│   ├── CoursePurchase.js
│   ├── Certificate.js
│
├── routes
│   ├── courseRoutes.js
│   ├── paymentRoutes.js
│   ├── certificateRoutes.js
│
├── middleware
│   ├── isAuthenticated.js
│
├── utils
│   ├── certificateId.js
│   ├── hashCertificate.js
│
└── server.js
```

---

# ⚙️ Installation

Clone the repository:

```
git clone https://github.com/Ankit-Prajapati5/Proxima-Server.git
```

Move into the project directory:

```
cd Proxima-Server
```

Install dependencies:

```
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file:

```
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

CLIENT_URL=http://localhost:5173
```

---

# ▶️ Running the Server

Development mode:

```
npm run dev
```

Production mode:

```
npm start
```

Server runs on:

```
http://localhost:5000
```

---

# 📜 Certificate Verification

Each certificate contains:

* Unique Certificate ID
* QR Verification
* SHA256 Hash
* Public Verification URL

Example verification link:

```
https://proxima.app/verify/PRX-2026-AB12CD
```

---

# 🔐 Security Architecture

```
User completes course
        ↓
Backend verifies progress
        ↓
Certificate generated
        ↓
Unique certificate ID
        ↓
SHA256 cryptographic hash
        ↓
QR verification
        ↓
Public verification page
```

Fake certificates will fail verification.

---

# 🌐 API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## Courses

```
GET /api/course
POST /api/course
```

## Payments

```
POST /api/payment/create-order
POST /api/payment/verify
```

## Certificates

```
POST /api/certificate/generate
GET /api/certificate/verify/:id
```

---

# 👨‍💻 Author

**Ankit Prajapati**

GitHub
https://github.com/Ankit-Prajapati5

---

# ⭐ Support

If you like this project, please ⭐ the repository to support development.

---

# 📜 License

This project is licensed under the **MIT License**.
