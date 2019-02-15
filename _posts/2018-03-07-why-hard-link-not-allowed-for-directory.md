---
title: 왜 디렉터리 Hard link를 만들 수 없나요?
link: https://blog.harues.com/why-hard-link-not-allowed-for-directory/
author: euikook
description: 
post_id: 145
date: 2018-03-07 22:53:06 0900
comment_status: open
permalink: posts/why-hard-link-not-allowed-for-directory
redirect_from: why-hard-link-not-allowed-for-directory
status: publish
layout: post
tags: [Linux, Shell, Shell Command, ln, Hard Link, Symblic Link]
---

#### Why Hard Link Not Allowed for Directory
왜 디렉터리 Hard link를 만들 수 없나요?

  디렉터리 Hard Link를 만들고 싶지만 만들어 지지 않는다. 

예전에는 _root_ 권한으로 _**-d**_ 옵셥을 주면 만들어 진것 같은데 _Ubuntu 16.04_에서 테스트 해보니 _root_ 권한으로도 디렉터리 Hard Link가 만들어 지지 않는다. 
    
```bash    
mkdir a
ln a b
ln: a: hard link not allowed for directory
```


디렉터리 Hard Link는 여러 문제점을 야기 시킨다. 디렉터리 Hard Link에 의해 발생할 수 있는 문제점들에 대하여 알아본다. 

## 파일시스템에 루프를 만든다.
    
```bash    
mkdir -p ~/a/b
cd ~/a/b
ln ~/a c
```

<!--more-->

무한대의 깊이를 가지는 디렉터리 루프가 만들어 졌다. 
    
```bash    
cd ~/a/b/c/b/c/b/c/b/c/b/c/b/c/b/c/...
```
    

_**-maxdepth**_ 없이 _**find**_ 명력을 실행 하면 이 명령은 디렉터리 루프에서 실행된다. 이는 사용자사 디렉터리 루프를 가지는 디렉터리에 대하여 주요 명령어인 find 명령을 사용 할 수 없음을 의미 한다. 이는 주요 명령인 _**locate**_ 에서도 같이 적용 된다. 

Tree의 정의에는 Loop가 없기 때문에 파일시스템은 더이상 Tree가 아니게 되는 것이다. 

## 상위디렉터리의 명료성을 깨트린다.

위의 Loop 예제에서 여러개의 상위 디렉터리가 존재하게 된다. 
    
```bash
cd ~/a/b
cd ~/a/b/c/b
```

첫번째 케이스에서 ~/a는 ~/a/b의 상위 디렉터리이다. 두번째 케이스에서 ~/a/b/c 는 ~/a/b/c/b의 상위 디렉터리이며 이는 ~/a/b와 동일하다. 

따라서 ~/a/b는 2개의 상위 디렉터리를 가진다. 

## 하나의 파일이 여러 파일로 표현된다.

리눅스/유닉스 시스템에서 파일은 경로에 의해 식별된다. (심볼릭 링크의 경우 실제 경로를 resolving 한 후 실별됨.) 

예을 들어, 
    
```    
~/a/b/foo.txt
~/a/b/c/b/foo.txt
```
    

위의 두 파일은 다른 파일로 식별된다. 위 예제에서 각 path의 foo.txt는 하나의 inode 번호를 가지지만 이를 식별 하기 위한 Path는 무한대로 존제 한다. 사용자는 자신이 명시적으로 Loop를 생성하였을 경우를 제외하고는 이를 체크하지 않는다. 

디렉터리 하드링크는 자신의 하위 디렉터리 또는 하위 디렉터리나 상위 디렉터리가 아닌 어떤 디렉터리도 가리킬 수 있다. 이 경우 해당 디렉터리의 하위 항목들은 2개의 파일로 복제되며, 2개의 결로로 식별된다. 
    
```bash    
ln /one /one-hard 
echo foo > /one-hard/foobar.txt 
diff -s /one/foobar.txt /one-hard/foobar.txt
echo bar >> /one/foobar.txt 
diff -s /one/foobar.txt /one-hard/foobar.txt 
cat /one/foobar.txt 
foo 
bar
```
    

 

## 그렇다면 디렉터리에 소프트링크가 어떻게 동작 하는가?

소프트링크나 소프트링크가 포함된 디렉터리 루프를 포하는 경로는 종종 파일을 식별하거나 여는데만 사용됩니다. 이것은 정상적인 경로나 선형 경로 처럼 사용될 수 있다. 

하지만경로가 파일 비교에 사용되는 경우, Symbolic Link를 먼저 해석하여 최소 경로로 변환하여 일반적으로 동의 된 표현인 **canonical path** 를 만들 수 있다. 

이는 모든 소프트링크가 링크 없이 확장될 수 있기 때문에 가능하다. 경로에 있는 모든 소프트링크를 사용하여 이 작업을 수행한 후 남아 있는 경로는 항상 경로가 명확한 트리의 일부가 된다. 

_**readlink**_ 명령으로 정식 경로를 해석할 수 있다. 
    
```bash    
readlink -f /some/symlinked/path
```
    

## Soft links are different from what the filesystem uses

소프트 링트는 Filesystem 내부의 링크와는 다르기 때문에 소프트 링크로 인해 문제가 발생할 소지가 없습니다. 이는 Hard Link와 구분되며 필요한 경우 Symbolic Link가 없은 경로로 해석된다. . 

어떤의미에서 Symbolic Link를 추가 하는것은 기존의 파일시스템 구조를 변경하는것이 아니라 유지하는 것이지만 application 계층과 같은 더 많은 구조를 추가하는 것이다. 

## 디렉터리 하드링크의 대안

**_-al_** 옵션을 주고 copy 한다. 디렉터리는 복사(생성)이 되고 파일은 Hard Link가 된다. 
    
```bash    
cp -al src dst
```
directory를 _**-o bind**_ 옵션을 주고 _mount_ 할 수 도 있는데 이건 hard link가 아니라 soft link와 같이 동작 하니 PASS.
