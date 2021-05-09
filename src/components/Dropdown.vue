<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      class="btn btn-outline-light my-2 dropdown-toggle"
      href="#"
      @click="toggleOpen"
      >{{ title }}</a
    >
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      require: true
    }
  },
  setup() {
    // 是否打开下拉框
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)

    /**
     * 按钮：点击打开/关闭下拉框
     */
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    /**
     * 鼠标事件：监听关闭下拉框
     */
    const handler = (e: MouseEvent) => {
      if(dropdownRef.value) {
        if(!dropdownRef.value.contains(e.target as HTMLElement) && isOpen) {
          isOpen.value = false
        }
      }
    }

    onMounted(() => {
      document.addEventListener('click', handler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handler)
    })

    return { isOpen, toggleOpen, dropdownRef }
  }
})
</script>
