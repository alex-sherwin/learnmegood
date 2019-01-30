# build the docker container

```bash
docker build -f Dockerfile.app004 -t app004 .
```

# run the container

* tell it to listen on port `80` via env `HTTP_PORT`
* bind the host on port `8888` and map it to port `80` inside the container
* create a data volume mount

```bash
docker run -dt --name=app004 -e HTTP_PORT=80 -p :8888:80 -v app004-data:/data app004
```

# tail the logs

```bash
docker logs -f app004
```

# hit the webserver

```bash
curl --verbose -X POST --data-ascii "hello world" "http://localhost:8888/some/path"
```

# signal the webserver for custom behavior

```bash
docker kill -s USR1 app004
```

# list the recorded requests

```bash
docker exec app004 ls /data
```

# cat the recorded requests

```bash
docker exec app004 sh -c 'find /data/* | xargs cat'
```

# stop the webserver

it *WILL* stop gracefully via `SIGTERM`

```bash
docker stop app004
```