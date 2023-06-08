# do4-k8s

## build

### Frontend

```sh
cd frontend && docker build . -t sautax/counter-fresh
```

### Backend

```sh
cd backend && docker build . -t sautax/counter-ms
```

```sh
cd backend && docker build -f Dockerfile.cronjob -t sautax/counter-cronjob .
```
