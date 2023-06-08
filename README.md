# do4-k8s

## build

### Frontend

```sh
cd frontend && docker build . -t counter-fresh
```

### Backend

```sh
cd backend && docker build . -t counter-ms
```

```sh
cd backend && docker build -f Dockerfile.cronjob -t counter-cronjob .
```
