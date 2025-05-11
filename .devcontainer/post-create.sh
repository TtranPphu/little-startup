#! /usr/bin/bash

# default nvim config if not exist
git_user=TtranPphu
git_branch=TtranPphu-patch-1
git clone https://github.com/$git_user/kickstart.nvim \
  --branch $git_branch "${XDG_CONFIG_HOME:-$HOME/.config}"/nvim \
  --depth 1 2>&1 | tee /dev/null | true
