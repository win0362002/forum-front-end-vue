<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>

    <hr />
    <div
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      class="card mb-3"
      style="max-width: 540px; margin: auto"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <a href="#">
            <img class="card-img" :src="restaurant.image" />
          </a>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <span class="badge badge-secondary"
              >收藏數：{{ restaurant.FavoriteCount }}</span
            >
            <p class="card-text">
              {{ restaurant.description }}
            </p>
            <router-link
              :to="{
                name: 'restaurant-dashboard',
                params: { id: restaurant.id },
              }"
              class="btn btn-primary mr-2"
              >Show</router-link
            >

            <button
              :disabled="isProcessing"
              v-if="restaurant.isFavorited"
              @click.stop.prevent="deleteFavorite(restaurant.id)"
              type="button"
              class="btn btn-danger mr-2"
            >
              移除最愛
            </button>
            <button
              :disabled="isProcessing"
              v-else
              @click.stop.prevent="addFavorite(restaurant.id)"
              type="button"
              class="btn btn-primary"
            >
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/Navtabs";
import restaurantsAPI from '../apis/restaurants'
import usersAPI from '../apis/Users'
import { Toast } from '../utils/helpers'

export default {
  name: "RestaurantsTop",
  components: {
    NavTabs: NavTabs,
  },
  data () {
    return {
      restaurants: [],
      isProcessing: false
    };
  },
  methods: {
    async fetchRestaurants () {
      try {
        const { data } = await restaurantsAPI.getTopRestaurants()
        this.restaurants = data.restaurants
        console.log('restaurants', this.restaurants)
      }
      catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },
    async addFavorite (restaurantId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addFavorite({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurants = this.restaurants.map(restaurant => {
          if (restaurant.id !== restaurantId) {
            return restaurant
          } else {
            return {
              ...restaurant,
              isFavorited: true,
              FavoriteCount: restaurant.FavoriteCount + 1
            }
          }
        })
      }
      catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法新增最愛，請稍後再試'
        })
      }
      this.isProcessing = false
    },
    async deleteFavorite (restaurantId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.deleteFavorite({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurants = this.restaurants.map(restaurant => {
          if (restaurant.id !== restaurantId) {
            return restaurant
          } else {
            return {
              ...restaurant,
              isFavorited: false,
              FavoriteCount: restaurant.FavoriteCount - 1
            }
          }
        })
      }
      catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法新增最愛，請稍後再試'
        })
      }
      this.isProcessing = false
    },
  },
  created () {
    this.fetchRestaurants();
  },
};
</script>