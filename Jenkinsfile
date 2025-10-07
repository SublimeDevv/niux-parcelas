pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins: agent
spec:
  serviceAccountName: jenkins-sa
  containers:
  - name: node
    image: node:20-alpine
    command:
    - cat
    tty: true
    volumeMounts:
    - name: docker-sock
      mountPath: /var/run/docker.sock
  - name: docker
    image: docker:24-cli
    command:
    - cat
    tty: true
    volumeMounts:
    - name: docker-sock
      mountPath: /var/run/docker.sock
  - name: kubectl
    image: alpine/k8s:1.28.3
    command:
    - cat
    tty: true
  volumes:
  - name: docker-sock
    hostPath:
      path: /var/run/docker.sock
      type: Socket
"""
        }
    }
   
    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_IMAGE_EXPRESS = 'elyxium/express-parcelas'
        DOCKER_IMAGE_NEXTJS = 'elyxium/frontend-parcelas'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }
   
    stages {    
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Angel-Guxman/niux-parcelas.git', branch: 'main'
            }
        }
        
        stage('Build Express') {
            steps {
                container('node') {
                    sh '''
                        cd redis-server
                        npm install
                    '''
                }
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh '''
                            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                            docker build -t ${DOCKER_IMAGE_EXPRESS}:${DOCKER_TAG} -t ${DOCKER_IMAGE_EXPRESS}:latest ./redis-server
                            docker push ${DOCKER_IMAGE_EXPRESS}:${DOCKER_TAG}
                            docker push ${DOCKER_IMAGE_EXPRESS}:latest
                        '''
                    }
                }
            }
        }
        
        stage('Build Next.js') {
            steps {
                container('node') {
                    sh '''
                        npm install
                    '''
                }
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh '''
                            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                            docker build -t ${DOCKER_IMAGE_NEXTJS}:${DOCKER_TAG} -t ${DOCKER_IMAGE_NEXTJS}:latest .
                            docker push ${DOCKER_IMAGE_NEXTJS}:${DOCKER_TAG}
                            docker push ${DOCKER_IMAGE_NEXTJS}:latest
                        '''
                    }
                }
            }
        }
        
        stage('Deploy to K3s') {
            steps {
                container('kubectl') {
                    sh '''
                        # Debug
                        echo "Verificando conectividad..."
                        kubectl version --client
                        
                        # Deploy
                        echo "Actualizando deployments..."
                        kubectl set image deployment/express express=${DOCKER_IMAGE_EXPRESS}:${DOCKER_TAG} -n default
                        kubectl set image deployment/nextjs nextjs=${DOCKER_IMAGE_NEXTJS}:${DOCKER_TAG} -n default
                        
                        # Espera
                        echo "Esperando rollout..."
                        kubectl rollout status deployment/express -n default --timeout=5m
                        kubectl rollout status deployment/nextjs -n default --timeout=5m
                        
                        # Status final
                        kubectl get pods -n default -l app=express
                        kubectl get pods -n default -l app=nextjs
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline terminado - Build #${env.BUILD_NUMBER}"
        }
        success {
            echo "✅ Deploy OK!"
            echo "Express: http://40.233.24.58:30401"
            echo "Next.js: http://40.233.24.58:30300"
        }
        failure {
            echo "❌ Falló - Revisa logs en Jenkins"
        }
    }
}