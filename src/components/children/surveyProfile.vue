<template>
   <div style="margin-top:15px;width:800px;height:600px;">
    <el-timeline v-loading="loading">
      <el-timeline-item
        v-for="item in mySurveys"
        :key="item._id"
        :timestamp="item.startTime.split(' ')[0]"
        placement="top"
      >
        <el-card  shadow="never">
         
          
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
  name:'surveyProfile',
  data () {
    return {
      mySurveys:[],
      loading:true,
  

    }
  },
  methods: {
    getMySurvey:function () {
      this.$http.get("/api/assignment/self/questionnaire").then(
        response => {
          console.log(response.data.assignments);
          this.mySurveys = response.data.assignments;
             this.loading = false;
        },
        e => console.log(e)
      );
    },
    //跳转到问卷结果
     goToQuestionnaireAnalyze: function(aid) {
      this.$router.push("/questionnaireAnalyze/" + aid);
    }
    
  },
  mounted() {
      this.loading = true;
    this.getMySurvey();
  },
}
</script>



<style scoped>

</style>
