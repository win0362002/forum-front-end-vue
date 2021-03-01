<template>
  <div>
    <h2 class="my-4">所有評論：</h2>

    <div v-for="comment in restaurantComments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button
          :disabled="isProcessing"
          v-if="currentUser.isAdmin"
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
          type="button"
          class="btn btn-danger float-right"
        >
          Delete
        </button>
        <h3>
          <a href="#"> {{ comment.User.name }} </a>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">
          {{ comment.createdAt | fromNow }}
        </footer>
      </blockquote>
      <hr />
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "../utils/mixins";
import restaurantAPI from '../apis/restaurants'
import { mapState } from 'vuex'
import { Toast } from '../utils/helpers'

export default {
  props: {
    restaurantComments: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      isProcessing: false
    }
  },
  mixins: [fromNowFilter],
  methods: {
    async handleDeleteButtonClick (commentId) {
      try {
        this.isProcessing = true
        const { data } = await restaurantAPI.deleteComment({ commentId })
        if (data.status !== 'success') {
          throw new Error(data.status)
        }

        // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
        this.$emit("after-delete-event", commentId);

      }
      catch (error) {
        console(error)
        Toast.fire({
          icon: 'error',
          title: '無法刪除評論，請稍後再試'
        })
      }
      this.isProcessing = false
    },
  },
  computed: {
    ...mapState(['currentUser'])
  }
};
</script>