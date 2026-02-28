# FreshFarm - Quick Start Guide (Demo Mode)

## 🚀 Run Admin Dashboard WITHOUT Backend

The application now includes **Demo Mode** so you can see the completed admin dashboard **without needing to run the backend server**.

### Quick Start

```bash
# Navigate to frontend folder
cd frontend

# Start the development server
npm start
```

The app will automatically open at `http://localhost:3000`

### Access Admin Dashboard

1. The app starts in **Demo Mode** (automatically logged in as Admin user)
2. Click on any dashboard link or navigate to: `http://localhost:3000/dashboard/admin`
3. You'll see the **complete admin dashboard** with:
   - ✅ Live revenue trend chart (Line chart)
   - ✅ Order status distribution (Pie chart)  
   - ✅ Orders by category (Bar chart)
   - ✅ KPI cards with metrics
   - ✅ Multiple dashboard tabs
   - ✅ Mock data already populated

### Demo Features Available

- 📊 Analytics Dashboard with charts
- 👥 User Management section
- 📦 Order Management section  
- 📈 Analytics & Reports section
- 🎨 Beautiful Zepto/Zomato-style UI
- 📱 Fully responsive design

### What is Demo Mode?

Demo Mode is a development feature that:
- Auto-authenticates you as an admin user
- Pre-populates the dashboard with sample data
- Allows you to see the complete UI/UX without backend
- Shows how the dashboard will look with real data

### Switch to Production Mode (With Backend)

To connect to your real backend:

1. Open `frontend/src/redux/slices/authSlice.js`
2. Change line 3:
   ```javascript
   const DEMO_MODE = false;  // Change from true to false
   ```
3. Save and the app will require actual backend connection

### Backend Setup (Optional)

When you're ready to connect to the backend:

```bash
# Terminal 1 - Frontend
cd frontend
npm start

# Terminal 2 - Backend
cd backend
npm install
npm run dev
```

Backend will run on `http://localhost:5000`
Frontend will run on `http://localhost:3000`

### Demo Data Included

The admin dashboard comes with realistic mock data:
- **Revenue**: Monthly trends from Jan to Jun
- **Orders**: Status distribution (Pending, Confirmed, In Transit, Delivered)
- **Categories**: Performance metrics by product category
- **KPIs**: Users, Orders, Revenue, Active Deliveries

### Admin Dashboard Tabs

1. **Overview** (Default) - Main dashboard with all charts
2. **Orders** - Order management (placeholder for future implementation)
3. **Users** - User management (placeholder for future implementation)
4. **Analytics** - Detailed analytics (placeholder for future implementation)

### File Structure

```
frontend/
├── src/
│   ├── utils/
│   │   └── mockData.js          ← Sample data
│   ├── components/
│   │   └── DemoNotice.jsx       ← Demo mode banner
│   ├── redux/
│   │   └── slices/
│   │       └── authSlice.js    ← Demo mode toggle here
│   └── pages/
│       └── admin/
│           └── AdminDashboard.jsx
```

### Customizing Mock Data

To change the demo data:

1. Edit `frontend/src/utils/mockData.js`
2. Modify the arrays/objects
3. Charts will automatically update

Example:
```javascript
export const mockRevenueData = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 52000 },
  // Add more months...
];
```

### Troubleshooting

**Q: Admin dashboard shows "Page not found"?**
- A: Make sure you're logged in. Demo mode should auto-login. Check browser console for errors.

**Q: Charts not showing?**
- A: Make sure recharts is installed: `npm install recharts`

**Q: Want to see real data instead of mock?**
- A: Set `DEMO_MODE = false` and run the backend server.

### Next Steps

1. ✅ View the demo admin dashboard
2. Customize the mock data as needed
3. Connect to backend when ready
4. Implement API endpoints
5. Replace mock data with real API calls

---

**Enjoy exploring the FreshFarm Admin Dashboard! 🎉**
