---
title: 개발자와 시스템 관리자의 친구 tmux, GNU screen Alternative  - 01
link: https://blog.harues.com/usages-of-tmux-gnu-screen-alternative-01/
author: euikook
description: 
post_id: 154
date: 2018-03-07 08:39:20 0900
comment_status: open
permalink: posts/usages-of-tmux-gnu-screen-alternative-01
redirect_from: usages-of-tmux-gnu-screen-alternative-01
status: publish
layout: post
tags: [Linux, Shell, Shell Command, screen, tmux]
---

#### Usages of tmux, GNU screen Alternative
개발자와 시스템 관리자의 친구 tmux, GNU screen Alternative  - 01



개발자와 시스템 관리자의 친구, tmux 에 대하여 알아보자 

tmux는 GNU screen을 대체 할 수 있는 가장 매력적인 대안이다. Terminal Multiplex 로 매뉴얼은 다음에서 볼 수 있다.

<http://man.openbsd.org/OpenBSD-current/man1/tmux.1>

tmux의 주요 기능에 대하여 알아본다. 먼저 세션 유지 기능과 화면 공유 기능에 대하여 알아보자.

## 세션 유지 기능

PuTTY등으로 SSH 세션을 연결 한 후 프로그램을 실행하여 작업 도중 네트워크 문제 등으로 세션이 끊겼기면 Logout이 되면서 해당 쉘에서 작업 중이던 모든 작업이 Hangup Signal (SIGHUP)을 받아 Termination  된다. 자칫 작업한 내용을 잃어 버릴 수도 있다. 

예를 들어 아래와 같은 상황들이 있을 수 있다. 

  * 장시간 미사용으로 인항 세션 해제
  * Windows 자동 업데이트로 인한 시스템 재시작으로 인한 세션 해제
  * 네트워크 불안으로 인한 세션 해제
  * 정전등 전원 불안으로 인한 세션 해제

<!--more-->

TMUX 세션을 생성 한다.
    
```bash
tmux
``` 
    
```bash    
tmux new-session -s test
```
    

또는 간단히 
    
```bash    
tmux new -s test
```

tmux 세션 내에서 vi 명령을 사용하여 테스트 해본다. 
    
```bash    
vi test.txt
```
    

필요한 작업을 진행한다. 

터미널을 닫거나 네트워크를 끊어 SSH 세션을 종료시킨다. 

다시 SSH 세션을 연결 후 _tmux list-sessions_ 명령으로 현제 열려 있는 세션을 확인한다. 
    
```bash    
tmux list-session
test: 1 windows (created Tue Mar 6 15:20:04 2018) \[159x92\] (attached)
```
    

이전에 생성한 _test_ 세션이 보인다. _test_ 세션에 attach 한다. 

세션이 하나이거나 마지막 생성된 세션으로 attach 하기 위해서 는 간단히 다음을 입력한다. 
    
```bash    
tmux attach-session
```
    

세션 이름으로 attach,  _test_ 세션에 attach 
    
```bash    
tmux attach-session -t test
    

_**attach-session**_ command는 _**attach**_ 나 _**a**_ 로 대체 가능하다. 
    
```bash    
tmux attach -t test
```
    
    
```bash    
tmux a -t test
```
    

## 화면 공유 기능

화면을 다른 사람과 공유 할 수 있다. 

### 동일 유저와 화면 공유

같은 계정로 시스템에 로그인 한 경우 

#### Terminal 1

SSH Client를 이용하여 시스템에 로그인 한 후 tmux 세션을 생성한다. 
    
```bash    
tmux new -s test-01
```
    

#### Terminal 2

다른 SSH Client를 이용하여 시스템에 로그인 한 후 _tmux list-sessions_ 명령으로 현재 열려 있는 세션 리스트를 확인한다. 
    
```bash    
tmux list-sessions
test-01: 1 windows (created Tue Mar  6 15:52:45 2018) [159x92] (attached)
```
    

_**tmux attach-session**_ 명령으로 _test-01_ 세션에 Attach 한다. 
    
```bash    
tmux attach -t test-01
```
    

터미널 1과 터미널 2에 같은 화면이 보이며 한쪽에서 키보드를 입력 하면 다른쪽 터미널에서도 입력된다. 

### 다른 유저와 화면 공유

_tmux_가 실행되면_ /tmp/tmux-${UID}_ 디렉터리에 _default_ 라는 이름의 UNIX 소켓이 생성되는데 이 UNIX 소켓을 통해 화면 공유 기능이 수행된다. -S 옵션을 통해 명시적으로 UNIX Domain Socket 파일을 지정 할 수 있이며 해당 UNIX Domain Socket 의 경로를  다른 유저에게 알려 줌으로써 다른 유저가 내가 만든 _tmux_ 세션에 접속 할 수 있다. 

먼저 공유하고자 하는 User 와 같이 속하는 Group을 생성한다. 
    
```bash    
sudo addgroup --gid 888 tmux
sudo usermod -aG tmux myaccount
sudo usermod -aG tmux otheraccount
```
    

#### Terminal 1

Unix Domain Socket을 지정 하여 세션을 만든다. 
    
```bash    
tmux -S /tmp/tmux-shared new -s test-01
```
    

#### Terminal 2

다른 유저로 로그인 하여 attach 해본다. 
    
```bash    
tmux -S /tmp/tmux-shared a -t test-01
error connecting to /tmp/tmux-shared (Permission denied)
```
    

_/tmp/tmux-shared_ 파일에 권한이 없어 Unix Domain Socket에 접속할 수 없다. 

해당 파일의 권한을 확인해보자 
    
```bash    
ls -l /tmp/tmux-shared 
srwxrwx--- 1 myaccount myaccount 0 Mar  6 16:25 /tmp/tmux-shared
```
    

other경우 해당 파일에 대하여 R/W Permission이 없으므로 Unix Domain Socket을 Open 할 수 없다. 

#### Terminal 1

세션을 생성한 유저로 로그인 하여 해당 파일의 Owner Group을 앞서 생성한 tmux로 변경한다. 
    
```bash    
ls -l /tmp/tmux-shared 
srwxrwx--- 1 myaccount myaccount 0 Mar  6 16:25 /tmp/tmux-shared
chgrp tmux tmux-shared
```

```bash
ls -l /tmp/tmux-shared 
srwxrwx--- 1 myaccount tmux 0 Mar  6 16:25 /tmp/tmux-shared
```
    

#### Terminal 2

Permission을 변경 하였으면 이제 세션에 Attach 해보자.

```bash
tmux -S /tmp/tmux-shared attach -t test-01
```

접속이 되고 하면 공유역시 잘된다.

### 살짝 아쉬운점.
아쉽게도 아직 screen과 같이 ACL을 통해 read-only 모드로 화면을 공유 하는 방법은 없다. Attach 하려는 사용자가 -r 옵션을 통해 명시적으로 read-only 모드로 Attach 하여야 한다.

```bash
tmux -S /tmp/tmux-shared attach -t test-01 -r
```

## 요약
### 세션 생성
```bash
tmux new-session -s test
```

**new-session**은 **new**로 대체 가능하다.

### 세션에 attach
```bash
tmux attach-session -t test
```
**attach-session**은 **attach**나 **a**로 대체 가능하다.

접속할 Unix Domain Socket을 지정 하려면 **-S** 옵션을 사용한다.

```bash
tmux attach-session -S /tmp/test-socket -t test
```

다른 유저에게 화면을 공유 하기 위해서는 해당 유저가 내가 만든 Unix Domain Socket에 접근 권한이 있어야 한다.

다음 포스트에서는 tmux의 가장 편리한 기능인 화면 분할 기능에 대하여 알아보자
