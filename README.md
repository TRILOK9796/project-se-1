# FreshFarm - Direct to Consumer Delivery Platform

A modern, full-stack delivery platform connecting farmers directly with urban consumers. Built with React, Node.js, Express, MongoDB, and Tailwind CSS.

## 🌟 Features

### For Consumers
- ✅ Browse and search products from multiple farmers
- ✅ Add products to cart and checkout
- ✅ Real-time order tracking with live delivery tracking
- ✅ Rate and review products and sellers
- ✅ Multiple delivery address management
- ✅ Order history and receipt management

### For Farmers
- ✅ Product listing and inventory management
- ✅ Order management and tracking
- ✅ Revenue analytics and earnings tracking
- ✅ Customer ratings and reviews
- ✅ Delivery zone management
- ✅ Performance metrics dashboard

### For Delivery Partners
- ✅ View and accept delivery orders
- ✅ Route optimization and navigation
- ✅ Real-time location tracking
- ✅ Earnings management
- ✅ Performance metrics
- ✅ Customer and farmer ratings

### For Admin
- ✅ Complete platform analytics and KPIs
- ✅ Order and user management
- ✅ Revenue and performance tracking
- ✅ User verification and approval
- ✅ Dispute resolution
- ✅ Graphical reports and insights
- ✅ System configuration

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **React Icons** - Icon library
- **Socket.io Client** - Real-time updates

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Stripe/Razorpay** - Payment processing
- **Socket.io** - Real-time communication
- **AWS S3** - File storage

## 📁 Project Structure

```
project-se-1/
├── frontend/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   │   ├── auth/           # Authentication pages
│   │   │   ├── farmer/         # Farmer dashboard
│   │   │   ├── consumer/       # Consumer dashboard
│   │   │   ├── delivery/       # Delivery dashboard
│   │   │   └── admin/          # Admin dashboard
│   │   ├── redux/              # Redux slices
│   │   ├── hooks/              # Custom hooks
│   │   ├── utils/              # Utility functions
│   │   ├── styles/             # CSS files
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                    # Express backend
│   ├── src/
│   │   ├── config/            # Database & env config
│   │   ├── controllers/       # Business logic
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API endpoints
│   │   ├── middleware/        # Custom middleware
│   │   └── utils/             # Helper functions
│   ├── server.js
│   └── package.json
│
├── database/                  # Database scripts
│   └── seeding/               # Initial data seeding
│
├── docs/                      # Documentation
│   ├── SOFTWARE_REQUIREMENTS_SPECIFICATION.md
│   ├── DATA_FLOW_DIAGRAMS.md
│   └── DATABASE_SCHEMA_AND_RELATIONS.md
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js v14+
- npm or yarn
- MongoDB Atlas account
- Stripe/Razorpay account (for payments)
- AWS S3 bucket (for file storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/freshfarm.git
   cd freshfarm
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

The frontend will open at `http://localhost:3000` and backend runs on `http://localhost:5000`

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
MONGODB_DB_NAME=freshfarm
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_...
AWS_ACCESS_KEY_ID=...
AWS_S3_BUCKET=...
CORS_ORIGIN=http://localhost:3000
```

## 🔐 Authentication

The platform uses JWT (JSON Web Tokens) for authentication. Users can register as:
- **Consumer** - Buy fresh products
- **Farmer** - Sell products
- **Delivery Partner** - Deliver orders
- **Admin** - Manage platform

## 📊 Database Schema

The system uses MongoDB with the following main collections:

- **Users** - User accounts and authentication
- **Farmers** - Farmer profiles and details
- **Consumers** - Consumer profiles and addresses
- **DeliveryPartners** - Delivery partner details
- **Products** - Product catalog
- **Orders** - Order details and tracking
- **Payments** - Payment transactions
- **Reviews** - Ratings and reviews
- **Analytics** - Platform metrics

See `docs/DATABASE_SCHEMA_AND_RELATIONS.md` for detailed schema.

## 🎨 UI/UX

The platform features a modern, intuitive design with:
- **Color Palette**: Professional primary colors with Zepto/Zomato-inspired branding
- **Responsive Design**: Mobile-first approach
- **Interactive Components**: Smooth animations and transitions
- **Real-time Updates**: Live order tracking and notifications
- **Accessibility**: WCAG compliance

## 📈 Dashboard Features

### Consumer Dashboard
- Order history and tracking
- Saved farmers and favorites
- Address management
- Wallet and payment methods

### Farmer Dashboard
- Product management
- Order management
- Revenue analytics
- Customer ratings
- Performance metrics

### Delivery Dashboard
- Available orders
- Current deliveries
- Earnings tracking
- Performance metrics

### Admin Dashboard
- Platform analytics with charts
- User management
- Order management
- Revenue tracking
- System configuration

## 🔄 Real-time Features

- **Order Tracking** - Live updates on order status
- **Location Tracking** - Real-time delivery tracking
- **Notifications** - Push notifications for orders and updates
- **Chat** - Real-time communication (optional)

## 💳 Payment Integration

Integrated with:
- **Stripe** - International payments
- **Razorpay** - Indian payments
- **UPI** - Digital cash transfers
- **Wallet** - In-app wallet

## 📱 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user

(More endpoints will be documented in API documentation)

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📚 Documentation

- [Software Requirements Specification](docs/SOFTWARE_REQUIREMENTS_SPECIFICATION.md)
- [Data Flow Diagrams](docs/DATA_FLOW_DIAGRAMS.md)
- [Database Schema](docs/DATABASE_SCHEMA_AND_RELATIONS.md)
- [API Documentation](docs/API.md) - Coming soon

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Support

For support, email support@freshfarm.com or open an issue in the GitHub repository.

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] AI-powered recommendations
- [ ] Multi-language support
- [ ] Subscription plans
- [ ] API for third-party integrations
- [ ] Video KYC for farmers
- [ ] Carbon footprint tracking

---

**Built with ❤️ for connecting farmers and consumers**
