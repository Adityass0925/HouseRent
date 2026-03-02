# 🏡 HouseRent - Premium Real Estate Platform

HouseRent is a full-stack web application built with the **MERN stack** (MongoDB, Express.js, React, Node.js) and **Tailwind CSS**. It serves as a secure, role-based platform connecting property owners with potential renters, featuring an admin verification system to ensure platform trust and safety.

## ✨ Key Features

* **Role-Based Access Control (RBAC):** Three distinct user experiences for Renters, Owners, and Admins.
* **Secure Authentication:** JWT-based authentication with encrypted passwords (bcrypt).
* **Admin Verification Workflow:** Owners must be verified by an Admin before they are allowed to list properties, ensuring quality control.
* **Media Uploads:** Seamless property image uploads using `multer` and `FormData`.
* **Modern UI/UX:** Fully responsive, premium user interface styled with Tailwind CSS and custom CSS variables.
* **Dynamic Dashboards:** Personalized control panels for users to manage listings, view all properties, and manage user statuses.

## 🛠️ Tech Stack

**Frontend:**
* React.js (via Vite)
* React Router DOM (Routing)
* Tailwind CSS (Styling)
* Axios (HTTP requests)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (Database & ODM)
* JSON Web Tokens (JWT) (Authentication)
* Multer (Image/File Uploads)

## 🚀 Getting Started (Local Development)

Follow these steps to get the project running on your local machine.

### Prerequisites
* Node.js installed on your machine.
* A MongoDB database (Local or MongoDB Atlas).

### 1. Clone the Repository
```bash
git clone [https://github.com/Adityass0925/HouseRent.git](https://github.com/Adityass0925/HouseRent.git)
cd HouseRent
