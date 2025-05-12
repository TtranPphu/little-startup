## Instructions

### 0. Requirements

- Docker
  - **_For Windows_**: Recommended to use WSL2 based engine.
- [Optional] Visual Studio Code with **Dev Containers** extention
  (`ms-vscode-remote.remote-containers`) installed.
- [Optional] Neo-vim with your personal configuration.

### 1. Working locally

Note: _For Windows_, recommended to clone in WSL2 managed directory.

```shell
git clone git@github.com:TtranPphu/little-startup.git
cd little-startup
```

#### Visual Studio Code

```shell
code .
```

`[Ctrl + Shift + P]` > `Run Tasks` > `Start - Development` > Pick the service you want to work on.

#### Neo-vim

```shell
./ops.sh start nvim <your-service>
```

Subsitude **_\<your-service\>_** with the service you want to work on.

### 2. Working on Github codespaces

On the project's Github page:

- **<> Code** > Change to **Codespaces** tab > **⋯** > **New with options...**
- Make sure **Dev container configuration** is set to the component you want to work with,
  and not **Default project configuration**, because we have none.

### 3. Working on Google IDX

In progress...
