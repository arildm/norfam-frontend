# norfam-frontend

This is the frontend of the Nordisk Familjebok website at https://nordiskfamiljebok.dh.gu.se/

## Development

```sh
git clone --recurse-submodules git@github.com:CDH-DevTeam/norfam-frontend
cd norfam-frontend
nvm use 16
yarn install
yarn serve
```

If you missed the `--recurse-submodules` above, just do `git submodule update --init` before `yarn install`.

### GUI Template

The [CDH GUI template](https://github.com/CDH-DevTeam/GUITemplate) is included as a [Git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules), "pinned" at a specific commit.

To checkout the specified commit:

```sh
git submodule update
```

To update to the latest pushed commit:

```sh
git submodule update --remote
```
