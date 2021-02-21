<template>
  <div class="row text-center">
    <div v-for="user in users" :key="user.id" class="col-3">
      <a href="#">
        <img :src="user.image" width="140px" height="140px" />
      </a>
      <h2>{{ user.name }}</h2>
      <span class="badge badge-secondary"
        >追蹤人數：{{ user.FollowerCount }}</span
      >
      <p class="mt-3">
        <button
          v-if="user.isFollowed"
          @click.stop.prevent="setFollower(user, false)"
          type="button"
          class="btn btn-danger"
        >
          取消追蹤
        </button>
        <button
          v-else
          @click.stop.prevent="setFollower(user, true)"
          type="button"
          class="btn btn-primary"
        >
          追蹤
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialUsers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      users: this.initialUsers,
    };
  },
  methods: {
    setFollower(user, setting) {
      user.isFollowed = setting;
    },
  },
};
</script>