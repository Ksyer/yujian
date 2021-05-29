<template>
  <div class="signup-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">注册喻鉴账户</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="formData.email"
          placeholder="请输入邮箱地址"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <validate-input
          :rules="nickNameRules"
          v-model="formData.nickName"
          placeholder="请输入昵称"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="formData.password"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">重复密码</label>
        <validate-input
          type="password"
          placeholder="请再次密码"
          :rules="repeatPasswordRules"
          v-model="formData.repeatPassword"
        />
        <div class="form-text">
          <router-link :to="'/login'">已经有账户了？去登录</router-link>
        </div>
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">
          注册新用户
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'

import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import createMessage from '@/utils/createMessage'

import { reqSignup } from '@/api'

export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const formData = reactive({
      email: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    })
    const router = useRouter()
    const emailRules: RulesProp = [
      { type: 'required', message: '邮箱不能为空' },
      { type: 'email', message: '请输入正确的邮箱格式' }
    ]
    const nickNameRules: RulesProp = [
      { type: 'required', message: '呢称不能为空' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const repeatPasswordRules: RulesProp = [
      { type: 'required', message: '重复密码不能为空' },
      {
        type: 'custom',
        message: '密码不相同',
        validator() {
          return formData.password === formData.repeatPassword
        }
      }
    ]
    const onFormSubmit = async (result: boolean) => {
      if (result) {
        const payload = {
          email: formData.email,
          nickName: formData.nickName,
          password: formData.password
        }
        const res = await reqSignup(payload)
        if (res) {
          createMessage('注册成功 正在跳转登录页面', 'success')
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        }
      }
    }

    return {
      emailRules,
      nickNameRules,
      passwordRules,
      repeatPasswordRules,
      onFormSubmit,
      formData
    }
  }
})
</script>
