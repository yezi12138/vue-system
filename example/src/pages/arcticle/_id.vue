<template>
  <div id="b">
    <h1>this is _id</h1>

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
  }
}
</script>
