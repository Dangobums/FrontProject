<template>
  <div>
    <div>Login</div>
    <form @submit.prevent="login">
      <label>
        <input v-model="username" name="username" type="text" />
      </label>
      <button>Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { RouteName } from '@/shared/constants';

const route = useRoute();
const router = useRouter();

const username = ref('');
const password = ref('');

const login = () => {
  sessionStorage.setItem('username', username.value);
  router.push({ name: RouteName.HOMEPAGE });
};
</script>

<style lang="scss" scoped></style>
