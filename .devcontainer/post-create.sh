#! /usr/bin/bash

# default nvim config if not exist
git-user=TtranPphu
git-branch=TtranPphu-patch-1
git clone https://github.com/$git-user/kickstart.nvim \
  --branch $git-branch "${XDG_CONFIG_HOME:-$HOME/.config}"/nvim \
  --depth 1 &>/dev/null | true
