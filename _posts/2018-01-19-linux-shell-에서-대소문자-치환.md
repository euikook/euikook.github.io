---
title: Linux Shell 에서 대소문자 치환
link: https://blog.harues.com/linux-shell-%ec%97%90%ec%84%9c-%eb%8c%80%ec%86%8c%eb%ac%b8%ec%9e%90-%ec%b9%98%ed%99%98/
author: euikook
description: 
post_id: 33
date: 2018-01-19 03:58:00 0900
comment_status: open
permalink: posts/linux-shell-에서-대소문자-치환
redirect_from: linux-shell-에서-대소문자-치환
status: publish
layout: post
tags: [Linux, Bash, Shell, Shell Command, tr]
---

#### Linux Shell 에서 대소문자 치환

Linux tr 명령 사용 
    
```bash    
tr [:lower:] [:upper:]
```
Examples: 
    
```bash    
echo test | tr [:lower:] [:upper:]
```
