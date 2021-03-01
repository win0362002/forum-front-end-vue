<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block"
        :src="restaurant.image"
        style="width: 250px; margin-bottom: 25px"
      />
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours }}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="restaurant.id != -1" class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <router-link
        class="btn btn-primary btn-border mr-2"
        :to="{ name: 'restaurant-dashboard', params: { id: restaurant.id } }"
        >Dashboard</router-link
      >

      <button
        :disabled="isSetFavoriteProcessing"
        v-if="restaurant.isFavorited"
        @click.stop.prevent="setFavorited(false)"
        type="button"
        class="btn btn-danger btn-border mr-2"
      >
        移除最愛
      </button>
      <button
        :disabled="isSetFavoriteProcessing"
        v-else
        @click.stop.prevent="setFavorited(true)"
        type="button"
        class="btn btn-primary btn-border mr-2"
      >
        加到最愛
      </button>
      <button
        :disabled="isSetLikeProcessing"
        v-if="restaurant.isLiked"
        @click.prevent.stop="setLiked(false)"
        type="button"
        class="btn btn-danger like mr-2"
      >
        Unlike
      </button>
      <button
        :disabled="isSetLikeProcessing"
        v-else
        @click.prevent.stop="setLiked(true)"
        type="button"
        class="btn btn-primary like mr-2"
      >
        Like
      </button>
    </div>
  </div>
</template>

<script>
import usersAPI from '../apis/Users'
import { Toast } from '../utils/helpers'

export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      restaurant: this.initialRestaurant,
      isSetFavoriteProcessing: false,
      isSetLikeProcessing: false
    };
  },
  watch: {
    initialRestaurant (newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue
      }
    }
  },
  methods: {
    async setFavorited (setting) {
      try {
        this.isSetFavoriteProcessing = true
        if (setting) {
          const { data } = await usersAPI.addFavorite({ restaurantId: this.restaurant.id })
          if (data.status !== 'success') {
            throw new Error(data.message)
          }
        } else {
          const { data } = await usersAPI.deleteFavorite({ restaurantId: this.restaurant.id })
          if (data.status !== 'success') {
            throw new Error(data.message)
          }
        }
        this.restaurant.isFavorited = setting
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法修改最愛設定，請稍後再試'
        })
      }
      this.isSetFavoriteProcessing = false
    },
    async setLiked (setting) {
      try {
        this.isSetLikeProcessing = true
        if (setting) {
          const { data } = await usersAPI.addLike({ restaurantId: this.restaurant.id })
          if (data.status !== 'success') {
            throw new Error(data.message)
          }
        } else {
          const { data } = await usersAPI.deleteLike({ restaurantId: this.restaurant.id })
          if (data.status !== 'success') {
            throw new Error(data.message)
          }
        }
        this.restaurant.isLiked = setting
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法修改Like設定，請稍後再試'
        })
      }
      this.isSetLikeProcessing = false
    }
  },
};
</script>