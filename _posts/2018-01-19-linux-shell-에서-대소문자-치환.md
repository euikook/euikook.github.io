---
title: Linux Shell 에서 대소문자 치환
link: https://blog.grepos.com/linux-shell-%ec%97%90%ec%84%9c-%eb%8c%80%ec%86%8c%eb%ac%b8%ec%9e%90-%ec%b9%98%ed%99%98/
author: euikook
description: 
post_id: 33
created: 2018/01/19 03:58:00
created_gmt: 2018/01/18 18:58:00
comment_status: open
post_name: linux-shell-%ec%97%90%ec%84%9c-%eb%8c%80%ec%86%8c%eb%ac%b8%ec%9e%90-%ec%b9%98%ed%99%98
status: publish
layout: post
---

#### Linux Shell 에서 대소문자 치환

Linux tr 명령 사용 
    
    
```tr [:lower:] [:upper:]```

Examples: 
    
    
```echo test | tr [:lower:] [:upper:]```