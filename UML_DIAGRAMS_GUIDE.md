# UML Diagrams Guide - Farmer-to-Consumer E-Commerce Platform

## 📋 Overview

This document provides complete UML diagrams and guides for the Farmer-to-Consumer e-commerce platform. The diagrams include class diagrams and sequence diagrams showing the system architecture and user workflows.

---

## 📁 Files Generated

### 1. **Markdown Diagrams** (Mermaid Format)
- `CLASS_DIAGRAM.md` - Complete class diagram with all entities and relationships
- `SEQUENCE_DIAGRAMS.md` - 6 detailed sequence diagrams for different workflows

### 2. **Draw.io XML Files** (Importable)
- `CLASS_DIAGRAM_DRAWIO.xml` - Professional class diagram (ready for draw.io)
- `SEQUENCE_DIAGRAM_ORDER_FLOW.xml` - Order placement & payment sequence
- `SEQUENCE_DIAGRAM_DELIVERY_FLOW.xml` - Delivery & tracking sequence

---

## 🎯 How to Use These Diagrams

### Option 1: View in Draw.io Online
1. Go to [draw.io](https://draw.io)
2. Click **File → Open**
3. Upload any `.xml` file from this project
4. Diagram will be displayed and ready to edit

### Option 2: Import into VS Code
1. Install the "Draw.io Integration" extension
2. Right-click on any `.xml` file
3. Select "Open with Draw.io"

### Option 3: View Mermaid Diagrams
- Open `.md` files in any markdown viewer
- GitHub will automatically render Mermaid diagrams
- Copy mermaid code to [mermaid.live](https://mermaid.live) for online editing

---

## 📊 Class Diagram Explanation

### Core Entities

#### **User (Base Class)**
The foundation for all user types in the system. Contains:
- Authentication credentials (email, phone, password_hash)
- Profile information (name, profile_pic)
- Verification status (is_verified, verification_token)
- Active status (is_active)

**Methods:**
- `registerUser()` - Create new user account
- `loginUser()` - Authenticate user
- `updateProfile()` - Update user profile
- `verifyEmail()` - Email verification

#### **Farmer (extends User)**
Specialized user for agricultural producers. Manages:
- Farm information (farm_name, farm_size, location)
- Financial data (total_revenue, bank_account)
- Performance metrics (avg_rating, total_orders)
- Document verification (aadhar, pan, farm_license)
- Delivery zones

**Methods:**
- `createProduct()` - List new products
- `updateProduct()` - Modify product details
- `viewOrders()` - See all orders
- `acceptOrder()` - Accept customer orders

#### **Consumer (extends User)**
Specialized user for customers. Manages:
- Delivery addresses (multiple)
- Saved farmers (favorites)
- Favorite products
- Shopping cart
- Purchase history and preferences

**Methods:**
- `addToCart()` - Add items to shopping cart
- `placeOrder()` - Submit purchase order
- `makePayment()` - Process payment
- `rateProduct()` - Leave product review
- `saveFarmer()` - Follow/favorite farmer

#### **DeliveryPartner (extends User)**
Specialized user for logistics. Manages:
- Vehicle information (type, number, color)
- License details (number, expiry)
- Real-time location (GPS coordinates)
- Availability status (available/busy/offline)
- Performance metrics (rating, successful_deliveries)
- Earnings tracking

**Methods:**
- `acceptDelivery()` - Accept delivery job
- `updateLocation()` - Send GPS location
- `completeDelivery()` - Mark delivery as complete
- `viewEarnings()` - Check earnings dashboard
- `rateFarmer()` - Leave farmer review

### Transactional Entities

#### **Product**
Item offered for sale by farmers. Contains:
- Product details (name, description, category)
- Pricing & measurements (price, unit, weight, quality)
- Inventory (stock_quantity, total_sold)
- Ratings (avg_rating)

**Relationships:**
- Belongs to exactly one Farmer
- Has many Reviews
- Can be in many Orders

#### **Order**
Purchase order linking multiple entities. Contains:
- Order identification (order_number)
- Parties involved (consumer_id, farmer_id, delivery_partner_id)
- Items (product list with quantities)
- Pricing (subtotal, tax, delivery_charge, total_price)
- Payment & delivery details
- Status tracking (pending → accepted → picked_up → delivered)
- Timestamps (created_at, delivered_at)

**Relationships:**
- Created by exactly one Consumer
- Fulfilled by exactly one Farmer
- Delivered by zero or one DeliveryPartner
- Has exactly one Payment
- Has many Reviews

#### **Payment**
Transaction record for each order. Contains:
- Order & consumer references
- Amount and currency
- Payment method (card, UPI, wallet, COD)
- Payment gateway (Stripe, Razorpay, manual)
- Transaction details (ID, gateway_response)
- Card information (last4, brand, expiry)
- Status (pending → completed/failed/refunded)

**Methods:**
- `processPayment()` - Execute payment
- `refundPayment()` - Issue refund
- `verifyTransaction()` - Confirm transaction

#### **Review**
Feedback and ratings. Contains:
- Reviewer & reviewee information
- Reviewer type (consumer/delivery_partner/farmer)
- Reviewee type (farmer/product/delivery_partner)
- Rating (1-5 stars)
- Title & comment
- Verified purchase flag
- Helpfulness votes

**Can review:**
- Products (from Consumers)
- Farmers (from Consumers & Delivery Partners)
- Delivery Partners (from Consumers & Farmers)

---

## 🔄 Sequence Diagrams

### 1. Order Placement & Payment Flow
**Participants:** Consumer, Consumer App, Order Service, Payment Service, Payment Gateway, Database, Notification Service, Farmer

**Flow:**
1. Consumer browses products through app
2. App retrieves product list from Order Service
3. Order Service queries Database
4. Products displayed to consumer
5. Consumer adds items to cart and checks out
6. Order created in Database
7. Payment processed through Payment Gateway
8. Payment status updated in Database
9. Notifications sent to Consumer and Farmer
10. Farmer receives order notification

**Duration:** ~30 seconds

### 2. Delivery Assignment & Tracking Flow
**Participants:** Farmer, Farmer App, Order Service, Delivery Service, Maps Service, Delivery Partner, Delivery App, Consumer

**Flow:**
1. Farmer marks order as ready for pickup
2. Order Service requests available delivery partners
3. Delivery Service finds available partners in Database
4. Delivery request sent to partners via notifications
5. Partner accepts delivery
6. Partner assigned to order in Database
7. Partner arrives at farm, location updated via Maps
8. Order status changes to "picked_up"
9. Real-time GPS tracking updates sent every 2 minutes
10. Partner arrives at consumer location
11. Delivery status changed to "arrived"
12. Consumer confirms delivery receipt
13. Order marked as "delivered" in Database

**Duration:** 30-60 minutes depending on distance

### 3. Review & Rating Flow
**Participants:** Consumer, Consumer App, Review Service, Database, Analytics Service, Farmer, Delivery Partner

**Flow:**
1. Consumer views completed order history
2. Consumer submits review for product
3. Consumer submits review for farmer
4. Consumer submits review for delivery partner
5. All reviews saved to Database
6. Analytics Service aggregates ratings
7. Farmer & Delivery Partner ratings updated
8. Updated ratings displayed on dashboards

### 4. User Registration & Verification Flow
**Participants:** New User, Frontend App, Auth Service, Email Service, Database, Token Service

**Flow:**
1. User fills registration form
2. Input validation on frontend
3. Registration request sent to Auth Service
4. Email existence checked in Database
5. Password hashed
6. User record created in Database
7. Verification token generated
8. Token saved to Database
9. Verification email sent
10. User clicks verification link
11. Token validated
12. Account marked as verified
13. Account activated for login

### 5. Payment Processing Flow
**Participants:** Consumer, Payment UI, Payment Service, Payment Gateway, Database, Order Service, Notification Service

**Flow:**
1. Consumer enters payment details
2. Payment Service validates data
3. Payment record created (pending)
4. Request sent to Payment Gateway
5. Gateway processes transaction
6. Success/Failure response received
7. If successful: Update payment to "completed", order status updated, notification sent
8. If failed: Payment marked as "failed", retry notification sent

### 6. Admin Dashboard Operations Flow
**Participants:** Admin, Admin Dashboard, Admin Service, Database, Email Service

**Flow:**
1. Admin logs in
2. Credentials verified in Database
3. Dashboard loaded with available operations
4. Admin can view all users
5. Admin can verify farmer documents
6. Verification email sent to farmer
7. Admin can view analytics and statistics
8. Admin can resolve disputes
9. Resolution saved to Database

---

## 📈 Database Relationships

### One-to-Many Relationships
- **Farmer → Products** (1 farmer creates many products)
- **Consumer → Orders** (1 consumer places many orders)
- **Order → Reviews** (1 order receives many reviews)
- **Consumer → Addresses** (1 consumer has many addresses)
- **Farmer → DeliveryZones** (1 farmer serves many zones)

### Many-to-Many Relationships
- **Consumer ↔ Products** (Favorites)
- **Consumer ↔ Farmers** (Saved farmers)
- **Order ↔ Products** (Items in order)
- **Review ↔ Products** (Product reviews)
- **Review ↔ Farmers** (Farmer reviews)
- **Review ↔ DeliveryPartners** (Partner reviews)

### Required References
- **Product:** Must reference Farmer (farmer_id)
- **Order:** Must reference Consumer & Farmer (required IDs)
- **Payment:** Must reference Order & Consumer (required IDs)
- **Review:** Must reference Order, Reviewer, Reviewee (required IDs)

---

## 🔐 Data Flow Security

### Authentication & Authorization
1. **Registration:** Password hashed with bcryptjs
2. **Login:** JWT tokens generated (7-day expiry)
3. **Protected Routes:** Token validation on every request
4. **Role-Based Access:** Different permissions per user_type

### Payment Security
1. **PCI Compliance:** Card data handled by Payment Gateway only
2. **Encryption:** Sensitive data encrypted in transit (HTTPS)
3. **Tokenization:** Card details tokenized, last4 stored only
4. **Transaction Logs:** All payments logged with gateway response

### Data Protection
1. **Email Verification:** Prevents fake accounts
2. **Phone Validation:** Ensures real phone numbers
3. **Document Verification:** Farmer identity confirmed before listing
4. **Review System:** Only verified purchasers can review

---

## 🔄 Entity Lifecycle

### Order Lifecycle
```
pending → payment_confirmed → accepted → ready_for_pickup
  ↓
  payment_failed
  
ready_for_pickup → picked_up → in_transit → arrived → delivered
                                                  ↓
                                          cancelled/failed
```

### Payment Lifecycle
```
pending → completed
   ↓
   failed → retry_pending → completed
   
completed → refunded (optional)
```

### Delivery Assignment Lifecycle
```
no_partner → requested → accepted → arrived_farm
  ↓
no_partner_available → manual_assignment
  
arrived_farm → in_transit → arrived_consumer → delivered
                                           ↓
                                       cancelled
```

---

## 📊 Key Metrics & Analytics

### Farmer Dashboard
- Total Orders
- Total Revenue
- Average Rating
- Product Performance
- Delivery Zones Coverage
- Document Verification Status

### Consumer Dashboard
- Order History
- Total Spent
- Favorite Farmers
- Cart Items
- Address Book
- Reviews Given

### Delivery Partner Dashboard
- Total Deliveries
- Successful Deliveries
- Cancelled Deliveries
- Current Rating
- Today's Earnings
- Pending Earnings

### Admin Dashboard
- Total Users (by type)
- Total Orders
- Total Revenue
- Payment Status Distribution
- Dispute Count
- Document Verification Queue

---

## 🚀 How to Extend Diagrams

### Adding New Entity
1. Create new swimlane in class diagram
2. Add attributes and methods
3. Draw relationships to existing entities
4. Update sequence diagrams if affects flows

### Adding New Workflow
1. Create new sequence diagram
2. Identify all participants
3. Draw lifelines
4. Add messages with sequence numbers
5. Include success and failure paths

### Example: Adding Wishlist Feature
```
New Entity: Wishlist
- wishlist_id: ObjectId
- consumer_id: ObjectId (required)
- products: Array of Product IDs
- created_at: Date
- updated_at: Date

Methods:
+ addToWishlist(productId)
+ removeFromWishlist(productId)
+ moveToCart(productId)
+ shareWishlist()

Relationship:
Consumer (1) -- (*) Wishlist
Product (*) -- (*) Wishlist
```

---

## 💡 Tips for Using Diagrams

### For Development Teams
1. Use diagrams in sprint planning to understand scope
2. Reference sequence diagrams during API design
3. Validate database relationships before implementation
4. Update diagrams when system changes

### For Documentation
1. Export diagrams as PNG/SVG for reports
2. Use class diagram for architecture documentation
3. Use sequence diagrams for user flow documentation
4. Create swimlane diagrams for process documentation

### For Presentations
1. Highlight key entities (User types)
2. Show main workflows (Order → Delivery)
3. Emphasize security aspects (Payment flow)
4. Demonstrate scalability potential

---

## 📞 Support

For questions or updates to diagrams:
1. Review the existing markdown files
2. Check draw.io XML files for XML structure
3. Update both markdown and XML files in sync
4. Maintain this documentation as the single source of truth

---

**Last Updated:** April 19, 2026  
**Version:** 1.0  
**Platform:** Farmer-to-Consumer E-Commerce System
