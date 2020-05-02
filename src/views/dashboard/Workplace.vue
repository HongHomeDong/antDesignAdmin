<template>
  <div>
    <a-tabs :default-active-key="tagList[0].code" v-model="tagType" @change="handleChange">
      <a-tab-pane :key="item.code" :tab="item.name" v-for="item in tagList">
      </a-tab-pane>
    </a-tabs>
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'Workplace',
    data () {
      return {
        tagType: 'Customer',
        tagList: [
          {
            name: '客户列表',
            code: 'Customer'
          },
          {
            name: '收卡人列表',
            code: 'ReceivePerson'
          },
          {
            name: '银行列表',
            code: 'Bank'
          },
          {
            name: '城市列表',
            code: 'City'
          }
        ]
      }
    },
    watch: {
      // tagType (value) {
      //   switch (value) {
      //     case 1 : {
      //       this.$router.push({ name: 'Customer' })
      //       break
      //     }
      //     case 2 : {
      //       this.$router.push({ name: 'ReceivePerson' })
      //       break
      //     }
      //     case 3 : {
      //       this.$router.push({ name: 'Bank' })
      //       break
      //     }
      //     case 4 : {
      //       this.$router.push({ name: 'City' })
      //       break
      //     }
      //   }
      // }
    },
    mounted () {
      const { $route: { name } } = this
      switch (name) {
        case 'Customer' : {
          this.$router.push({ name: 'Customer' })
          break
        }
        case 'ReceivePerson' : {
          this.$router.push({ name: 'ReceivePerson' })
          break
        }
        case 'Bank' : {
          this.$router.push({ name: 'Bank' })
          break
        }
        case 'City' : {
          this.$router.push({ name: 'City' })
          break
        }
      }
      this.tagType = name
    },
    methods: {
      handleChange (value) {
        switch (value) {
          case 'Customer' : {
            this.$router.push({ name: 'Customer' })
            break
          }
          case 'ReceivePerson' : {
            this.$router.push({ name: 'ReceivePerson' })
            break
          }
          case 'Bank' : {
            this.$router.push({ name: 'Bank' })
            break
          }
          case 'City' : {
            this.$router.push({ name: 'City' })
            break
          }
        }
      }
    }
  }
</script>
<style></style>
