# Alpha Authenticator
![alt text](assets/icon-1024-1024.png)
-----

## Overview

Alpha Authenticator is a secure, reliable, and user-friendly two-factor authentication (2FA) app designed to enhance your account security. It generates time-based one-time passwords (TOTP) and supports multiple accounts with ease. The app is built primarily for Android platforms using React Native and Expo, with a robust backend powered by Node.js, Express, and MongoDB.

## Key Features

Secure TOTP Generation: Generates time-based one-time passwords for your accounts.

Account Management: Add, edit, and manage multiple accounts with unique keys.

Biometric Authentication: Use fingerprint or face recognition for quick access.

QR Code Scanning: Easily add accounts by scanning QR codes.

Dark Mode Support: Switch between light and dark themes based on your preference.

JWT Authentication: Secure communication between the client and the server.

## How It Works

Add an Account:

Open the app and click on "Add Account."

Scan a QR code or manually enter the app name and secret key.

Generate Codes:

Select an account to view the generated TOTP.

Use the TOTP to log into your desired service.

Enhanced Security:

Use biometric authentication to secure app access.

Communicates securely with the backend using JWT for authentication.

## Installation

# Prerequisites

Node.js (version 16 or later)

MongoDB (for backend database)

Expo CLI

A smartphone running Android

Steps

Backend Setup

Clone the repository:

git clone 
cd 

Install dependencies:

``` bash
npm install
```

Set up environment variables:

Create a .env file in the backend directory and add the following:
``` bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Start the backend server:

``` bash
npm start
```
Frontend Setup

clone app repo:

cd ../frontend

Install dependencies:

``` bash
npm install
```

Start the development server:
``` bash
npx expo start
```

Scan the QR code using the Expo Go app on your smartphone to preview the app.

## Permissions

The app requires the following permissions:

Camera: For scanning QR codes.

Biometric Authentication: For securing app access.

## Tech Stack

Frontend: React Native

Backend: Node.js, Express

Database: MongoDB

Libraries:

jsonwebtoken: JWT-based authentication

react-navigation: Navigation within the app

expo-barcode-scanner: QR code scanning

expo-local-authentication: Biometric authentication

async-storage: Local data storage

## Screenshots

Home Screen



Add Account Screen



## Future Enhancements

Cloud backup and sync across devices

Support for HOTP (HMAC-based One-Time Passwords)

Push notification for expiring codes

## Contribution

Contributions are welcome! If you’d like to improve the app or fix bugs, follow these steps:

Fork the repository

Create a new branch:

``` bash
git checkout -b feature-name
```

Commit your changes:

``` bash
git commit -m "Add a meaningful message"
```
Push to the branch:
```bash
git push origin feature-name
```
Open a pull request

License

This project is licensed under the MIT License.

Contact

For any inquiries, feel free to contact me:

Email: talktojmcvibes@gmail.com

LinkedIn: [Salako Wasiu Ayomide](https://www.linkedin.com/in/wagzyayo/)

Thank you for using Alpha Authenticator!