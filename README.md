# 🌍 Wanderlust

> A full-stack travel accommodation platform built with Node.js, Express, and MongoDB

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## 📋 Overview

Wanderlust is a travel accommodation platform inspired by Airbnb. Users can browse properties, create listings, leave reviews, and manage bookings. The platform features secure authentication, image upload, and interactive maps.

## ✨ Features

- **🏠 Property Management**: Create, edit, and delete accommodation listings
- **👤 User Authentication**: Secure login/signup with Passport.js
- **⭐ Review System**: Rate and review properties (1-5 stars)
- **📸 Image Upload**: Cloudinary integration for property photos
- **🗺️ Interactive Maps**: MapBox integration for property locations
- **🔒 Authorization**: Owner-based permissions for listings
- **📱 Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

**Backend:**

- Node.js & Express.js
- MongoDB with Mongoose
- Passport.js (Authentication)
- Joi (Validation)

**Frontend:**

- EJS Templates
- Bootstrap CSS
- JavaScript

**Cloud Services:**

- Cloudinary (Image Storage)
- MapBox (Maps & Geocoding)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB
- Cloudinary account
- MapBox account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd MegaProject
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file:

   ```env
   NODE_ENV=development
   MONGO_URL=mongodb://127.0.0.1:27017/wanderlust
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAPBOX_TOKEN=your_mapbox_token
   SESSION_SECRET=your_session_secret
   ```

4. **Start the application**

   ```bash
   node app.js
   ```

5. **Access the app**
   Open `http://localhost:8080` in your browser

## 📁 Project Structure

```
MegaProject/
├── models/           # Database schemas (User, Listing, Review)
├── routes/           # API routes
├── controllers/      # Business logic
├── views/            # EJS templates
├── public/           # Static assets
├── middleware.js     # Custom middleware
├── cloudConfig.js    # Cloudinary setup
└── app.js            # Main application file
```

## 🌐 API Endpoints

### Listings

- `GET /listings` - View all listings
- `POST /listings` - Create listing (auth required)
- `GET /listings/:id` - View single listing
- `PUT /listings/:id` - Update listing (owner only)
- `DELETE /listings/:id` - Delete listing (owner only)

### Reviews

- `POST /listings/:id/reviews` - Add review (auth required)
- `DELETE /listings/:id/reviews/:reviewId` - Delete review (author only)

### Authentication

- `GET /signup` - Registration form
- `POST /signup` - Register user
- `GET /login` - Login form
- `POST /login` - Authenticate user
- `POST /logout` - Logout user

## 🔐 Security Features

- Password hashing with passport-local-mongoose
- Session-based authentication
- Input validation with Joi
- CSRF protection
- Authorization middleware

## 🚀 Deployment

The app can be deployed on platforms like:

- Heroku
- Vercel
- DigitalOcean
- AWS

Set environment variables and ensure MongoDB Atlas connection for production.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Vishnu Kant**

---

_Happy traveling! 🧳✈️_
