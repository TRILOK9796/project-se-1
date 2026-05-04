# 🏗️ FreshConnect System Diagrams

**Project**: FreshConnect - Agricultural E-Commerce Platform  
**Generated**: May 4, 2026  
**Architecture Documentation**: Complete System Design

---

## 📊 Table of Contents

1. [DFD Level 0 - System Context](#dfd-level-0)
2. [DFD Level 1 - Main Processes](#dfd-level-1)
3. [DFD Level 2 - Detailed Processes](#dfd-level-2)
4. [Use Case Diagram](#use-case-diagram)
5. [Entity-Relationship Diagram](#er-diagram)
6. [Sequence Diagram - Order Flow](#sequence-diagram)
7. [Collaboration Diagram](#collaboration-diagram)
8. [Network Diagram](#network-diagram)
9. [Gantt Chart](#gantt-chart)

---

## DFD Level 0

### System Context - Overall Data Flow

```mermaid
graph TB
    Consumer["👥 Consumer Users"]
    Farmer["🌾 Farmer Users"]
    DeliveryPartner["🚗 Delivery Partners"]
    Admin["👨‍💼 Admin Users"]
    
    System["🏗️ FreshConnect Platform"]
    
    PaymentGateway["💳 Payment Gateway<br/>Stripe"]
    EmailService["📧 Email Service<br/>Nodemailer"]
    LocationService["📍 Location Service"]
    
    Consumer -->|Browse Products, Order| System
    Farmer -->|Add Products, Manage Orders| System
    DeliveryPartner -->|Accept Orders, Track| System
    Admin -->|Manage System| System
    
    System -->|Process Payment| PaymentGateway
    System -->|Send Notifications| EmailService
    System -->|Location Data| LocationService
    
    PaymentGateway -->|Payment Confirmation| System
    EmailService -->|Email Sent| System
    LocationService -->|Coordinates| System
    
    System -.->|Report & Analytics| Admin
    
    style System fill:#4CAF50,stroke:#2E7D32,color:#fff
    style Consumer fill:#2196F3,stroke:#1565C0,color:#fff
    style Farmer fill:#FF9800,stroke:#E65100,color:#fff
    style DeliveryPartner fill:#9C27B0,stroke:#6A1B9A,color:#fff
    style Admin fill:#F44336,stroke:#C62828,color:#fff
```

---

## DFD Level 1

### Main Processes

```mermaid
graph TB
    Consumer["👥 Consumer"]
    Farmer["🌾 Farmer"]
    DeliveryPartner["🚗 Delivery Partner"]
    Admin["👨‍💼 Admin"]
    
    Auth["1.0<br/>Authentication<br/>& Authorization"]
    ProductMgmt["2.0<br/>Product<br/>Management"]
    OrderMgmt["3.0<br/>Order<br/>Processing"]
    Delivery["4.0<br/>Delivery<br/>Tracking"]
    Payment["5.0<br/>Payment<br/>Processing"]
    Review["6.0<br/>Review &<br/>Rating"]
    AdminMgmt["7.0<br/>Admin<br/>Management"]
    
    Database[(Database<br/>MongoDB)]
    PaymentGW["Payment Gateway"]
    Cache["Cache<br/>Redis"]
    
    Consumer -->|Register/Login| Auth
    Farmer -->|Register/Login| Auth
    DeliveryPartner -->|Register/Login| Auth
    Admin -->|Register/Login| Auth
    
    Auth -->|User Data| Database
    Auth -->|Session Data| Cache
    
    Farmer -->|Add/Edit Products| ProductMgmt
    ProductMgmt -->|Store Products| Database
    Consumer -->|Browse Products| ProductMgmt
    
    Consumer -->|Place Order| OrderMgmt
    OrderMgmt -->|Order Details| Database
    Farmer -->|Accept/Reject Order| OrderMgmt
    DeliveryPartner -->|Accept Delivery| OrderMgmt
    
    OrderMgmt -->|Confirm Payment| Payment
    Payment -->|Process| PaymentGW
    PaymentGW -->|Status| Payment
    Payment -->|Record| Database
    
    DeliveryPartner -->|Update Location| Delivery
    Consumer -->|Track Order| Delivery
    Delivery -->|Tracking Info| Database
    Delivery -->|Location Cache| Cache
    
    Consumer -->|Submit Review| Review
    Review -->|Store & Calculate| Database
    
    Admin -->|Monitor System| AdminMgmt
    AdminMgmt -->|System Logs & Data| Database
    
    style Auth fill:#4CAF50,stroke:#2E7D32,color:#fff
    style ProductMgmt fill:#2196F3,stroke:#1565C0,color:#fff
    style OrderMgmt fill:#FF9800,stroke:#E65100,color:#fff
    style Delivery fill:#9C27B0,stroke:#6A1B9A,color:#fff
    style Payment fill:#F44336,stroke:#C62828,color:#fff
    style Review fill:#00BCD4,stroke:#00838F,color:#fff
    style AdminMgmt fill:#795548,stroke:#4E342E,color:#fff
    style Database fill:#E91E63,stroke:#AD1457,color:#fff
    style Cache fill:#FFEB3B,stroke:#F57F17,color:#000
```

---

## DFD Level 2

### Detailed Process Flow - Order Processing (Process 3.0)

```mermaid
graph TB
    subgraph "3.1 Order Creation"
        direction TB
        Consumer["👥 Consumer"]
        Cart["Shopping Cart"]
        OrderForm["Order Form"]
        Validation["3.1.1 Validate Order"]
        
        Consumer -->|Browse| Cart
        Cart -->|Submit| OrderForm
        OrderForm -->|Order Data| Validation
    end
    
    subgraph "3.2 Order Assignment"
        direction TB
        FarmerMatch["3.2.1 Match Farmer"]
        FarmerNotif["3.2.2 Farmer Notification"]
        FarmerAccept["3.2.3 Farmer Accept/Reject"]
        
        Validation -->|Valid Order| FarmerMatch
        FarmerMatch -->|Send| FarmerNotif
        FarmerNotif -->|Farmer Response| FarmerAccept
    end
    
    subgraph "3.3 Payment Processing"
        direction TB
        PaymentInit["3.3.1 Payment Initiation"]
        PaymentGW["3.3.2 Gateway Processing"]
        PaymentStatus["3.3.3 Payment Confirmation"]
        
        FarmerAccept -->|Order Accepted| PaymentInit
        PaymentInit -->|Charge| PaymentGW
        PaymentGW -->|Response| PaymentStatus
    end
    
    subgraph "3.4 Delivery Assignment"
        direction TB
        DeliveryMatch["3.4.1 Match Delivery Partner"]
        DeliveryNotif["3.4.2 Delivery Notification"]
        DeliveryAccept["3.4.3 Accept Delivery"]
        
        PaymentStatus -->|Payment Done| DeliveryMatch
        DeliveryMatch -->|Send| DeliveryNotif
        DeliveryNotif -->|Partner Response| DeliveryAccept
    end
    
    subgraph "3.5 Order Fulfillment"
        direction TB
        Packing["3.5.1 Packing"]
        ReadyNotif["3.5.2 Ready Notification"]
        Pickup["3.5.3 Pickup"]
        Delivery["3.5.4 Delivery"]
        Complete["3.5.5 Order Complete"]
        
        DeliveryAccept -->|Start| Packing
        Packing -->|Send| ReadyNotif
        ReadyNotif -->|Partner Ready| Pickup
        Pickup -->|In Transit| Delivery
        Delivery -->|Delivered| Complete
    end
    
    Database[(Database)]
    
    Complete -->|Save Order Status| Database
    Validation -->|Save| Database
    PaymentStatus -->|Save| Database
    
    style Database fill:#E91E63,stroke:#AD1457,color:#fff
```

---

## Use Case Diagram

### System Use Cases for All Actors

```mermaid
graph TB
    Consumer["👥 Consumer"]
    Farmer["🌾 Farmer"]
    DeliveryPartner["🚗 Delivery Partner"]
    Admin["👨‍💼 Admin"]
    
    subgraph Core["FreshConnect Platform"]
        direction TB
        
        subgraph Auth["Authentication"]
            Register["Register Account"]
            Login["Login"]
            Logout["Logout"]
            ResetPassword["Reset Password"]
        end
        
        subgraph ConsumerUC["Consumer Use Cases"]
            Browse["Browse Products"]
            Search["Search Products"]
            ViewDetails["View Product Details"]
            AddCart["Add to Cart"]
            PlaceOrder["Place Order"]
            TrackOrder["Track Order"]
            ViewHistory["View Order History"]
            RateProduct["Rate & Review"]
            ManageProfile["Manage Profile"]
        end
        
        subgraph FarmerUC["Farmer Use Cases"]
            AddProduct["Add Product"]
            EditProduct["Edit Product"]
            ManageInventory["Manage Inventory"]
            ViewOrders["View Incoming Orders"]
            AcceptReject["Accept/Reject Order"]
            UpdateStatus["Update Order Status"]
            ViewEarnings["View Earnings"]
            ManageProfile2["Manage Profile"]
        end
        
        subgraph DeliveryUC["Delivery Partner Use Cases"]
            ViewDeliveries["View Available Deliveries"]
            AcceptDelivery["Accept Delivery"]
            UpdateLocation["Update Location"]
            TrackRoute["Track Route"]
            CompleteDelivery["Mark Delivery Complete"]
            ViewEarnings2["View Earnings"]
            ManageProfile3["Manage Profile"]
        end
        
        subgraph AdminUC["Admin Use Cases"]
            ViewAnalytics["View Analytics"]
            ManageUsers["Manage Users"]
            ViewReports["View Reports"]
            ConfigSystem["Configure System"]
            ManagePayments["Manage Payments"]
            ViewLogs["View System Logs"]
        end
    end
    
    Consumer -->|uses| Register
    Consumer -->|uses| Login
    Consumer -->|uses| Browse
    Consumer -->|uses| Search
    Consumer -->|uses| ViewDetails
    Consumer -->|uses| AddCart
    Consumer -->|uses| PlaceOrder
    Consumer -->|uses| TrackOrder
    Consumer -->|uses| ViewHistory
    Consumer -->|uses| RateProduct
    Consumer -->|uses| ManageProfile
    Consumer -->|uses| Logout
    
    Farmer -->|uses| Register
    Farmer -->|uses| Login
    Farmer -->|uses| AddProduct
    Farmer -->|uses| EditProduct
    Farmer -->|uses| ManageInventory
    Farmer -->|uses| ViewOrders
    Farmer -->|uses| AcceptReject
    Farmer -->|uses| UpdateStatus
    Farmer -->|uses| ViewEarnings
    Farmer -->|uses| ManageProfile2
    Farmer -->|uses| Logout
    
    DeliveryPartner -->|uses| Register
    DeliveryPartner -->|uses| Login
    DeliveryPartner -->|uses| ViewDeliveries
    DeliveryPartner -->|uses| AcceptDelivery
    DeliveryPartner -->|uses| UpdateLocation
    DeliveryPartner -->|uses| TrackRoute
    DeliveryPartner -->|uses| CompleteDelivery
    DeliveryPartner -->|uses| ViewEarnings2
    DeliveryPartner -->|uses| ManageProfile3
    DeliveryPartner -->|uses| Logout
    
    Admin -->|uses| Register
    Admin -->|uses| Login
    Admin -->|uses| ViewAnalytics
    Admin -->|uses| ManageUsers
    Admin -->|uses| ViewReports
    Admin -->|uses| ConfigSystem
    Admin -->|uses| ManagePayments
    Admin -->|uses| ViewLogs
    Admin -->|uses| Logout
    
    style Core fill:#E8F5E9,stroke:#2E7D32
    style Auth fill:#C8E6C9,stroke:#388E3C,color:#000
    style ConsumerUC fill:#BBDEFB,stroke:#1976D2,color:#000
    style FarmerUC fill:#FFE0B2,stroke:#F57C00,color:#000
    style DeliveryUC fill:#E1BEE7,stroke:#7B1FA2,color:#000
    style AdminUC fill:#FFCCBC,stroke:#D84315,color:#000
```

---

## ER Diagram

### Database Schema

```mermaid
erDiagram
    USER ||--o{ CONSUMER : "is"
    USER ||--o{ FARMER : "is"
    USER ||--o{ DELIVERY_PARTNER : "is"
    USER ||--o{ ADMIN : "is"
    
    FARMER ||--o{ PRODUCT : "sells"
    PRODUCT ||--o{ REVIEW : "receives"
    PRODUCT ||--o{ ORDER_ITEM : "contains"
    
    CONSUMER ||--o{ ORDER : "places"
    CONSUMER ||--o{ REVIEW : "writes"
    
    ORDER ||--o{ ORDER_ITEM : "has"
    ORDER ||--o{ PAYMENT : "involves"
    ORDER ||--o{ DELIVERY : "requires"
    
    DELIVERY_PARTNER ||--o{ DELIVERY : "fulfills"
    
    USER {
        ObjectId id PK
        string email UK
        string phone UK
        string password_hash
        string name
        enum user_type
        string profile_picture
        text bio
        float rating
        int review_count
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    CONSUMER {
        ObjectId id PK
        ObjectId user_id FK
        string address
        string city
        string state
        string pincode
        float latitude
        float longitude
        string preferences
        int total_orders
        float total_spent
        timestamp last_order
    }
    
    FARMER {
        ObjectId id PK
        ObjectId user_id FK
        string farm_name
        string farm_address
        float latitude
        float longitude
        string certification
        string specialization
        int active_products
        float total_earnings
        int total_orders_fulfilled
    }
    
    DELIVERY_PARTNER {
        ObjectId id PK
        ObjectId user_id FK
        string vehicle_type
        string vehicle_number
        string license_number
        string license_expiry
        string current_location
        float latitude
        float longitude
        boolean is_available
        int completed_deliveries
        float total_earnings
        int active_orders
    }
    
    ADMIN {
        ObjectId id PK
        ObjectId user_id FK
        string role
        string[] permissions
        timestamp last_login
        int total_users_managed
    }
    
    PRODUCT {
        ObjectId id PK
        ObjectId farmer_id FK
        string name
        text description
        string category
        float price
        float discount_percent
        int quantity_available
        string unit
        string image_url
        float rating
        int review_count
        int order_count
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    REVIEW {
        ObjectId id PK
        ObjectId product_id FK
        ObjectId consumer_id FK
        int rating
        text comment
        string[] images
        int helpful_count
        timestamp created_at
    }
    
    ORDER {
        ObjectId id PK
        ObjectId consumer_id FK
        ObjectId farmer_id FK
        ObjectId delivery_id FK
        string order_number UK
        enum status
        float total_amount
        float discount_amount
        float delivery_fee
        float tax_amount
        float final_amount
        string delivery_address
        string special_instructions
        timestamp order_date
        timestamp estimated_delivery
        timestamp actual_delivery
        float rating
    }
    
    ORDER_ITEM {
        ObjectId id PK
        ObjectId order_id FK
        ObjectId product_id FK
        int quantity
        float unit_price
        float total_price
        string notes
    }
    
    PAYMENT {
        ObjectId id PK
        ObjectId order_id FK
        enum payment_method
        string transaction_id UK
        enum payment_status
        float amount
        timestamp payment_date
        string payment_gateway_response
    }
    
    DELIVERY {
        ObjectId id PK
        ObjectId order_id FK
        ObjectId delivery_partner_id FK
        enum delivery_status
        string pickup_location
        string delivery_location
        string current_location
        float latitude
        float longitude
        timestamp pickup_time
        timestamp delivery_time
        int rating
        text feedback
    }
```

---

## Sequence Diagram

### Order Placement & Fulfillment Flow

```mermaid
sequenceDiagram
    participant Consumer as 👥 Consumer
    participant Frontend as 🌐 Frontend
    participant Backend as 🔧 Backend Server
    participant Database as 💾 Database
    participant PaymentGW as 💳 Payment Gateway
    participant Farmer as 🌾 Farmer
    participant DeliveryPartner as 🚗 Delivery Partner
    
    Consumer->>Frontend: Browse & Select Products
    Consumer->>Frontend: Add to Cart
    Consumer->>Frontend: Proceed to Checkout
    
    Frontend->>Frontend: Validate Cart Items
    
    Consumer->>Frontend: Enter Delivery Address
    Consumer->>Frontend: Confirm Order
    
    Frontend->>Backend: POST /api/orders (Create Order)
    activate Backend
    
    Backend->>Database: Save Order (Status: Pending)
    activate Database
    Database-->>Backend: Order Created
    deactivate Database
    
    Backend->>Backend: Calculate Total & Tax
    Backend->>PaymentGW: Initialize Payment
    activate PaymentGW
    
    PaymentGW-->>Backend: Payment URL/Status
    deactivate PaymentGW
    
    Backend-->>Frontend: Payment Page Link
    deactivate Backend
    
    Frontend->>PaymentGW: Redirect Consumer
    Consumer->>PaymentGW: Enter Payment Details
    PaymentGW->>PaymentGW: Process Payment
    
    PaymentGW->>Backend: Payment Webhook (Success/Failure)
    activate Backend
    
    Backend->>Database: Update Order Status (Confirmed)
    activate Database
    Database-->>Backend: Updated
    deactivate Database
    
    Backend->>Backend: Find Matching Farmer
    Backend->>Farmer: Send Order Notification
    
    Farmer->>Frontend: View New Order
    Farmer->>Frontend: Accept Order
    Frontend->>Backend: POST /api/orders/:id/accept
    
    Backend->>Database: Update Order Status (Accepted by Farmer)
    Database-->>Backend: Updated
    deactivate Database
    
    Backend->>Backend: Find Available Delivery Partner
    Backend->>DeliveryPartner: Send Delivery Request
    
    DeliveryPartner->>Frontend: View Available Delivery
    DeliveryPartner->>Frontend: Accept Delivery
    Frontend->>Backend: POST /api/deliveries/accept
    activate Database
    
    Backend->>Database: Update Delivery Status (Assigned)
    Database-->>Backend: Updated
    deactivate Database
    
    Backend->>Consumer: Send Notification (Order Confirmed)
    Backend->>Farmer: Send Notification (Farmer Confirmed)
    Backend->>DeliveryPartner: Send Notification (Delivery Assigned)
    
    Farmer->>Frontend: Prepare Order
    Farmer->>Frontend: Mark Ready for Pickup
    Frontend->>Backend: PUT /api/orders/:id/status
    
    Backend->>Database: Update Status (Ready for Pickup)
    Database-->>Backend: Updated
    deactivate Backend
    
    DeliveryPartner->>Frontend: Pickup Order
    DeliveryPartner->>Frontend: Update Location
    Frontend->>Backend: PUT /api/deliveries/:id/location
    
    Backend->>Database: Update Location
    Database-->>Backend: Updated
    
    Consumer->>Frontend: Track Order
    Frontend->>Backend: GET /api/deliveries/:id/track
    Backend-->>Frontend: Current Location & ETA
    Frontend->>Consumer: Show Live Tracking
    
    DeliveryPartner->>Frontend: Deliver Order
    DeliveryPartner->>Frontend: Mark Delivered
    Frontend->>Backend: PUT /api/deliveries/:id/complete
    
    Backend->>Database: Update Delivery Status (Completed)
    Database-->>Backend: Updated
    
    Backend->>Consumer: Send Notification (Delivered)
    Consumer->>Frontend: Rate & Review Order
    Frontend->>Backend: POST /api/reviews
    
    Backend->>Database: Save Review & Rating
    Database-->>Backend: Saved
    
    Backend->>Farmer: Send Earnings Update
    Backend->>DeliveryPartner: Send Earnings Update
```

---

## Collaboration Diagram

### Component Interactions

```mermaid
graph TB
    subgraph Clients["Client Applications"]
        WebApp["🌐 Web App<br/>React"]
        MobileApp["📱 Mobile App<br/>React Native"]
    end
    
    subgraph Gateway["API Gateway Layer"]
        ExpressServer["🔧 Express Server<br/>Port 5000"]
        Middleware["Middleware Stack<br/>Auth, Validation,<br/>Logging, RateLimit"]
    end
    
    subgraph Services["Business Logic Services"]
        AuthService["🔐 Auth Service<br/>JWT, Sessions"]
        ProductService["📦 Product Service<br/>Inventory"]
        OrderService["📋 Order Service<br/>Orchestration"]
        PaymentService["💳 Payment Service<br/>Stripe Integration"]
        DeliveryService["🚗 Delivery Service<br/>Location & Tracking"]
        ReviewService["⭐ Review Service<br/>Ratings"]
    end
    
    subgraph DataLayer["Data Access Layer"]
        MongoDB["💾 MongoDB<br/>Primary Database"]
        Redis["⚡ Redis Cache<br/>Sessions, Data"]
    end
    
    subgraph External["External Services"]
        Stripe["💳 Stripe<br/>Payment Processing"]
        Nodemailer["📧 Nodemailer<br/>Email Service"]
        AWS["☁️ AWS S3<br/>File Storage"]
        LocationAPI["📍 Location API<br/>Maps & Geocoding"]
    end
    
    subgraph Real_Time["Real-time Communication"]
        SocketIO["🔔 Socket.io<br/>Live Updates"]
    end
    
    WebApp -->|HTTP/REST| ExpressServer
    MobileApp -->|HTTP/REST| ExpressServer
    
    ExpressServer --> Middleware
    Middleware --> AuthService
    Middleware --> ProductService
    Middleware --> OrderService
    Middleware --> PaymentService
    Middleware --> DeliveryService
    Middleware --> ReviewService
    
    AuthService --> MongoDB
    AuthService --> Redis
    
    ProductService --> MongoDB
    ProductService --> Redis
    ProductService --> AWS
    
    OrderService --> MongoDB
    OrderService --> Redis
    
    PaymentService --> Stripe
    PaymentService --> MongoDB
    
    DeliveryService --> MongoDB
    DeliveryService --> Redis
    DeliveryService --> LocationAPI
    
    ReviewService --> MongoDB
    
    OrderService -->|Trigger| PaymentService
    OrderService -->|Trigger| DeliveryService
    
    PaymentService -->|Confirmation| Nodemailer
    OrderService -->|Notification| Nodemailer
    DeliveryService -->|Notification| Nodemailer
    
    SocketIO -->|Updates| WebApp
    SocketIO -->|Updates| MobileApp
    
    DeliveryService -->|Broadcast| SocketIO
    OrderService -->|Broadcast| SocketIO
    
    style Clients fill:#E3F2FD,stroke:#1976D2
    style Gateway fill:#F3E5F5,stroke:#7B1FA2
    style Services fill:#FFF3E0,stroke:#F57C00
    style DataLayer fill:#F1F8E9,stroke:#558B2F
    style External fill:#FCE4EC,stroke:#C2185B
    style Real_Time fill:#E0F2F1,stroke:#00695C
```

---

## Network Diagram

### System Architecture & Infrastructure

```mermaid
graph TB
    subgraph Internet["🌐 Internet"]
        Users["End Users<br/>Consumers, Farmers,<br/>Delivery Partners"]
    end
    
    subgraph CDN["CDN Layer<br/>CloudFront"]
        StaticAssets["Static Assets<br/>Images, CSS, JS"]
    end
    
    subgraph LoadBalancer["Load Balancer<br/>Nginx/AWS ELB"]
        LB["Load Balancing"]
    end
    
    subgraph ApplicationServers["Application Servers<br/>Node.js Cluster"]
        Server1["Server Instance 1<br/>Express + Port 5000"]
        Server2["Server Instance 2<br/>Express + Port 5001"]
        Server3["Server Instance 3<br/>Express + Port 5002"]
    end
    
    subgraph CacheLayer["Cache Layer"]
        Redis1["Redis Primary<br/>Session Store"]
        Redis2["Redis Replica<br/>Backup"]
    end
    
    subgraph DatabaseCluster["Database Cluster<br/>MongoDB"]
        Primary["Primary Node<br/>Write Operations"]
        Secondary1["Secondary Node 1<br/>Read Replica"]
        Secondary2["Secondary Node 2<br/>Read Replica"]
    end
    
    subgraph FileStorage["File Storage<br/>AWS S3"]
        Bucket["S3 Bucket<br/>Product Images<br/>User Avatars"]
    end
    
    subgraph QueueSystem["Message Queue<br/>Bull/Redis Queue"]
        Queue["Job Queue<br/>Email, Notifications<br/>Background Tasks"]
    end
    
    subgraph PaymentProvider["Payment Provider"]
        Stripe["Stripe API<br/>Payment Processing"]
    end
    
    subgraph EmailService["Email Service"]
        NodeMailer["Nodemailer<br/>SMTP Server"]
    end
    
    subgraph Monitoring["Monitoring & Logs"]
        ELK["ELK Stack<br/>Elasticsearch<br/>Logstash<br/>Kibana"]
        PM2["PM2<br/>Process Manager"]
    end
    
    Users -->|HTTPS| CDN
    Users -->|HTTPS| LB
    
    CDN --> StaticAssets
    
    LB --> Server1
    LB --> Server2
    LB --> Server3
    
    Server1 -->|Read/Write| Redis1
    Server2 -->|Read/Write| Redis1
    Server3 -->|Read/Write| Redis1
    
    Redis1 -->|Replication| Redis2
    
    Server1 -->|Query| Primary
    Server2 -->|Query| Primary
    Server3 -->|Query| Primary
    
    Primary -->|Replication| Secondary1
    Primary -->|Replication| Secondary2
    
    Server1 -->|Store| Bucket
    Server2 -->|Store| Bucket
    Server3 -->|Store| Bucket
    
    Server1 -->|Enqueue| Queue
    Server2 -->|Enqueue| Queue
    Server3 -->|Enqueue| Queue
    
    Queue -->|Process| NodeMailer
    Queue -->|Process| PM2
    
    Server1 -->|API Call| Stripe
    Server2 -->|API Call| Stripe
    Server3 -->|API Call| Stripe
    
    Server1 -->|Logs| ELK
    Server2 -->|Logs| ELK
    Server3 -->|Logs| ELK
    
    PM2 -->|Monitor| ELK
    
    style Internet fill:#E3F2FD,stroke:#1976D2
    style CDN fill:#F3E5F5,stroke:#7B1FA2
    style LoadBalancer fill:#FFF3E0,stroke:#F57C00
    style ApplicationServers fill:#FCE4EC,stroke:#C2185B
    style CacheLayer fill:#E0F2F1,stroke:#00695C
    style DatabaseCluster fill:#F1F8E9,stroke:#558B2F
    style FileStorage fill:#FFE0B2,stroke:#E65100
    style QueueSystem fill:#F0F4C3,stroke:#827717
    style PaymentProvider fill:#F8BBD0,stroke:#C2185B
    style EmailService fill:#B2DFDB,stroke:#004D40
    style Monitoring fill:#EEEEEE,stroke:#424242
```

---

## Gantt Chart

### Project Development Timeline

```mermaid
gantt
    title FreshConnect Project Development Timeline - 6 Months
    dateFormat YYYY-MM-DD
    
    section Phase 1: Planning & Setup
    Project Planning                           :planning, 2026-01-01, 30d
    Requirements Analysis                      :req, after planning, 20d
    Architecture Design                        :arch, after req, 20d
    Development Environment Setup              :env, after arch, 10d
    
    section Phase 2: Backend Development
    Database Design                            :db, after env, 15d
    Authentication Module                      :auth, after db, 20d
    Product Management API                     :prodapi, after auth, 25d
    Order Processing System                    :orderapi, after prodapi, 30d
    Payment Integration                        :payment, after orderapi, 20d
    Delivery Tracking System                   :delivery, after payment, 25d
    Review & Rating System                     :review, after delivery, 15d
    Admin Dashboard API                        :adminapi, after review, 20d
    
    section Phase 3: Frontend Development
    UI/UX Design                               :design, after env, 20d
    React Component Library                    :components, after design, 25d
    Consumer Portal                            :consumer, after components, 40d
    Farmer Dashboard                           :farmer, after consumer, 35d
    Delivery Partner App                       :dp_app, after farmer, 30d
    Admin Dashboard                            :admin_ui, after dp_app, 25d
    
    section Phase 4: Integration & Testing
    Frontend-Backend Integration               :integration, after orderapi, 30d
    Unit Testing (Backend)                     :unit_test, after payment, 20d
    Integration Testing                        :int_test, after delivery, 25d
    Performance Testing                        :perf_test, after integration, 15d
    Security Testing                           :security_test, after int_test, 15d
    UAT (User Acceptance Testing)              :uat, after security_test, 20d
    
    section Phase 5: Deployment & Launch
    Staging Environment                        :staging, after integration, 15d
    Production Deployment                      :production, after staging, 10d
    Go-Live Support                            :support, after production, 15d
    Performance Monitoring                     :monitor, after production, 30d
    
    section Parallel Tasks
    Security Implementation                    :sec, after env, 60d
    Documentation                              :doc, after planning, 120d
    DevOps Setup (CI/CD)                       :devops, after env, 60d
    QA & Bug Fixes                             :qa, after unit_test, 50d
```

---

## 📈 Architecture Summary

### Key Components:
- **Frontend**: React.js with Redux for state management
- **Backend**: Node.js + Express.js with RESTful APIs
- **Database**: MongoDB for data persistence
- **Cache**: Redis for sessions and performance
- **Payment**: Stripe integration for secure transactions
- **Real-time**: Socket.io for live tracking and notifications
- **File Storage**: AWS S3 for product images and user avatars
- **Email**: Nodemailer for notifications
- **Authentication**: JWT-based authentication

### Data Flow:
1. Users interact with frontend applications
2. Requests route through API Gateway (Express server)
3. Middleware handles authentication, validation, and logging
4. Business logic services process requests
5. Data persisted in MongoDB with Redis caching
6. External services handle payments and communications
7. Real-time updates via Socket.io

---

## 📝 Development Guidelines

### API Structure
```
/api/v1
  /auth          - Authentication endpoints
  /products      - Product management
  /orders        - Order processing
  /deliveries    - Delivery tracking
  /reviews       - Reviews & ratings
  /users         - User management
  /admin         - Admin operations
  /payments      - Payment processing
```

### Response Format
```json
{
  "success": true/false,
  "message": "Operation result message",
  "data": {},
  "error": "Error details if any",
  "timestamp": "ISO 8601 timestamp"
}
```

### Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Server Error

---

**Document Version**: 1.0  
**Last Updated**: May 4, 2026  
**Maintained By**: FreshConnect Development Team
