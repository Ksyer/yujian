<template>
  <div class="create-post-page">
    <h4>{{ isEditMode ? '编辑文章' : '新建文章' }}</h4>
    <uploader
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      action="/upload"
      :uploaded="uploadedData"
      :beforeUpload="uploadCheck"
      @file-uploaded="onFileUploaded"
    >
      <h2>点击上传图片</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img
            :src="dataProps.uploadedData.data.url"
            :alt="dataProps.uploadedData.data.filename"
          />
        </div>
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
      <template #submit>
        <button class="btn btn-primary btn-large">
          {{ isEditMode ? '更新文章' : '发表文章' }}
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import {
  GlobalDataProps,
  ResponseTypeProps,
  ImageProps,
  PostProps
} from '@/store'

import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput from '@/components/ValidateInput.vue'
import Uploader from '@/components/Uploader.vue'

import createMessage from '@/utils/createMessage'
import { beforeUploadCheck } from '@/utils/helper'

export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput,
    Uploader
  },
  setup() {
    const uploadedData = ref()
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const route = useRoute()
    const isEditMode = !!route.query.id
    const titleVal = ref('')
    const titleRules = [{ type: 'required', message: '标题不能为空' }]
    const contentVal = ref('')
    const contentRules = [{ type: 'required', message: '文章不能为空' }]
    let imageId = ''

    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, {
        format: ['image/jpeg', 'image/png'],
        size: 1
      })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('上传图片只能是 JPG/PNG 格式!', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过 1Mb', 'error')
      }
      return passed
    }

    const onFileUploaded = (rawData: ResponseTypeProps<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column,
            author: _id
          }
          if (imageId) {
            newPost.image = imageId
          }
          const actionName = isEditMode ? 'updatePost' : 'createPost'
          if(isEditMode) {
            newPost._id = route.query.id as string
          }
          store.dispatch(actionName, newPost).then(() => {
            createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
            setTimeout(() => {
              router.push({ name: 'column', params: { id: column } })
            }, 2000)
          })
        }
      }
    }

    onMounted(() => {
      if (isEditMode) {
        store
          .dispatch('getPost', route.query.id)
          .then((rawData: ResponseTypeProps<PostProps>) => {
            const currentPost = rawData.data
            if (currentPost.image) {
              uploadedData.value = { data: currentPost.image }
            }
            titleVal.value = currentPost.title
            contentVal.value = currentPost.content || ''
          })
      }
    })

    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      uploadCheck,
      onFormSubmit,
      onFileUploaded,
      uploadedData,
      isEditMode
    }
  }
})
</script>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
