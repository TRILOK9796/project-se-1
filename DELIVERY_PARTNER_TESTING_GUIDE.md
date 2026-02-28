# Delivery Partner System - Quick Test Guide

## 🚀 Quick Setup & Testing

### Prerequisites
- Backend running on `http://localhost:5000`
- Frontend running on `http://localhost:3000`
- Database connected
- At least 1 Farmer account created with products
- At least 1 Consumer account created

---

## 📝 Test Scenario

### Step 1: Consumer Places Order
1. Login as Consumer
2. Go to Products page
3. Add items to cart (any farmer's products)
4. Proceed to checkout
5. Fill delivery address
6. Select payment method
7. Click "Place Order"
✅ **Expected**: Order created, product quantity decreased

### Step 2: Delivery Partner Checks Available Orders
1. Login as Delivery Partner
2. Go to Delivery Dashboard
3. Click "📦 Available Orders" tab
✅ **Expected**: See the order placed by consumer
- Order number visible
- Pickup location (Farmer) with phone number
- Delivery location (Consumer) with full address
- Order total and delivery charge

### Step 3: Delivery Partner Accepts Order
1. Still on Available Orders
2. Click "Accept Order" button
✅ **Expected**:
- Order disappears from available list
- Success message appears
- Order now appears in "🚚 My Orders" tab

### Step 4: Delivery Partner Updates Status (with different partner)
1. (Optional) Login as different delivery partner
2. Try to see available orders
✅ **Expected**: The accepted order should NOT appear in their available orders

### Step 5: Delivery Partner Tracks Delivery
1. Login as original delivery partner
2. Click "🚚 My Orders" tab
3. See the accepted order
4. Click "Mark as Picked Up"
✅ **Expected**: Status changes to "Picked Up"

5. Click "Mark as In Transit"
✅ **Expected**: Status changes to "In Transit"

6. Click "Mark as Delivered"
✅ **Expected**: 
- Status changes to "Delivered"
- Order moves to "Completed" tab
- Earnings added to account

### Step 6: Check Delivery Partner Earnings
1. Click "💰 Earnings" tab
2. Select different periods (Today, This Week, This Month, All)
✅ **Expected**: 
- Total earnings updated with delivery charge
- Completed deliveries count increased
- Order shows in recent orders table
- Pending earnings decreases

### Step 7: Farmer Checks Inventory
1. Login as Farmer (who sold the product)
2. Go to Farmer Dashboard
3. Click "📦 Inventory" tab
✅ **Expected**:
- Product list shows decreased quantity
- Product status indicator shows (In Stock/Low Stock/Out of Stock)
- Can see how many items sold

### Step 8: Check Product Removed if Out of Stock
1. As Consumer, place another order for same product
2. Repeat steps until quantity becomes 0
✅ **Expected**:
- When quantity = 0, product marked as inactive
- Product no longer appears in products listing
- But farmer can still see it in inventory view

---

## 🧪 API Testing (Using Postman/Thunder Client)

### Available Orders
```
GET http://localhost:5000/api/v1/orders/available/orders
Headers: Authorization: Bearer {delivery_partner_token}
```

### Accept Order
```
POST http://localhost:5000/api/v1/orders/{orderId}/accept
Headers: Authorization: Bearer {delivery_partner_token}
Body: {} (empty)
```

### My Orders
```
GET http://localhost:5000/api/v1/orders/delivery/my-orders?status=active
Headers: Authorization: Bearer {delivery_partner_token}
```

### Update Delivery Status
```
PUT http://localhost:5000/api/v1/orders/{orderId}/delivery-status
Headers: Authorization: Bearer {delivery_partner_token}
Body: {
  "order_status": "picked_up"
}
```

### Get Earnings
```
GET http://localhost:5000/api/v1/orders/delivery/earnings?period=today
Headers: Authorization: Bearer {delivery_partner_token}
```

### Get Inventory Status
```
GET http://localhost:5000/api/v1/products/inventory/status
Headers: Authorization: Bearer {farmer_token}
```

---

## ✅ Verification Checklist

- [ ] Consumer can place order
- [ ] Product quantity decreases after order
- [ ] Order appears in Available Orders
- [ ] Delivery partner can accept order
- [ ] Order disappears from other partners' lists
- [ ] Status updates work (picked up → in transit → delivered)
- [ ] Earnings are calculated correctly
- [ ] Inventory shows correct status indicators
- [ ] Products with 0 quantity are hidden
- [ ] Period-based earnings filter works
- [ ] Order history shows correct information

---

## 🔍 Common Issues & Solutions

### Issue: Available Orders not showing
**Solution**: 
- Check if order status is 'pending'
- Check if delivery_partner_id is null
- Check database directly

### Issue: Orders showing after acceptance
**Solution**:
- Refresh the page
- Check if delivery_partner_id was set
- Check browser console for errors

### Issue: Earnings not updating
**Solution**:
- Ensure order status is 'delivered'
- Check if earnings.total is updating
- Verify timestamps are correct

### Issue: Product still shows when quantity is 0
**Solution**:
- Run cleanup endpoint: POST /api/v1/products/cleanup/zero-quantity
- Or manually check is_active field in database
- Refresh product list page

---

## 📊 Sample Data for Testing

### Create Test Farmer Product
```json
{
  "name": "Fresh Tomatoes",
  "description": "Organic red tomatoes",
  "category": "Vegetables",
  "price": 40,
  "unit": "kg",
  "weight": 1,
  "weight_unit": "kg",
  "quality": "premium",
  "quantity_available": 10,
  "image_url": "https://via.placeholder.com/200"
}
```

### Create Test Order
```json
{
  "cartItems": [
    {
      "product_id": "{product_id}",
      "quantity": 2
    }
  ],
  "payment_method": "cod",
  "delivery_address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "location": {
      "type": "Point",
      "coordinates": [72.8777, 19.0760]
    }
  }
}
```

---

## 🎯 Expected Behaviors

### Real-Time Updates
- ✅ Available orders update instantly
- ✅ Status changes reflect immediately
- ✅ Earnings are calculated on delivery
- ✅ Inventory updates after order

### Data Integrity
- ✅ No double-counting of quantity
- ✅ No double-booking of orders
- ✅ Accurate earning calculations
- ✅ Proper tracking history

### User Experience
- ✅ Clean, intuitive interface
- ✅ Clear status indicators
- ✅ Easy order acceptance
- ✅ Real-time notifications

---

## 🚀 You're All Set!

The system is ready for testing. Follow the test scenario above to verify all features work correctly.

Happy testing! 🎉
