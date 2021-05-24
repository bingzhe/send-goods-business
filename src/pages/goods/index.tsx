import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { getGoodsList } from '../../services/api';
import { Select } from 'antd';
import { useModel } from 'umi';

async function fetchGoodsList(params: any) {
  const { current, pageSize, ...rest } = params;

  const data = {
    opr: 'get_goods_list',
    page_no: current,
    page_size: pageSize,
    ...rest,
  };

  const resp = await getGoodsList(data);

  const { list, total } = resp.data;
  // console.log(resp);
  return {
    data: list,
    total,
  };
}

const GoodsList: React.FC = () => {
  type SelectOptions = { value: string; label: string }[];

  const [materialOptions, setMaterialOptions] = React.useState<SelectOptions>([]);
  const [brandOptions, setBrandOptions] = React.useState<SelectOptions>([]);

  const { initialState } = useModel('@@initialState');
  const homeData = initialState?.homeData?.data;

  React.useEffect(() => {
    const raw_material_list = homeData?.raw_material_list || [];
    const phone_brand_list = homeData?.phone_brand_list || [];

    setMaterialOptions(raw_material_list.map((item) => ({ value: item, label: item })));
    setBrandOptions(
      phone_brand_list.map((item) => ({
        value: item.brand_id,
        label: item.brand_name,
      })),
    );
  }, [homeData]);

  const columns: ProColumns<API.GoodsItem>[] = [
    {
      title: '序号',
      valueType: 'index',
    },
    {
      title: '材质',
      dataIndex: 'raw_material',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }) => {
        if (type === 'form') return null;
        return <Select options={materialOptions} {...rest} />;
      },
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }) => {
        if (type === 'form') return null;

        return <Select options={brandOptions} {...rest} />;
      },
    },
    {
      title: '型号',
      dataIndex: 'model',
      hideInTable: true,
    },
    {
      title: '商品编号',
      dataIndex: 'goods_id',
    },
    {
      title: '商品名称',
      dataIndex: 'goods_name',
    },
    {
      title: 'sku',
      hideInSearch: true,
      dataIndex: 'sku_list_str',
    },
    {
      title: '类型',
      valueType: 'select',
      valueEnum: { 1: 'DIY', 2: '标品', 3: '礼品' },
      dataIndex: 'type',
    },
    {
      title: '颜色',
      dataIndex: 'color_name',
      hideInTable: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        request={fetchGoodsList}
        rowKey="goods_id"
        search={{ span: 6 }}
        headerTitle="商品列表"
      ></ProTable>
    </PageContainer>
  );
};

export default GoodsList;
