import { PaapiRequestBody, createAuthorizationHeader, toAmzDate } from './SignHelper.js';

type Credentials = {
  accessKey: string,
  secretKey: string,
  partnerTag: string
};

const buildBody = (
  itemsId: string | Array<string>,
  resources: Array<string>,
  partnerTag: string
  ): PaapiRequestBody => ({
    'ItemIds': [
      itemsId
    ].flat(),
    'Resources': resources,
    'PartnerTag': partnerTag,
    'PartnerType': 'Associates',
    'Marketplace': 'www.amazon.com'
  });

const buildDefaultHeaders = (date: number = Date.now()) => ({
  'Host': 'webservices.amazon.com',
  'X-Amz-Date': toAmzDate(date),
  'X-Amz-Target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems',
  'Content-Encoding': 'amz-1.0',
});

export const getItems = async (
  credentials: Credentials,
  itemsId: string | Array<string>,
  resources: Array<string>
  ) => {
    //TODO: Validate input
    const date = Date.now();
    const body = buildBody(itemsId, resources, credentials.partnerTag);
    const defaultHeaders = buildDefaultHeaders(date);

    const authorizationHeader = createAuthorizationHeader(
      credentials.accessKey,
      credentials.secretKey,
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
