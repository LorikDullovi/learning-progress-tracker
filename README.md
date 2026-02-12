# Learning Progress Tracker

This is a backend application for tracking user learning progress, built with Node.js, Express, and MongoDB.

## Project Structure

The project follows a modular architecture separating concerns into Models, Routes, Controllers, and Services.

### 1. Models (`/models`)
Defines the database schema and structure using Mongoose.
- **Users.js**: Stores user account information (name, surname, email, password, role).
- **Profile.js**: Extended user details (bio, education, skills).
- **Course.js**: Information about available courses.
- **Lesson.js**: content units associated with a course.
- **Enrollment.js**: Manages user subscriptions to courses.
- **Progress.js**: Tracks the completion status of lessons for enrolled users.

### 2. Middleware (`/middleware`)
Functions that run before the final request handler.
- **authMiddleware.js**: validats JWT tokens to protect routes and ensures role-based access (e.g., Admin vs Student).
- **validator.js**: Validates incoming request data to ensure it meets required formats before processing.

### 3. Routes (`/routes`)
Defines the API endpoints and maps them to controllers.
- **/api/auth**: Login and registration.
- **/api/profiles**: Manage user profiles.
- **/api/courses**: CRUD operations for courses.
- **/api/lessons**: CRUD operations for lessons.
- **/api/enrollments**: Handle course enrollments.
- **/api/progress**: specific endpoints for updating and retrieving learning progress.

### 4. Controllers (`/controllers`)
Handles the incoming HTTP requests and responses.
- Receives data from the request (body, params, query).
- Calls the appropriate **Service** to process the data.
- Sends back the correct HTTP response (200 OK, 400 Bad Request, etc.) to the client.

### 5. Services (`/services`)
Contains the business logic of the application.
- Interacts directly with the **Models** to query or update the database.
- Performs calculations or data transformations.
- Keeps controllers clean by handling the "heavy lifting".

### 6. Environment Variables (`.env`)
Stores sensitive configuration and environment-specific settings.
- **PORT**: The port the server runs on (e.g., 3000).
- **MONGO_URL**: The connection string for the MongoDB database.
- **JWT_SECRET**: The secret key used to sign and verify JSON Web Tokens.
- **JWT_EXPIRES_IN**: The duration for which a user's login session remains valid.