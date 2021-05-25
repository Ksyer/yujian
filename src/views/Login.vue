<template>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">邮箱</label>
      <validate-input
        :rules="emailRules"
        v-model="emailVal"
        type="text"
        placeholder="请输入邮箱"
        ref="inputRef"
      ></validate-input>
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">密码</label>
      <validate-input
        :rules="passwordRules"
        v-model="passwordVal"
        type="password"
        placeholder="请输入密码"
      ></validate-input>
    </div>
  </validate-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'

export default defineComponent({
  name: 'Login',
  components: { ValidateInput, ValidateForm },
  setup() {
    const store = useStore()
    const router = useRouter()
    const emailVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndCurrentUser', payload)
        router.push('/')
      }
    }

    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

