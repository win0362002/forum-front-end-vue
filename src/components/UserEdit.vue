<template>
  <div class="container py-5">
    <form @submit.prevent.stop="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="localCurrentUser.name"
          id="name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          v-if="localCurrentUser.image"
          :src="localCurrentUser.image"
          class="d-block img-thumbnail mb-3"
          width="200"
          height="200"
        />
        <input
          @change="handleFileChange"
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
        />
      </div>

      <button :disabled="isProcessing" type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import usersAPI from '../apis/Users'
import { Toast } from '../utils/helpers'

export default {
  name: "UserEdit",
  data () {
    return {
      localCurrentUser: {},
      isProcessing: false
    };
  },
  methods: {
    setUser (newValue) {
      const { id } = this.$route.params
      console.log('id', Number(id))
      console.log('new id', newValue.id)
      if (Number(id) !== newValue.id) {
        console.log('push not found')
        this.$router.push('/*')
      }
      console.log('check')

      this.localCurrentUser = {
        ...newValue,
      };
    },
    handleFileChange (e) {
      const { files } = e.target;
      console.log('target', e.target)
      if (files.length === 0) {
        this.localCurrentUser.image = "";
        return;
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.localCurrentUser.image = imageURL;
      }
    },
    async handleSubmit (e) {
      try {
        if (!this.localCurrentUser.name) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入使用者名稱'
          })
          return
        }

        this.isProcessing = true
        const form = e.target;
        const formData = new FormData(form);
        const { data } = await usersAPI.updateUser({
          userId: this.localCurrentUser.id,
          formData
        })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$router.push({ name: 'user', params: { id: this.localCurrentUser.id } })
      }
      catch (error) {
        this.isProcessing = false
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法更新用戶資訊，請稍後再試'
        })
      }

    },
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    currentUser (newValue) {
      this.setUser(newValue)
    }
  }
};
</script>