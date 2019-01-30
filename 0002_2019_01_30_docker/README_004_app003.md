# build the docker container

```bash
docker build -f Dockerfile.app003 -t app003-FIXME_YOUR_NAME_HERE .
```

# run the container

* tell it to listen on port `80` via env `HTTP_PORT`
* bind the host on port `FIXME` and map it to port `80` inside the container

```bash
docker run -dt --name=app003-FIXME_YOUR_NAME_HERE -e HTTP_PORT=80 -p :FIXME:80 app003-FIXME_YOUR_NAME_HERE
```

# tail the logs

```bash
docker logs -f app003-FIXME_YOUR_NAME_HERE
```

# hit the webserver

```bash
curl --verbose -X POST --data-ascii "hello world" "http://localhost:8888/some/path"
```

# signal the webserver for custom behavior

```bash
docker kill -s USR1 app003-FIXME_YOUR_NAME_HERE
```

# stop the webserver

it *WILL* stop gracefully via `SIGTERM`

```bash
docker stop app003-FIXME_YOUR_NAME_HERE
```