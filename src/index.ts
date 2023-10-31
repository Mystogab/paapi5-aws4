import { createAuthorizationHeader, toAmzDate } from './SignHelper.js';
import { ItemResource } from './types.js';

type Credentials = {
  accessKey: string,
  secretKey: string,
  partnerTag: string
};

const availableMarketplace = [
  'www.amazon.com',    'www.amazon.ca',
  'www.amazon.com.mx', 'www.amazon.com.br',
  'www.amazon.co.uk',  'www.amazon.fr',
  'www.amazon.de',     'www.amazon.es',
  'www.amazon.in',     'www.amazon.it',
  'www.amazon.ae',     'www.amazon.sa',
  'www.amazon.com.tr', 'www.amazon.nl',
  'www.amazon.se',     'www.amazon.pl',
  'www.amazon.eg',     'www.amazon.com.be',
  'www.amazon.co.jp',  'www.amazon.com.au',
  'www.amazon.sg'
] as const;

type Marketplace = typeof availableMarketplace[number];

type Config = {
  credentials: Credentials,
  marketplace?: Marketplace,
  partnerType?: 'Associates'
};

const buildBody = (
  itemsId: string | Array<string>,
  resources: Array<string>,
  partnerTag: string,
  marketplace: Marketplace = 'www.amazon.com'
  ) => ({
    'ItemIds': [
      itemsId
    ].flat(),
    'Resources': resources,
    'PartnerTag': partnerTag,
    'PartnerType': 'Associates',
    'Marketplace': marketplace
  });

const buildDefaultHeaders = (date: number = Date.now()) => ({
  'Host': 'webservices.amazon.com',
  'X-Amz-Date': toAmzDate(date),
  'X-Amz-Target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems',
  'Content-Encoding': 'amz-1.0',
});

export const getItems = async (
  config: Config,
  itemsId: string | Array<string>,
  resources: Array<ItemResource>
  ) => {
    //TODO: Validate input
    const date = Date.now();
    const body = buildBody(itemsId, resources, config.credentials.partnerTag, config.marketplace);
    const defaultHeaders = buildDefaultHeaders(date);

    const authorizationHeader = createAuthorizationHeader(
      config.credentials.accessKey,
      config.credentials.secretKey,
      defaultHeaders,
      'POST',
      "/paapi5/getitems",
      body,
      'us-east-1',
      'ProductAdvertisingAPI',
      date
    );

    const finalHeaders = {
      'Host': defaultHeaders['Host'],
      'Accept': 'application/json, text/javascript',
      'Accept-Language': 'en-US',
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Amz-Date': defaultHeaders['X-Amz-Date'],
      'X-Amz-Target': defaultHeaders['X-Amz-Target'],
      'Content-Encoding': defaultHeaders['Content-Encoding'],
      'Authorization': authorizationHeader
    };

    const result = await fetch('https://webservices.amazon.com/paapi5/getitems', {
      method: 'POST',
      headers: finalHeaders,
      body: JSON.stringify(body)
    })
    .then(r => (r as unknown as any).json())
    .catch(error => {
      console.error(error)
      throw error;
    });

    return result;
};
