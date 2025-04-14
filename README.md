## Instructions

0.  **Requirement**:

    - Docker
      - **_For Windows_**: Recommended to use WSL2 based engine.
    - VS Code with **Dev Containers** extention (_ms-vscode-remote.remote-containers_) installed (Optional).

1.  **Clone and init the repository**:

    - **_For Windows_**: Recommended to clone in WSL2 managed directory.

    ```sh
    git clone git@github.com:TtranPphu/little-startup.git
    cd little-startup
    ```

    - Working in VS Code
      ```
      code .
      ```
      - Open **Command Palette** [Ctrl + Shift + P] -> **Dev Containers: (Rebuild and) Reopen in Container**.
      - Select service you want to work on.
    - Working in Neovim
      ```
      sh nvim-dev.sh <your-service>
      ```
      - Subsitude **_\<your-service\>_** with the name of the service you want to work on.

2.  **Working on Github codespaces**

    - On the project's Github page:
      - **<> Code** -> Change to **Codespaces** tab -> **⋯** -> **New with options...**
      - Make sure **Dev container configuration** is set to the component you want to work with, and not **Default project configuration**, because we have none.
