---
title: History 파일에서 특정 엔트리 삭제하기
link: https://blog.harues.com/remove-specific-entries-from-history-file/
author: euikook
description: 
post_id: 173
date: 2018-03-08 14:13:58 0900
comment_status: open
permalink: posts/remove-specific-entries-from-history-file
redirect_from: remove-specific-entries-from-history-file
status: publish
layout: post
tags: [Linux, bash, history, shell]
---


#### Remove specific history entries from history file
History 파일에서 특정 엔트리 삭제하기

## History 파일에서 특정 엔트리 삭제하기

  작업을 하다 보면 민감한 정보가 History에 남아 있는 경우가 있다. 다음과 같이 명령 앞에 white space를 추가 하여 해당 명령을 history 파일에 남기지 않는 방법이 있다. 
    
```bash    
mysql -u root -ppassword -h localhost 
```    

명령앞 빈칸(space)에 주목. 
    
```bash   
mysql -u root -ppassword -h localhost
``` 

아차 하는 순간에 민감한 정보가 History에 남아 있는 경우 

<!--more-->
    
```bash    
history
1234 mysql -u root -pPASSWORD -h localhost 
1235 ls
```
    

**-d**_ 옵션을 사용하여 해당  엔트리를 삭제한다. _ _ 다음과이 사용한다. _
    
```bash    
history -d OFFSET
```
    
```bash
history -d 1234
```

지워야 되는 엔트리의 수가 많을 경우 다음과 명령으로 특정 문자열이 이 들어 있는 History를 지울 수 있다. 
    
```bash 
while history -d $(history | grep 'SEARCH-STRING-TO-REMOVE'| head -n 1 | awk {'print $1'}) ; do :; history -w; done
```

예를 들어 다음과 같이 실행 하면 **_ls_**가 들어간 모든 History가 삭제된다. 
    
```bash    
while history -d $(history | grep 'mysql'| head -n 1 | awk {'print $1'}) ; do :; history -w; done
```
    
```bash    
history
1234 cd
```