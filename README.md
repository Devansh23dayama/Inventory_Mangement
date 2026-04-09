# Inventory Management System

A full-stack Inventory Management System built using React (Frontend) and Spring Boot (Backend).  
The application is designed to manage products, track inventory, and perform CRUD operations efficiently.

---

## Features

- Add, update, delete, and view products (CRUD operations)
- RESTful API communication between frontend and backend
- Efficient database handling using Spring Data JPA
- Real-time interaction between React UI and backend services
- Scalable and maintainable code using MVC and layered architecture

---

## Tech Stack

### Frontend
- React.js  
- HTML  
- CSS  
- JavaScript  

### Backend
- Spring Boot  
- Spring Data JPA  
- REST APIs  

### Database
- MySQL  

---

## Architecture

The project follows MVC (Model-View-Controller) and layered architecture:

- Controller Layer – Handles client requests and responses  
- Service Layer – Contains business logic  
- Repository Layer (DAO) – Handles database operations  
- Model/Entity Layer – Represents database tables  

---

## Project Structure
Inventory_Management/
│── backend/
│ ├── controller/
│ ├── service/
│ ├── repository/
│ ├── model/
│
│── frontend/
│ ├── components/
│ ├── pages/
│ ├── services/


### Backend Setup (Spring Boot)

1. Open project in IntelliJ or Eclipse  
2. Configure database in application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/inventory_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update


---

## API Endpoints

| Method | Endpoint        | Description          |
|--------|---------------|----------------------|
| GET    | /products     | Get all products     |
| GET    | /products/{id}| Get product by ID    |
| POST   | /products     | Add new product      |
| PUT    | /products/{id}| Update product       |
| DELETE | /products/{id}| Delete product       |

---

## Objective

The main objective of this project is to build a scalable and efficient inventory management system that simplifies product tracking and improves data handling.

---

## Use Cases

- Product management  
- Stock tracking  
- Inventory updates  
- Data persistence and retrieval  

---

## Future Enhancements

- Add authentication and authorization  
- Dashboard analytics and reporting  
- Cloud deployment (AWS, Render, Vercel)  
- Improved UI/UX  

---

## Author

Devansh Dayama  
GitHub: https://github.com/Devansh23dayama  

---

## Contribute

Feel free to fork this repository and contribute to enhance the project.
