# https://developers.google.com/idx/guides/customize-idx-env

{ pkgs, ... }: {
  channel = "nixos-24.05";

  packages = with pkgs; [
    git
    docker
    zip
    unzip
    wget
    curl
  ];

  services.docker.enable = true;

  idx = {
    extensions = [
      "charliermarsh.ruff"
      "chekweitan.compare-view"
      "cweijan.vscode-mysql-client2"
      "eriklynd.json-tools"
      "esbenp.prettier-vscode"
      "github.codespaces"
      "github.copilot"
      "github.vscode-pull-request-github"
      "jnoortheen.nix-ide"
      "mads-hartmann.bash-ide-vscode"
      "mechatroner.rainbow-csv"
      "medo64.render-crlf"
      "ms-azuretools.vscode-containers"
      "ms-python.python"
      "ms-python.vscode-pylance"
      "ms-toolsai.jupyter"
      "rust-lang.rust-analyzer"
      "tamasfe.even-better-toml"
      "usernamehw.errorlens"
      "vadimcn.vscode-lldb"
    ];
  }
}
