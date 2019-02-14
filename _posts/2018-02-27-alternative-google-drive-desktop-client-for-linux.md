---
title: Insync - Linux에서 Google Drive Desktop Client 사용하기
link: https://blog.harues.com/alternative-google-drive-desktop-client-for-linux/
author: euikook
description: 
post_id: 118
date: 2018-02-27 22:57:56 0900
comment_status: open
permalink: posts/alternative-google-drive-desktop-client-for-linux
redirect_from: alternative-google-drive-desktop-client-for-linux
status: publish
layout: post
tags: [Linux, Insync, Google, Google Drive, G Suite]
---

#### An Alternative Google Drive Desktop Client for Linux
Insync - Linux에서 Google Drive Desktop Client 사용하기



데스크탑을 Linux로 써온지도 벌써 10년 가까이 되어 간다. 처음 데스크탑을 Linux로 변경하고 불편했던 인터넷 뱅킹등의 문제는 스마트폰에서 은행 업무를 볼 수 있게 되면서 해결되었다. 그외 민원업무등 반드시 Windows가 필요한 일은 VirtualBox를 통해 해결한다.

그외 어플리케이션들은 Linux Alternate나 google docs 같은 웹 기반 어플리케이션으로 대체 가능하다.  하지만 데이터 백업 및 관리용으로 사용하는 Google Drive는 신뢰할 수 있는 Alternate가 없어 고민 했하던 차에 3년전 즈음에 insync라는 Application을 알게 되었다 유료지만 요즘 트렌트인 정기 결제가 아닌 one time 결제로 사용 가능하고 각 배포판용 Repository도 별도로 제공 하기때문에 설치 역시 간편하다.  headless application도 지원 하기 때문에 UI 없이 콘솔 상에서 실행도 가능하다. <https://www.insynchq.com>   다른 Agent들과 비교한 자료를 원하면 아래 사이트를 참조 하기 바란다. https://itsfoss.com/use-google-drive-linux/ 

## Insync 설치

### Add APT Repository
    
```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys ACCAF35C
```

_/etc/apt/sources.list.d/insync.list_ 을 생성 한다. 내용은 다음과 같다. 
    
```     
deb http://apt.insynchq.com/[DISTRIBUTION] [CODENAME] non-free contrib
```

Ubuntu 16.04 경의 _[DISTRIBUTION]_ 은 _ubuntu_ _[CODENAME]_ 은 _xenial_을 입력한다. 
    
```bash    
echo deb http://apt.insynchq.com/ubuntu xenial non-free contrib | sudo tee /etc/apt/sources.list.d/insync.list
```

## Installation
    
```bash
sudo apt-get update && sudo apt-get install insync
```