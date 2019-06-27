<template>
    <div style="margin-top:15px;width:800px;height:600px;">
    <el-timeline v-loading="loading" v-if="myAnswers.length">
      <el-timeline-item
        v-for="item in myAnswers"
        :key="item._id"
        :timestamp="item.startTime.substr(0, 10)"
        placement="top"
      >
        <el-card  shadow="never">
          <el-button icon="el-icon-question" type="text" @click="quroaDetail( item.aid )">{{ item.title}}</el-button>
          <p>{{ item.description }}</p>
          <span>{{ item.answerCount }}人已回答</span>
          <span v-if="item.bestCount === 1">已采纳</span>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <!-- <div v-else style="margin-top:15px;width:800px;height:600px;">暂无回答</div> -->
  </div>
</template>

<script>
export default {
  name: "answerProfile",
  data() {
    return {
      myAnswers: [],
      loading:true,
    };
  },
  methods: {
    getMyAnswers: function() {
      this.$http.get("/api/assignment/self/answer").then(
        response => {
          this.myAnswers = response.data.assignments;
          this.loading = false;
        },
        e => console.log(e)
      );
    },
    quroaDetail:function (aid) {
       this.$router.push("/quroaDetail/" + aid);
    }
  },
  mounted() {
    this.loading = true;

    this.getMyAnswers();
  }
};
</script>



<style scoped>
</style>
