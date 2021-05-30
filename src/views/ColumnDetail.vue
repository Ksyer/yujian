<template>
  <div class="column-detail-page w-690">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar && column.avatar.fitUrl"
          :alt="column.title"
          class="rounded-circle border w-100"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
    <div class="text-center">
      <button
        class="btn btn-outline-primary mt-2 mb-5 btn-block w-25"
        @click="loadMorePage"
        v-if="!isLastPage"
      >
        加载更多
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ColumnProps, GlobalDataProps } from '@/store'

import PostList from '@/components/PostList.vue'

import { addColumnAvatar } from '@/utils/helper'
import useLoadMore from '@/hooks/useLoadMore'

export default defineComponent({
  name: 'ColumnDetail',
  components: { PostList },
  setup() {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentId = route.params.id + ''
    const total = computed(() => store.state.posts.total)
    const currentPage = computed(() => store.state.posts.loadedColumns[currentId])

    const column = computed(() => {
      const selectColumn = store.getters.getColumnById(currentId) as
        | ColumnProps
        | undefined
      if (selectColumn) {
        addColumnAvatar(selectColumn, 100, 100)
      }
      return selectColumn
    })
    const list = computed(() => store.getters.getPostsById(currentId))
    const { loadMorePage, isLastPage } = useLoadMore('getPosts', total, {
      pageSize: 3,
      currentPage: currentPage.value ? currentPage.value + 1 : 2,
      cid: currentId
    })

    onMounted(() => {
      store.dispatch('getColumn', currentId)
      store.dispatch('getPosts', { cid: currentId, pageSize: 3 })
    })

    return {
      column,
      list,
      loadMorePage,
      isLastPage
    }
  }
})
</script>

<style>
.w-690 {
  width: 690px;
  margin: 0 auto;
}
</style>
