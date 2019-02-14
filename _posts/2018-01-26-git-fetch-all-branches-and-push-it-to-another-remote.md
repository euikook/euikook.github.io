---
title: git fetch all branches and push it to another remote
link: https://blog.harues.com/git-fetch-all-branches-and-push-it-to-another-remote/
author: euikook
description: 
post_id: 32
date: 2018-01-26 04:14:00 0900
comment_status: open
permalink: posts/git-fetch-all-branches-and-push-it-to-another-remote
redirect_from: git-fetch-all-branches-and-push-it-to-another-remote
status: publish
layout: post
tags: [Linux, git]
---

#### git fetch all branches and push it to another remote

## git fetch all branches and tags from origin, then push it to new remote
    
```bash
git fetch --all
for branch in `git branch -r`; do git branch --track ${branch#origin/} $branch; done
git remote add new https://newrepos.com/new.git
git push new --all
git fetch --tags
git push new tags
```