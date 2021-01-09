echo $CR_PAT | docker login ghcr.io --username samuelvaneck --password-stdin
docker tag wedding_wedding_web ghcr.io/samuelvaneck/wedding:latest
docker push ghcr.io/samuelvaneck/wedding:latest
