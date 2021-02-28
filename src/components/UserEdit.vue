<template>
  <div class="container py-5">
    <form @submit.prevent.stop="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="currentUser.name"
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
          v-if="currentUser.image"
          :src="currentUser.image"
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

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
const dummyUser = {
  currentUser: {
    id: 1,
    name: "root",
    email: "root@example.com",
    image: "https://i.imgur.com/58ImzMM.png",
    isAdmin: true,
  },
  isAuthenticated: true,
};

export default {
  name: "UserEdit",
  data() {
    return {
      currentUser: {},
    };
  },
  methods: {
    fetchCurrentUser(id) {
      console.log("UserId", id);
      //Todo: 用API去get user data
      this.currentUser = {
        ...dummyUser.currentUser,
      };
    },
    handleFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.currentUser.image = "";
        return;
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.currentUser.image = imageURL;
      }
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      for (let [key, value] of formData) {
        console.log(key + " : " + value);
      }
    },
  },
  created() {
    const { id } = this.$route.params;
    this.fetchCurrentUser(id);
  },
};
</script>