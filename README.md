# Video Streaming App  

A robust video streaming application built using **React.js**, **Node.js**, **RTMP**, and **FFmpeg**, containerized with **Docker**. This application allows users to create live streams and broadcast from any streaming application to an RTMP server, with the streams viewable directly in the app.

---

## Features  

- **Stream Creation**: Users can create live streams with custom titles and descriptions.  
- **RTMP Server Integration**: Streams can be broadcasted from any application supporting RTMP.  
- **Real-time Video Playback**: Streams are displayed seamlessly within the app using HLS or similar protocols.  
- **Microservices Architecture**: The application follows a modular design, with dedicated services for authentication, moderation, querying, and more.  
- **MongoDB Integration**: Stores stream metadata and user details securely.  

---

## Technology Stack  

- **Frontend**: React.js  
- **Backend**: Node.js, Express  
- **Streaming Protocols**: RTMP, HLS  
- **Video Processing**: FFmpeg  
- **Database**: MongoDB  
- **Containerization**: Docker  

---

## Architecture Overview  

This application is built using a microservices architecture and consists of the following services:

1. **Auth Service**: Manages user authentication and authorization.  
2. **Query Service**: Handles queries for retrieving stream data.  
3. **Moderation Service**: Ensures that streams adhere to guidelines before broadcasting.  
4. **Stream Service**: Manages the core streaming logic.  
5. **RTMP Server**: An RTMP module for ingesting streams from external applications.  
6. **React Client**: The user-facing frontend interface.  
7. **NGINX**: Acts as a reverse proxy and load balancer.  

---

## Docker Setup  

The application uses Docker Compose for seamless multi-container deployment. Below is an overview of the services defined in `docker-compose.yml`:

### Services

- **MongoDB**: Database for storing application data.  
- **Auth**: Handles user authentication and interacts with MongoDB.  
- **Query**: Fetches stream-related data from the database.  
- **Moderation**: Processes stream metadata to ensure compliance with rules.  
- **Stream**: Responsible for managing live streams.  
- **React Client**: Provides the frontend for stream management and viewing.  
- **RTMP Server**: Accepts and processes video streams from external applications.  
- **NGINX**: Acts as the reverse proxy and HLS serving point.  

---

## How to Run Locally  

1. **Clone the Repository**:  
   ```bash
   git clone 
   cd <repository-folder>
2. **Install Docker**:  
3. **Start the Services**:
   ```bash
     docker-compose up --build
4. **Access the Application**
    - Frontend: *Access the application at http://localhost:3000*
    - RTMP Server: *rtmp://localhost:1935/live*
