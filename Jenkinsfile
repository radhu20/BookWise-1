pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME_BACKEND = 'bookwise-backend'
        DOCKER_IMAGE_NAME_FRONTEND = 'bookwise-frontend'
        GITHUB_REPO_URL = 'https://github.com/radhu20/BookWise-1/'
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        NOTEBOOK_FILENAME = 'book-recommender-system.ipynb'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: "${GITHUB_REPO_URL}"
            }
        }

        stage('Run Model') {
            steps {
                script {
                    // Install Jupyter Notebook if not already installed
                    sh "pip install jupyter"
                    // Run the Jupyter notebook
                    sh "jupyter nbconvert --to notebook --execute ${NOTEBOOK_FILENAME}"
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                script {
                    // Run docker-compose
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} up -d"
                }
            }
        }

        stage('Unit Test') {
            steps {
                script {
                    // Run unit tests using the test.py file
                    sh "python test.py"
                }
            }
        }

        stage('Push Docker Images to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', docker-hub-credentials) {
                        // Push Backend Docker image to Docker Hub
                        docker.image("${DOCKER_IMAGE_NAME_BACKEND}").push()

                        // Push Frontend Docker image to Docker Hub
                        docker.image("${DOCKER_IMAGE_NAME_FRONTEND}").push()
                    }
                }
            }
        }

        stage('Deploy with Ansible') {
            steps {
                script {
                    ansiblePlaybook(
                        playbook: 'deploy.yml',
                        inventory: 'inventory'
                    )
                }
            }
        }
    }
}