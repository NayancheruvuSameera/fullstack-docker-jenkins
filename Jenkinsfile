
pipeline {
    agent any

    triggers {
        // Check GitHub for changes approximately every 5 minutes
        pollSCM('H/5 * * * *')
    }

    environment {
        DOCKERHUB_USER = 'nayancheruvusameera'
        FRONTEND_IMAGE = 'nayancheruvusameera/fullstack-frontend:v1'
        BACKEND_IMAGE  = 'nayancheruvusameera/fullstack-backend:v1'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub'
                checkout scm
            }
        }

        stage('Check Docker') {
            steps {
                bat 'docker --version'
                bat 'docker compose version'
                bat 'docker ps'
            }
        }

        stage('Build Images') {
            steps {
                echo 'Building frontend and backend images'
                bat 'docker compose build'
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    bat '''
                        @echo off
                        echo %DOCKERHUB_TOKEN%| docker login -u %DOCKERHUB_USER% --password-stdin
                    '''
                }
            }
        }

        stage('Push Images') {
            steps {
                bat 'docker push %FRONTEND_IMAGE%'
                bat 'docker push %BACKEND_IMAGE%'
            }
        }

        stage('Deploy Containers') {
            steps {
                bat 'docker compose pull'
                bat 'docker compose up -d --no-build --remove-orphans'
            }
        }

        stage('Verify Deployment') {
            steps {
                bat 'docker compose ps'
            }
        }
    }

    post {
        always {
            bat 'docker logout'
        }

        success {
            echo 'Frontend and backend deployed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the Jenkins console output.'
        }
    }
}
