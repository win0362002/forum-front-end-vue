<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          name="email"
          v-model="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        />
      </div>

      <button
        :disabled="isProcessing"
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "../apis/authorization";
import { Toast } from "../utils/helpers";

export default {
  data () {
    return {
      email: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit () {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請輸入帳號密碼",
          });
          return;
        }

        this.isProcessing = true;

        //將authorizationAPI.signIn回傳的response解構賦值給data
        const { data } = await authorizationAPI
          .signIn({
            email: this.email,
            password: this.password,
          })

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        //把token保留在local storage中
        localStorage.setItem("token", data.token);

        //透過setCurrentUser把使用者資料待到vuex的state中
        this.$store.commit('setCurrentUser', data.user)

        this.$router.push("/restaurants")
      }
      catch (e) {
        console.log(e)
        this.isProcessing = false;
        this.password = "";

        Toast.fire({
          icon: "warning",
          title: "輸入的帳號密碼有誤",
        });
      }
    }
  },
};
</script>