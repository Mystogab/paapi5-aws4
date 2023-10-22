import { getItem } from '../lib/index.js';

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
