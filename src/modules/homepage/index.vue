<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { Button } from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';

import type { IDataSource } from '@/components';
import { DataTable } from '@/components';
import { shopService } from '@/services';

const logout = () => {
  sessionStorage.removeItem('username');
  location.reload();
};

const getUserAvatarColor = () => {
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return color;
};

const userAvaColor = ref(getUserAvatarColor());

const userName = ref(sessionStorage.getItem('username') || 'default');

onMounted(() => {
  getList();
});

const dataSource = reactive<IDataSource>({
  loading: false,
  noDataText: 'Không có shop nào',
  tableConfig: {
    scroll: { y: 700 },
  },
  paginator: {
    current: 1,
    total: 0,
    pageSize: 10,
  },
  data: [],
  columns: [
    {
      title: 'Avatar',
      scopedSlots: 'avatar',
      className: 'align-top',
    },
    {
      title: 'Thông tin shop',

      scopedSlots: 'shopInfo',
      className: 'align-top',
    },
    {
      title: 'Lịch sử hoạt động',
      scopedSlots: 'history',
      className: 'align-top',
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      scopedSlots: 'shopAction',
      className: 'align-middle',
    },
  ],
});

async function getList(page = 1) {
  dataSource.loading = true;
  const { success, data: shop } = await shopService
    .getNewRegistationList({ page, per_page: dataSource.paginator.pageSize })
    .finally(() => (dataSource.loading = false));

  console.log('resInCom', shop);

  if (success) {
    dataSource.data = shop.data;
    dataSource.paginator = {
      ...dataSource.paginator,
      total: shop.total,
      current: shop.current_page,
      pageSize: parseInt(shop.per_page),
    };
  }
}

function handleLoadPage(params) {
  dataSource.paginator.pageSize = params.pageSize;
  getList(params.current);
}
</script>

<template>
  <div class="w-full">
    <div class="flex w-full bg-indigo-500 items-center px-4 py-2">
      <div class="mr-4 flex items-center">
        <div
          class="mr-2 w-10 h-10 rounded-full flex items-center justify-center truncate max-w-full"
          :style="{ backgroundColor: userAvaColor }"
        ></div>
        <div>{{ userName }}</div>
      </div>
      <Button class="cursor-pointer" @click="logout">Logout</Button>
    </div>
    <DataTable :dataSource="dataSource" @table-change="handleLoadPage">
      <template #avatar="{ record }">
        <div class="2xl:w-[350px] 2xl:h-[230px] xl:w-[200px] xl:h-[120px]">
          <img :src="record.avatar" class="w-full h-full object-cover" />
        </div>
      </template>
      <template #shopInfo="{ record }">
        <div class="shopInfo">
          <div class="headline flex mb-2 items-center">
            <div class="headline__avatar mr-2">
              <img class="w-12 h-12 rounded-full object-cover" :src="record.creator.avatar" />
            </div>
            <div>{{ record.creator.name }}</div>
          </div>

          <div class="devices flex flex-wrap mb-2">
            <div class="devices__item bg-gray-300 px-3 py-[2px] rounded-2xl mr-2 mb-1"># IOS 14.3</div>
            <div class="devices__item bg-gray-300 px-3 py-[2px] rounded-2xl mr-2 mb-1"># Ver1.1.03</div>
          </div>

          <div class="userAction flex flex-wrap">
            <Button type="primary" ghost size="small" class="userAction__item">Hoàn thành</Button>
            <Button type="primary" ghost size="small" class="userAction__item">Liên hệ lại</Button>
          </div>
        </div>
      </template>
      <template #shopAction="{}">
        <div class="action flex items-center flex-col gap-2 justify-center h-full w-full">
          <Button type="primary" class="action__item">Chat shop</Button>
          <Button type="primary" class="action__item">Gọi shop</Button>
        </div>
      </template>
      <template #history="{}">
        <div class="align-top">
          <p class="font-medium mb-7">Thời gian đăng ký: 13:45 - 13/04/2022:</p>
          <div class="callLog flex justify-between">
            <div class="callLog__text text-ghtk-light">Call log gọi shop/KH</div>
          </div>
        </div>
      </template>
    </DataTable>
  </div>
</template>
