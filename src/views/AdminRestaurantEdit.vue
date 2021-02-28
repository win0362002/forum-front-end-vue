<template>
  <div class="container py-5">
    <AdminRestaurantForm
      :initial-restaurant="restaurant"
      :is-processing="isProcessing"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "./../components/AdminRestaurantForm.vue";
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'

export default {
  name: "AdminRestaurantEdit",
  components: {
    AdminRestaurantForm,
  },
  data () {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: "",
      },
      isProcessing: false
    };
  },
  methods: {
    async handleAfterSubmit (formData) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.restaurants.update({ restaurantId: this.restaurant.id, formData })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.$router.push({ name: 'admin-restaurants' })
      }
      catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法更新餐廳資料，請稍後再試'
        })
      }
    },
    async fetchRestaurant (restaurantId) {

      try {
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId }) //等於 restaurantId: restaurantId，第二個value值就是傳進來的參數

        this.restaurant = {
          ...this.restaurant,
          id: data.restaurant.id,
          name: data.restaurant.name,
          categoryId: data.restaurant.CategoryId,
          tel: data.restaurant.tel,
          address: data.restaurant.address,
          description: data.restaurant.description,
          image: data.restaurant.image,
          openingHours: data.restaurant.opening_hours,
        };

        //this.restaurant = data.restaurant;  //另一個Assign法，不過是需要兩邊restaurant的property都一樣才可以這樣寫
      }
      catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },
  },
  created () {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  }
};
</script>