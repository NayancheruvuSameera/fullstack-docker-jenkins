# fullstack-docker-jenkins
# Student Registration Application – DevOps CI/CD Project

A full-stack Student Registration Application built using **Node.js (Express)** and **Python Flask**, containerized using Docker and automated using Jenkins CI/CD.

This project demonstrates how to build, containerize, publish, and deploy a multi-container application using Docker, Docker Compose, Jenkins, and Docker Hub.

## Project Overview

The application allows users to register students by entering their name, email address, and course.

The Node.js frontend communicates with the Flask backend through REST APIs. Both services run in separate Docker containers and communicate through a Docker bridge network.

Jenkins automates the build, image publishing, and deployment process.

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Frontend server |
| Express.js | HTTP server and API forwarding |
| Python | Backend programming |
| Flask | Backend REST API |
| Docker | Application containerization |
| Docker Compose | Multi-container orchestration |
| Docker Hub | Docker image repository |
| Jenkins | CI/CD automation |
| Git & GitHub | Source code management |
| Windows 11 | Development environment |
| Docker Desktop | Local container runtime |

## Architecture

```text
                 USER
                   |
                   |
             Web Browser
                   |
                   |
            localhost:3000
                   |
                   v
          +------------------+
          | Node.js Frontend |
          |  Express Server  |
          | Container        |
          +------------------+
                   |
                   |
             REST API Request
                   |
                   v
            backend:5000
                   |
                   |
          +------------------+
          |   Flask Backend  |
          |   Python API     |
          |   Container      |
          +------------------+
                   |
                   v
             Container Logs
          (Registration Details)
```

### CI/CD Architecture

```text
       Developer
           |
           v
       GitHub
           |
           v
        Jenkins
           |
           v
      Checkout Code
           |
           v
      Docker Build
           |
           v
      Docker Hub
           |
           v
    Docker Compose
           |
           v
   Application Deployment
```

## Project Directory Structure

```text
fullstack-docker-jenkins/
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── server.js
│   ├── Dockerfile
│   └── .dockerignore
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .dockerignore
│
├── docker-compose.yaml
├── Jenkinsfile
├── .gitignore
└── README.md
```

## Application Features

- Student registration form.
- Node.js frontend using Express.
- Python Flask backend.
- REST API communication between frontend and backend.
- Input validation for registration fields.
- Dockerized frontend and backend services.
- Docker Compose for managing multiple containers.
- Custom Docker network for service communication.
- Docker Hub image publishing.
- Jenkins CI/CD pipeline automation.
- Container deployment and verification.

## Prerequisites

Install the following tools before running the project:

1. Docker Desktop
2. Node.js (optional for running the frontend locally)
3. Python (optional for running the backend locally)
4. Jenkins
5. Git
6. Docker Hub account

## Running the Application Using Docker Compose

### Step 1: Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### Step 2: Navigate to the project directory

```bash
cd fullstack-docker-jenkins
```

### Step 3: Build Docker images

```bash
docker compose build
```

### Step 4: Start the containers

```bash
docker compose up -d
```

### Step 5: Verify running containers

```bash
docker ps
```

### Step 6: Access the application

Frontend:

http://localhost:3000

Backend health check:

http://localhost:5000/health

## Docker Commands

### View running containers

```bash
docker ps
```

### View all containers

```bash
docker ps -a
```

### View frontend logs

```bash
docker logs frontend-con
```

### View backend logs

```bash
docker logs backend-con
```

### Follow backend logs continuously

```bash
docker logs -f backend-con
```

Registration details are currently printed in the Flask backend container logs. They are not permanently stored in a database.

### Stop the application

```bash
docker compose down
```

### Rebuild and restart

```bash
docker compose up -d --build
```

## Docker Hub Integration

The application uses Docker Hub to store the frontend and backend images.

Docker Hub username:

`nayancheruvusameera`

Repositories:

- `nayancheruvusameera/fullstack-frontend`
- `nayancheruvusameera/fullstack-backend`

Login:

```bash
docker login
```

Build images:

```bash
docker compose build
```

Push images:

```bash
docker push nayancheruvusameera/fullstack-frontend:v1

docker push nayancheruvusameera/fullstack-backend:v1
```

## Jenkins CI/CD Pipeline

Jenkins automates the application's build and deployment workflow.

### Pipeline Stages

1. **Checkout:** Pulls source code from GitHub.
2. **Docker Check:** Verifies Docker CLI and Docker Compose availability.
3. **Build Images:** Builds frontend and backend Docker images.
4. **Docker Hub Login:** Authenticates using Jenkins credentials.
5. **Push Images:** Publishes Docker images to Docker Hub.
6. **Deploy:** Pulls images and starts containers using Docker Compose.
7. **Verify:** Checks the status of deployed containers.

### Jenkins Configuration

Create a Jenkins Pipeline job with:

- Pipeline Definition: Pipeline script from SCM
- SCM: Git
- Repository URL: Your GitHub repository
- Branch: `*/main`
- Script Path: `Jenkinsfile`

Configure Docker Hub credentials in Jenkins:

| Setting | Value |
|---|---|
| Credential Type | Username with password |
| Username | `nayancheruvusameera` |
| Password | Docker Hub access token |
| Credential ID | `dockerhub-credentials` |

The Jenkins service must have permission to communicate with Docker Desktop.

### Automated Build Trigger

The Jenkinsfile uses:

```groovy
triggers {
    pollSCM('H/5 * * * *')
}
```

This checks the Git repository approximately every five minutes for changes.

## Testing the Application

1. Start the application using Docker Compose.
2. Open http://localhost:3000.
3. Enter student name, email, and course.
4. Submit the registration form.
5. Check the success response displayed by the frontend.
6. Open a terminal and execute:

```bash
docker logs backend-con
```

7. Verify that the Flask backend received the registration details.

## Troubleshooting

### 1. Docker daemon connection error

Ensure Docker Desktop is running and the Jenkins Windows service account can access Docker Engine.

```bash
docker ps
```

### 2. Container name conflict

If an existing container uses the same name:

```bash
docker compose down --remove-orphans
```

Then restart:

```bash
docker compose up -d
```

### 3. Docker Hub push access denied

Verify that:

- You are logged into Docker Hub.
- Your Docker Hub username is correct.
- Both repositories exist.
- Your access token has Read & Write permissions.

### 4. Frontend cannot connect to backend

Verify that the backend container is running:

```bash
docker ps
```

Check that the frontend uses the Docker Compose service hostname:

```text
http://backend:5000
```

## Future Enhancements

The following improvements can extend this project:

- Integrate MySQL for permanent student registration storage.
- Add a Docker named volume for database persistence.
- Add a student records retrieval API.
- Implement authentication and authorization.
- Add automated unit and integration testing.
- Integrate SonarQube for code quality analysis.
- Add Trivy for Docker image vulnerability scanning.
- Implement monitoring using Prometheus and Grafana.
- Deploy the application to AWS.

## Learning Outcomes

Through this project, I gained practical experience in:

- Developing a multi-tier application.
- Creating Dockerfiles for Node.js and Python applications.
- Containerizing frontend and backend services.
- Configuring Docker Compose and Docker networking.
- Publishing images to Docker Hub.
- Creating Jenkins CI/CD pipelines.
- Integrating GitHub with Jenkins.
- Automating Docker image builds and deployments.
- Troubleshooting Docker container and networking issues.

## Author

**Sameera Nayancheruvu**

Docker Hub: https://hub.docker.com/u/nayancheruvusameera

GitHub: <YOUR_GITHUB_PROFILE_URL>

---

**Project:** Student Registration Application  
**Category:** DevOps / Cloud Engineering  
**Status:** In Progress
