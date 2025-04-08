FROM ubuntu:22.04 as backend-devcontainer

# common utilities
RUN apt update && apt upgrade -y && apt install -y \
    sudo zsh wget curl git vim zip \
    build-essential software-properties-common \
    bpytop cloc ncdu

# user
ARG USER_NAME=little
RUN groupadd ${USER_NAME}
RUN adduser --shell /usr/bin/zsh --gecos '' --ingroup ${USER_NAME} --disabled-password ${USER_NAME}
RUN usermod -aG sudo ${USER_NAME}
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER ${USER_NAME}

# meslo nerd font for powerlevel10k and neo-vim
ARG MESLO_URL="https://github.com/romkatv/powerlevel10k-media/raw/master"
ARG MESLO_DIR="/usr/share/fonts/truetype/meslo"
RUN sudo mkdir -p ${MESLO_DIR}
RUN sudo wget ${MESLO_URL}/MesloLGS%20NF%20Regular.ttf -O ${MESLO_DIR}/MesloLGSNFRegular.ttf
RUN sudo wget ${MESLO_URL}/MesloLGS%20NF%20Bold.ttf -O ${MESLO_DIR}/MesloLGSNFBold.ttf
RUN sudo wget ${MESLO_URL}/MesloLGS%20NF%20Italic.ttf -O ${MESLO_DIR}/MesloLGSNFItalic.ttf
RUN sudo wget ${MESLO_URL}/MesloLGS%20NF%20Bold%20Italic.ttf -O ${MESLO_DIR}/MesloLGSNFBoldItalic.ttf

# oh-my-zsh & powerlevel10k
RUN sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
RUN git clone --depth=1 \
    https://github.com/romkatv/powerlevel10k.git \
    ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
COPY .zshrc /home/${USER_NAME}/.zshrc
COPY .p10k.zsh /home/${USER_NAME}/.p10k.zsh

# neo-vim and dependencies
ARG GITHUB_USER=TtranPphu
ARG GIT_BRANCH=TtranPphu-patch-1
RUN sudo add-apt-repository ppa:neovim-ppa/unstable -y
RUN sudo apt-get update && sudo apt-get install make gcc ripgrep unzip git xclip neovim fonts-noto-color-emoji -y
RUN git clone https://github.com/${GITHUB_USER}/kickstart.nvim \
    --branch ${GIT_BRANCH} "${XDG_CONFIG_HOME:-$HOME/.config}"/nvim

# JDK 17
RUN sudo apt-get update && \
    sudo apt-get install -y openjdk-17-jdk

# maven install
USER root 

RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    && wget https://archive.apache.org/dist/maven/maven-3/3.8.6/binaries/apache-maven-3.8.6-bin.tar.gz \
    && tar -xzvf apache-maven-3.8.6-bin.tar.gz -C /opt/ \
    && ln -s /opt/apache-maven-3.8.6/bin/mvn /usr/bin/mvn \
    && rm -rf apache-maven-3.8.6-bin.tar.gz

FROM maven:3.9.4-eclipse-temurin-17 AS backend
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=backend /app/target/demo-spring-0.0.1-SNAPSHOT.jar ./backend.jar
EXPOSE 4000
ENTRYPOINT ["java", "-jar", "/app/backend.jar"]
