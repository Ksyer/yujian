<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <uploader action="/upload" :beforeUpload="beforeUpload" @file-uploaded="onFileUploaded">
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" width="500" :alt="dataProps.uploadedData.data.filename">
      </template>
    </uploader>
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
import { GlobalDataProps, ResponseTypeProps, ImageProps } from '@/store'

import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput from '@/components/ValidateInput.vue'
import Uploader from '@/components/Uploader.vue'

import createMessage from '@/utils/createMessage'

export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput,
    Uploader
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const titleVal = ref('')
    const titleRules = [{ type: 'required', message: '标题不能为空' }]
    const contentVal = ref('')
    const contentRules = [{ type: 'required', message: '文章不能为空' }]

    const beforeUpload = (file: File) => {
      const isJPEG = file.type === 'image/jpeg'
      if (!isJPEG) {
        createMessage('上传图片只能是JPG格式', 'error')
      }
      return isJPEG
    }

    const onFileUploaded = (rawData: ResponseTypeProps<ImageProps>) => {
      createMessage(`上传图片ID ${rawData.data._id}`, 'success')
    }

    const onFormSubmit = (result: boolean) => {
      //   if (result) {
      //     const { columnId } = store.state.user
      //     if (columnId) {
      //       const newPost: PostProps = {
      //         _id: new Date().getTime() + '',
      //         title: titleVal.value,
      //         content: contentVal.value,
      //         column,
      //         createdAt: new Date().toLocaleString()
      //       }
      //       store.commit('createPost', newPost)
      //       router.push({ name: 'column', params: { id: columnId } })
      //     }
      //   }
    }

    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      beforeUpload,
      onFormSubmit,
      onFileUploaded
    }
  }
})
</script>
