{
  description = "AstroJS";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  inputs.flake-compat.url = "github:edolstra/flake-compat";
  inputs.flake-compat.flake = false;
  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.npmlock2nix.url = "github:nix-community/npmlock2nix";
  inputs.npmlock2nix.flake = false;
  inputs.nix-npm-buildpackage.url = "github:serokell/nix-npm-buildpackage";
  inputs.nix-npm-buildpackage.flake = false;

  outputs = {
    self,
    nixpkgs,
    flake-compat,
    flake-utils,
    npmlock2nix,
    nix-npm-buildpackage,
  } @ inputs:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [
            (self: super: {
              npmlock2nix = pkgs.callPackage npmlock2nix {};
            })
          ];
        };

        astro-shell = pkgs.npmlock2nix.v2.shell {
          src = ./.;
          nodejs = pkgs.nodejs;
          node_modules_mode = "copy";
        };

        auto-forms = pkgs.mkShell {
          packages = [
            pkgs.python311Packages.selenium
            pkgs.firefox
            pkgs.geckodriver
          ];
        };
      in {
        devShells.astro = astro-shell;
        devShells.forms = auto-forms;
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.alejandra
          ];
        };
      }
    );
}
