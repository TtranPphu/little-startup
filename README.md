## Instructions

### Please read the whole instruction carefully as it is not so long and very importance.

### 0. Requirements

- Docker
  - **_For Windows_**: Recommended to use **_WSL2_** based engine.
- [Optional] Visual Studio Code with **_Dev Containers_** extention
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

### 2. Working on cloud hosted environments

#### GitHub Codespaces

On the project's Github page:

- **[<> Code]** > Change to **[Codespaces]** tab > **[⋯]** > **[New with options...]**
- Make sure **[Dev container configuration]** is set to the service you want to work on, and **NOT** **[Default project configuration]**, because we have none.

#### Google IDX

Work in progress...

### 3. Workflow

#### Recommends

- Rebase you working branch to master frequently.

#### Before merge your feature branch to `master`

- Rebase you branch upto latest `master` commit

  ```shell
  git checkout master
  git pull
  git checkout `feature-branch`
  git rebase master
  git push --force
  ```

- Test if your changes break the build process

  Note that this action will clean you working directory, remove any untracked files (except database files store in `.db-*/` folder) and reset all you changes in tracked files. So backup you work with `git stash save --all`

  - In VS Code: `[Ctrl + Shift + B]` > `Rebuild (Test)`
  - In Terminal: `./ops.sh rebuild`

- Acquire PR approval, then merge you branch to master

  ```shell
  git checkout master
  git merge --no-ff `feature-branch`
  ```
