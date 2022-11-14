<template>
  <div class="login">
    <form name="form-login" @submit.prevent="login">
      <h1 class="text-white">SIGN IN</h1>

      <label for="userName" class="text-white">Email</label>
      <input id="userName" v-model="username" type="text" placeholder="Username" required />

      <label for="userPw" class="text-white">Password</label>
      <input id="userPw" v-model="password" type="password" placeholder="Password" />
      <div v-if="onError" class="text-red-500">Wrong user name</div>

      <div id="remember" class="mb-2">
        <label class="flex items-center"
          ><input
            id="rememberMe"
            v-model="isRemember"
            type="checkbox"
            style="display: inline-block"
            class="mr-2"
          />Remember me</label
        >
      </div>

      <input id="login_btn" type="submit" value="Login" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { RouteName } from '@/shared/constants';

const router = useRouter();

const username = ref('');
const password = ref('');
const isRemember = ref(false);
const onError = ref(false);

const login = () => {
  const data = JSON.parse(localStorage.getItem('user') || '').map((item) => item.username);
  console.log(data);
  if (!data.includes(username.value)) {
    onError.value = true;
    return;
  }
  sessionStorage.setItem('isLogin', 'true');
  router.push({ name: RouteName.HOMEPAGE });
};
</script>

<style lang="scss" scoped>
@charset "utf-8";
@import url(http://weloveiconfonts.com/api/?family=fontawesome);

[class*='fontawesome-']:before {
  font-family: 'FontAwesome', sans-serif;
}

body {
  background: white;
  color: white;
  font: 87.5%/1.5em 'Open Sans', sans-serif;
  margin: 0;
}

p {
  line-height: 1.5em;
}

after {
  clear: both;
}

.login {
  margin: 50px auto;
  width: 320px;
}

.login form {
  margin: auto;
  padding: 22px 22px 22px 22px;
  width: 100%;
  border-radius: 5px;
  background: #282e33;
  border-top: 3px solid #434a52;
  border-bottom: 3px solid #434a52;
}

.login form span {
  background-color: #363b41;
  border-radius: 3px 0px 0px 3px;
  border-right: 3px solid #434a52;
  color: #606468;
  display: block;
  float: left;
  line-height: 50px;
  text-align: center;
  width: 50px;
  height: 50px;
}

.login form input[type='text'] {
  background-color: #3b4148;
  border-radius: 0px 3px 3px 0px;
  color: #a9a9a9;
  margin-bottom: 1em;
  padding: 0 16px;
  width: 90%;
  height: 50px;
}

.login form input[type='password'] {
  background-color: #3b4148;
  border-radius: 0px 3px 3px 0px;
  color: #a9a9a9;
  margin-bottom: 1em;
  padding: 0 16px;
  width: 90%;
  height: 50px;
}

.login form input[type='submit'] {
  background: #b5cd60;
  border: 0;
  width: 100%;
  height: 40px;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}
#login form input[type='submit']:hover {
  background: #16aa56;
}
</style>
