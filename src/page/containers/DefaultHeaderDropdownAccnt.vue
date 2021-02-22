<template>
  <div class="drop">
    <AppHeaderDropdown right no-caret>
      <template slot="header">
        <img
          src="../../../public/img/avatars/6.jpg"
          class="img-avatar"
          alt="admin@bootstrapmaster.com" />
      </template>
      <template slot="dropdown">
        <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
        <!-- <b-dropdown-item to="/personal_center"><i class="fa fa-user-o" />
          个人中心
        </b-dropdown-item>
        <b-dropdown-item><i class="fa fa-envelope-o" /> 
          消息列表
          <b-badge variant="danger">{{ itemsCount }}</b-badge>
        </b-dropdown-item>
        <b-dropdown-divider /> -->
        <b-dropdown-item @click="logoutModal = true"><i class="fa fa-lock"/> 退出登录</b-dropdown-item>
      </template>
    </AppHeaderDropdown>
    <b-modal title="通知" class="modal-danger" v-model="logoutModal" @ok="confirm = true" ok-variant="danger">
      您确定要退出登录吗？
    </b-modal>
  </div>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { 
      itemsCount: 5,
      logoutModal: false,
      confirm: false
    }
  },
  methods: {
    logout() {
      if(this.confirm) {
        this.$emit("Logout","logout");
      }
    }
  },
   watch: {
    confirm: {
      handler(newObject,oldObject) {
        // console.log(this.confirm);
        if(this.confirm) {
          this.logout();
        }
      },
      deep: true, //深度监听对象内部变化
      immediate: true
    }
  }
}
</script>
