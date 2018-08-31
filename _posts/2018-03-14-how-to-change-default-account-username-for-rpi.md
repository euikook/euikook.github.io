---
layout: post
title:  "How to change default account username for RPi(Raspberry Pi)"
date:   2018-03-14 21:15:05 +0000
image: /assets/images/twoscreen.jpg
---

# How to change default account username for RPi(Raspberry Pi)

Raspberry Pi 공식 이미지의 username 과 password는 다음과 같다.

_username: pi_
_password : raspberry_

쓸때마다 느끼는 거지만 pi 와 raspberry는 정말 손에 익지 않는다. 키보드로 칠때마다 오타가 나서 한번에 로그인 할때가 거의 없다. pi 계정을 계속 쓰면 보안 문제도 생길 수 있으니 자신만의 손에 익은 username과 password로 변경 해 보자.

먼저 root 계정으로 로그인 해야 한다. 먼저 root 로 로그인 하기 위하여 root 계정의 Password를 설정한다.
```
sudo passwd root
```

pi 계정 에서 로그아웃 후 root 계정으로 로그인 한다.
```
logout
```

pi 계정을 grepos로 변경한다.
```
usermod -l grepos pi
```

이제 /home/pi 디렉터리를 /home/grepos로 변경하자.
```
usermod -m -d /home/grepos grepos
```

필요하다면 변경한 grepos계정의 Password를 변경한다.

```
passwd grepos
```

필요 하다면 pi group도 변경 한다.
```
groupmod -n grepos pi
```

root 계정에서 로그 아웃 후 grepos으로 로그인 한다.

root 계정을 비활성화 하기전 sudo 명령이 잘 동작 하는지 확인한다.
```
sudo ls
```

password를 Lock 하여 root 계정을 비활성화 한다.
```
sudo passwd -l root
``` 