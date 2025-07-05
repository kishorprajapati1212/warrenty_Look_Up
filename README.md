# 🔍 Warranty Lookup Website

A full-featured web application for customers and service agents to **search, validate, and manage warranty details** of products using serial numbers. This tool can be integrated with eCommerce platforms, repair centers, and B2B solutions.

---

## 🚀 Features

- ✅ **Serial Number Lookup** – Enter a product serial number to fetch warranty status
- 🧾 **Detailed Product Info** – View product name, purchase date, warranty expiry, and more
- 📤 **Upload Warranty Documents** – Admins can upload proof of purchase or warranty files
- 🔐 **Authentication (Optional)** – Secure access to admin panel
- 🧑‍💼 **Admin Dashboard** – Manage product warranty records
- 📦 **API Support** – Lookup via REST API for external systems
- 🖥️ **Responsive UI** – Fully responsive design for mobile and desktop

---

## ⚙️ Tech Stack

| Technology       | Description                        |
|------------------|------------------------------------|
| React / Vite     | Frontend with fast dev experience  |
| Node.js / Express| REST API backend                   |
| MongoDB          | Warranty records database          |
| Mongoose         | MongoDB ODM                        |
| Axios            | API calls                          |

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/warranty-lookup.git
cd warranty-lookup

# Install frontend dependencies
cd user
npm install

# Install backend dependencies
cd ../server
npm install
