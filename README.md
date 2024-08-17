# Meeting Room Booking System for Co-working spaces

A basic backend for an Meeting Room Booking System project, built with TypeScript, Node.js, Express, and MongoDB.

## Technology Stack:

- TypeScript as the programming language.
- Express.js as the web framework.
- Mongoose as the Object Data Modeling (ODM) and validation library for MongoDB

## Models:

### User Model:

- `name`: The name of the user.
- `email`: The contact email address.
- `password`: The account password.
- `phone`: The contact phone number.
- `address`: The physical address.
- `role`: The role of the user, can be `user` or `admin`.

### Room Model:

- `name`: The name of the meeting room.
- `roomNo` : The unique number of the room.
- `floorNo` : The level of the meeting room where it is located.
- `capacity`: The maximum number of people the room can accommodate.
- `pricePerSlot`: The individual cost of a single slot.
- `amenities`: An array of amenities available in the room (e.g., "Projector", "Whiteboard").
- `isDeleted`: Boolean to indicates whether the room has been marked as deleted (false means it is not deleted).

### Slot Model

- `room` : Reference to the specific room being booked.
- `date`: Date of the booking.
- `startTime`: Start time of the slot.
- `endTime`: End time of the slot.
- `isBooked`: Boolean to indicate whether the slot has been marked as booked (false means it is not booked).

### Booking Model:

- `room`: Identifier for the booked room (a reference to room model).
- `slots`: An array containing the slot IDs (a reference to the booking slots).
- `user`: Identifier for the user who booked the room (a reference to the user model).
- `date`: Date of the booking.
- `totalAmount` : The total amount of the bill is calculated based on the selected number of slots.
- `isConfirmed`: Indicates the booking status, whether it's `confirmed`, `unconfirmed`, or `canceled`.
- `isDeleted`: Boolean to indicates whether the booking has been marked as deleted (false means it is not deleted).

## Routes:

### Root Url:

`https://meeting-room-booking-system-puce.vercel.app/`

### User Sign Up:

- _*Route:*_ `/api/auth/signup` (POST)
- **Request Body:**

```json
{
  "name": "Maker Shihab",
  "email": "admin@gmail.com",
  "password": "ph-password",
  "phone": "1234567890",
  "role": "admin", //role can be user or admin
  "address": "123 Main Street, City, Country"
}
```

### User Login:

- _*Route:*_ `/api/auth/login` (POST)
- **Request Body:**

```json
{
  "email": "admin@gmail.com",
  "password": "ph-password"
}
```

### Room Routes:

#### Create Room (Only Accessible by Admin)

- _*Route:*_ `/api/rooms` (POST)
- **Request Headers:**

```plain
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmMwNThkNmEyZjVlODgwMmM0OTA2YmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjM4ODQzOTUsImV4cCI6MTcyNDc0ODM5NX0.2eKCEzU7JXpbUmN5dHwdVCDqFcNb7-2NEBeOZJOiTmM
```

- _*Request Body:*_

```json
{
  "name": "Conference Room",
  "roomNo": 201,
  "floorNo": 1,
  "capacity": 20,
  "pricePerSlot": 100,
  "amenities": ["Projector", "Whiteboard"]
}
```

#### Get a Room

- _*Route:*_ `/api/rooms/:id` (GET)

#### Get All Rooms

- _*Route:*_ `/api/rooms` (GET)

#### Update Room (Only Accessible by Admin)

- _*Route:*_ `/api/rooms/:id` (PUT)
- **Request Headers:**

```plain
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmMwNThkNmEyZjVlODgwMmM0OTA2YmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjM4ODQzOTUsImV4cCI6MTcyNDc0ODM5NX0.2eKCEzU7JXpbUmN5dHwdVCDqFcNb7-2NEBeOZJOiTmM
```

#### Delete a Room (Soft Delete, Only Accessible by Admin)

- _*Route:*_ `/api/rooms/:id` (DELETE)
- **Request Headers:**

```plain
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmMwNThkNmEyZjVlODgwMmM0OTA2YmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjM4ODQzOTUsImV4cCI6MTcyNDc0ODM5NX0.2eKCEzU7JXpbUmN5dHwdVCDqFcNb7-2NEBeOZJOiTmM
```

### Slot Routes:

#### Create Slot (Only Accessible by Admin)

- _*Route:*_ `/api/slots`(POST)
- **Request Headers:**

```plain
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmMwNThkNmEyZjVlODgwMmM0OTA2YmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjM4ODQzOTUsImV4cCI6MTcyNDc0ODM5NX0.2eKCEzU7JXpbUmN5dHwdVCDqFcNb7-2NEBeOZJOiTmM
```

**Request Body:**

```json
{
  "room": "66c05bbe43a3c1d3a2984f2d",
  "date": "2024-08-15",
  "startTime": "09:00",
  "endTime": "14:00"
}
```

#### Get available slots

**Route:** `/api/slots/availability`(**GET**) </br>
**Route:** `/api/slots/availability?date=2024-06-15&roomId=60d9c4e4f3b4b544b8b8d1c5`(**GET**)

**Query Parameters:**

- `date`: The specific date for which available slots are requested (format: YYYY-MM-DD).
- `roomId`: ID of the room for which available slots are requested.

### Booking Routes:

#### Create a Booking (Only Accessible by Authenticated User)

- _*Route:*_ `/api/bookings` (POST)
- **Request Headers:**

```plain
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmMwNThjZGEyZjVlODgwMmM0OTA2YmIiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyMzg4NDkxNiwiZXhwIjoxNzI0NzQ4OTE2fQ.ImeJllmQ032_-86enN27dLirFeB4JfECCgBMlPwiiNk
```

- **Request Body:**

```json
{
  "date": "2024-06-15",
  "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
  "room": "60d9c4e4f3b4b544b8b8d1c5",
  "user": "60d9c4e4f3b4b544b8b8d1c4"
}
```

#### Get All Bookings (Only Accessible by Admin)

- _*Route:*_ `/api/bookings` (GET)
- **Request Headers:**

```plain
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmMwNThkNmEyZjVlODgwMmM0OTA2YmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjM4ODQzOTUsImV4cCI6MTcyNDc0ODM5NX0.2eKCEzU7JXpbUmN5dHwdVCDqFcNb7-2NEBeOZJOiTmM
```

#### Get User's Bookings (Only Accessible by Authenticated User)

- _*Route:*_ `/api/my-bookings`(**GET**)
- **Request Headers:**

```plain
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmMwNThjZGEyZjVlODgwMmM0OTA2YmIiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyMzg4NDkxNiwiZXhwIjoxNzI0NzQ4OTE2fQ.ImeJllmQ032_-86enN27dLirFeB4JfECCgBMlPwiiNk
```

#### Update Booking (Only Accessible by Admin)

- _*Route:*_ `/api/bookings/:id` (PUT)
- **Request Headers:**

```plain
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmMwNThkNmEyZjVlODgwMmM0OTA2YmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjM4ODQzOTUsImV4cCI6MTcyNDc0ODM5NX0.2eKCEzU7JXpbUmN5dHwdVCDqFcNb7-2NEBeOZJOiTmM
```

- **Request Body:**

```json
{
  "isConfirmed": "confirmed"
}
```

#### Delete Booking (Soft Delete, Only Accessible by Admin)

- _*Route:*_ `/api/bookings/:id` (DELETE)
- **Request Headers:**

```plain
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmMwNThkNmEyZjVlODgwMmM0OTA2YmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjM4ODQzOTUsImV4cCI6MTcyNDc0ODM5NX0.2eKCEzU7JXpbUmN5dHwdVCDqFcNb7-2NEBeOZJOiTmM
```

### Installation

1. **Clone the repository:**

   git clone <https://github.com/maker-shihab/meeting-room-booking-system.git>

2. **Install dependencies:**

   npm install

3. **Start the development server::**
   npm run start:dev

4. **Base URL:**

   https://meeting-room-booking-system-puce.vercel.app/

## Conclusion

Thank you for using our Meeting Room Booking System API! We hope this documentation helps you integrate and utilize the endpoints effectively.

For more details, updates, and source code, visit our GitHub repository:

[GitHub Repository - Meeting Room Booking System](https://github.com/maker-shihab/meeting-room-booking-system)

Happy coding!
