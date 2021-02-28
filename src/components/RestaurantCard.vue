<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img
        class="card-img-top"
        :src="restaurant.image"
        alt="Card image cap"
        width="286px"
        height="180px"
      />
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
          >
            {{ restaurant.name }}
          </router-link>
        </p>
        <span class="badge badge-secondary">{{
          restaurant.Category ? restaurant.Category.name : '未分類'
        }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button
          :disabled="isSetFavoriteProcessing"
          v-if="restaurant.isFavorited"
          @click.stop.prevent="deleteFavorite(restaurant.id)"
          type="button"
          class="btn btn-danger btn-border favorite mr-2"
        >
          移除最愛
        </button>
        <button
          :disabled="isSetFavoriteProcessing"
          v-else
          @click.stop.prevent="addFavorite(restaurant.id)"
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
        >
          加到最愛
        </button>
        <button
          :disabled="isSetLikeProcessing"
          v-if="restaurant.isLiked"
          @click.stop.prevent="deleteLiked(restaurant.id)"
          type="button"
          class="btn btn-danger like mr-2"
        >
          Unlike
        </button>
        <button
          :disabled="isSetLikeProcessing"
          v-else
          type="button"
          @click.stop.prevent="addLiked(restaurant.id)"
          class="btn btn-primary like mr-2"
        >
          Like
        </button>
      </div>
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
      restaurant: {
        ...this.initialRestaurant,
      }, //轉變成component自己的data屬性，使其可以被變更，還是指到同一塊記憶體位址
      isSetFavoriteProcessing: false,
      isSetLikeProcessing: false
    };
  },
  methods: {
    // checkData() {
    //   this.restaurant.name = "gogo";
    //   console.log("restaurant.name", this.restaurant.name);
    //   console.log("initialRestaurant.name", this.initialRestaurant.name);
    // },
    async addFavorite (restaurantId) {
      try {
        this.isSetFavoriteProcessing = true
        const { data } = await usersAPI.addFavorite({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
        };
      }
      catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法加入最愛，請稍後再試'
        })
      }

      this.isSetFavoriteProcessing = false
    },
    async deleteFavorite (restaurantId) {
      try {
        this.isSetFavoriteProcessing = true
        const { data } = await usersAPI.deleteFavorite({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false,
        };
      }
      catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法移除最愛，請稍後再試'
        })
      }

      this.isSetFavoriteProcessing = false
    },
    async addLiked (restaurantId) {
      try {
        this.isSetLikeProcessing = true
        const { data } = await usersAPI.addLike({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        // this.restaurant = {
        //   ...this.restaurant,
        //   isLiked: true,
        // };
        this.restaurant.isLiked = true;
      }
      catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法新增like，請稍後再試'
        })
      }
      this.isSetLikeProcessing = false
    },
    async deleteLiked (restaurantId) {
      try {
        this.isSetLikeProcessing = true
        const { data } = await usersAPI.deleteLike({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        // this.restaurant = {
        //   ...this.restaurant,
        //   isLiked: false,
        // };
        this.restaurant.isLiked = false;
      }
      catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法移除like，請稍後再試'
        })
      }
      this.isSetLikeProcessing = false
    },
  },
  created () {
    //this.checkData();
  },
};
</script>