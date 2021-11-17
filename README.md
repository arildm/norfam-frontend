# norfam-frontend

This is the frontend of the Nordisk Familjebok website at https://nordiskfamiljebok.dh.gu.se/

## Development

This project requires that the CDH GUI template is in a local directory, sibling to this one.

```sh
git clone git@github.com:CDH-DevTeam/norfam-frontend
git clone -b vue-lib git@github.com:CDH-DevTeam/GUITemplate
cd GUITemplate
yarn install
yarn build
cd ../norfam-frontend
yarn install
yarn serve
```

If the GUITemplate repo is updated locally (pulled or after local changes):

```sh
cd ../GUITemplate
yarn build
cd ../norfam-frontend
yarn add -D cdh-gui-vue
```
