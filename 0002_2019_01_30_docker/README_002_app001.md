# build the docker container

```bash
docker build -f Dockerfile.app001 -t app001-FIXME_YOUR_NAME_HERE .
```

# run the container

* tell it to listen on port `80` via env `HTTP_PORT`
* bind the host on port `FIXME` and map it to port `80` inside the container

```bash
docker run -dt --name=app001-FIXME_YOUR_NAME_HERE -e HTTP_PORT=80 -p :FIXME:80 app001-FIXME_YOUR_NAME_HERE
```

# tail the logs

```bash
docker logs -f app001-FIXME_YOUR_NAME_HERE
```

# hit the webserver

```bash
curl --verbose -X POST --data-ascii "hello world" "http://localhost:8888/some/path"
```

# stop the webserver

it will *NOT* stop gracefully, docker stop will issue `SIGTERM`, wait 10s, then `SIGKILL`

```bash
docker stop app001-FIXME_YOUR_NAME_HERE
```