---
title: VirtualBox에서 4개 이상의 네트워크 인터페이스(NIC) 설정하기
link: https://blog.harues.com/more-than-4-nics-in-virtualbox/
author: euikook
description: 
post_id: 31
date: 2018-01-26 04:16:00 0900
comment_status: open
permalink: posts/more-than-4-nics-in-virtualbox
redirect_from: more-than-4-nics-in-virtualbox
status: publish
layout: post
tags: [Linux, VirtualBox, NIC, Bridge, HostOnly, Internal, NAT]
---

#### More than 4 NICs in VirtualBox
VirtualBox에서 4개 이상의 네트워크 인터페이스(NIC) 설정하기

VirtualBox에서서 네트워크를 구성하여 테스트환경을 만들다 보면 4개 이상의 NIC 이 필요 할때가 종종 있다. 하지만 UI에서는 4개 까지만 NIC을 설정 가능하기 때문에 Command Line Interface를 통해 NIC을 생성하고 설정 하여야 한다. 설정 방법은 다음과 같다. 각 모드에 대한 자세한 내용은 다음 페이지를 참조 하기 바란다. <https://www.virtualbox.org/manual/ch06.html>

## Bridge Mode
    
```bash    
VBoxManage modifyvm test-vm --nic5 bridged
VBoxManage modifyvm test-vm --bridgeadapter5 eno1
```    

## Host Only Mode
    
```bash    
VBoxManage modifyvm test-vm --nic5 hostonly
VBoxManage modifyvm test-vm --hostonlyadapter5 vboxnet0
```    

<!--more-->

## Internal Mode
    
```bash    
VBoxManage modifyvm test-vm --nic5 intnet
VBoxManage modifyvm test-vm --intnet5 'intnet0'
```
    

## NAT Mode
    
```bash    
VBoxManage modifyvm test-vm --nic5 nat
```
    

## NAT Network Mode
    
```bash    
VBoxManage modifyvm test-vm --nic5 natnetwork
VBoxManage modifyvm test-vm --nat-network5 test-nat
```