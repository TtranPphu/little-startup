FROM ubuntu:24.04 AS base-devcontainer

# common utilities and dependencies
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    sudo zsh wget curl git tmux vim zip unzip locales \
    build-essential software-properties-common gnupg \
    python3-pip python3.12-venv npm \
    shfmt luarocks fd-find \
    btop tree cloc neofetch

# locale
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8

# user
RUN userdel -r ubuntu
ARG USER_NAME=little
RUN groupadd ${USER_NAME}
RUN adduser --shell /usr/bin/zsh --gecos '' --ingroup ${USER_NAME} -u 1000 --disabled-password ${USER_NAME}
RUN usermod -aG sudo ${USER_NAME}
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER ${USER_NAME}

# set zsh as default shell
ENV SHELL=/usr/bin/zsh

# oh-my-zsh & powerlevel10k
RUN sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
RUN git clone --depth=1 \
    https://github.com/romkatv/powerlevel10k.git \
    ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
COPY --chown=${USER_NAME}:${USER_NAME} .p10k.zsh /home/${USER_NAME}/.p10k.zsh
COPY --chown=${USER_NAME}:${USER_NAME} gitstatusd-linux-x86_64 \
    /home/${USER_NAME}/.cache/gitstatus/gitstatusd-linux-x86_64

# gdu
RUN sudo add-apt-repository ppa:daniel-milde/gdu -y
RUN sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get install -y \
    gdu
COPY --chown=${USER_NAME}:${USER_NAME} .gdu.yaml /home/${USER_NAME}/.gdu.yaml

# rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
    . $HOME/.cargo/env && rustc --version

# uv for python
ARG PYTHON_VERSION=3.12
RUN curl --proto '=https' --tlsv1.2 -LsSf https://astral.sh/uv/install.sh | sh -s --
RUN . /home/${USER_NAME}/.local/bin/env && uv python install ${PYTHON_VERSION}

# npm
RUN sudo npm install n -g
RUN sudo n stable
RUN sudo npm update npm -g

# neo-vim and dependencies
RUN sudo add-apt-repository ppa:neovim-ppa/unstable -y
RUN sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get install -y \
    make gcc ripgrep unzip git xclip neovim fonts-noto-color-emoji
# for configurations, recommended checkout: https://github.com/nvim-lua/kickstart.nvim

# lsp, linters, formatters
RUN . /home/${USER_NAME}/.local/bin/env && uv tool install ruff
RUN . $HOME/.cargo/env && cargo install stylua
RUN sudo npm install prettier -g

# mongodbcli
RUN sudo apt-get install -y gnupg
RUN wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | \
    sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
RUN sudo apt-get update && sudo apt-get install -y mongodb-mongosh

FROM base-devcontainer AS example-devcontainer
COPY --chown=${USER_NAME}:${USER_NAME} example/.zshrc /home/${USER_NAME}/.zshrc

FROM base-devcontainer AS backend-devcontainer
COPY --chown=${USER_NAME}:${USER_NAME} backend/.zshrc /home/${USER_NAME}/.zshrc

RUN sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get install -y \
    openjdk-17-jdk \
    ffmpeg

FROM base-devcontainer AS frontend-devcontainer
COPY --chown=${USER_NAME}:${USER_NAME} frontend/.zshrc /home/${USER_NAME}/.zshrc
