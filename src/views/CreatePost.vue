<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          type="text"
          rows="10"
          tag="textarea"
          :rules="contentRules"
          v-model="contentVal"
          placeholder="请输入文章详情"
        />
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalDataProps, PostProps } from '@/store'

import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput from '@/components/ValidateInput.vue'

export default defineComponent({
  components: { ValidateForm, ValidateInput },
  setup() {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const titleVal = ref('')
    const titleRules = [{ type: 'required', message: '标题不能为空' }]
    const contentVal = ref('')
    const contentRules = [{ type: 'required', message: '文章不能为空' }]

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            columnId,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: columnId } })
        }
      }
    }

    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      onFormSubmit
    }
  }
})
</script>
