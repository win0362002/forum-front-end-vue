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
              @click.stop.prevent="toggleUserRole(user.id)"
              v-if="user.isAdmin"
              type="button"
              class="btn btn-link"
            >
              set as user
            </button>
            <button
              @click.stop.prevent="toggleUserRole(user.id)"
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

const dummyUser = {
  users: [
    {
      id: 1,
      name: "蠔嗲油",
      email: "root@example.com",
      password: "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
      isAdmin: true,
      image: "https://i.imgur.com/3keAGHT.jpeg",
      createdAt: "2020-12-15T06:35:43.000Z",
      updatedAt: "2021-02-22T16:41:47.000Z",
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
      isAdmin: true,
      image: "https://i.imgur.com/PhcKzNf.jpeg",
      createdAt: "2020-12-15T06:35:43.000Z",
      updatedAt: "2021-02-22T16:42:25.000Z",
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$IgMneSD6HZiHt0C6we./cOPyq70YhAWNZEqC4YTtJHK8ejgS1J/3q",
      isAdmin: false,
      image: null,
      createdAt: "2020-12-15T06:35:43.000Z",
      updatedAt: "2020-12-15T06:35:43.000Z",
    },
    {
      id: 7,
      name: "123",
      email: "ben7152000@gmail.com",
      password: "$2a$10$gEUc6f3gn62yaOuq89gQLeUr4FbzGkVyMegUmbvPLEMi4Co76LXni",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-12T09:16:05.000Z",
      updatedAt: "2021-02-12T09:16:05.000Z",
    },
    {
      id: 17,
      name: "sa",
      email: "123@gmail.com",
      password: "$2a$10$7b76MIBXCOZwWQ0Idm1Ul.HKChUtn/.IjTAHkNMZRI/t//tvbREca",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-13T07:41:08.000Z",
      updatedAt: "2021-02-13T07:41:08.000Z",
    },
    {
      id: 27,
      name: "root",
      email: "root",
      password: "$2a$10$0tt4RHOVuM./uXJpobmPa.ypCUSn8sHT7QnsQX73K6IUK1RtqEqTu",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-19T03:51:00.000Z",
      updatedAt: "2021-02-19T03:51:00.000Z",
    },
    {
      id: 37,
      name: "熊班長",
      email: "monalisa@example.com",
      password: "$2a$10$cKM74wfFPqDcby2dvTTlt.It4ENCscYRI3Wrxfs5XvWYbQuO0OkBu",
      isAdmin: true,
      image: "https://i.imgur.com/MdRdcnZ.jpeg",
      createdAt: "2021-02-22T16:43:13.000Z",
      updatedAt: "2021-02-22T16:45:55.000Z",
    },
    {
      id: 47,
      name: "max",
      email: "wl00887404@gmail.com",
      password: "$2a$10$Tw8ZgJJRX/CQzfvsK2yX..5wMCOQE.QwFN2SsQGjUkIIy1yLFguk6",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-24T10:35:36.000Z",
      updatedAt: "2021-02-24T10:35:36.000Z",
    },
    {
      id: 57,
      name: "TED",
      email: "peter@parker.com",
      password: "$2a$10$CYwMLBc6gPia3vUrcDX0Yez3u.ZYxuatmvdktWCyy9nTeEzCzNdXa",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-25T04:42:33.000Z",
      updatedAt: "2021-02-25T04:42:33.000Z",
    },
    {
      id: 67,
      name: "abcd",
      email: "abcd@gmail.com",
      password: "$2a$10$J86cWm36XZX.DGfJMby8JOKt5YfkLb0YFJQLU9IphaU9eQmzYEO2.",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-25T05:10:58.000Z",
      updatedAt: "2021-02-25T05:10:58.000Z",
    },
    {
      id: 77,
      name: "w",
      email: "w@w.w",
      password: "$2a$10$Pl73ykEJnKnXVcj.P6vKz.Ga/mIHwcK3rbJRYtClBYgHkbBpzL/wK",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-25T05:52:07.000Z",
      updatedAt: "2021-02-25T05:52:07.000Z",
    },
    {
      id: 87,
      name: "gg",
      email: "gg@gg",
      password: "$2a$10$9r9Xhj8yhyW3B5s.D5bUE.D3uKrBCGA8G8iIvOfEytpxlqzSfPiWS",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-25T10:10:46.000Z",
      updatedAt: "2021-02-25T10:10:46.000Z",
    },
    {
      id: 97,
      name: "123",
      email: "123@123",
      password: "$2a$10$sWwiKXgFO0dkV6Azp/X8weB27QXikxX/Qykd0RmBI13FtxEFWWfWy",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-25T10:14:35.000Z",
      updatedAt: "2021-02-25T10:14:35.000Z",
    },
    {
      id: 107,
      name: "eee",
      email: "e@e",
      password: "$2a$10$zGyTRMrsMAB5JQyoLkI85.CDBXEmRiwoUdJZIHM.Yt3xpfVs5ZSPu",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-25T14:37:10.000Z",
      updatedAt: "2021-02-25T14:37:10.000Z",
    },
    {
      id: 117,
      name: "qwer",
      email: "qwer@qwer",
      password: "$2a$10$/ZWkup.dBmzs7gcvzpjKmejU7OmWKO8YwhAO2SvZaGQqxL4MSZtSK",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-25T14:38:17.000Z",
      updatedAt: "2021-02-25T14:38:17.000Z",
    },
    {
      id: 127,
      name: "g",
      email: "g@g.g",
      password: "$2a$10$W7hgOVz0TXbAjKAwmiXV8eAJLhnrvGUNlNFGoOKby9JbVhDzda7ku",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-25T17:06:48.000Z",
      updatedAt: "2021-02-25T17:06:48.000Z",
    },
    {
      id: 137,
      name: "j",
      email: "j@j.j",
      password: "$2a$10$s6AoWXCHpHcCHAjFVl7lruotgd6cTCPUTZNnMc0SdQPk8RzXZsO.2",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-25T17:09:22.000Z",
      updatedAt: "2021-02-25T17:09:22.000Z",
    },
    {
      id: 147,
      name: "哭啊",
      email: "Qooa@example.com",
      password: "$2a$10$7UMWHJYN5C3QlFBCHqGTg.70yfp7agbOdHNo4aro20E0lQSnVvV2m",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-25T17:09:36.000Z",
      updatedAt: "2021-02-25T17:09:36.000Z",
    },
  ],
  currentUser: {
    id: 1,
    name: "蠔嗲油",
    email: "root@example.com",
    password: "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
    isAdmin: true,
    image: "https://i.imgur.com/3keAGHT.jpeg",
    createdAt: "2020-12-15T06:35:43.000Z",
    updatedAt: "2021-02-22T16:41:47.000Z",
  },
};

export default {
  name: "AdminUsers",
  components: {
    AdminNav,
  },
  data () {
    return {
      users: [],
      currentUser: {},
    };
  },
  methods: {
    async fetchUsers () {
      try {
        const { data } = await adminAPI.users.get()

        this.users = data.users;
        this.currentUser = dummyUser.currentUser;
      }
      catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得用戶資料，請稍後再試'
        })
      }
    },
    toggleUserRole (userId) {
      let isAdmin = false;
      this.users = this.users.map((user) => {
        if (user.id === userId) {
          isAdmin = !user.isAdmin;
          return {
            ...user,
            isAdmin: !user.isAdmin,
          };
        }

        return user;
      });

      this.updateUser({ userId, isAdmin });
    },
    updateUser ({ userId, isAdmin }) {
      console.log("userId", userId);
      console.log("isAdmin", isAdmin);
      //Todo: 透過API向伺服器更新User資料
    },
  },
  created () {
    this.fetchUsers();
  },
};
</script>