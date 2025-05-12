# https://developers.google.com/idx/guides/customize-idx-env

{ pkgs, ... }: {
  channel = "stable-23.11";

  packages = [
    pkgs.git
    pkgs.docker
    pkgs.neofetch
  ];

  services.docker.enable = true;

  idx = {
    extensions = [
    ];
  };
}
