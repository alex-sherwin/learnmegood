# build our base runtime image

```bash
docker build -f Dockerfile.base -t node-FIXME_YOUR_NAME_HERE .
```

# prove to yourself node is in fact installed

This will effectively run `node --help` since the entrypoint is `node`

```bash
docker run -it --rm node-FIXME_YOUR_NAME_HERE --help
```

# check the entrypoint of some image

Use `docker inspect [image name]` to look at the details of an image (its metadata, specifically)

```bash
docker inspect node-FIXME_YOUR_NAME_HERE
```

# override the entrypoint to run whatever base command you want

```bash
docker run -it --rm --entrypoint="" node-FIXME_YOUR_NAME_HERE node --help
```

