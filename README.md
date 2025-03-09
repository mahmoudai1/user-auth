# Table of Contents
- [Project Structure](#project-structure)
- [How to run](#how-to-run)
- [Overview](#overview)
- [Design](#design)
- [APIs](#apis)
- [Extra Features to Consider](#extra-features-to-consider)
- [Demo Video](#demo)

## Project Structure
<img width="268" alt="Screenshot 2025-03-10 at 12 55 43 AM" src="https://github.com/user-attachments/assets/62eef087-0681-4836-9336-684ec68dcb25" />
<img width="268" alt="Screenshot 2025-03-10 at 12 56 31 AM" src="https://github.com/user-attachments/assets/910e2632-b197-41e0-8420-4f40ec17a88f" />

## How to run
- Paste the `MONGO_CONNECTION_STRING` sent via mail to > `/server/.env`.
- `cd client && npm install && cd ../server && npm install && cd ..`
- `cd client && npm run dev`
- Create new terminal and run `cd server && npm start`
- Open `http://localhost:5173/` to start

## Overview
- User Auth (Login and Register).
- Username and email are unique indexes.
- React.js with Node.js written in Typescript are used, with MongoDB cloud.
- Custom Middlewares developed > `JWT auth`, `ErrorHandling`, `RateLimiting`
- Custom Utilities developed > `ResponseHandler`

## Design
- Simple, modern, and light design.
- Followed UI/UX best practices with different media queries.
- TailwindCSS is used for styling.

## APIs
- `/api/v1/login` - `POST`
- `/api/v1/signup` - `POST`
- `/api/v1/verify` - `GET`

## Extra Features to Consider
- Unit tests
- Remember me
- Forget password
- Email Confirmation

## Demo Video
