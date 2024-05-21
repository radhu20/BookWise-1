pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME_BACKEND = 'bookwise-backend'
        DOCKER_IMAGE_NAME_FRONTEND = 'bookwise-frontend'
        GITHUB_REPO_URL = 'https://github.com/radhu20/BookWise-1'
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        NOTEBOOK_FILENAME = 'book-recommender-system.py'
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_PASS')]) {
                        sh "git clone https://${GITHUB_USER}:${GITHUB_PASS}@github.com/radhu20/BookWise-1.git"
                    }
                }
            }
        }
        stage('Delete All Running Containers') {
            steps {
                script {
                    try {
                        sh "docker ps -a -q | xargs -r docker rm -f"
                    } catch (Exception e) {
                        echo "Ignoring error: ${e.message}"
                    }
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                script {
                    sh "docker-compose -f ${env.DOCKER_COMPOSE_FILE} up -d"
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Docker Images"
                    sh "docker-compose -f ${env.DOCKER_COMPOSE_FILE} build"
                }
            }
        }

        stage('Push Docker Images Frontend') {
            steps {
                script {
                    echo "Pushing Frontend Docker Image"
                    withDockerRegistry(credentialsId: 'docker-hub-credentials') {
                        sh "docker tag ${env.DOCKER_IMAGE_NAME_FRONTEND} radhika20/${env.DOCKER_IMAGE_NAME_FRONTEND}:latest"
                        sh "docker push radhika20/${env.DOCKER_IMAGE_NAME_FRONTEND}:latest"
                    }
                }
            }
        }

        stage('Push Docker Images Backend') {
            steps {
                script {
                    echo "Pushing Backend Docker Image"
                    withDockerRegistry(credentialsId: 'docker-hub-credentials') {
                        sh "docker tag ${env.DOCKER_IMAGE_NAME_BACKEND} radhika20/${env.DOCKER_IMAGE_NAME_BACKEND}:latest"
                        sh "docker push radhika20/${env.DOCKER_IMAGE_NAME_BACKEND}:latest"
                    }
                }
            }
        }

        stage('Unit Test') {
            steps {
                script {
                    sh "python3 test.py"
                }
            }
        }

        stage('Execute Notebook') {
            steps {
                script {
                    sh "jupyter nbconvert --to notebook --execute ${env.NOTEBOOK_FILENAME}"
                }
            }
        }

        stage('Stop Docker Compose') {
            steps {
                script {
                    sh "docker-compose -f ${env.DOCKER_COMPOSE_FILE} down"
                }
            }
        }

        stage('Deploy with Ansible') {
            steps {
                script {
                    ansiblePlaybook(
                        playbook: 'deploy.yml',
                        inventory: 'localhost,',
                        extraVars: [
                            DOCKER_IMAGE_NAME_BACKEND: env.DOCKER_IMAGE_NAME_BACKEND,
                            DOCKER_IMAGE_NAME_FRONTEND: env.DOCKER_IMAGE_NAME_FRONTEND,
                            ELASTICSEARCH_IMAGE: 'docker.elastic.co/elasticsearch/elasticsearch:7.16.3',
                            LOGSTASH_IMAGE: 'docker.elastic.co/logstash/logstash:7.16.3',
                            KIBANA_IMAGE: 'docker.elastic.co/kibana/kibana:7.16.3'
                        ]
                    )
                }
            }
        }
    }

    post {
        always {
            script {
                echo 'Cleaning up workspace'
                cleanWs()
            }
        }
        failure {
            script {
                echo 'Pipeline failed. Investigate the issue.'
            }
        }
        success {
            script {
                echo 'Pipeline succeeded.'
            }
        }
    }
}
