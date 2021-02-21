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
      <button type="submit" class="btn btn-primary mr-0">Submit</button>
    </div>
  </form>
</template>

<script>
import uuidv4 from "uuid/dist/v4";

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    handleSubmit() {
      //Todo: 透過API向伺服器請求新增一筆comment
      //CommentId

      this.$emit("after-create-comment", {
        commentId: uuidv4(), //因為目前尚未串接API，所以使用uuid暫時產生假的comment id
        restaurantId: this.restaurantId,
        text: this.text,
      });

      this.text = ""; //在submit後清空comment
    },
  },
};
</script>