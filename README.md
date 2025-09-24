🏥 Pharmacy Management System

A microservices-based Spring Boot application for managing pharmacy operations including users (admins/doctors), medicines, orders, inventory, suppliers, sales reports, and payments.

This system is built using Spring Boot, Spring Security (JWT), Spring Cloud Gateway, MongoDB, and Swagger UI for API documentation.

📌 Features

User Management
 Admin and Doctor roles
 Signup & Login using JWT authentication
 Role-based access control

Medicine Management
 Add, update, delete, and search medicines
 Inventory & Supplier Management
 Track stock levels

Manage suppliers and their medicine supplies
 Order Management
 Place, verify, and pick up orders
 Status-based order tracking

Sales Reports
 Generate daily, weekly, and monthly reports

Payment Service
 Standalone service for handling doctor payments
 Razorpay integration for secure payments

API Gateway
 Routes all requests to backend microservices
 Validates JWT tokens for security

Documentation
 Swagger UI available for each microservice

⚙️ Microservices Architecture
Microservice	Port	Responsibility
Users Microservice	: 8081	Admin/Doctor management, JWT authentication
Orders Microservice :	8083	Order placement, verification, pickup
Medicine Microservice:	8084	Medicine CRUD and search
Supplier-Inventory MS:	8085	Supplier & stock management
Sales Report Microservice	: 8086	Sales reporting
Payment Microservice :	8087	Doctor payments (Razorpay integration)
API Gateway	: 8080	Central entry point, JWT validation

🛠️ Tech Stack
Backend: Spring Boot 3.2.1, Spring Cloud Gateway, Spring Security (JWT), Lombok
Database: MySQL
Frontend: React + Axios
Payment: Razorpay SDK
API Docs: Swagger (Springdoc OpenAPI),Logger

🚀 Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/PrathmeshKP/pharmacy-management-system.git
cd pharmacy-management-system

2️⃣ Start MySQL
Make sure MongoDB is running on default port 27017.

3️⃣ Run Each Microservice
Navigate into each microservice folder and start with Maven:
mvn spring-boot:run

4️⃣ Access API Gateway
http://localhost:8080

5️⃣ Access Swagger UI
Example for Users Microservice:
http://localhost:8081/swagger-ui.html

🔐 Authentication Flow
Signup/Login → POST /api/auth/signup or POST /api/auth/login (Users MS)

Receive JWT Token in response
Include JWT Token in request headers for protected routes:
Authorization: Bearer <your_token>
API Gateway validates token before forwarding requests


📊 Project Status

✅ Users Microservice (JWT auth + roles), Medicine, Supplier, Inventory, Orders, Sales Reports microservices implemented
✅ Payment Microservice created
✅ Frontend Complete Functional
✅ API Gateway routing set up
✅ JWT validation at API Gateway level (in progress)
✅ Unit testing and role-based restrictions

👨‍💻 Contributors : Prathmesh Pathak
