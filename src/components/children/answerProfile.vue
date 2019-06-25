<template>
    <div style="margin-top:15px;">
    <el-timeline v-if="myAnswers.length">
      <el-timeline-item
        v-for="item in myAnswers"
        :key="item._id"
        :timestamp="item.startTime.substr(0, 10)"
        placement="top"
      >
        <el-card  shadow="never">
          <el-button type="text" @click="quroaDetail( item.aid )">{{ item.title}}</el-button>
          <p>{{ item.description }}</p>
          <span>{{ item.answerCount }}人已回答</span>
          <span v-if="item.bestCount === 1">已采纳</span>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div v-else>暂无回答</div>
  </div>
</template>

<script>
export default {
  name: "answerProfile",
  data() {
    return {
      myAnswers: []
    };
  },
  methods: {
    getMyAnswers: function() {
      this.$http.get("/api/assignment/self/answer").then(
        response => {
          console.log("answers:"+response.data.assignments);
          this.myAnswers = response.data.assignments;
        },
        e => console.log(e)
      );
    }
  },
  mounted() {
    this.getMyAnswers();
  }
};
</script>



<style scoped>
</style>
