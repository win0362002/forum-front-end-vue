<template>
  <div class="container py-5">
    <!-- 1. 使用先前寫好的 AdminNav -->
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input
            v-model="newCategoryName"
            type="text"
            class="form-control"
            placeholder="新增餐廳類別..."
          />
        </div>
        <div class="col-auto">
          <button
            :disabled="isAdding"
            @click.stop.prevent="createCategory"
            type="button"
            class="btn btn-primary"
          >
            新增
          </button>
        </div>
      </div>
    </form>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" width="60">#</th>
          <th scope="col">Category Name</th>
          <th scope="col" width="210">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
            <div v-show="!category.isEditing" class="category-name">
              {{ category.name }}
            </div>
            <input
              v-show="category.isEditing"
              v-model="category.name"
              type="text"
              class="form-control"
            />
            <span
              @click.stop.prevent="handleCancel(category.id)"
              v-show="category.isEditing"
              class="cancel"
            >
              ✕
            </span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              @click.stop.prevent="toggleIsEditing(category.id)"
              v-show="!category.isEditing"
              type="button"
              class="btn btn-link mr-2"
            >
              Edit
            </button>
            <button
              @click.stop.prevent="
                updateCategory({ categoryId: category.id, name: category.name })
              "
              v-show="category.isEditing"
              type="button"
              class="btn btn-link mr-2"
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="deleteCategory(category.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "@/components/AdminNav";
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'

export default {
  name: "AdminCategories",
  components: {
    AdminNav,
  },
  // 3. 定義 Vue 中使用的 data 資料
  data () {
    return {
      categories: [],
      newCategoryName: "",
      isAdding: false
    };
  },
  // 5. 調用 `fetchCategories` 方法
  created () {
    this.fetchCategories();
  },
  methods: {
    // 4. 定義 `fetchCategories` 方法，把 `dummyData` 帶入 Vue 物件
    async fetchCategories () {
      try {
        const { data } = await adminAPI.categories.get()

        // 在每一個 category 中都添加一個 isEditing 屬性
        this.categories = data.categories.map((category) => {
          return {
            ...category,
            isEditing: false,
            nameCached: "",
          };
        });
      }
      catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳類別資訊，請稍後再試'
        })
      }
    },
    async createCategory () {
      try {
        this.isAdding = true
        const { data } = await adminAPI.categories.create({ name: this.newCategoryName })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.fetchCategories()
        this.newCategoryName = "";
      }
      catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法新增餐廳類別，請稍後再試'
        })
      }
      this.isAdding = false
    },
    async deleteCategory (categoryId) {
      //Todo: 透過API向後端伺服器刪除類別
      try {
        const { data } = await adminAPI.categories.delete({ categoryId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.categories = this.categories.filter(
          (category) => category.id !== categoryId
        );
      }
      catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法刪除餐廳，請稍後再試'
        })
      }
    },
    async updateCategory ({ categoryId, name }) {
      try {
        const { data } = await adminAPI.categories.update({ categoryId, name })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.toggleIsEditing(categoryId);
      }
      catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法編輯類別，請稍後再試'
        })
      }
    },
    toggleIsEditing (categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCached: category.name,
          };
        }

        return category;
      });
    },
    handleCancel (categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            name: category.nameCached,
          };
        }

        return category;
      });

      this.toggleIsEditing(categoryId);
    },
  },
};
</script>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>