# Getting Started

## Available Scripts

### `Building with docker`
	docker build \
      --build-arg BUILDKIT_INLINE_CACHE=1 \
      --cache-from 70app:latest \
      --tag 70app:latest .

### `Running docker image`
    docker run -d -it -p 3000:3000 70app:latest