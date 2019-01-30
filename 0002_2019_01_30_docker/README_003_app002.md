# build the docker container

```bash
docker build -f Dockerfile.app002 -t app002 .
```

# run the container

* tell it to listen on port `80` via env `HTTP_PORT`
* bind the host on port `8888` and map it to port `80` inside the container

```bash
docker run -dt --name=app002 -e HTTP_PORT=80 -p :8888:80 app002
```

# tail the logs

```bash
docker logs -f app002
```

# hit the webserver

```bash
curl --verbose -X POST --data-ascii "hello world" "http://localhost:8888/some/path"
```

# stop the webserver

it *WILL* stop gracefully via `SIGTERM`

```bash
docker stop app002
```