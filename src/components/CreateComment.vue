<template>
  <form @submit.prevent.stop="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea v-model="text" class="form-control" rows="3" name="text" />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">
        回上一頁
      </button>
      <button
        :disabled="isProcessing"
        type="submit"
        class="btn btn-primary mr-0"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
//import uuidv4 from "uuid/dist/v4";
import restaurantAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      text: "",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit () {
      try {
        if (!this.text) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入評論'
          })
          return
        }

        this.isProcessing = true
        const { data } = await restaurantAPI.addComment({ text: this.text, restaurantId: this.restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        const { commentId } = data

        this.$emit("after-create-comment", {
          commentId, //因為目前尚未串接API，所以使用uuid暫時產生假的comment id
          restaurantId: this.restaurantId,
          text: this.text,
        });

        this.text = ""; //在submit後清空comment
      }
      catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法新增餐廳，請稍後再試'
        })
      }
      this.isProcessing = false
    },
  },
};
</script>