# Farmer-to-Consumer Platform - Sequence Diagrams

## 1. Order Placement and Payment Flow

```mermaid
sequenceDiagram
    actor Consumer
    participant Frontend as Frontend App
    participant AuthAPI as Auth Service
    participant OrderAPI as Order Service
    participant PaymentAPI as Payment Service
    participant Database as Database
    participant Notification as Notification Service
    actor Farmer

    Consumer->>Frontend: Browse Products
    Frontend->>OrderAPI: Get Available Products
    OrderAPI->>Database: Query Products
    Database-->>OrderAPI: Product List
    OrderAPI-->>Frontend: Display Products

    Consumer->>Frontend: Add to Cart & Checkout
    Frontend->>AuthAPI: Get Consumer Token
    AuthAPI->>Database: Validate Token
    Database-->>AuthAPI: Token Valid
    AuthAPI-->>Frontend: Token Confirmed

    Frontend->>OrderAPI: Create Order
    OrderAPI->>Database: Save Order (pending)
    Database-->>OrderAPI: Order ID
    OrderAPI-->>Frontend: Order Created

    Frontend->>PaymentAPI: Process Payment
    PaymentAPI->>PaymentAPI: Validate Payment Details
    PaymentAPI->>Database: Record Payment Attempt
    Database-->>PaymentAPI: Recorded
    PaymentAPI->>PaymentAPI: Call Payment Gateway
    PaymentAPI-->>Frontend: Payment Confirmed

    OrderAPI->>Database: Update Order (payment_confirmed)
    Database-->>OrderAPI: Updated
    OrderAPI-->>Notification: Send Confirmation

    Notification-->>Consumer: Order Confirmed Email
    Notification-->>Farmer: New Order Notification

    Farmer->>Frontend: Accept Order
    Frontend->>OrderAPI: Update Order Status
    OrderAPI->>Database: Set Status = accepted
    Database-->>OrderAPI: Updated
    OrderAPI-->>Notification: Order Accepted

    Notification-->>Consumer: Farmer Accepted Order
```

## 2. Delivery Assignment and Tracking Flow

```mermaid
sequenceDiagram
    actor Farmer
    participant FarmerApp as Farmer App
    participant OrderAPI as Order Service
    participant DeliveryAPI as Delivery Service
    actor DeliveryPartner
    participant DeliveryApp as Delivery App
    participant Database as Database
    participant Maps as Maps Service
    actor Consumer

    Farmer->>FarmerApp: Mark Order Ready
    FarmerApp->>OrderAPI: Update Order Status
    OrderAPI->>Database: Set Status = ready_for_pickup
    Database-->>OrderAPI: Updated
    OrderAPI-->>DeliveryAPI: Request Delivery Partner

    DeliveryAPI->>Database: Find Available Partners
    Database-->>DeliveryAPI: List of Available Partners
    DeliveryAPI->>DeliveryApp: Send Delivery Request
    
    DeliveryPartner->>DeliveryApp: Accept Delivery
    DeliveryApp->>OrderAPI: Assign Delivery Partner
    OrderAPI->>Database: Update delivery_partner_id
    Database-->>OrderAPI: Updated

    DeliveryPartner->>DeliveryApp: Arrived at Farm
    DeliveryApp->>Maps: Update Location
    Maps-->>DeliveryApp: Location Confirmed
    DeliveryApp->>OrderAPI: Update Status = picked_up
    OrderAPI->>Database: Set Status = picked_up

    DeliveryPartner->>DeliveryApp: En Route to Consumer
    loop Every 2 minutes
        DeliveryPartner->>Maps: Send GPS Location
        Maps-->>Consumer: Real-time Tracking
    end

    DeliveryPartner->>DeliveryApp: Arrived at Delivery Location
    DeliveryApp->>OrderAPI: Update Status = arrived
    OrderAPI-->>Consumer: Notify - Delivery Arrived

    Consumer->>Frontend: Accept Delivery
    Frontend->>OrderAPI: Confirm Delivery
    OrderAPI->>Database: Set Status = delivered
    Database-->>OrderAPI: Updated
    OrderAPI-->>DeliveryAPI: Mark Delivery Complete
```

## 3. Review and Rating Flow

```mermaid
sequenceDiagram
    actor Consumer
    participant ConsumerApp as Consumer App
    participant ReviewAPI as Review Service
    participant Database as Database
    participant Analytics as Analytics Service
    actor Farmer
    actor DeliveryPartner

    Consumer->>ConsumerApp: View Order History
    ConsumerApp->>ReviewAPI: Get Completed Orders
    ReviewAPI->>Database: Query Delivered Orders
    Database-->>ReviewAPI: Order List

    Consumer->>ConsumerApp: Submit Product Review
    ConsumerApp->>ReviewAPI: Create Product Review
    ReviewAPI->>Database: Save Review (product)
    Database-->>ReviewAPI: Review Saved
    ReviewAPI->>Analytics: Update Product Rating

    Consumer->>ConsumerApp: Submit Farmer Review
    ConsumerApp->>ReviewAPI: Create Farmer Review
    ReviewAPI->>Database: Save Review (farmer)
    Database-->>ReviewAPI: Review Saved
    ReviewAPI->>Database: Update Farmer avg_rating
    Database-->>ReviewAPI: Updated

    Consumer->>ConsumerApp: Submit Delivery Review
    ConsumerApp->>ReviewAPI: Create Delivery Review
    ReviewAPI->>Database: Save Review (delivery)
    Database-->>ReviewAPI: Review Saved
    ReviewAPI->>Database: Update DeliveryPartner rating
    Database-->>ReviewAPI: Updated

    ReviewAPI->>Analytics: Update Statistics
    Analytics->>Database: Aggregate Ratings
    Database-->>Analytics: Aggregated Data

    Analytics-->>Farmer: Display New Rating
    Analytics-->>DeliveryPartner: Display New Rating
    Analytics-->>ConsumerApp: Display Reviews
```

## 4. User Registration and Verification Flow

```mermaid
sequenceDiagram
    actor NewUser
    participant Frontend as Frontend App
    participant AuthAPI as Auth Service
    participant EmailService as Email Service
    participant Database as Database
    participant TokenService as Token Service

    NewUser->>Frontend: Fill Registration Form
    Frontend->>Frontend: Validate Input
    Frontend->>AuthAPI: POST /register
    
    AuthAPI->>AuthAPI: Validate User Data
    AuthAPI->>Database: Check if Email Exists
    Database-->>AuthAPI: Email Available
    
    AuthAPI->>AuthAPI: Hash Password
    AuthAPI->>Database: Create User Record
    Database-->>AuthAPI: User Created
    
    AuthAPI->>TokenService: Generate Verification Token
    TokenService-->>AuthAPI: Token Generated
    
    AuthAPI->>Database: Save Verification Token
    Database-->>AuthAPI: Saved
    
    AuthAPI->>EmailService: Send Verification Email
    EmailService-->>NewUser: Verification Email Sent
    
    NewUser->>Frontend: Click Verification Link
    Frontend->>AuthAPI: GET /verify-email/:token
    
    AuthAPI->>Database: Validate Token
    Database-->>AuthAPI: Token Valid
    
    AuthAPI->>Database: Update is_verified = true
    Database-->>AuthAPI: Updated
    
    AuthAPI-->>Frontend: Email Verified
    Frontend-->>NewUser: Account Activated
```

## 5. Payment Processing Flow

```mermaid
sequenceDiagram
    actor Consumer
    participant PaymentUI as Payment UI
    participant PaymentService as Payment Service
    participant PaymentGateway as Payment Gateway<br/>(Razorpay/Stripe)
    participant Database as Database
    participant OrderService as Order Service
    participant Notification as Notification Service

    Consumer->>PaymentUI: Enter Payment Details
    PaymentUI->>PaymentService: Process Payment Request
    
    PaymentService->>PaymentService: Validate Payment Data
    PaymentService->>Database: Create Payment Record (pending)
    Database-->>PaymentService: Payment ID
    
    PaymentService->>PaymentGateway: Send Payment Request
    PaymentGateway->>PaymentGateway: Process Transaction
    PaymentGateway-->>PaymentService: Payment Response
    
    alt Payment Successful
        PaymentService->>Database: Update Payment (completed)
        Database-->>PaymentService: Updated
        PaymentService->>OrderService: Update Order Status
        OrderService->>Database: Set payment_status = completed
        Database-->>OrderService: Updated
        OrderService->>Notification: Send Success Notification
        Notification-->>Consumer: Payment Confirmed
    else Payment Failed
        PaymentService->>Database: Update Payment (failed)
        Database-->>PaymentService: Updated
        Notification-->>Consumer: Payment Failed - Retry
    end
```

## 6. Admin Dashboard Operations Flow

```mermaid
sequenceDiagram
    actor Admin
    participant AdminDashboard as Admin Dashboard
    participant AdminAPI as Admin Service
    participant Database as Database
    participant EmailService as Email Service

    Admin->>AdminDashboard: Login
    AdminDashboard->>AdminAPI: Authenticate Admin
    AdminAPI->>Database: Verify Admin Credentials
    Database-->>AdminAPI: Admin Valid
    AdminAPI-->>AdminDashboard: Dashboard Loaded

    Admin->>AdminDashboard: View Users
    AdminDashboard->>AdminAPI: GET /admin/users
    AdminAPI->>Database: Query All Users
    Database-->>AdminAPI: User List
    AdminAPI-->>AdminDashboard: Display Users

    Admin->>AdminDashboard: Verify Farmer Documents
    AdminDashboard->>AdminAPI: Update Document Status
    AdminAPI->>Database: Update documents field
    Database-->>AdminAPI: Updated
    AdminAPI->>EmailService: Send Verification Email
    EmailService-->>Farmer: Document Approved

    Admin->>AdminDashboard: View Analytics
    AdminDashboard->>AdminAPI: GET /admin/analytics
    AdminAPI->>Database: Aggregate Statistics
    Database-->>AdminAPI: Analytics Data
    AdminAPI-->>AdminDashboard: Display Charts

    Admin->>AdminDashboard: Resolve Disputes
    AdminDashboard->>AdminAPI: Update Dispute Status
    AdminAPI->>Database: Save Resolution
    Database-->>AdminAPI: Saved
```
