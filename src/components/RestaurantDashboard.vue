<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.commentsLength }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.go(-1)">
      回上一頁
    </button>
  </div>
</template>

<script>
import restaurantAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'

export default {
  data () {
    return {
      restaurant: {
        name: '',
        categoryName: '',
        commentsLength: -1,
        viewCounts: -1,
      },
    };
  },
  methods: {
    async fetchRestaurant (restaurantId) {
      try {
        const { data } = await restaurantAPI.get({ restaurantId })
        this.restaurant = {
          name: data.restaurant.name,
          categoryName: data.restaurant.Category ? data.restaurant.Category.name : '未分類',
          commentsLength: data.restaurant.Comments.length,
          viewCounts: data.restaurant.viewCounts,
        }
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資訊，請稍後再試'
        })
      }
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  }
};
</script>