# do4-k8s - Julien Dubois

Welcome to my version of **do4-k8s**

## Deploy in cluster

Move into k8s folder:

```bash
cd k8s/manifest
```

Create namespace:

```bash
kubectl apply -f namespace.yaml
```

Deploy Postgres:

```bash
kubectl apply -f postgres/postgres-pvc.yaml
kubectl apply -f postgres/postgres-deployment.yaml
kubectl apply -f postgres/postgres-service.yaml
```

Deploy Counter API:

```bash
kubectl apply -f counterapi/counterapi-deployment.yaml
kubectl apply -f counterapi/counterapi-service.yaml
```

Deploy Webapp:

```bash
kubectl apply -f webapp/webapp-deployment.yaml
kubectl apply -f webapp/webapp-service.yaml
```

Deploy Persister:

```bash
kubectl apply -f persister/persister-cronjob.yaml
```
