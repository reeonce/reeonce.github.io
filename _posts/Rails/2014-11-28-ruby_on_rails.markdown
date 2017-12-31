---
layout: post
title: Errors when setup Ruby on Rails on EC2
category: rails
tags: [Ruby on Rails, passenger, nginx]
date: 2014-11-28
---

Tried to setup Rails run on Nginx. Some errors I met are listed here:

##### Missing \`secret_key_base\` for 'production' environment, set this value in \`config/secrets.yml\`

```
RAILS_ENV=production rake secret
vi /etc/profile
export SECRET_KEY_BASE=`RAILS_ENV=production rake secret`
```
or to import the ouput directly to *config/secrets.yml*.

##### no such file to load -- bundler/setup

```bash
GEM_HOME=/home/ec2-user/.gem/ruby/2.0/gems/
```
##### Could not find a JavaScript runtime. See https://github.com/sstephenson/execjs for a list of available runtimes. (ExecJS::RuntimeUnavailable)

Make sure nodejs has been installed. Remove # before `gem 'therubyracer',  platforms: :ruby` in the Gemfile

##### rake aborted! MultiJson::AdapterError: Did not recognize your adapter specification (cannot load such file -- json/ext/parser).

Add the following to your Gemfile, version 1.10.1 not woking:

```bash
gem 'multi_json', '1.7.8'
bundle update multi_json
```

##### ruby on rails assets not found

go to /public and see if the assets folder is there, if not, open config/environments/production.rb in your application:

```bash
config.serve_static_assets = false
```

set it to `true`, or you can use Apache or Nginx to serve the static assets.

#####  home/ec2-user/.gem/ruby/2.0/gems/activesupport-4.1.8/lib/active_support/dependencies.rb:247:in `require': cannot load such file -- io/console (LoadError)

```bash
gem 'io-console'
gem install
```
