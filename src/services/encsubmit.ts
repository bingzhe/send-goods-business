import { request } from 'umi';

export const getPublicKey = async () => {
  return request<API.RsaResp>('/php/rsa_info.php', {
    method: 'POST',
    data: { publickey: 1 },
    requestType: 'form',
  });
};
