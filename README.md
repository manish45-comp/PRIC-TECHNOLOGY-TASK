
# Google Cloud Functions API with Next.js Frontend

## Overview

This project integrates a Google Cloud Functions API with a Next.js frontend for a CRUD-based user dashboard. The frontend is styled with Tailwind CSS, uses TypeScript, and is containerized with Docker for seamless deployment.



## 1. Google Cloud Functions API Setup

Prerequisites
Google Cloud Account.
Node.js installed.
Firebase CLI installed.

## Steps to Set Up
Create a Firebase Project

Go to Firebase Console.

Click "Add Project" and follow the instructions to create a new project.

Enable Firestore in Native Mode in the "Build > Firestore Database" section.

## Initialize Firebase in Your Project

```bash
    firebase login
    firebase init
```
Choose Functions and link it to your Firebase project.

Select TypeScript for the functions language.

Use the default settings for ESLint and dependencies.

## Write Your API Functions

Example CRUD functions (e.g., createUser, getUser, updateUser, deleteUser) can be placed in functions/src/index.ts.

## Deploy the Functions 
Deploy your API to Google Cloud:

```bash
firebase deploy --only functions
```
## Testing Locally
 You can test the functions locally using:

 ```bash
firebase emulators:start
```
## 2. Next.js Application Setup

### Initialize the Next.js Project

```bash
npx create-next-app@latest my-nextjs-app --typescript --tailwind
cd my-nextjs-app
```

### Install Dependencies
```bash
npm install axios
```

### Configure Tailwind CSS

Tailwind is pre-installed if you chose the Tailwind option during initialization.

Update tailwind.config.js for custom styling if needed.
### Set Up API Integration

Create a services/api.ts file to define Axios methods for interacting with the Google Cloud Functions API:

```bash
import axios from "axios";

const API_BASE_URL = "https://<your-cloud-functions-url>";
export const api = axios.create({ baseURL: API_BASE_URL });

```

### Implement CRUD Operations

Use hooks or context for fetching and managing data. Example

```bash
import { api } from "../services/api";

export async function fetchUsers() {
  const response = await api.get("/users");
  return response.data;
}
```

## 3. Docker Setup for Next.js
### Steps to Containerize
### Create a Dockerfile 
Add a Dockerfile in the root of your Next.js project:

```bash
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Build the Docker Image

```bash 
docker build -t nextjs-frontend .
```

### Run the Docker Container

```bash
docker run -p 3000:3000 nextjs-frontend
```

## 4. CRUD Operations Guide

## Endpoints for Google Cloud Functions

### Create User (POST)

```bash
URL: /createUser
```
Body: 
```bash 
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "age": 30,
  "city": "New York",
  "country": "USA"
}
```

### Read User (GET)

```bash
URL: /getUsers
```

### Update User (PUT)
```bash
URL: /updateUser?id=<USER_ID>
```
Body: 
```bash 
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "age": 30,
  "city": "New York",
  "country": "USA"
}
```

### Delete User (DELETE)
```bash
URL: /deleteUser?id=<USER_ID>
```

## 5. Running Locally

Start the Backend
```bash
firebase emulators:start

```

Start the Frontend
```bash
npm run dev

```

Open http://localhost:3000 in your browser.


## 6. Deploying the Frontend with Docker
### Build the Docker Image
```bash
docker build -t nextjs-frontend .
```
### Run the Container
```bash
docker run -p 3000:3000 nextjs-frontend
```
Access the app at http://localhost:3000.