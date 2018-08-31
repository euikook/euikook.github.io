---
layout: post
title:  "Change NodePort range local kubernetes"
date:   2018-01-29 01:10:00 +0000
image: /assets/images/twoscreen.jpg
permalink: change-nodeport-range-local-kubernetes
---

#### Change NodePort range local kubernetes

Add following line to add following line to _/etc/kubernetes/manifests/kube-apiserver.yaml_

```
- --service-node-port-range=80-32767
```
Examples
```
sudo vi /etc/kubernetes/manifests/kube-apiserver.yaml
```
```
- --advertise-address=172.168.2.11
- --service-cluster-ip-range=10.96.0.0/12
- --service-node-port-range=80-32767
- --client-ca-file=/etc/kubernetes/pki/ca.crt
```