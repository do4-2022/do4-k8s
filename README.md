# do4-k8s - Julien Dubois

Welcome to my version of **do4-k8s**

## Deploy in cluster

Create namespace:

```bash
kubectl apply -f infra/namespace.yaml
```

Deploy webapp:

```bash
kubectl apply -f infra/webapp/webapp-deployment.yaml
kubectl apply -f infra/webapp/webapp-service.yaml
```
