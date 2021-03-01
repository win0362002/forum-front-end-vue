<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td v-if="user.isAdmin">admin</td>
          <td v-else>user</td>
          <td v-if="user.id !== currentUser.id">
            <button
              @click.stop.prevent="toggleUserRole(user.id, user.isAdmin)"
              v-if="user.isAdmin"
              type="button"
              class="btn btn-link"
            >
              set as user
            </button>
            <button
              @click.stop.prevent="toggleUserRole(user.id, user.isAdmin)"
              v-else
              type="button"
              class="btn btn-link"
            >
              set as admin
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "../components/AdminNav";
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'

export default {
  name: "AdminUsers",
  components: {
    AdminNav,
  },
  data () {
    return {
      users: [],
    };
  },
  methods: {
    async fetchUsers () {
      try {
        const { data } = await adminAPI.users.get()

        this.users = data.users;
      }
      catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得用戶資料，請稍後再試'
        })
      }
    },
    async toggleUserRole (userId, isAdmin) {
      try {
        const { data } = await adminAPI.users.changeRole({ userId, isAdmin: !isAdmin })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.users = this.users.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isAdmin: !user.isAdmin,
            };
          }

          return user;
        });

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法變更用戶角色，請稍後再試'
        })
      }
    }
  },
  created () {
    this.fetchUsers();
  },
  computed: {
    ...mapState(['currentUser'])
  }
};
</script>