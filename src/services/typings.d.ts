// @ts-ignore
/* eslint-disable */

declare namespace API {
  type RsaResp = {
    data: {
      expire: number;
      publickey: string;
    };
    ret: number;
  };

  type PhoneModel = {
    model_id: string; // 型号ID
    model_name: string; // 型号名称
    outline_img: string; // 轮廓图
  };

  type PhoneBrand = {
    brand_id: string;
    brand_name: string;
    model_list: PhoneModel[];
  };

  type DeliveryItem = {
    name: string;
    price: number;
  };

  type InputAccountItem = {
    type: string;
    account: string;
  };

  type SupportItem = {
    title: string;
    contact: string;
  };

  type TaskStatusItem = {
    label: string;
    value: number;
  };

  type HomeData = {
    data: {
      // 商户信息（账户信息）
      business_info: {
        business_id: string; // 商户账户ID
        business_name: string; // 商户名（注：不是登录名）
        username: string; // 用户名(即用户表中的)
        account_balance: number; // 账户余额(元)
        vip_level: string; // vip等级（"普通会员"、"白金会员"...）
        create_time: number; // 开户时间
        designer_valid: number; // 可使用DIY设计器(1:可使用,0:不能使用)
        telephone: string; // 联系电话
        address: string; // 联系地址
        url: string; // 商铺URL
      };
      buycart_id: string; // 当前用户的购物车（用于拉取购物车数据）（注：从购物车下单成功后，会清除此字段）
      raw_material_list: string[]; // 手机壳材质列表
      phone_brand_list: PhoneBrand[]; // 手机品牌、型号列表
      theme_list: string[]; // 主题列表
      delivery_list: DeliveryItem[]; // 物流公司及快递费列表
      input_account_list: InputAccountItem[]; // 工厂收款账户列表
      support_list: SupportItem[]; // 客服列表
      icp: {
        txt: string;
        url: string;
      };
      task_status_list: TaskStatusItem[];
    };
    ret: number;
  };

  type GoodsItem = {
    attach_list_str: string;
    brand: string;
    brand_txt: string;
    factory_id: string;
    goods_id: string;
    goods_name: string;
    inventory: number;
    model: string;
    model_txt: string;
    price: number;
    raw_material: string;
    sku_list_str: string;
    status: number;
    type: number;
    type_txt: string;
  };

  type GoodsListParam = {
    opr: string;
    page_no: number;
    goods_material?: string;
    type?: number;
    brand?: string;
    model?: string;
    goods_name?: string;
    goods_id?: string;
    color_name?: string;
  };

  type GoodsListResp = {
    data: {
      list: GoodsItem[];
      page_no: number;
      page_size: number;
      total: number;
    };
  };
}
