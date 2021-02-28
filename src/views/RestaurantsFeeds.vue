<template>
  <div class="container py-5">
    <NavTabs />

    <h1 class="mt-5">最新動態</h1>
    <hr />
    <div class="row">
      <div class="col-md-6">
        <h3>最新餐廳</h3>
        <!-- 最新餐廳 NewestRestaurants -->
        <NewestRestaurants :restaurants="restaurants" />
      </div>
      <div class="col-md-6">
        <h3>最新評論</h3>
        <!-- 最新評論 NewestComments-->
        <NewestComments :comments="comments" />
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/Navtabs";
import NewestRestaurants from "../components/NewestRestaurants";
import NewestComments from "../components/NewestComments";
import restaurantsAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'

export default {
  name: "RestaurantsFeeds",
  components: {
    NavTabs: NavTabs,
    NewestRestaurants,
    NewestComments,
  },
  data () {
    return {
      restaurants: [],
      comments: [],
    };
  },
  methods: {
    async fetchFeeds () {
      try {
        const response = await restaurantsAPI.getFeeds()
        const { restaurants, comments } = response.data
        this.restaurants = restaurants;
        this.comments = comments.filter(
          (comment) => comment.Restaurant && comment.text
        );
      }
      catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得最新動態資料，請稍後再試'
        })
      }

      //const { restaurants, comments } = dummyData; //類似宣告pointer指到dummyData，其實還是只到同一塊memory，如果修改restaurants也會改到dummyData
      // 以下為確認上面comment的debug code
      // restaurants[0].name = "gogo";
      // console.log("resetaurants[0].name", restaurants[0].name);
      // console.log(
      //   "dummyData.restaurants[0].name",
      //   dummyData.restaurants[0].name
      // );

    },
  },
  created () {
    //模擬串接API擷取資料
    this.fetchFeeds();
  },
};
</script>