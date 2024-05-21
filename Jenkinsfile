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

        stage('Push Docker Images Frontend') {
            steps {
                script {
                    docker.withRegistry('', 'docker-hub-credentials') {
                        sh "docker tag bookwise-frontend radhika20/${env.DOCKER_IMAGE_NAME_FRONTEND}:latest"
                        sh "docker push radhika20/${env.DOCKER_IMAGE_NAME_FRONTEND}"
                    }
                }
            }
        }

        stage('Push Docker Images Backend') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh "docker tag bookwise-backend radhika20/${env.DOCKER_IMAGE_NAME_BACKEND}:latest"
                        sh "docker push radhika20/${env.DOCKER_IMAGE_NAME_BACKEND}"
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
}
