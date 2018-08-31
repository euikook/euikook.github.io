---
title: git fetch all branches and push it to another remote
link: https://blog.grepos.com/git-fetch-all-branches-and-push-it-to-another-remote/
author: euikook
description: 
post_id: 32
created: 2018/01/26 04:14:00
created_gmt: 2018/01/25 19:14:00
comment_status: open
permalink: git-fetch-all-branches-and-push-it-to-another-remote
status: publish
layout: post
---

#### git fetch all branches and push it to another remote

## git fetch all branches and tags from origin, then push it to new remote
    
```    
git fetch --all
for branch in `git branch -r`; do git branch --track ${branch#origin/} $branch; done
git remote add new https://newrepos.com/new.git
git push new --all
git fetch --tags
git push new tags
```