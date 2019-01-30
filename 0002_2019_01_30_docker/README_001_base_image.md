# build our base runtime image

```bash
docker build -f Dockerfile.base -t node-base .
```

# prove to yourself node is in fact installed

This will effectively run `node --help` since the entrypoint is `node`

```bash
docker run -it --rm node-base --help
```

# check the entrypoint of some image

Use `docker inspect [image name]` to look at the details of an image (its metadata, specifically)

```bash
docker inspect node-base
```

# override the entrypoint to run whatever base command you want

```bash
docker run -it --rm --entrypoint="" node-base node --help
```

