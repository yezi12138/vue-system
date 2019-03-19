<template>
  <div id="b">
    <h1>this is b</h1>

    <h2>
      <router-link to="/a">to a</router-link>
    </h2>
    <button @click="show">show reqManage</button>
  </div>
</template>

<script>
export default {
  methods: {
    show () {
      for (let item of this.$http.reqManage.show()) {
        console.log(item)
      }
    }
  },
  created () {
    this.$http.post('/Report/E2EConversationInfo', {
      farmId: '17',
      userId: "infvditest02"
    }).then(data => {
      console.log(data)
    })
  }
}
</script>
