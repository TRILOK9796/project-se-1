# 🎨 FreshConnect Diagrams - Quick Visual Reference

## 📍 Quick Links

- **Full Diagrams**: [SYSTEM_DIAGRAMS.md](./SYSTEM_DIAGRAMS.md)
- **Navigation Guide**: [DIAGRAMS_GUIDE.md](./DIAGRAMS_GUIDE.md)
- **GitHub Repository**: [github.com/TRILOK9796/project-se-1](https://github.com/TRILOK9796/project-se-1)

---

## 🎯 Diagram Overview Matrix

| # | Diagram Type | Purpose | Audience | Used For |
|---|---|---|---|---|
| 1 | **DFD Level 0** | System Context | All | Understanding system scope & external entities |
| 2 | **DFD Level 1** | Main Processes | Developers | System decomposition into 7 processes |
| 3 | **DFD Level 2** | Detailed Flows | Developers | Deep dive into order processing workflow |
| 4 | **Use Case** | User Interactions | Stakeholders | Requirements & feature validation |
| 5 | **ER Diagram** | Database Schema | Database Teams | Schema design & relationships |
| 6 | **Sequence** | Process Workflow | Developers | Step-by-step order placement flow |
| 7 | **Collaboration** | Component Interaction | Architects | System components & dependencies |
| 8 | **Network** | Infrastructure | DevOps/IT | Deployment & server architecture |
| 9 | **Gantt Chart** | Timeline | Project Managers | 6-month development schedule |

---

## 📊 What Each Diagram Shows

### 1️⃣ DFD Level 0 - System Context
```
┌─────────────────────────────────────┐
│  EXTERNAL ACTORS                     │
├─────────────────────────────────────┤
│ • Consumers                          │
│ • Farmers                            │
│ • Delivery Partners                  │
│ • Admins                             │
│ • Payment Gateway (Stripe)           │
│ • Email Service (Nodemailer)         │
│ • Location Service                   │
├─────────────────────────────────────┤
│      FRESHCONNECT PLATFORM           │
│  (Single black box system)           │
├─────────────────────────────────────┤
│  DATA FLOWS:                         │
│  → Orders, Products, Payments        │
│  ← Confirmations, Tracking           │
└─────────────────────────────────────┘
```

### 2️⃣ DFD Level 1 - Main Processes
```
┌──────────────────────────────────────┐
│    7 MAIN PROCESSES                  │
├──────────────────────────────────────┤
│ 1.0 Authentication & Authorization   │
│ 2.0 Product Management               │
│ 3.0 Order Processing ⭐              │
│ 4.0 Delivery Tracking                │
│ 5.0 Payment Processing               │
│ 6.0 Review & Rating                  │
│ 7.0 Admin Management                 │
├──────────────────────────────────────┤
│    DATA STORES:                      │
│    • MongoDB (Database)              │
│    • Redis (Cache)                   │
└──────────────────────────────────────┘
```

### 3️⃣ DFD Level 2 - Order Processing Detail
```
ORDER PROCESSING (3.0) BREAKDOWN:

3.1 Order Creation
    ├─ Browse Products
    ├─ Shopping Cart
    └─ Order Validation
    
3.2 Farmer Assignment
    ├─ Match Farmer
    ├─ Send Notification
    └─ Farmer Accept/Reject
    
3.3 Payment Processing
    ├─ Payment Initiation
    ├─ Process in Gateway
    └─ Confirmation
    
3.4 Delivery Assignment
    ├─ Match Partner
    ├─ Send Request
    └─ Partner Accept
    
3.5 Order Fulfillment
    ├─ Packing
    ├─ Pickup
    ├─ Delivery
    └─ Complete Order
```

### 4️⃣ Use Case Diagram
```
USERS & THEIR ACTIONS:

Consumer (10 use cases)
├─ Authentication (3)
├─ Product Search (3)
├─ Ordering (4)
└─ Review (1)

Farmer (9 use cases)
├─ Authentication (3)
├─ Product Mgmt (3)
├─ Order Handling (2)
└─ Earnings (1)

Delivery Partner (8 use cases)
├─ Authentication (3)
├─ Delivery Mgmt (3)
├─ Tracking (1)
└─ Earnings (1)

Admin (8 use cases)
├─ Authentication (2)
├─ System Mgmt (6)
└─ Reporting (1)
```

### 5️⃣ ER Diagram - Database
```
ENTITIES & RELATIONSHIPS:

User (Base) ──┬─→ Consumer
              ├─→ Farmer
              ├─→ Delivery Partner
              └─→ Admin

Farmer ──────→ Products ──→ Reviews ←── Consumer
                    ↓
              OrderItems
                    ↓
Order ◄──────────────┘
  ├─→ Payment
  ├─→ Delivery
  └─→ Consumer

DeliveryPartner ──→ Delivery
```

### 6️⃣ Sequence Diagram - Order Flow
```
TIME SEQUENCE (Step by Step):

1. Consumer: Browse & Order
2. Frontend: Validate Cart
3. Backend: Create Order
4. Stripe: Process Payment
5. Backend: Confirm Payment
6. Farmer: Receive Order
7. Farmer: Accept Order
8. Backend: Assign Delivery
9. Partner: Accept Delivery
10. Farmer: Prepare & Pack
11. Partner: Pickup Order
12. Partner: Update Location (Live Tracking)
13. Consumer: Track Order
14. Partner: Deliver
15. System: Mark Complete
16. Consumer: Review & Rate
17. Backend: Update Earnings
```

### 7️⃣ Collaboration Diagram - Components
```
┌─────────────────────────────────────┐
│   CLIENT LAYER                      │
│  • Web App (React)                  │
│  • Mobile App (React Native)        │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│   API GATEWAY                       │
│  • Express Server                   │
│  • Middleware Stack                 │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│   BUSINESS LOGIC SERVICES (7)       │
│  1. Auth Service                    │
│  2. Product Service                 │
│  3. Order Service                   │
│  4. Payment Service                 │
│  5. Delivery Service                │
│  6. Review Service                  │
│  7. User Management                 │
└────┬────────┬────────┬──────────────┘
     │        │        │
   ┌─▼──┐  ┌──▼─┐   ┌──▼───┐
   │ DB │  │Redis│   │External
   │    │  │     │   │Services
   └────┘  └─────┘   └───────┘
```

### 8️⃣ Network Diagram - Infrastructure
```
DEPLOYMENT ARCHITECTURE:

┌─ END USERS ──┐
│              │
├─ CDN (CloudFront) - Static Files
│
├─ LOAD BALANCER (Nginx)
│
├─ APPLICATION SERVERS (3x Node.js)
│  ├─ Server 1
│  ├─ Server 2
│  └─ Server 3
│
├─ CACHE LAYER (Redis)
│  ├─ Primary
│  └─ Replica
│
├─ DATABASE CLUSTER (MongoDB)
│  ├─ Primary (Write)
│  ├─ Secondary 1 (Read)
│  └─ Secondary 2 (Read)
│
├─ FILE STORAGE (AWS S3)
│
├─ MESSAGE QUEUE (Bull)
│
├─ EXTERNAL SERVICES
│  ├─ Stripe (Payments)
│  └─ Nodemailer (Email)
│
└─ MONITORING
   ├─ ELK Stack
   └─ PM2
```

### 9️⃣ Gantt Chart - Timeline
```
PHASE BREAKDOWN (6 Months):

Phase 1: Planning & Setup
├─ Project Planning (30 days)
├─ Requirements Analysis (20 days)
├─ Architecture Design (20 days)
└─ Environment Setup (10 days)
   └─ Timeline: Jan 1 - Feb 10

Phase 2: Backend Development
├─ Database Design (15 days)
├─ Authentication (20 days)
├─ Product API (25 days)
├─ Order System (30 days)
├─ Payment Integration (20 days)
├─ Delivery Tracking (25 days)
├─ Review System (15 days)
└─ Admin API (20 days)
   └─ Timeline: Feb 10 - Apr 15

Phase 3: Frontend Development
├─ UI/UX Design (20 days)
├─ Components (25 days)
├─ Consumer Portal (40 days)
├─ Farmer Dashboard (35 days)
├─ Delivery App (30 days)
└─ Admin Dashboard (25 days)
   └─ Timeline: Feb 20 - May 25

Phase 4: Integration & Testing
├─ Integration (30 days)
├─ Unit Testing (20 days)
├─ Integration Testing (25 days)
├─ Performance Testing (15 days)
├─ Security Testing (15 days)
└─ UAT (20 days)
   └─ Timeline: Apr 15 - Jun 15

Phase 5: Deployment
├─ Staging (15 days)
├─ Production Deployment (10 days)
└─ Go-Live Support (15 days)
   └─ Timeline: Jun 15 - Jul 15
```

---

## 🔍 How to Read Each Diagram

### DFD Diagrams:
- **Rectangles** = External entities or processes
- **Circles/Nodes** = Data processes
- **Cylinders** = Data stores
- **Arrows** = Data flow direction

### Use Case:
- **Oval** = Use cases
- **Stick figures** = Actors
- **Lines** = Association

### ER Diagram:
- **Rectangles** = Entities
- **Lines** = Relationships
- **Numbers** = Cardinality (1:1, 1:N, M:N)

### Sequence:
- **Vertical lines** = Timeline
- **Horizontal arrows** = Messages/interactions
- **Boxes** = Actors/systems

### Network:
- **Boxes** = Servers/components
- **Arrows** = Data flow
- **Layered structure** = Infrastructure tiers

### Gantt:
- **Horizontal bars** = Task duration
- **Position on X-axis** = Time period
- **Length** = Task duration

---

## 📝 Key Statistics

### System Complexity:
- **Actors**: 4 (Consumer, Farmer, Delivery Partner, Admin)
- **Main Processes**: 7
- **API Endpoints**: 8+ resource groups
- **Database Entities**: 11
- **Microservices**: 7 business logic services
- **External Integrations**: 4 (Stripe, Nodemailer, AWS S3, Maps)

### Development Timeline:
- **Total Duration**: 6 months
- **Backend Development**: ~155 days
- **Frontend Development**: ~155 days
- **Testing & QA**: ~50-95 days
- **Deployment**: ~40 days

### Architecture:
- **Servers**: 3 Node.js instances (behind load balancer)
- **Databases**: 1 Primary + 2 Read Replicas (MongoDB)
- **Cache Nodes**: 1 Primary + 1 Replica (Redis)
- **External APIs**: 4 integrations

---

## ✅ Checklist: Using These Diagrams

- [ ] **Review**: Stakeholders review Use Case diagram
- [ ] **Approve**: Architecture team approves Network & Collaboration diagrams
- [ ] **Implement**: Developers use DFD Levels 1-2 for implementation
- [ ] **Code**: Use ER diagram for database schema
- [ ] **Track**: Use Sequence diagram for complex workflows
- [ ] **Plan**: Use Gantt chart for sprint planning
- [ ] **Monitor**: Reference diagrams during testing phase
- [ ] **Update**: Update diagrams as architecture evolves

---

## 🚀 Getting Started

### Step 1: View on GitHub
Visit: https://github.com/TRILOK9796/project-se-1/blob/master/SYSTEM_DIAGRAMS.md

### Step 2: Export Diagrams
- Copy Mermaid code
- Use: https://app.diagrams.net/ or https://mermaid.live/
- Export as PNG/SVG/PDF

### Step 3: Include in Documentation
- Add diagrams to technical specification
- Include in project proposal
- Reference in API documentation

---

## 📞 Support

**Questions about diagrams?**
- Refer to DIAGRAMS_GUIDE.md for detailed explanations
- Check SYSTEM_DIAGRAMS.md for full implementation
- Reference this file for quick visual overview

**Need to update?**
- Edit SYSTEM_DIAGRAMS.md directly
- Commit and push to GitHub
- Notify team of changes

---

**Last Updated**: May 4, 2026  
**Status**: ✅ All diagrams generated and pushed to GitHub  
**Commit**: `68d9d15`

🎉 Your FreshConnect system is now fully documented with comprehensive UML and system diagrams!
