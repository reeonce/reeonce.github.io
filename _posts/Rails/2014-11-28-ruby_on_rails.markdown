---
layout: post
title: Errors of Configuring Ruby on Rails 
category: rails
tags: [Ruby on Rails, passenger, nginx]
date: 2014-11-28
---

1. Missing \`secret_key_base\` for 'production' environment, set this value in \`config/secrets.yml\`

	```
	RAILS_ENV=production rake secret
	vi /etc/profile
	export SECRET_KEY_BASE=`RAILS_ENV=production rake secret`
	```

2. no such file to load -- bundler/setup

	`GEM_HOME=/home/ec2-user/.gem/ruby/2.0/gems/`


3. Could not find a JavaScript runtime. See https://github.com/sstephenson/execjs for a list of available runtimes. (ExecJS::RuntimeUnavailable)

	Make sure nodejs has been installed. Remove # before `gem 'therubyracer',  platforms: :ruby` in the Gemfile