<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <!-- UserProfileCard.vue -->
      <UserProfileCard
        :initial-profile="profile"
        :current-user="currentUser"
        :initial-is-followed="isFollowed"
      />

      <div class="row">
        <div class="col-md-4">
          <!-- UserFollowingsCard -->
          <UserFollowingsCard :followings="followings" />
          <br />
          <!-- UserFollowersCard -->
          <UserFollowersCard :followers="followers" />
        </div>
        <div class="col-md-8">
          <!-- UserCommentsCard -->
          <UserCommentsCard :comments="comments" />
          <br />
          <!-- UserFavoritedRestaurantsCard -->
          <UserFavoritedRestaurantsCard
            :favorited-restaurants="favoritedRestaurants"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard";
import UserFollowingsCard from "../components/UserFollowingsCard";
import UserFollowersCard from "../components/UserFollowersCard";
import UserCommentsCard from "../components/UserCommentsCard";
import UserFavoritedRestaurantsCard from "../components/UserFavoritedRestaurantsCard";
import usersAPI from '../apis/Users'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'

// const dummyUser = {
//   currentUser: {
//     id: 1,
//     name: "root",
//     email: "root@example.com",
//     image: "https://i.imgur.com/58ImzMM.png",
//     isAdmin: true,
//   },
//   isAuthenticated: true,
// };

export default {
  name: "user",
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
  },
  data () {
    return {
      profile: {
        id: -1,
        image: "",
        name: "",
        email: "",
        commentsCount: -1,
        favoritedRestaurantCount: -1,
        followersCount: -1,
        followingsCount: -1,
      },
      followings: [],
      followers: [],
      comments: [],
      favoritedRestaurants: [],
      isFollowed: false
      //currentUser: {},
    };
  },
  methods: {
    async fetchUser (userId) {
      try {
        const { data } = await usersAPI.get({ userId })
        console.log('user data', data)

        this.profile = {
          id: data.profile.id,
          image: data.profile.image,
          name: data.profile.name,
          email: data.profile.email,
          commentsCount: data.profile.Comments ? data.profile.Comments.length : 0,
          favoritedRestaurantCount: data.profile.FavoritedRestaurants.length,
          followersCount: data.profile.Followers.length,
          followingsCount: data.profile.Followings.length,
        };
        this.followings = data.profile.Followings;
        this.followers = data.profile.Followers;
        this.comments = data.profile.Comments;
        this.favoritedRestaurants = data.profile.FavoritedRestaurants;
        this.isFollowed = data.isFollowed
        //this.currentUser = dummyUser.currentUser;

        console.log('followings', this.followings)
        console.log('followers', this.followers)
        console.log('comments', this.comments)
        console.log('isFollowed', this.isFollowed)

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得用戶資訊，請稍後再試'
        })
      }
    },
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser(id);
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUser(id)
    next()
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  }
};
</script>