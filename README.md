# Smart Hiking Tanggamus

Smart Hiking Tanggamus merupakan platform digital untuk pengelolaan pendakian Gunung Tanggamus yang menyediakan sistem registrasi pendaki, pemesanan tiket pendakian, upload bukti pembayaran, monitoring status pendakian, QR Code validation, serta dashboard administrasi berbasis web.

---

# Team HANDICAP

| Nama             | Role                   |
| ---------------- | ---------------------- |
| Subayu Kalla     | Backend Developer      |
| Imam Ali Saputra | Frontend CMS Developer |
| Muhammad Radityo | Mobile Developer       |

---

# Project Overview

Smart Hiking Tanggamus dikembangkan untuk mempermudah proses administrasi pendakian secara digital mulai dari registrasi pengguna hingga validasi pendaki saat check-in dan check-out.

Sistem terdiri dari tiga komponen utama:

* Backend REST API
* Frontend CMS Admin
* Mobile Application

---

# Features

## Backend API

* JWT Authentication
* Role Based Authorization (Admin & User)
* User Management
* Booking Management
* Upload Bukti Pembayaran
* QR Code Validation
* Dashboard Statistics
* Booking History
* Error Handling & Validation
* Swagger Documentation
* Cloudflare Tunnel Integration

---

## Admin CMS

* Admin Dashboard
* Data Pendaki
* User Management
* Booking Management
* Search & Pagination
* Verifikasi Pembayaran
* Approve / Reject Booking
* Tracking Pendaki
* QR Scanner
* Statistik Dashboard

---

## Mobile Application

* Register User
* Login User
* Profile User
* Booking Pendakian
* Upload Bukti Pembayaran
* Riwayat Booking
* Status Pendakian
* QR Ticket
* Tracking Pendakian

---

# System Architecture

```text
Mobile Application
        ↓
Frontend CMS
        ↓
Backend NestJS API
        ↓
Prisma ORM
        ↓
PostgreSQL Database
```

---

# Technology Stack

## Backend

* NestJS
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Swagger
* Cloudflare Tunnel

## Frontend CMS

* Next.js
* TypeScript
* TailwindCSS
* Axios

## Mobile App

* React Native
* Expo
* Axios

---

# API Documentation

### Local Swagger

```text
http://localhost:3001/api
```

### Online Swagger (Development)

```text
https://silent-surfing-idea-anyone.trycloudflare.com/api
```

---

# Authentication

Sistem menggunakan JWT Authentication dengan Bearer Token.

Fitur:

* Login User
* Login Admin
* Protected Route
* Role Authorization
* Profile Authentication

---

# Project Status

## Backend

Status: 90%

### Selesai

* Authentication
* Authorization
* CRUD User
* CRUD Booking
* Upload Bukti Pembayaran
* QR Scan
* Dashboard Statistics
* Booking History
* Swagger Documentation
* Cloudflare Tunnel

### Pengembangan Berikutnya

* Change Password
* Forgot Password
* Dashboard Analytics

---

## Frontend CMS

Status: Dalam Pengembangan

### Selesai

* Dashboard Statistics
* Data Pendaki
* Booking Management
* Integrasi API Backend

### Pengembangan Berikutnya

* QR Scanner
* Tracking Pendaki
* Dashboard Analytics

---

## Mobile Application

Status: Dalam Pengembangan

### Selesai

* Login & Register
* Booking Pendakian
* Upload Bukti Pembayaran
* Riwayat Booking

### Pengembangan Berikutnya

* Change Password
* Forgot Password
* Tracking Pendakian

---

# Screenshots

## CMS Dashboard

<img width="1600" height="1000" alt="Dashboard CMS" src="https://github.com/user-attachments/assets/a95b1b27-375d-4bb9-8bfb-7283561ddaa9" />

<img width="1600" height="1000" alt="Dashboard Admin" src="https://github.com/user-attachments/assets/7500b4bb-c8ed-4603-ac8a-e58aab2260b6" />

---

## Mobile Application

### Register & Login

<img src="https://github.com/user-attachments/assets/14972e0a-0fdd-462b-8ef7-5e09e8c25d3c" width="250"/>

### User Profile

<img src="https://github.com/user-attachments/assets/88aa90a4-ae65-465d-8f6c-a19e2f165b66" width="250"/>

### Ticket

<img src="https://github.com/user-attachments/assets/da652bfb-6e67-4ef5-897c-056af35e8978" width="250"/>

### Booking

<img width="250" src="https://github.com/user-attachments/assets/12326464-fc17-466d-b774-7dd5e39b5f7d"/>

---

## Backend API Documentation

### Swagger API Documentation

<img width="722" height="827" alt="Swagger API Documentation" src="https://github.com/user-attachments/assets/315337ef-2a3b-4ff6-bca9-c01f46d31e76" />

---

# Installation

## Clone Repository

```bash
git clone https://github.com/subayukalla18-dev/smart-hiking-tanggamus.git

cd smart-hiking-tanggamus
```

---

## Backend

```bash
cd backend

npm install

npm run start:dev
```

Backend Server:

```text
http://localhost:3001
```

Swagger:

```text
http://localhost:3001/api
```

---

## Frontend CMS

```bash
cd frontend-admin

npm install

npm run dev
```

Frontend CMS:

```text
http://localhost:3000
```

---

## Mobile Application

```bash
cd smart-hiking-mobile

npm install

npx expo start
```

---

# Repository Structure

```text
smart-hiking-tanggamus
│
├── backend
│   ├── prisma
│   ├── src
│   │   ├── auth
│   │   ├── booking
│   │   ├── user
│   │   ├── common
│   │   └── prisma
│   └── uploads
│
├── frontend-admin
│
├── smart-hiking-mobile
│
└── dokumentasi
```

---

# Contributors

* Subayu Kalla (Backend Developer)
* Imam Ali Saputra (Frontend CMS Developer)
* Muhammad Radityo (Mobile Developer)

---

# License

Project Smart Hiking Tanggamus dikembangkan untuk kebutuhan akademik, penelitian, dan pembelajaran pengembangan aplikasi berbasis web dan mobile.
<img width="722" height="827" alt="Cuplikan layar 2026-06-12 021303" src="https://github.com/user-attachments/assets/315337ef-2a3b-4ff6-bca9-c01f46d31e76" />

