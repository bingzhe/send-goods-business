import { EncSubmit as request } from './encsubmit';

export async function getHomeData() {
  return request<API.HomeData>('/php/login_get.php', { opr: 'get_home_data' });
}

export async function getGoodsList(data: API.GoodsListParam) {
  return request<API.GoodsListResp>('/php/goods_get.php', { ...data });
}
