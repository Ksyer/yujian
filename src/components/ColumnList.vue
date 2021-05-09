<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="v in columnList" :key="v.id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            class="rounded-circle border border-light my-3"
            :src="v.avatar"
            :alt="v.title"
          />
          <h5 class="card-title">{{ v.title }}</h5>
          <p class="card-text">{{ v.description }}</p>
          <a class="btn btn-outline-primary" href="#">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export interface ColumnProps {
  id: number
  title: string
  avatar?: string
  description: string
}

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map(v => {
        if (!v.avatar) {
          v.avatar = require('@/assets/column.jpg')
        }
        return v
      })
    })

    return {
      columnList
    }
  }
})
</script>

<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
