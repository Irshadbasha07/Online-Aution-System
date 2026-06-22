# Online Auction System

## Project Overview

The Online Auction System is a full-stack web application that allows users to participate in online auctions in real time. The system provides secure authentication, role-based access control, live bidding functionality, and real-time auction updates using WebSockets.

This project was developed to demonstrate modern full-stack development concepts using React, Spring Boot, MySQL, JWT Authentication, and WebSocket communication.

---

## Features

### User Features

* User Registration
* User Login
* JWT Authentication
* View Live Auctions
* Place Bids on Active Auctions
* Real-Time Bid Updates
* Live Auction Countdown Timer

### Admin Features

* Create New Auctions
* Delete Auctions
* Manage Auction Listings

### Security Features

* JWT Token-Based Authentication
* Role-Based Authorization (ADMIN / USER)
* Password Encryption using BCrypt
* Protected API Endpoints

### Real-Time Features

* WebSocket Communication using STOMP and SockJS
* Instant Bid Updates Without Page Refresh
* Live Auction Status Monitoring

---

## Technology Stack

### Frontend

* React.js
* Material UI
* Axios
* SockJS
* STOMP.js

### Backend

* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication
* WebSocket

### Database

* MySQL

### Build Tools

* Maven
* npm

---

## System Architecture

Frontend (React)
↓
REST APIs
↓
Spring Boot Backend
↓
Spring Security + JWT
↓
MySQL Database

Real-Time Communication:
WebSocket + STOMP + SockJS

---

## Database Entities

### User

* id
* username
* password
* role

### AuctionItem

* id
* title
* description
* startingPrice
* currentBid
* endTime

### Bid

* id
* amount
* item

---

## Authentication Flow

1. User registers an account.
2. User logs in using username and password.
3. Backend validates credentials.
4. JWT token is generated.
5. Token is stored in local storage.
6. Protected APIs are accessed using the JWT token.

---

## Auction Workflow

1. Admin creates an auction.
2. Users can view available auctions.
3. Users place bids on active auctions.
4. Bid amount must be greater than the current highest bid.
5. Real-time updates are sent to all connected users.
6. Bidding is automatically disabled when the auction ends.

---

## Installation and Setup

### Clone Repository

```bash
git clone https://github.com/your-username/online-auction-system.git
cd online-auction-system
```

### Backend Setup

1. Open backend project in Eclipse or IntelliJ IDEA.
2. Configure MySQL database in application.properties.
3. Create database:

```sql
CREATE DATABASE auctiondb;
```

4. Run Spring Boot application.

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

### Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React application:

```bash
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

## Future Enhancements

* Auction Item Images
* Email Notifications
* Payment Gateway Integration
* Auction History Tracking
* User Profile Management
* Admin Dashboard Analytics
* Cloud Deployment

---

## Learning Outcomes

This project helped in understanding:

* Full Stack Development
* REST API Development
* Spring Security
* JWT Authentication
* Role-Based Authorization
* Database Design
* WebSocket Communication
* Real-Time Applications
* React Frontend Development

---

## Author

Baitipeta Irshad Basha

B.Tech Computer Science and Engineering (AI & ML)

GitHub: https://github.com/Irshadbasha07/
