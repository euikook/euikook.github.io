---
title: RSYNC+SSH 를 이용한 증분 백업 설정 및 Cron을 이용한 자동화
link: https://blog.harues.com/incremental-backup-using-rsyncssh/
author: euikook
description: 
post_id: 90
date: 2018-02-20 14:29:05 0900
comment_status: open
permalink: posts/incremental-backup-using-rsyncssh
redirect_from: incremental-backup-using-rsyncssh
status: publish
layout: post
tags: [Linux, Backup, Incremental Backup, RSYNC, SSH, cron]
---

#### Incremental Backup Using RSYNC+SSH and cron
RSYNC+SSH 를 이용한 증분 백업 설정 및 Cron을 이용한 자동화


관리 하는 서버가 많아지고 서버에 저장되는 데이터의 양이 늘어 날 수록 백업을 어떻게 하여야 하는지 고민이 생긴다. 이 포스트에서는 RSYNC와 SSH를 이용하여 여러 서버의 데이터를 백업하고 이를 자동화 하는 방법에 대하여 기술 한다. 테스트를 위한 서버 구성은 다음과 같다.   ![](/wp-content/uploads/2018/03/Incremental-Backup-using-RSYNCSSH.png)   아래 예제 에서는 _S-01_, _S-02_, _S-03_의 /home 디렉터리를 BackupBot으로 백업 하고자 한다. 

## 공통 준비 사항

### Backup User 생성

백업을 위한 사용자 계정을 생성한다. 
    
```bash
sudo adduser --disabled-password --gecos 'BackupMan' backupman
```

## SSH 키 생성 및 배포

### SSH KEY 생성 (BackupBot)

_ssh-keygen_ 명령으로 SSH KEY를 생성한다. 
    
```bash    
ssh-keygen -t rsa -b 4096 -f backupman -C BackupMan
```

<!--more-->

### SSH KEY 배포

private 키를  앞서 생성한 backupman 계정 으로 복사한다. 
    
```bash
sudo mv backupman ~backupman/.ssh/backupman
sudo chown backupman:backupman ~backupman/.ssh/backupman
```

each 서버로 ssh public  key를 배포한다.
    
```bash    
scp ~/backupman.pub 172.18.18.100:authorized_keys
scp ~/backupman.pub 172.18.18.101:authorized_keys
scp ~/backupman.pub 172.18.18.102:authorized_keys
```

### SSH public key 설치

각 서버에 접속 하여  앞서 복사한 SSH public KEY를 backupman 계정에 복사한다. 
    
```bash    
sudo mv authorized_keys ~backupman/.ssh/authorized_keys
sudo chown backupman:backupman ~backupman/.ssh/authorized_keys
sudo chmod 600 ~backupman/.ssh/authorized_keys
```
    

## 서버 설정

백업 하고자 하는 서버에 접속 하여 다음과 같이 설정 한다. 

### 필요 패키지 설치
    
```bash    
sudo apt-get install -y rsync
```

### 권한 설정

_/etc/sudoers_ 파일을 열어 권한을 설정 한다. 
    
```bash    
sudo visudo
```

아래 내용을 추가 
    
```bash    
backupman ALL=(ALL) NOPASSWD: /usr/bin/rsync --server --sender -vlogDtprze.iLsfx --numeric-ids . /*
```

## BackupBot 설정

### 필요 패키지 설치
    
```bash    
sudo apt-get install -y rsync uuid
```

### Backup 스크립트 설치
    
```bash    
sudo -H pip install git+https://github.com/harues/python-backupman.git@master
backupman --version
```

### 권한 설정

_/etc/sudoers_ 파일을 열어 권한을 설정 한다. 
    
```bash    
sudo visudo
```

아래 내용을 추가한다. 
    
```bash    
backupman ALL=(ALL) NOPASSWD: /usr/local/bin/backupman
```

### SSH Client 설정

~/.ssh/config 파일을 열어 
    
```bash    
sudo -u backupman -H vi ~backupman/.ssh/config
```

다음과 같이 설정한다. (해당 파일이 없을 경우 생성한다.) 
    
```    
Host S-01-BACKUP
Hostname 172.18.18.100
User backupman
Port 22
SendEnv LANG LC_*
IdentityFile ~/.ssh/backupman
ConnectTimeout 0
HashKnownHosts yes
GSSAPIAuthentication yes
GSSAPIDelegateCredentials no

Host S-02-BACKUP
Hostname 172.18.18.101
User backupman
Port 22
SendEnv LANG LC_*
IdentityFile ~/.ssh/backupman
ConnectTimeout 0
HashKnownHosts yes
GSSAPIAuthentication yes
GSSAPIDelegateCredentials no

Host S-03-BACKUP
Hostname 172.18.18.102
User backupman
Port 22
SendEnv LANG LC_*
IdentityFile ~/.ssh/backupman
ConnectTimeout 0
HashKnownHosts yes
GSSAPIAuthentication yes
GSSAPIDelegateCredentials no
```
    

### SSH Client 접속 확인

다음 명령으로 배포된 KEY로 SSH접속이 정상적으로 되는지 확인한다.(Password를 물어 보지 않으면 성공.) 
    
```bash    
sudo -u backupman -H ssh S-01-BACKUP
```
    
```bash    
sudo -u backupman -H ssh S-02-BACKUP
```
    
```bash    
sudo -u backupman -H ssh S-03-BACKUP
```

## 백업 테스트

백업테스트를 위해 _backupman_ 계정으로 로그인 한다. 
    
```bash    
sudo -u backupman -i
```
    

다음 명령을 통해 백업 스크립트가 정상적으로 동작 하는지 확인한다. 

### S-01
    
```bash    
sudo backupman -i -r ssh://S-01-BACKUP/home /home/backupman/S-01
```
    

### S-02
    
```bash    
sudo backupman -i -r ssh://S-02-BACKUP/home /home/backupman/S-02
``` 

### S-03
    
```bash    
sudo backupman -i -r ssh://S-03-BACKUP/home /home/backupman/S-03
``` 

### Cron에 Task 등록

위 명령이 정상적으로 수행되어 백업이 완료 되었으면 cron에 등록 하여 주기적으로 백업이 이루어 지도록 한다. 
    
```bash    
sudo -u backupman -H crontab -e
```

다음 명령을 03, 04, 05시에 각각 _S-01_, _S-02_, _S-03_에대한 백업을 수행 하도록 job을 등록한 예제 이다. 
    
```cron    
0  3 * * * sudo /usr/local/bin/backupman -i -r ssh://S-01-BACKUP/home /home/backupman/S-01
0  4 * * * sudo /usr/local/bin/backupman -i -r ssh://S-02-BACKUP/home /home/backupman/S-02
0  5 * * * sudo /usr/local/bin/backupman -i -r ssh://S-03-BACKUP/home /home /home/backupman/S-03
```
    

Backup 스크립트는 아래 Repository에서 확인 할 수 있다. <https://github.com/harues/python-backupman>