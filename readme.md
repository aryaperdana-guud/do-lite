# DO Claiming Application

This is a web-based application for managing Delivery Order (DO) claims. It is built using React (Vite) for the frontend and Spring Boot 2.6 for the backend.

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Spring Boot 2.6, Java 8+
- **Database:** MySQL
- **Build Tools:** Maven
- **Package Manager:** pnpm

## Features

- User authentication and authorization
- Submit and track DO claims
- Upload supporting documents
- View claim status and history
- Admin dashboard for approvals

## Installation & Setup

### Backend (Spring Boot 2.6)

1. Clone the repository:
   ```sh
   git clone https://github.com/aryaperdana-guud/do-lite.git
   cd springboot
   ```
2. Configure the database connection in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/do_claiming
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
3. Build and run the backend:
   ```sh
   ./mvnw spring-boot:run
   ```

### Frontend (React + Vite)

1. Clone the repository:
   ```sh
   git clone https://github.com/aryaperdana-guud/do-lite.git
   cd react
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Start the development server:
   ```sh
   pnpm dev
   ```
<!--

## API Endpoints (Example)

| Method | Endpoint          | Description               |
|--------|------------------|---------------------------|
| GET    | `/api/claims`     | Get all claims            |
| POST   | `/api/claims`     | Submit a new claim        |
| GET    | `/api/claims/{id}` | Get claim details         |
| PUT    | `/api/claims/{id}` | Update claim status      |
| DELETE | `/api/claims/{id}` | Delete a claim           |

## Environment Variables

Create a `.env` file in the frontend root directory:
```env
VITE_API_URL=http://localhost:8080/api
```

## Deployment

### Backend
- Package the backend as a JAR:
  ```sh
  ./mvnw package
  ```
- Deploy on a server (e.g., AWS, DigitalOcean, Heroku)

### Frontend
- Build the frontend for production:
  ```sh
  pnpm build
  ```
- Deploy on Vercel, Netlify, or an Nginx server.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push and submit a pull request.
-->

## License

MIT License (or specify your license)
