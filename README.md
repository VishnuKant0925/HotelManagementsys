# 🌍 Wanderlust

> A full-stack travel accommodation platform built with Node.js, Express, and MongoDB

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat&logo=bootstrap&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## 📋 Overview

Wanderlust is a comprehensive travel accommodation platform inspired by Airbnb. Users can browse properties, create detailed listings, leave reviews, and discover accommodations through advanced search functionality. The platform features secure authentication, cloud-based image upload, interactive maps, and a modern responsive design.

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[EJS Templates] --> B[Bootstrap UI]
        B --> C[Interactive Maps]
        C --> D[Search Interface]
        D --> E[User Dashboard]
    end

    subgraph "Backend Layer"
        F[Express.js Server] --> G[Authentication Middleware]
        G --> H[Route Handlers]
        H --> I[Controllers]
        I --> J[Validation Layer]
    end

    subgraph "Database Layer"
        K[(MongoDB)]
        K --> L[User Collection]
        K --> M[Listing Collection]
        K --> N[Review Collection]
        M --> O[Text Indexes]
        M --> P[Geospatial Indexes]
    end

    subgraph "External Services"
        Q[Cloudinary API]
        R[MapBox API]
        S[Session Store]
    end

    A --> F
    I --> K
    I --> Q
    I --> R
    F --> S

    style A fill:#e1f5fe
    style F fill:#f3e5f5
    style K fill:#e8f5e8
    style Q fill:#fff3e0
```

## 🔄 Data Flow Diagram

```mermaid
flowchart LR
    subgraph "User Actions"
        A[User Login] --> B[Browse Listings]
        B --> C[Search Properties]
        C --> D[View Details]
        D --> E[Create Review]
        A --> F[Create Listing]
        F --> G[Upload Images]
    end

    subgraph "Search System"
        H[Search Query] --> I{Text Index Available?}
        I -->|Yes| J[MongoDB Text Search]
        I -->|No| K[Regex Search]
        J --> L[Score Results]
        K --> M[Partial Match]
        L --> N[Return Results]
        M --> N
    end

    subgraph "Authentication Flow"
        O[Login Request] --> P[Passport.js]
        P --> Q[Session Creation]
        Q --> R[Access Control]
    end

    subgraph "Image Processing"
        S[Image Upload] --> T[Multer Processing]
        T --> U[Cloudinary Upload]
        U --> V[URL Generation]
        V --> W[Database Storage]
    end

    C --> H
    G --> S
    A --> O

    style H fill:#ffeb3b
    style O fill:#4caf50
    style S fill:#ff9800
```

## 👤 User Journey

```mermaid
journey
    title User Experience Journey
    section Discovery
      Visit Homepage: 5: User
      Browse Listings: 4: User
      Use Search: 5: User
      View Property Details: 4: User
    section Engagement
      Sign Up/Login: 3: User
      Create Listing: 5: User
      Upload Photos: 4: User
      Add Location: 4: User
    section Interaction
      Leave Review: 5: User
      Rate Property: 4: User
      View on Map: 5: User
      Contact Owner: 3: User
    section Management
      Edit Listing: 4: Owner
      Delete Listing: 2: Owner
      Manage Reviews: 3: Owner
```

## 🗄️ Database Schema

```mermaid
erDiagram
    USER ||--o{ LISTING : creates
    USER ||--o{ REVIEW : writes
    LISTING ||--o{ REVIEW : receives

    USER {
        ObjectId _id PK
        string username
        string email
        string password_hash
        date created_at
    }

    LISTING {
        ObjectId _id PK
        string title
        string description
        object image
        number price
        string location
        string country
        object geometry
        ObjectId owner_id FK
        date created_at
    }

    REVIEW {
        ObjectId _id PK
        number rating
        string comment
        ObjectId author_id FK
        ObjectId listing_id FK
        date created_at
    }
```

## ✨ Features

### Core Functionality

- **🏠 Property Management**: Create, edit, and delete accommodation listings with detailed information
- **👤 User Authentication**: Secure login/signup system with session management using Passport.js
- **⭐ Review System**: Rate and review properties with 1-5 star ratings and detailed comments
- **🔍 Advanced Search**: Comprehensive search functionality with text indexing and partial matching
- **📸 Image Upload**: Cloud-based image storage and management with Cloudinary integration
- **🗺️ Interactive Maps**: MapBox integration for property locations with geocoding

### User Experience

- **🔒 Authorization**: Role-based permissions (owners can manage their listings)
- **📱 Responsive Design**: Fully mobile-friendly interface with Bootstrap
- **💡 Quick Search Suggestions**: Smart search suggestions with property icons
- **🌟 Property Discovery**: Browse properties with filtering and sorting options
- **📍 Location Services**: Automatic geocoding and map integration for all listings

## 🛠️ Tech Stack

**Backend:**

- Node.js (v16+) & Express.js (v5.1.0)
- MongoDB with Mongoose (v8.16.0)
- Passport.js (Authentication & Authorization)
- Joi (Schema Validation)
- Express Session & Connect Flash
- Method Override & Cookie Parser

**Frontend:**

- EJS Templates with EJS-Mate
- Bootstrap CSS Framework
- Font Awesome Icons
- Vanilla JavaScript
- Responsive Web Design

**Cloud Services:**

- Cloudinary (Image Storage & Management)
- MapBox SDK (Maps, Geocoding & Location Services)

**File Upload:**

- Multer with Cloudinary Storage
- Image optimization and cloud delivery

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB
- Cloudinary account
- MapBox account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/VishnuKant0925/HotelManagementsys.git
   cd MegaProject
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   NODE_ENV=development
   MONGO_URL=mongodb://127.0.0.1:27017/wanderlust
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_access_token
   SESSION_SECRET=your_secure_session_secret
   ```

   > **Note**: For production, use MongoDB Atlas connection string and set NODE_ENV=production

4. **Start the application**

   ```bash
   node app.js
   ```

5. **Access the app**
   Open `http://localhost:8080` in your browser

## 📁 Project Structure

```
MegaProject/
├── 📁 models/              # MongoDB schemas and database models
│   ├── listing.js          # Listing model with text indexes for search
│   ├── review.js           # Review model for ratings and comments
│   └── user.js             # User model with authentication
├── 📁 routes/              # Express route handlers
│   ├── listing.js          # Listing routes including search endpoint
│   ├── review.js           # Review management routes
│   └── user.js             # Authentication routes
├── 📁 controllers/         # Business logic and request handlers
│   ├── listings.js         # Listing CRUD operations and search functionality
│   ├── reviews.js          # Review management logic
│   └── users.js            # User authentication and management
├── 📁 views/               # EJS templates and partials
│   ├── includes/           # Reusable components (navbar, footer, flash)
│   ├── layouts/            # Page layouts and boilerplate
│   ├── listings/           # Listing-related views (index, show, search, etc.)
│   └── users/              # Authentication forms
├── 📁 public/              # Static assets
│   ├── css/                # Custom stylesheets
│   ├── js/                 # Client-side JavaScript
│   └── images/             # Static images and assets
├── 📁 utils/               # Utility functions and helpers
├── 📁 init/                # Database initialization and sample data
├── middleware.js           # Custom authentication and validation middleware
├── cloudConfig.js          # Cloudinary configuration and setup
├── schema.js               # Joi validation schemas
└── app.js                  # Main Express application and server setup
```

## 🌐 API Endpoints

### Listings Management

- `GET /listings` - View all listings with pagination
- `GET /listings/search?q={query}` - **Search listings** by title, location, country, or description
- `GET /listings/new` - New listing form (auth required)
- `POST /listings` - Create new listing (auth required)
- `GET /listings/:id` - View single listing with reviews and map
- `GET /listings/:id/edit` - Edit listing form (owner only)
- `PUT /listings/:id` - Update listing (owner only)
- `DELETE /listings/:id` - Delete listing (owner only)

### Reviews System

- `POST /listings/:id/reviews` - Add review to listing (auth required)
- `DELETE /listings/:id/reviews/:reviewId` - Delete review (author/owner only)

### User Authentication

- `GET /signup` - User registration form
- `POST /signup` - Register new user
- `GET /login` - User login form
- `POST /login` - Authenticate user
- `POST /logout` - User logout

### Search Features

- **Text Search**: MongoDB text indexing for fast, relevant results
- **Partial Matching**: Fallback regex search for broader results
- **Multi-field Search**: Searches across title, location, country, and description
- **Search Suggestions**: Quick access to popular destinations

## 🔐 Security Features

- **Password Security**: Automatic hashing and salting with passport-local-mongoose
- **Session Management**: Secure session-based authentication with Express Session
- **Input Validation**: Comprehensive server-side validation using Joi schemas
- **Authorization Middleware**: Role-based access control for listings and reviews
- **Environment Protection**: Secure environment variable management with dotenv
- **File Upload Security**: Cloudinary integration with secure upload policies
- **Flash Messages**: User feedback system for errors and success notifications

## 🔧 Development Workflow

```mermaid
graph TD
    A[📋 Planning] --> B[🔧 Setup Environment]
    B --> C[⚡ Feature Development]
    C --> D[🧪 Testing]
    D --> E[📝 Code Review]
    E --> F[🚀 Deployment]
    F --> G[📊 Monitoring]
    G --> H[🔄 Iteration]
    H --> C

    subgraph "Development Cycle"
        C --> C1[🔐 Authentication Features]
        C --> C2[🏠 Property Management]
        C --> C3[🔍 Search Implementation]
        C --> C4[🗺️ Maps Integration]
        C --> C5[📸 Image Upload]
    end

    subgraph "Quality Assurance"
        D --> D1[⚡ Unit Tests]
        D --> D2[🔗 Integration Tests]
        D --> D3[🎯 E2E Tests]
        D --> D4[🛡️ Security Tests]
    end

    subgraph "Deployment Pipeline"
        F --> F1[🏗️ Build Process]
        F --> F2[🌍 Staging Deploy]
        F --> F3[✅ QA Validation]
        F --> F4[🚀 Production Deploy]
    end

    style A fill:#e3f2fd
    style C fill:#f3e5f5
    style D fill:#e8f5e8
    style F fill:#fff3e0
```

## 🏗️ Project Development Timeline

```mermaid
timeline
    title Wanderlust Development Journey

    section Foundation
        Week 1-2 : Project Setup
                 : MongoDB Setup
                 : Express Configuration
                 : Basic Routing

    section Core Features
        Week 3-4 : User Authentication
                 : Passport.js Integration
                 : Session Management
                 : Security Implementation

        Week 5-6 : Property Management
                 : CRUD Operations
                 : Database Models
                 : Form Validation

    section Advanced Features
        Week 7-8 : Image Upload System
                 : Cloudinary Integration
                 : File Processing
                 : Storage Optimization

        Week 9-10 : Search Functionality
                  : Text Indexing
                  : Search Algorithms
                  : Result Optimization

    section Integration
        Week 11-12 : Maps Integration
                   : MapBox Setup
                   : Geocoding Service
                   : Interactive Features

        Week 13-14 : Testing & Deployment
                   : Quality Assurance
                   : Performance Optimization
                   : Production Deployment
```

### 🎯 Development Methodology

**� Agile Development Process**

- **Sprint Planning**: 2-week sprints with defined goals
- **Daily Standups**: Progress tracking and blocker resolution
- **Sprint Reviews**: Feature demonstrations and feedback
- **Retrospectives**: Continuous improvement and learning

**�️ Technical Practices**

- **Test-Driven Development (TDD)**: Write tests before implementation
- **Continuous Integration**: Automated testing on every commit
- **Code Reviews**: Peer review for quality assurance
- **Documentation First**: Comprehensive documentation for all features

**📊 Quality Metrics**

- **Code Coverage**: Maintain >90% test coverage
- **Performance**: Response times <200ms for API calls
- **Security**: Regular security audits and vulnerability scanning
- **Accessibility**: WCAG 2.1 AA compliance for all user interfaces

## 🚀 Deployment Architecture

```mermaid
graph TB
    subgraph "Development"
        A[Local Development] --> B[Git Repository]
        B --> C[GitHub Actions]
    end

    subgraph "Production Environment"
        D[Web Server<br/>Heroku/Railway] --> E[Application<br/>Node.js + Express]
        E --> F[(Database<br/>MongoDB Atlas)]
        E --> G[File Storage<br/>Cloudinary]
        E --> H[Maps Service<br/>MapBox]
    end

    subgraph "User Access"
        I[Web Browser] --> J[CDN/Load Balancer]
        J --> D
    end

    subgraph "Monitoring"
        K[Error Tracking]
        L[Performance Monitoring]
        M[Database Monitoring]
    end

    C --> D
    D --> K
    E --> L
    F --> M

    style D fill:#4caf50
    style F fill:#ff9800
    style G fill:#2196f3
    style H fill:#9c27b0
```

## 🚀 Deployment

### Recommended Platforms

- **Heroku** - Easy deployment with MongoDB Atlas
- **Railway** - Modern hosting with automatic deployments
- **DigitalOcean App Platform** - Scalable cloud hosting
- **AWS EC2** - Full control with custom configuration
- **Vercel** - Serverless deployment (with adaptations)

### Production Setup

1. **Database**: Use MongoDB Atlas for cloud database
2. **Environment Variables**: Set all required env vars in your hosting platform
3. **Image Storage**: Configure Cloudinary for production image handling
4. **Maps**: Set up MapBox production tokens with appropriate restrictions
5. **Session Store**: Consider Redis for session storage in production

### Environment Variables for Production

```env
NODE_ENV=production
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust
CLOUD_NAME=your_production_cloudinary_name
CLOUD_API_KEY=your_production_api_key
CLOUD_API_SECRET=your_production_api_secret
MAP_TOKEN=your_production_mapbox_token
SESSION_SECRET=your_secure_random_session_secret
```

## 🎯 Key Features Explained

### Advanced Search System

- **MongoDB Text Indexing**: Fast, relevance-scored search across multiple fields
- **Fallback Regex Search**: Ensures results even when text indexes aren't available
- **Partial Matching**: Smart word-based matching for broader result coverage
- **Search Suggestions**: Quick access to popular destinations and property types

### Image Management

- **Cloud Storage**: All images stored securely on Cloudinary
- **Automatic Optimization**: Images automatically resized and optimized for web
- **Secure Upload**: File validation and secure upload handling with Multer

### Location Services

- **Geocoding**: Automatic coordinate generation from location names
- **Interactive Maps**: MapBox integration with custom markers and popups
- **Location Validation**: Ensures all listings have valid geographic coordinates

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**

   ```bash
   git fork https://github.com/VishnuKant0925/HotelManagementsys.git
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes and commit**

   ```bash
   git commit -m 'Add: amazing new feature with detailed description'
   ```

4. **Push to your branch**

   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**
   - Provide a clear description of your changes
   - Include screenshots for UI changes
   - Reference any related issues

### Development Guidelines

- Follow existing code style and structure
- Add comments for complex logic
- Test your changes locally before submitting
- Update documentation if needed

## 🐛 Known Issues & Future Enhancements

### Current Limitations

- Search results pagination (planned for future release)
- Advanced filtering options (price range, amenities)
- Real-time booking system
- Email notifications for bookings

### Planned Features

- **Booking System**: Complete reservation management
- **Payment Integration**: Secure payment processing
- **Advanced Filters**: Price, amenities, and availability filtering
- **User Profiles**: Enhanced user dashboard with booking history
- **Mobile App**: React Native mobile application

## 🛠️ Troubleshooting

### Common Issues

**MongoDB Connection Issues:**

```bash
# Ensure MongoDB is running locally
mongod --dbpath /path/to/your/data/directory
```

**Environment Variables Not Loading:**

```bash
# Check if .env file exists in root directory
# Verify all required variables are set
# Restart the application after changes
```

**Image Upload Failures:**

- Verify Cloudinary credentials in .env file
- Check internet connection for cloud uploads
- Ensure file size limits are appropriate

**MapBox Integration Issues:**

- Verify MAP_TOKEN is correctly set
- Check MapBox account usage limits
- Ensure token has appropriate permissions

## 📊 Performance Optimizations

- **Database Indexing**: Text and regular indexes for fast search queries
- **Image Optimization**: Cloudinary automatic image optimization
- **Session Management**: Efficient session handling with Express Session
- **Caching**: Browser caching for static assets
- **Code Splitting**: Modular architecture for better maintainability

## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vishnu Kant**  
🐙 GitHub: [@VishnuKant0925](https://github.com/VishnuKant0925)  
📧 Contact: Available on GitHub profile

## 🙏 Acknowledgments

- **MapBox** for excellent mapping and geocoding services
- **Cloudinary** for reliable image storage and optimization
- **MongoDB** for flexible and scalable database solutions
- **Bootstrap** for responsive design components
- **Express.js Community** for comprehensive documentation and support

---

## 📸 Screenshots

### Home Page

_Browse all available properties with search functionality_

### Property Details

_Detailed property view with reviews, maps, and booking options_

### Search Results

_Advanced search with relevant results and filters_

---

**🌟 Star this repository if you found it helpful!**

_Happy traveling and coding! 🧳✈️💻_
