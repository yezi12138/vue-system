<template>
  <div id="a">
    <h1>this is a</h1>
    <h2>
      <router-link to="/b">to b</router-link>
    </h2>
    <button @click="show">show reqManage</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      config: ''
    }
  },
  methods: {
    show () {
      for (let item of this.$http.reqManage.show()) {
        console.log(item)
      }
    }
  },
  created () {
    this.$http.post('/Management/GetDetailControlById', {
      FarmId: '1'
    }).then(data => {
      console.log(data)
    })
  }
}
</script>
