---
title: Update Ubuntu Mirror  Site in sources.list
link: https://blog.harues.com/update-ubuntu-mirror-site-in-sources-list/
author: euikook
description: 
post_id: 72
date: 2018-02-05 06:50:55 0900
comment_status: open
permalink: posts/update-ubuntu-mirror-site-in-sources-list
redirect_from: update-ubuntu-mirror-site-in-sources-list
status: publish
layout: post
tags: [Linux, Ubuntu, Mirror]

---

#### Update Ubuntu Mirror  Site in sources.list

```bash
sudo sed -i 's|http://archive.ubuntu.com|http://ftp.daumkakao.com|g' /etc/apt/sources.list
```