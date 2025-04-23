FROM ubuntu:22.04 AS base-devcontainer

# common utilities
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    sudo zsh wget curl git tmux vim zip unzip \
    build-essential software-properties-common \
    python3-pip bpytop tree ncdu cloc neofetch

# user
ARG USER_NAME=little
RUN groupadd ${USER_NAME}
RUN adduser --shell /usr/bin/zsh --gecos '' --ingroup ${USER_NAME} --disabled-password ${USER_NAME}
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

# neo-vim and dependencies
ARG GITHUB_USER=TtranPphu
ARG GIT_BRANCH=TtranPphu-patch-1
RUN sudo add-apt-repository ppa:neovim-ppa/unstable -y
RUN sudo apt-get update && sudo apt-get install make gcc ripgrep unzip git xclip neovim fonts-noto-color-emoji -y
RUN git clone https://github.com/${GITHUB_USER}/kickstart.nvim \
    --branch ${GIT_BRANCH} "${XDG_CONFIG_HOME:-$HOME/.config}"/nvim

FROM base-devcontainer AS example-devcontainer
COPY --chown=${USER_NAME}:${USER_NAME} example/.zshrc /home/${USER_NAME}/.zshrc

# rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
    . $HOME/.cargo/env && \
    rustc --version

# uv and ruff for python
ARG PYTHON_VERSION=3.12
RUN curl --proto '=https' --tlsv1.2 -LsSf https://astral.sh/uv/install.sh | sh -s --
RUN . /home/${USER_NAME}/.local/bin/env && uv python install ${PYTHON_VERSION}
RUN pip3 install ruff ruff-lsp

# mongodbcli
RUN sudo apt-get install -y gnupg
RUN wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
RUN sudo apt-get update && sudo apt-get install -y mongodb-mongosh

# npm
RUN sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get install -y \
    npm
RUN sudo npm install n -g
RUN sudo n stable
RUN sudo npm update npm -g

FROM base-devcontainer AS frontend-devcontainer
COPY --chown=${USER_NAME}:${USER_NAME} frontend/.zshrc /home/${USER_NAME}/.zshrc

# npm and node
RUN sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get install -y \
    npm
RUN sudo npm install n -g
RUN sudo n stable
RUN sudo npm update npm -g

FROM base-devcontainer AS backend-devcontainer
COPY backend/.zshrc /home/${USER_NAME}/.zshrc

RUN sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get install -y \
    openjdk-17-jdk
