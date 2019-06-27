<template>
   <div style="margin-top:15px;width:800px;height:600px;">
    <el-timeline>
      <el-timeline-item
        v-for="item in myQuestions"
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
  </div>
</template>

<script>
export default {
  name:'questionProfile',
  data () {
    return {
      myQuestions:[],
    }
  },
  methods: {
    getMyQuestions:function () {
       this.$http.get("/api/assignment/self/qa").then(
        response => {
          this.myQuestions = response.data.assignments;
        },
        e => console.log(e)
      );
    },
     quroaDetail:function (aid) {
       this.$router.push("/quroaDetail/" + aid);
    }
  },
  mounted() {
    this.getMyQuestions();
  },
}
</script>



<style scoped>

</style>
