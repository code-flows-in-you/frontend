<template>
  <!-- <el-card shadow="never"> -->
  <div style="margin-top:15px;width:800px;">
    <el-timeline v-loading="loading">
      <el-timeline-item
        v-for="item in myassignments"
        :key="item._id"
        :timestamp="item.startTime.split(' ')[0]"
        placement="top"
      >
        <el-card v-if="item.type == 'qa'" shadow="never">
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
        <el-card v-else-if="item.type == 'questionnaire'" shadow="never">
         

          <el-row>
            <el-col :span="20">
              <el-button
                icon="el-icon-s-order"
                type="text"
                @click="goToQuestionnaireAnalyze( item.aid )"
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
          <span>{{ item.copy-item.coin/item.unit}}/{{ item.copy }}份</span>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: "allProfile",
  data() {
    return {
      myassignments: [],
      coin_icon_url: "../../assets/coin.png",
      loading: true
    };
  },
  methods: {
    getAllData: function() {
      this.$http.get("/api/assignment/self/all").then(
        response => {
          console.log(response.data.assignments);
          this.myassignments = response.data.assignments;
          this.loading = false;
        },
        e => console.log(e)
      );
    },
    quroaDetail: function(id) {
      this.$router.push("/quroaDetail/" + id);
    },
    goToQuestionnaireAnalyze: function(aid) {
      this.$router.push("/questionnaireAnalyze/" + aid);
    }
  },
  mounted() {
    this.loading = true;
    this.getAllData();
  }
};
</script>


<style scoped>
</style>
