# do4-k8s : Maxime PIZZOLITTO

## Webapp

L'application est composée d'un serveur express qui sert une page html sur /.
Il y a egalement les routes /counter (get) et /counter (post) qui permettent de recuperer et d'incrementer un compteur.
Pour finir, il y a une route /health qui permet de verifier que le MS que l'API utilise est bien up.

### Build

```bash
docker build . -t maximepizzolitto/webapp
```

### Push

```bash
docker push maximepizzolitto/webapp
```

## Microservice (MS)

Le MS est un serveur express qui sert la route / en post qui permet d'incrementer un compteur et get qui permet de recuperer le compteur.
Le service tente d'abord de récupérer le compteur depuis PG, si il n'y arrive pas, il le récupère depuis Redis.

### Build

```bash
docker build . -t maximepizzolitto/ms
```

### Push

```bash
docker push maximepizzolitto/ms
```
