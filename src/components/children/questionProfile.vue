<template>
  <div style="margin-top:15px;width:800px;height:600px;">
    <el-timeline v-loading="loading">
      <el-timeline-item
        v-for="item in myQuestions"
        :key="item._id"
        :timestamp="item.startTime.split(' ')[0]"
        placement="top"
      >
        <el-card shadow="never">
          <el-row>
            <el-col :span="20">
              <el-button
                icon="el-icon-question"
                type="text"
                @click="quroaDetail( item.aid )"
              >{{ item.title}}</el-button>
            </el-col>
            <el-col :span="1">
              <img src="../../assets/coin.png" width="15">
            </el-col>
            <el-col :span="1">
              <span class="coin">{{ item.coin }}</span>
            </el-col>
          </el-row>

          <p>{{ item.description }}</p>
          <span style="margin-right:10px;">{{ item.answerCount }}人已回答</span>

          <span v-if="item.bestCount === 1">
            <i class="el-icon-medal"></i>已采纳
          </span>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: "questionProfile",
  data() {
    return {
      myQuestions: [],
      loading: true
    };
  },
  methods: {
    getMyQuestions: function() {
      this.$http.get("/api/assignment/self/qa").then(
        response => {
          this.myQuestions = response.data.assignments;
          this.loading = false;
        },
        e => console.log(e)
      );
    },
    quroaDetail: function(aid) {
      this.$router.push("/quroaDetail/" + aid);
    }
  },
  mounted() {
    this.loading = true;

    this.getMyQuestions();
  }
};
</script>



<style scoped>
</style>
