<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'

import 'bootstrap/dist/css/bootstrap.min.css'

const currentUser: UserProps = {
  isLogin: true,
  name: 'wyh',
  id: 1
}

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是一个专栏，有一段非常有意思的简介，可以看看',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description:
      '这是一个专栏，有一段非常有意思的简介，可以看看，走过路过不要错过',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是一个专栏，有一段非常有意思的简介，可以看看',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是一个专栏，有一段非常有意思的简介，可以看看'
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]

export default defineComponent({
  name: 'App',
  components: { GlobalHeader, ColumnList },
  setup() {
    return {
      currentUser,
      list: testData
    }
  }
})
</script>

<style>
</style>
