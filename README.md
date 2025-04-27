## Instructions

0.  **Requirement**:

    - Docker
      - **_For Windows_**: Recommended to use WSL2 based engine.
    - VS Code with **Dev Containers** extention (_ms-vscode-remote.remote-containers_) installed (Optional).

1.  **Working locally**:

    - **_For Windows_**: Recommended to clone in WSL2 managed directory.

    ```sh
    git clone git@github.com:TtranPphu/little-startup.gitgt
    cd little-startup
    ```

    - in VS Code

      ```
      ./ops.sh start code <your-service>
      ```

      - Open **Command Palette** [Ctrl + Shift + P] -> **Dev Containers: Reopen in Container**.
      - Select service you want to work on.

    - in Neovim
      ```
      ./ops.sh start nvim <your-service>
      ```
    - Subsitude **_\<your-service\>_** with the name of the service you want to work on.

2.  **Working on Github codespaces**

    - On the project's Github page:
      - **<> Code** -> Change to **Codespaces** tab -> **⋯** -> **New with options...**
      - Make sure **Dev container configuration** is set to the component you want to work with, and not **Default project configuration**, because we have none.
