/* eslint-disable no-restricted-syntax */
import React from 'react';
import { request } from 'umi';
import { getRandString } from '../utils/utils';
import { JSEncrypt } from 'jsencrypt';
import md5 from 'md5';

export const getPublicKey = async () => {
  return request<API.RsaResp>('/php/rsa_info.php', {
    method: 'POST',
    data: { publickey: 1 },
    requestType: 'form',
  });
};

export const submitDataKey = (publickey: string, key: string, token: string) => {
  const rsa = new JSEncrypt({});
  rsa.setPublicKey(publickey);
  const key_enc = rsa.encrypt(key);

  const data = {
    save_key: 1,
    is_plain: 1,
    key_enc,
    token,
  };

  return request('/php/rsa_info.php', {
    method: 'POST',
    data,
    requestType: 'form',
  });
};

export const EncSubmit = async (
  url: string,
  data: Record<string, any>,
  options?: Record<string, any>,
) => {
  const token = React.useRef<string | null>();
  const data_key = React.useRef<string | null>();

  token.current = localStorage.getItem('token');
  data_key.current = localStorage.getItem('key');

  if (!token.current) {
    token.current = `T3${getRandString(14)}`;
    localStorage.setItem('token', token.current);
  }

  if (!data_key.current) {
    const key = getRandString(16);
    // eslint-disable-next-line no-console
    console.log(`key:${key}`);

    const getPublicKeyResp = await getPublicKey();
    const { publickey } = getPublicKeyResp.data;
    await submitDataKey(publickey, key, token.current);
    data_key.current = key;
    localStorage.setItem('key', data_key.current);
  }

  const param = new FormData();
  const query = new URLSearchParams();

  for (const i in data) {
    if (Object.prototype.hasOwnProperty.call(data, i)) {
      const element = data[i];
      if (Object.is(element.constructor, File)) {
        param.append(i, element);
      }

      if (element !== null && element !== undefined) {
        if (typeof element === 'object') {
          query.append(i, JSON.stringify(element));
        } else {
          query.append(i, element);
        }
      }
    }
  }

  const datastr = query.toString();
  const { encmode, ...anotherOptions } = options || {};

  param.append('token', token.current);
  param.append('encmode', encmode || '');
  param.append('data', datastr);
  param.append('sign', md5(datastr + data_key.current));

  return request(url, {
    method: 'POST',
    data: param,
    ...anotherOptions,
  });
};
