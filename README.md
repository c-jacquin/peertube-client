# peertube-client

> client for peertube rest api

[![Build Status](https://travis-ci.org/charjac/peertube-client.svg?branch=master)](https://travis-ci.org/charjac/peertube-client)
[![NPM version](https://img.shields.io/npm/v/peertube-client.svg)](https://www.npmjs.com/package/peertube-client)
![Downloads](https://img.shields.io/npm/dm/peertube-client.svg)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Installing

```sh
npm i peertube-client
```

## Getting started

This library handle all the oauth process for you just give an instance host, a username and a password and you are ready to go.

For now video upload is not supported, i cannot achive to make it work, pr are more than welcome :).

Let's demonstrate simple usage with :

```ts
import { Peertube } from 'peertube-client';

const peertube = new Peertube({
  instance: 'peertube.fr',
  user: 'jonsnow',
  password: 'foo',
});

const main = async () => {
  try {
    const me = await peertube.whoAmI();
    const videos = await peertube.getVideos();
    const video = await peertube.getVideo(2345);
    /* ... */
  } catch (err) {
    console.error(err);
  }
};
```

## Publishing

Execute `yarn release` which will handle following tasks:

- bump package version and git tag
- update/(create if it doesn't exist) CHANGELOG.md
- push to github master branch + push tags
- publish build packages to npm

> releases are handled by awesome [standard-version](https://github.com/conventional-changelog/standard-version)

### Pre-release

- To get from `1.1.2` to `1.1.2-0`:

`npm run release --prerelease`

- **Alpha**: To get from `1.1.2` to `1.1.2-alpha.0`:

`npm run release --prerelease alpha`

- **Beta**: To get from `1.1.2` to `1.1.2-beta.0`:

`npm run release --prerelease beta`

### Dry run mode

See what commands would be run, without committing to git or updating files

`npm run release --dry-run`

### Check what files are gonna be published to npm

- `npm run pack` OR `npm run release:preflight` which will create a tarball with everything that would get published to NPM

## Tests

Test are written and run via Jest 💪

```
npm test
# OR
npm run test:watch
```

## Style guide

Style guides are enforced by robots, I meant prettier and tslint of course 🤖 , so they'll let you know if you screwed something, but most of the time, they'll autofix things for you. Magic right ?

### Style guide npm scripts

```sh
#Format and fix lint errors
npm run style:fix
```

## Generate documentation

`npm run docs`

## Commit ( via commitizen )

- this is preferred way how to create conventional-changelog valid commits
- if you prefer your custom tool we provide a commit hook linter which will error out, it you provide invalid commit message
- if you are in rush and just wanna skip commit message validation just prefix your message with `WIP: something done` ( if you do this please squash your work when you're done with proper commit message so standard-version can create Changelog and bump version of your library appropriately )

`npm run commit` - will invoke [commitizen CLI](https://github.com/commitizen/cz-cli)

### Troubleshooting

## Licensing

[MIT](./LICENSE.md) as always
