# 📚 API Documentation

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication
All protected endpoints require:
```
Authorization: Bearer {jwt_token}
```
Token is received from login/register endpoints and stored in localStorage.

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "phone": "9876543210",
  "password": "Password@123",
  "name": "John Doe",
  "user_type": "farmer"  // or "consumer" or "delivery_partner"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { "_id": "...", "email": "...", "name": "..." },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Errors:**
- 400: Missing required fields
- 400: Email or phone already registered
- 500: Server error

---

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password@123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "_id": "...", "email": "...", "name": "...", "user_type": "farmer" },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Errors:**
- 400: Email or password missing
- 401: Invalid email or password
- 500: Server error

---

### Get Current User
```http
GET /auth/current-user
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "user@example.com",
    "user_type": "farmer"
  }
}
```

---

### Logout
```http
POST /auth/logout
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## 🛒 Product Endpoints

### Add Product (Farmer Only)
```http
POST /products/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Fresh Tomatoes",
  "description": "Organic red tomatoes, freshly harvested",
  "category": "Vegetables",
  "price": 60,
  "unit": "kg",
  "weight": 1,
  "weight_unit": "kg",
  "quality": "premium",
  "specifications": "Size: Large, Color: Red, Freshness: 2 days old",
  "quantity_available": 100,
  "image_url": "https://example.com/tomato.jpg",
  "images": ["https://example.com/tomato1.jpg", "https://example.com/tomato2.jpg"],
  "is_organic": true,
  "is_seasonal": false,
  "harvest_date": "2024-02-20",
  "expiry_date": "2024-03-05",
  "tags": ["fresh", "premium", "local"]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Product added successfully",
  "data": {
    "_id": "60d5ec49f1b2c5a8b8e7c1a0",
    "farmer_id": "60d5ec49f1b2c5a8b8e7c1a1",
    "name": "Fresh Tomatoes",
    "price": 60,
    "quantity_available": 100,
    "rating": 0,
    "created_at": "2024-02-20T10:30:00Z"
  }
}
```

**Validation Errors:**
- 400: Missing required fields (name, description, price, weight, quantity_available, image_url)
- 404: Farmer profile not found
- 500: Server error

---

### Get All Products (Public)
```http
GET /products/all?category=Vegetables&search=tomato&page=1&limit=12
```

**Query Parameters:**
- `category` (optional): "Vegetables" | "Fruits" | "Dairy" | "Grains" | "Herbs" | "Other"
- `search` (optional): Search by product name or description
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)

**Response (200):**
```json
{
  "success": true,
  "count": 12,
  "total": 45,
  "pages": 4,
  "currentPage": 1,
  "data": [
    {
      "_id": "60d5ec49f1b2c5a8b8e7c1a0",
      "name": "Fresh Tomatoes",
      "category": "Vegetables",
      "price": 60,
      "weight": 1,
      "weight_unit": "kg",
      "quality": "premium",
      "specifications": "Size: Large...",
      "quantity_available": 100,
      "rating": 4.5,
      "total_reviews": 12,
      "image_url": "...",
      "farmer_id": {
        "_id": "...",
        "farm_name": "Green Valley Farm",
        "avg_rating": 4.7,
        "address": { "city": "Mumbai", "state": "Maharashtra" }
      }
    }
  ]
}
```

---

### Get Single Product (Public)
```http
GET /products/{productId}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c5a8b8e7c1a0",
    "name": "Fresh Tomatoes",
    "description": "Organic red tomatoes...",
    "category": "Vegetables",
    "price": 60,
    "unit": "kg",
    "weight": 1,
    "weight_unit": "kg",
    "quality": "premium",
    "specifications": "Size: Large, Color: Red",
    "quantity_available": 100,
    "quantity_sold": 50,
    "rating": 4.5,
    "total_reviews": 12,
    "image_url": "...",
    "images": ["...", "..."],
    "is_organic": true,
    "farmer_id": {
      "_id": "...",
      "farm_name": "Green Valley Farm",
      "avg_rating": 4.7,
      "address": { ... }
    }
  }
}
```

**Errors:**
- 404: Product not found
- 500: Server error

---

### Get Farmer's Products (Public)
```http
GET /products/farmer/{farmerId}
```

**Response (200):**
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "_id": "60d5ec49f1b2c5a8b8e7c1a0",
      "name": "Fresh Tomatoes",
      "category": "Vegetables",
      "price": 60,
      ...
    }
  ]
}
```

---

### Update Product (Farmer Only)
```http
PUT /products/{productId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Fresh Tomatoes (Updated)",
  "price": 70,
  "quantity_available": 90,
  "weight": 1.5,
  "weight_unit": "kg",
  "quality": "standard",
  "specifications": "Updated specifications",
  "image_url": "...",
  "images": ["...", "..."],
  "is_active": true
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": { ... }
}
```

**Errors:**
- 403: Not authorized (not the farmer who created product)
- 404: Product not found
- 500: Server error

---

### Delete Product (Farmer Only)
```http
DELETE /products/{productId}
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

**Note:** Soft delete - sets is_active to false

---

## 📦 Order Endpoints

### Create Order
```http
POST /orders/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "cartItems": [
    {
      "product_id": "60d5ec49f1b2c5a8b8e7c1a0",
      "quantity": 5
    },
    {
      "product_id": "60d5ec49f1b2c5a8b8e7c1a1",
      "quantity": 3
    }
  ],
  "payment_method": "cod",          // or "upi", "card"
  "delivery_address": {
    "street": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "location": {
      "type": "Point",
      "coordinates": [72.8777, 19.0760]
    }
  },
  "notes": "Ring the bell twice",
  "deliveryLocation": {
    "coordinates": [72.8777, 19.0760]
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Orders created successfully",
  "data": {
    "orders": [
      {
        "_id": "60d5ec49f1b2c5a8b8e7c1a2",
        "order_number": "ORD-12345678-abcde",
        "consumer_id": "60d5ec49f1b2c5a8b8e7c1a3",
        "farmer_id": "60d5ec49f1b2c5a8b8e7c1a4",
        "items": [
          {
            "product_id": "60d5ec49f1b2c5a8b8e7c1a0",
            "product_name": "Fresh Tomatoes",
            "quantity": 5,
            "unit": "kg",
            "unit_price": 60,
            "total_price": 300
          }
        ],
        "subtotal": 300,
        "tax": 15,
        "delivery_charge": 50,
        "total_price": 365,
        "payment_method": "cod",
        "payment_status": "pending",
        "order_status": "pending",
        "delivery_address": { ... },
        "delivery_partner_id": "60d5ec49f1b2c5a8b8e7c1a5",
        "tracking_history": [
          {
            "status": "pending",
            "timestamp": "2024-02-20T10:30:00Z"
          }
        ],
        "created_at": "2024-02-20T10:30:00Z"
      }
    ],
    "totalItems": 8,
    "totalAmount": 365
  }
}
```

**Validation Errors:**
- 400: Cart is empty
- 400: Missing payment_method or delivery_address
- 400: Insufficient quantity for product
- 404: Product or Consumer not found
- 500: Server error

---

### Get Orders (Role-Based)
```http
GET /orders?role=consumer
Authorization: Bearer {token}
```

**Query Parameters:**
- `role` (required): "consumer" | "farmer" | "delivery"

Returns different data based on role:
- **consumer**: Orders placed by the user
- **farmer**: Orders received by the farmer
- **delivery**: Orders assigned to delivery partner

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "60d5ec49f1b2c5a8b8e7c1a2",
      "order_number": "ORD-12345678-abcde",
      "consumer_id": {
        "_id": "60d5ec49f1b2c5a8b8e7c1a3",
        "name": "Rajesh Kumar",
        "phone": "9876543210"
      },
      "farmer_id": {
        "_id": "60d5ec49f1b2c5a8b8e7c1a4",
        "farm_name": "Green Valley Farm"
      },
      "items": [ ... ],
      "total_price": 365,
      "order_status": "in_transit",
      "created_at": "2024-02-20T10:30:00Z"
    }
  ]
}
```

---

### Get Order Details
```http
GET /orders/{orderId}
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c5a8b8e7c1a2",
    "order_number": "ORD-12345678-abcde",
    "consumer_id": {
      "_id": "...",
      "name": "Rajesh Kumar",
      "phone": "9876543210",
      "email": "customer@example.com"
    },
    "farmer_id": {
      "_id": "...",
      "farm_name": "Green Valley Farm",
      "address": { ... },
      "avg_rating": 4.7
    },
    "delivery_partner_id": {
      "_id": "...",
      "user_id": { "name": "Delivery Guy" },
      "vehicle_type": "bike",
      "rating": 4.5
    },
    "items": [
      {
        "product_id": "60d5ec49f1b2c5a8b8e7c1a0",
        "product_name": "Fresh Tomatoes",
        "quantity": 5,
        "unit": "kg",
        "unit_price": 60,
        "total_price": 300
      }
    ],
    "subtotal": 300,
    "tax": 15,
    "delivery_charge": 50,
    "total_price": 365,
    "payment_method": "cod",
    "payment_status": "pending",
    "order_status": "in_transit",
    "delivery_address": {
      "street": "123 Main Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001"
    },
    "tracking_history": [
      {
        "status": "pending",
        "timestamp": "2024-02-20T10:30:00Z"
      },
      {
        "status": "confirmed",
        "timestamp": "2024-02-20T10:35:00Z"
      },
      {
        "status": "assigned",
        "timestamp": "2024-02-20T10:40:00Z"
      },
      {
        "status": "picked_up",
        "timestamp": "2024-02-20T10:45:00Z"
      },
      {
        "status": "in_transit",
        "timestamp": "2024-02-20T11:00:00Z"
      }
    ],
    "estimated_delivery": "2024-02-20T13:00:00Z",
    "actual_delivery": null,
    "notes": "Ring the bell twice",
    "created_at": "2024-02-20T10:30:00Z"
  }
}
```

---

### Update Order Status
```http
PUT /orders/{orderId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "order_status": "delivered",      // or "pending", "confirmed", "assigned", "picked_up", "in_transit", "cancelled"
  "estimated_delivery": "2024-02-20T13:00:00Z"
}
```

**Valid Status Transitions:**
```
pending → confirmed
confirmed → assigned
assigned → picked_up
picked_up → in_transit
in_transit → delivered
Any → cancelled
```

**Response (200):**
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "_id": "60d5ec49f1b2c5a8b8e7c1a2",
    "order_number": "ORD-12345678-abcde",
    "order_status": "delivered",
    "actual_delivery": "2024-02-20T12:45:00Z",
    "tracking_history": [
      { "status": "pending", "timestamp": "..." },
      { "status": "confirmed", "timestamp": "..." },
      { "status": "assigned", "timestamp": "..." },
      { "status": "picked_up", "timestamp": "..." },
      { "status": "in_transit", "timestamp": "..." },
      { "status": "delivered", "timestamp": "2024-02-20T12:45:00Z" }
    ]
  }
}
```

**Errors:**
- 404: Order not found
- 400: Invalid order status
- 500: Server error

---

## 🏥 System Health

### Health Check
```http
GET /health
```

**Response (200):**
```json
{
  "success": true,
  "message": "FreshFarm Backend is running",
  "timestamp": "2024-02-20T10:30:00Z"
}
```

---

## 📊 Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [                           // Only for validation errors
    {
      "field": "email",
      "message": "Email is required"
    },
    {
      "field": "phone",
      "message": "Phone must be 10 digits"
    }
  ]
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input or validation error |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Not authorized to access |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## 🔐 Authorization

### Token Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Claims
```json
{
  "id": "60d5ec49f1b2c5a8b8e7c1a0",           // User ID
  "user_type": "farmer",                        // User type
  "iat": 1708400400,                           // Issued at
  "exp": 1709005200                            // Expires at (7 days)
}
```

### Protected Endpoints
All endpoints except these require authentication:
- `POST /auth/register`
- `POST /auth/login`
- `GET /products/all`
- `GET /products/{productId}`
- `GET /products/farmer/{farmerId}`

---

## 📝 Request/Response Examples

### Example 1: Complete Order Flow

**Step 1: Add Product (Farmer)**
```bash
curl -X POST http://localhost:5000/api/v1/products/add \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fresh Tomatoes",
    "description": "Organic tomatoes",
    "category": "Vegetables",
    "price": 60,
    "unit": "kg",
    "weight": 1,
    "weight_unit": "kg",
    "quality": "premium",
    "specifications": "Large red tomatoes",
    "quantity_available": 100,
    "image_url": "..."
  }'
```

**Step 2: Browse Products (Customer)**
```bash
curl -X GET "http://localhost:5000/api/v1/products/all?category=Vegetables&limit=10"
```

**Step 3: Create Order (Customer)**
```bash
curl -X POST http://localhost:5000/api/v1/orders/create \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "cartItems": [
      {"product_id": "...", "quantity": 5}
    ],
    "payment_method": "cod",
    "delivery_address": {
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001"
    }
  }'
```

**Step 4: Track Order (Customer)**
```bash
curl -X GET http://localhost:5000/api/v1/orders/{orderId} \
  -H "Authorization: Bearer {token}"
```

---

## 🚀 Best Practices

1. **Always include Authorization header** for protected endpoints
2. **Use correct Content-Type**: `application/json`
3. **Validate input** before sending requests
4. **Handle errors gracefully** in your frontend
5. **Store token securely** - use httpOnly cookies in production
6. **Refresh token** before expiry
7. **Use pagination** for large data sets
8. **Cache responses** to improve performance

---

**API Documentation Complete! 🎉**
