---
title: Run Gitlab Runner in a container
date: "2019-02-20 15:45:00 +0900"
author: euikook
description:
permalink: posts/run-gitlab-runner-in-a-container
status: publish
layout: post
tags: [Linux, Gitlab, CI, CD, CI/CD, Docker, Container, Compose, docker-compose]
---
# Run Gitlab Runner in a container

## Prerequisites
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

## Usages

### Clone Repository

```
git clone https://gitlab.com/euikook/gitlab-runner-compose.git
```

###  Configuration
* Replace *CI_SERVER_URL* value with your Gitlab server e.g. https://gitlab.com
* [Obtain a token](https://docs.gitlab.com/ee/ci/runners/) for a shared or specific Runner via GitLab’s interface and replace *REGISTRATION_TOKEN* value

```
tee .env << END
CI_SERVER_URL=https://gitlab.com/
REGISTRATION_TOKEN=zDsz34JuZf95NoBaQPX
END
```

### Registration and run gitlab-runner

```
docker-compose up -d
```

# References
* [https://docs.gitlab.com/ee/ci/runners/](https://docs.gitlab.com/ee/ci/runners/)
* [https://docs.gitlab.com/runner/install/docker.html](https://docs.gitlab.com/runner/install/docker.html)
* [https://dev.to/imichael/this-one-trick-gives-you-unlimited-ci-minutes-on-gitlab-e92](https://dev.to/imichael/this-one-trick-gives-you-unlimited-ci-minutes-on-gitlab-e92)
