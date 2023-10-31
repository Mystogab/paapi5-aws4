# @mystogab/paapi5-aws4
## Amazon PAAPI v5 with AWS signature v4

> This is a WIP up-to-date implementation of Amazon Product API v5 with signing version 4

Up-to-date PAAPIv5 implementation

Status:

| Feature                      |             Status             | Implemented in |
| :--------------------------- | :----------------------------: | :------------: |
| BROWSENODE -> GetBrowseNodes | :warning: In Progress...       |                |
| ITEM -> GetVariations        | :warning: In Progress...       |                |
| ITEM -> GetItems             | :white_check_mark: Implemented |     v0.1.0     |
| ITEM -> SearchItems          | :warning: In Progress...       |                |

## Requirements
 - NodeJS > 18
 - ESM and CJS available it should work in boths systems

## Installation

npm:
```shell
npm i @mystogab/paapi5-aws4
```
pnpm:
```shell
pnpm add @mystogab/paapi5-aws4
```
bun:
```shell
bun add @mystogab/paapi5-aws4
```

## Getting Started
Simple example of GetItem images:
```typescript
import { getItems } from '@mystogab/paapi5-aws4';

const credentials = {
    accessKey: 'AKIAYOURACCESSKEU',
    secretKey: 'UAYOURseocbnvousebcobes/secret',
    partnerTag: 'awesome-tag'
};

const resources = [
    'Images.Primary.Small',
    'Images.Primary.Medium',
    'Images.Primary.Large',
    'Images.Primary.HighRes',
    'Images.Variants.Small',
    'Images.Variants.Medium',
    'Images.Variants.Large',
    'Images.Variants.HighRes'
];

const images = await getItems(credentials, 'B09MLRPTT2', resources);

```

## Changelog
### v0.1.2
 - feature: removed old crypto-js dependency
 - types: added resources typing for 'getItems'

### v0.1.1
 - fix: doc typos
 - add CJS and ESM compatibility
 - updated docs