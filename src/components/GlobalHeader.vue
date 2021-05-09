<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">抒见专栏</a>
    <ul class="list-inline mb-0" v-if="!user.isLogin">
      <li class="list-inline-item">
        <a class="btn btn-outline-light my-2" href="#">登录</a>
      </li>
      <li class="list-inline-item">
        <a class="btn btn-outline-light my-2" href="#">注册</a>
      </li>
    </ul>
    <ul class="list-inline mb-0" v-else>
      <li class="list-inline-item">
        <a class="btn btn-outline-light my-2" href="#">你好 {{ user.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
}

export default defineComponent({
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>

<style>
</style>
