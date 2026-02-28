# 🚀 Quick Start Testing Guide

## Prerequisites
- Node.js installed
- MongoDB running locally or cloud connection
- `.env` files configured in both backend and frontend

## Starting the Application

### 1. Start Backend Server

```bash
cd backend
npm install  # If not done already
npm start
```

You should see:
```
🚀 FreshFarm Backend running on port 5000
Environment: development
```

### 2. Start Frontend Development Server

```bash
cd frontend
npm install  # If not done already
npm start
```

Browser will open at `http://localhost:3000`

---

## 🧪 Complete Testing Flow

### Step 1: Register as Farmer

1. Navigate to Login page
2. Click "Don't have account?" → Register
3. Fill farmer details:
   - **Name:** John Farmer
   - **Email:** farmer@example.com
   - **Phone:** 9876543210
   - **Password:** Farmer@123
   - **User Type:** Farmer
   - **Farm Name:** Green Valley Farm
   - **Farm Location:** Set to your area
   - **Address:** Street, City, State, Pincode

4. Click Register
5. You'll be redirected to dashboard

### Step 2: Add Products as Farmer

1. From Farmer Dashboard, click **"Add Product"** button
2. Fill first product:
   - **Name:** Fresh Tomatoes
   - **Description:** Organic red tomatoes, freshly harvested
   - **Category:** Vegetables
   - **Price:** 60
   - **Unit:** kg
   - **Weight:** 1
   - **Weight Unit:** kg
   - **Quality:** premium
   - **Specifications:** Size: Large, Color: Bright Red, Freshness: 2 days old
   - **Quantity Available:** 100
   - **Organic:** ✓ Check
   - **Upload Image:** Select a vegetable image
   - **Tags:** fresh,premium,local

3. Click **"Add Product"** → Success!

4. Repeat for more products:
   - **Fresh Lettuce** (Vegetables, 40/kg, 2kg, standard)
   - **Organic Carrots** (Vegetables, 30/kg, 5kg, economy)
   - **Fresh Milk** (Dairy, 50/liter, 1 liter, premium)

5. Go back to Dashboard → See all products listed with stats

---

### Step 3: Register as Customer

1. Logout from farmer account
2. Click "Register"
3. Fill customer details:
   - **Name:** Rajesh Kumar
   - **Email:** customer@example.com
   - **Phone:** 9123456789
   - **Password:** Customer@123
   - **User Type:** Consumer

4. Click Register

---

### Step 4: Browse Products

1. Navigate to **"Products"** page
2. You'll see all products with:
   - Product images
   - Names, weights, quality
   - Prices and ratings
   - Farmer information

3. Test **Category Filter:**
   - Click "Vegetables" → Shows only vegetables
   - Click "Fruits" → Shows only fruits
   - Click "All Categories" → Shows all

4. Test **Search:**
   - Type "Tomato" → Filters results
   - Type "Fresh" → Shows matching products

---

### Step 5: Add Items to Cart

1. Click a product card (e.g., Fresh Tomatoes)
2. You'll see product details
3. **Quantity Selector:** 
   - Shows available quantity (max 100)
   - Enter quantity: 5
4. Click **"Add to Cart"** button
5. Success alert → "Added to cart!"
6. Notice cart count increases at top

7. Add more items:
   - Fresh Lettuce (quantity: 3)
   - Fresh Milk (quantity: 2)

---

### Step 6: View Shopping Cart

1. Click **"Cart"** in navigation or checkout button
2. See all cart items:
   - Product images and names
   - Price per unit, quantity
   - Quantity controls (-, number input, +)
   - Remove buttons
   - Item totals

3. See Order Summary:
   - **Subtotal:** Sum of all items
   - **Tax (5%):** Calculated tax
   - **Delivery Charge:** ₹50 (or based on distance)
   - **Grand Total:** Final amount

4. Test quantity update:
   - Click + button for Tomatoes
   - See total update immediately
   - localStorage persists changes

---

### Step 7: Checkout Process

1. Click **"Proceed to Checkout"**
2. Fill **Delivery Address:**
   - **Street:** 123 Main Street
   - **City:** Mumbai
   - **State:** Maharashtra
   - **Pincode:** 400001

3. Select **Payment Method:**
   - Cash on Delivery (Default)
   - Or try UPI / Card options

4. Add optional **Special Instructions:**
   - "Ring bell twice"

5. Review **Order Summary** on right:
   - All items listed
   - Prices breakdown
   - Total amount

6. Click **"Place Order"** button
7. **Success!** ✅ Order created
   - Confirmation screen shown
   - Auto-redirect to orders page in 3 seconds

---

### Step 8: Track Order

1. Auto-redirected to **Orders Tracking Page**
2. See your new order in the list:
   - Order number (ORD-xxxxx-xxxxx)
   - Total amount
   - Current status badge

3. Click order to view details:
   - **Order Timeline:**
     - ✓ Order Pending
     - ✓ Confirmed (after farmer accepts)
     - ✓ Assigned (delivery partner assigned)
     - (More statuses as order progresses)
   
4. See **Order Items:**
   - Each item with quantity and price
   
5. See **Delivery Address:**
   - Your delivery location
   
6. See **Price Breakdown:**
   - Subtotal, tax, delivery charge, total

---

### Step 9: Verify Farmer Dashboard

1. Logout customer
2. Login as Farmer (farmer@example.com)
3. Go to **Farmer Dashboard**
4. See updated stats:
   - **Total Products:** Shows all added products
   - **Total Orders:** Should show 1 (the order you just placed)
   - **Pending Orders:** Shows 1
   - **Total Revenue:** Shows amount from delivered orders

5. See **Products Table:**
   - All your products listed
   - Quantity decreased for ordered items:
     - Tomatoes: 100 → 95 (5 ordered)
     - Lettuce: 200 → 197 (3 ordered)
     - Milk: 150 → 148 (2 ordered)

6. See **Recent Orders:**
   - Your customer's order listed
   - Status: pending or confirmed

---

## 🧪 Testing Key Features

### Test Inventory Management
1. Add product with quantity 10
2. Order 7 units
3. Check farmer dashboard → Quantity now 3
4. Try to add 15 more to cart → Error "Only 3 available"

### Test Delivery Partner Allocation
1. Place order with delivery address
2. Check order details
3. Delivery partner should be auto-assigned based on location

### Test Cart Persistence
1. Add items to cart
2. Refresh browser
3. Cart items still there (localStorage working)

### Test Error Handling
1. Try to add product without name → Validation error
2. Try invalid email → Error message
3. Place order with empty address → Validation error
4. Try accessing protected route without login → Redirect to login

### Test Search & Filter
1. Products page
2. Search for "fresh"
3. Filter by "Vegetables"
4. Combine search + filter

---

## 🔍 How to Verify Database Changes

### Using MongoDB Compass or CLI:

```bash
# Connect to your MongoDB
use freshfarm

# Check products
db.products.find()

# Check orders
db.orders.find()

# Check if quantity was updated
db.products.findOne({ name: "Fresh Tomatoes" })
# Should show quantity_available decreased
```

### Expected data structure:
```javascript
// Product document
{
  _id: ObjectId,
  farmer_id: ObjectId,
  name: "Fresh Tomatoes",
  weight: 1,
  weight_unit: "kg",
  quality: "premium",
  specifications: "Size: Large...",
  quantity_available: 95,  // Decreased after order
  quantity_sold: 5,        // Increased
  total_orders: 1,
  ...
}

// Order document
{
  _id: ObjectId,
  order_number: "ORD-xxxxx-xxxxx",
  consumer_id: ObjectId,
  farmer_id: ObjectId,
  items: [
    {
      product_id: ObjectId,
      product_name: "Fresh Tomatoes",
      quantity: 5,
      unit_price: 60,
      total_price: 300
    }
  ],
  order_status: "pending",
  delivery_partner_id: ObjectId,
  tracking_history: [
    { status: "pending", timestamp: Date }
  ],
  ...
}
```

---

## 🐛 Troubleshooting

### Backend Issues
```bash
# Check logs
npm start
# Look for connection messages and errors

# Clear dev database
# In MongoDB:
use freshfarm
db.dropDatabase()

# Restart server
npm start
```

### Frontend Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start

# Check browser console (F12)
# Look for API errors in Network tab
```

### API Not Working
1. Check backend is running on port 5000
2. Check `.env` has correct API URL: `REACT_APP_API_URL=http://localhost:5000/api/v1`
3. Check CORS is enabled in backend
4. Verify token is stored in localStorage

### Cart Not Showing Items
- Check browser's Application tab → localStorage
- Verify Redux store has cart items
- Check cartSlice reducer is properly dispatching actions

---

## ✅ Testing Checklist

- [ ] Farmer can register
- [ ] Farmer can add products with weight, quality, specifications
- [ ] Products appear on Products page with real data
- [ ] Customer can search products
- [ ] Customer can filter by category
- [ ] Customer can add items to cart with quantity
- [ ] Cart shows all product data
- [ ] Cart persists on page refresh
- [ ] Checkout form validates all fields
- [ ] Order is created successfully
- [ ] Inventory quantity is deducted
- [ ] Order appears in farmer dashboard
- [ ] Customer can track order with status timeline
- [ ] Delivery partner is assigned
- [ ] Error messages show properly
- [ ] All pages render with real data

---

## 📊 Sample Data to Test

**Farmer Products:**
```
1. Organic Tomatoes - ₹60/kg, 1kg, Premium
2. Green Lettuce - ₹40/kg, 2kg, Standard
3. Fresh Carrots - ₹30/kg, 5kg, Economy
4. A2 Milk - ₹50/liter, 1L, Premium
```

**Customer Order:**
```
- Tomatoes: 5 kg → ₹300
- Lettuce: 2 kg → ₹80
- Milk: 2L → ₹100
Subtotal: ₹480
Tax (5%): ₹24
Delivery: ₹50
Total: ₹554
```

---

## 🎉 Success!

If you can complete all steps above without errors, the system is **fully functional**!

---

**Happy Testing! 🚀**
