<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="profile.image" width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ profile.name }}</h5>
          <p class="card-text">{{ profile.email }}</p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{ profile.commentsCount }}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{ profile.favoritedRestaurantCount }}</strong> 收藏的餐廳
            </li>
            <li>
              <strong>{{ profile.followingsCount }}</strong> followings (追蹤者)
            </li>
            <li>
              <strong>{{ profile.followersCount }}</strong> followers (追隨者)
            </li>
          </ul>
          <p>
            <router-link
              v-if="profile.id === currentUser.id"
              :to="{ name: 'user-edit', params: { id: currentUser.id } }"
              ><button type="submit" class="btn btn-primary">
                edit
              </button></router-link
            >
            <button
              v-else
              @click.prevent.stop="handleFollowButton(profile.id)"
              class="btn btn-primary"
            >
              follow
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialProfile: {
      type: Object,
      required: true,
    },
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      profile: this.initialProfile,
    };
  },
  methods: {
    handleFollowButton(id) {
      console.log("follow id:", id);
    },
  },
};
</script>