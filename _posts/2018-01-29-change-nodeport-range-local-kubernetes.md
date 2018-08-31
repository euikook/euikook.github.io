---
title: Change NodePort range local kubernetes
link: https://blog.grepos.com/change-nodeport-range-local-kubernetes/
author: euikook
description: 
post_id: 30
created: 2018/01/29 01:10:00
created_gmt: 2018/01/28 16:10:00
comment_status: open
permalink: change-nodeport-range-local-kubernetes
status: publish
layout: post
---

#### Change NodePort range local kubernetes

Add following line to add following line to _/etc/kubernetes/manifests/kube-apiserver.yaml_
    
    
    - --service-node-port-range=80-32767

## Examples
    
    
    sudo vi /etc/kubernetes/manifests/kube-apiserver.yaml
    
    
    - --advertise-address=172.168.2.11
    - --service-cluster-ip-range=10.96.0.0/12
    - --service-node-port-range=80-32767
    - --client-ca-file=/etc/kubernetes/pki/ca.crt