
pipeline {
    agent any

    triggers {
        pollSCM('H/5 * * * *')
    }

    environment {
        FRONTEND_IMAGE = 'nayancheruvusameera/fullstack-frontend:v1'
        BACKEND_IMAGE = 'nayancheruvusameera/fullstack-backend:v1'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Check') {
            steps {
                bat 'docker --version'
                bat 'docker compose version'
                bat 'docker ps'
            }
        }

        stage('Build Images') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Login and Push Images') {
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
                        if errorlevel 1 exit /b 1

                        docker push %FRONTEND_IMAGE%
                        if errorlevel 1 exit /b 1

                        docker push %BACKEND_IMAGE%
                        if errorlevel 1 exit /b 1
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker compose pull'
                bat 'docker compose up -d --no-build --remove-orphans'
            }
        }

        stage('Verify') {
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
            echo 'Application deployed successfully!'
        }

        failure {
            echo 'Deployment failed. Check the Console Output.'
        }
    }
}  
