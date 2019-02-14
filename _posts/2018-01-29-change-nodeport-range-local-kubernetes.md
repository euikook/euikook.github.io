---
title: Change NodePort range local kubernetes
link: https://blog.harues.com/change-nodeport-range-local-kubernetes/
author: euikook
description: 
post_id: 30
date: 2018-01-29 01:10:00 0900
comment_status: open
permalink: posts/change-nodeport-range-local-kubernetes
redirect_from: change-nodeport-range-local-kubernetes
status: publish
layout: post
tags: [Linux, Docker, Kubernetes, k8s, nodeport]
---

#### Change NodePort range local kubernetes

Add following line to add following line to _/etc/kubernetes/manifests/kube-apiserver.yaml_
    
```bash
- --service-node-port-range=80-32767
```

## Examples
    
```bash
sudo vi /etc/kubernetes/manifests/kube-apiserver.yaml
```

```bash
- --advertise-address=172.168.2.11
- --service-cluster-ip-range=10.96.0.0/12
- --service-node-port-range=80-32767
- --client-ca-file=/etc/kubernetes/pki/ca.crt
```