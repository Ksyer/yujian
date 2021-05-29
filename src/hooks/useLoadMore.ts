import { ref, computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'

interface LoadParams {
  currentPage: number
  pageSize: number
  cid?: string
}

function useLoadMore(
  actionName: string,
  total: ComputedRef<number>,
  params: LoadParams = { currentPage: 2, pageSize: 5 }
) {
  const store = useStore()
  const currentPage = ref(params.currentPage)
  const reqParams = computed(() => {
    if (!params.cid) {
      return {
        currentPage: currentPage.value,
        pageSize: params.pageSize
      }
    }
    return {
      currentPage: currentPage.value,
      pageSize: params.pageSize,
      cid: params.cid
    }
  })
  const loadMorePage = () => {
    store.dispatch(actionName, reqParams.value).then(() => {
      currentPage.value++
    })
  }
  const isLastPage = computed(() => {
    // console.log(params.cid, currentPage.value)
    return Math.ceil(total.value / params.pageSize) < currentPage.value
  })

  return {
    loadMorePage,
    isLastPage,
    currentPage
  }
}

export default useLoadMore
