#!/bin/bash

mkdir -p ~/bin && ln -fs /usr/local/bin/node24 ~/bin/node && ln -fs /usr/local/bin/npm24 ~/bin/npm && source $HOME/.bash_profile
git pull && yarn install --ignore-platform && yarn build && devil www restart mojezapiski.pl
