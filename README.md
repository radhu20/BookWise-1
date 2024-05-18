# BookWise

## Overview

**BookWise** is an online book repository platform designed to provide users with access to a wide range of books and book recommendations. The platform leverages advanced technologies and follows CI/CD best practices to ensure a seamless and efficient user experience.

## Features

- **Book Repository**: Access a comprehensive collection of books across various genres.
- **Personalized Recommendations**: Get book suggestions tailored to your preferences using Collaborative Filtering.
- **Continuous Integration/Continuous Deployment (CI/CD)**: Robust and automated pipelines for consistent and reliable software updates.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Django
- **Testing**: PyUnit
- **CI/CD**: Jenkins, Docker, Kubernetes, Ansible
- **Monitoring & Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **Programming Language**: Python

## Project Highlights

### Recommendation Systems

Implemented a Collaborative Filtering algorithm to provide personalized book recommendations based on user preferences and interaction data.

### CI/CD Pipelines

Established two robust CI/CD pipelines to automate the deployment process:

1. **Pipeline 1**:
   - **Tools Used**: Jenkins, Docker, Docker-Compose, Ansible
   - **Description**: This pipeline is responsible for building, testing, and deploying the application using Docker and Docker-Compose. Ansible is used for configuration management and orchestration.

2. **Pipeline 2**:
   - **Tools Used**: Jenkins, Docker, Kubernetes
   - **Description**: This pipeline focuses on container orchestration using Kubernetes. It ensures the application is scalable and resilient by managing containerized applications across a cluster of machines.
