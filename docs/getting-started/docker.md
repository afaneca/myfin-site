---
sidebar_position: 3
---

# Docker
We provide the following docker images:
- [myfin-api](https://github.com/afaneca/myfin-api/pkgs/container/myfin-api) - docker image for the API, hosted by [ghcr.io](https://ghcr.io)
- [myfin](https://github.com/afaneca/myfin/pkgs/container/myfin) - docker image for the web frontend, hosted by [ghcr.io](https://ghcr.io)

We also maintain a [docker-compose config](https://github.com/afaneca/myfin/blob/master/docker-compose.yml) you can use to bootstrap the whole platform (api + web) by simply running:

````sh
docker compose up
````