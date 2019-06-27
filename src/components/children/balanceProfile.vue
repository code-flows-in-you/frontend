<template>
<div style="margin-top:15px;width:800px;height:600px;">
   <el-timeline v-loading="loading" >
    <el-timeline-item
      v-for="item in myCoinFlow"
        :key="item._id"
      :timestamp="item.timestamp.substr(0, 10)">
     
     <el-row>
       <el-col :span="20">{{item.title}}</el-col>
       <el-col :span="2">{{item.flow}}</el-col>
       </el-row>
    
    </el-timeline-item>
  </el-timeline>
  </div>
</template>

<script>
export default {
  name:'balanceProfile',
  data () {
    return {
      myCoinFlow:[],
      loading:true,
    }
  },
  methods: {
    getMyBalance: function () {
       this.$http.get("/api/coin/flow").then(
        response => {
          console.log(response.data);
          this.myCoinFlow = response.data.flows;
          this.loading = false;
        },
        e => console.log(e)
      );
    }
    
  },
  mounted() {
    this.loading = true;
    this.getMyBalance();
  },
}
</script>




<style scoped>

</style>
