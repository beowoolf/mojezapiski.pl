#!/bin/bash

# mkdir -p ~/bin && ln -fs /usr/local/bin/node16 ~/bin/node && ln -fs /usr/local/bin/npm16 ~/bin/npm && source $HOME/.bash_profile
mkdir -p ~/bin && ln -fs /usr/local/bin/node18 ~/bin/node && ln -fs /usr/local/bin/npm18 ~/bin/npm && source $HOME/.bash_profile
git pull && cd ~/cloned/mojezapiski.pl/www-frontend && yarn && yarn build && devil www restart mojezapiski.pl
