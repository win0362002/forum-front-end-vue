<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="profile.image | emptyImage" width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ profile.name }}</h5>
          <p class="card-text">{{ profile.email }}</p>
          <ul v-if="profile.id != -1" class="list-unstyled list-inline">
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
          <p v-if="profile.id != -1">
            <router-link
              v-if="profile.id === currentUser.id"
              :to="{ name: 'user-edit', params: { id: currentUser.id } }"
              ><button type="submit" class="btn btn-primary">
                edit
              </button></router-link
            >
            <button
              :disabled="isProcessing"
              v-else-if="!isFollowed"
              @click.prevent.stop="addFollowing(profile.id)"
              class="btn btn-primary"
            >
              follow
            </button>
            <button
              :disabled="isProcessing"
              v-else
              @click.prevent.stop="deleteFollowing(profile.id)"
              class="btn btn-primary"
            >
              unfollow
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from '../utils/mixins'
import usersAPI from '../apis/Users'
import { Toast } from '../utils/helpers'

export default {
  mixins: [emptyImageFilter],
  props: {
    initialProfile: {
      type: Object,
      required: true,
    },
    currentUser: {
      type: Object,
      required: true,
    },
    initialIsFollowed: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      profile: {
        ...this.initialProfile
      },
      isFollowed: this.initialIsFollowed,
      isProcessing: false
    };
  },
  methods: {
    async addFollowing (userId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addFollowing({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.isFollowed = true
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法追蹤用戶，請稍後再試'
        })
      }
      this.isProcessing = false
    },
    async deleteFollowing (userId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.deleteFollowing({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.isFollowed = false
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤用戶，請稍後再試'
        })
      }
      this.isProcessing = false
    }
  },
  watch: {
    initialProfile (newValue) {
      this.profile = {
        ...this.profile,
        ...newValue
      }
    },
    initialIsFollowed (newValue) {
      this.isFollowed = newValue
    }
  }
};
</script>