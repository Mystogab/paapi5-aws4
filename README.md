# @mystogab/paapi5-aws4
## Amazon PAAPI v5 with AWS signature v4

> This is a WIP up-to-date implementation of Amazon Product API v5 with signing version 4

Up-to-date PAAPIv5 implementation

Status:

| Feature                             |             Status             | Implemented in | Expected in |
| :---------------------------------- | :----------------------------: | :------------: | :---------: |
| BROWSENODE -> GetBrowseNodes        | :warning: In Progress...       |                |   Q4 2023   |
| ITEM -> GetVariations               | :warning: In Progress...       |                |   Q1 2024   |
| ITEM -> GetItems                    | :white_check_mark: Implemented |     v0.1.0     |      -      |
| ITEM -> SearchItems                 | :warning: In Progress...       |                |   Q1 2024   |
| Core -> Remove crypto-js dependency | :white_check_mark: Implemented |     v0.1.2     |      -      |

## Requirements
 - NodeJS > 18
 - ESM and CJS available so it can work in boths systems

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
```ts
import { getItems, Config } from '@mystogab/paapi5-aws4';

const config: Config = {
    credentials = {
        accessKey: 'AKIAYOURACCESSKEU',
        secretKey: 'UAYOURseocbnvousebcobes/secret',
        partnerTag: 'awesome-tag'
    },
    marketplace: 'www.amazon.com', //optional, default = "www.amazon.com"
    partnerType: 'Associates' //optional, default = "Associates" it cant be different to it
}

const ;

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

const images = await getItems(config, 'B09MLRPTT2', resources);

```

## Changelog
### v0.1.3
 - breaking change: functions take Config instead of Credentials as first argument
 - ability to define the marketplace, default to www.amazon.com

### v0.1.2
 - feature: removed old crypto-js dependency
 - types: added resources typing for 'getItems'

### v0.1.1
 - fix: doc typos
 - add CJS and ESM compatibility
 - updated docs