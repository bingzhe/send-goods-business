import { EncSubmit as request } from './encsubmit';

export async function getHomeData() {
  return request<API.HomeData>('/php/login_get.php', { opr: 'get_home_data' });
}

export async function getGoodsList() {
  return request<API.GoodsListResp>('/php/goods_get.php', { opr: 'get_goods_list', page_no: 1 });
}
