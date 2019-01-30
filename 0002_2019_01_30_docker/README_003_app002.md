# build the docker container

```bash
docker build -f Dockerfile.app002 -t app002-FIXME_YOUR_NAME_HERE .
```

# run the container

* tell it to listen on port `80` via env `HTTP_PORT`
* bind the host on port `FIXME` and map it to port `80` inside the container

```bash
docker run -dt --name=app002-FIXME_YOUR_NAME_HERE -e HTTP_PORT=80 -p :FIXME:80 app002-FIXME_YOUR_NAME_HERE
```

# tail the logs

```bash
docker logs -f app002-FIXME_YOUR_NAME_HERE
```

# hit the webserver

```bash
curl --verbose -X POST --data-ascii "hello world" "http://localhost:FIXME/some/path"
```

# stop the webserver

it *WILL* stop gracefully via `SIGTERM`

```bash
docker stop app002-FIXME_YOUR_NAME_HERE
```