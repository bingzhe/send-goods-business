import { EncSubmit as request } from './encsubmit';

export async function getHomeData() {
  return request('/php/login_get.php', { opr: 'get_home_data' });
}
