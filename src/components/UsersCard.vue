<template>
  <div class="row text-center">
    <div v-for="user in users" :key="user.id" class="col-3">
      <router-link :to="{ name: 'user', params: { id: user.id } }">
        <img :src="user.image | emptyImage" width="140px" height="140px" />
      </router-link>
      <h2>{{ user.name }}</h2>
      <span class="badge badge-secondary"
        >追蹤人數：{{ user.FollowerCount }}</span
      >
      <p class="mt-3">
        <button
          v-if="user.isFollowed"
          @click.stop.prevent="deleteFollowing(user.id)"
          type="button"
          class="btn btn-danger"
        >
          取消追蹤
        </button>
        <button
          v-else
          @click.stop.prevent="addFollowing(user.id)"
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
import { emptyImageFilter } from "./../utils/mixins"
import usersAPI from '../apis/Users'
import { Toast } from '../utils/helpers'

export default {
  name: 'UsersCard',
  mixins: [emptyImageFilter],
  props: {
    initialUsers: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      users: this.initialUsers
    };
  },
  methods: {

  },
};
</script>