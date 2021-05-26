<template>
  <div class="container">
    <!-- 顶部 -->
    <global-header :user="currentUser"></global-header>
    <h1>{{ error.message }}</h1>
    <loader v-if="isLoading"></loader>
    <!-- 主体 -->
    <router-view></router-view>
    <!-- 底部 -->
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline- mb-0">
          <li class="list-inline-item">2021 喻鉴专栏</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

import GlobalHeader from './components/GlobalHeader.vue'
import Loader from '@/components/Loader.vue'
import createMessage from '@/utils/createMessage'

import 'bootstrap/dist/css/bootstrap.min.css'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.isLoading)
    const error = computed(() => store.state.error)

    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value
        if (status && message) {
          createMessage(message, 'error')
        }
      }
    )

    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>

