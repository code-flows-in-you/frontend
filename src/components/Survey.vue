<template>
<div style="margin-top:10px">
  <el-row :gutter="20">
    <el-col :offset="4" :span="13">
      <el-card class="text item">
        <div v-for="item in questionnairesList" :key="item._id">
          <el-row>
            <el-col :span="22">
              <div class="survey-title" @click="goToQuestionnaireDetail( item.aid )">{{ item.title }}</div>
            </el-col>
            <el-col :span="1">
              <img src="../assets/coin.png" width="20"/>
            </el-col>
            <el-col :span="1">{{ item.unit }}</el-col>
          </el-row>
          <div class="survey-info">
            <span class="survey-info">{{ item.startTime.substr(0, 10) }}</span>
            <span>&nbsp;&nbsp;&nbsp;{{ item.copy-item.coin/item.unit}}份/{{ item.copy }}份</span>
          </div>
          <div class="survey-content">{{ item.description }}</div>
          <el-divider></el-divider>
        </div>
      </el-card>

    </el-col>
    <el-col :span="4">
      <el-card>
        <el-row type="flex" justify="center">
          <img src="../assets/avatar.png" style="width:80px; height:80px"/>
        </el-row>
        <el-row type="flex" justify="center" style="font-size:20px; font-weight:bold">
          {{ this.$store.state.user.Nickname }}
        </el-row>
      </el-card>
      <el-card>
        <el-row>
          <div>
            <img src="../assets/help.png" style="margin:10px; vertical-align:middle; width:26px; height:26px"/>
            <el-link @click="newQuestion=true" :underline="false" style="font-size:17px">发起求助</el-link>
          </div>
        </el-row>
        <el-row>
          <div>
            <img src="../assets/问卷库.png" style="margin:10px; vertical-align:middle; width:26px; height:26px"/>
            <el-link @click="goToProfile('survey')" :underline="false" style="font-size:17px">我的问卷</el-link>
          </div>
        </el-row>
        <el-row>
          <div>
            <img src="../assets/icon_提问.png" style="margin:10px; vertical-align:middle; width:26px; height:26px"/>
            <el-link @click="goToProfile('question')" :underline="false" style="font-size:17px">我的提问</el-link>
          </div>
        </el-row>
        <el-row>
          <div>
            <img src="../assets/余额.png" style="margin:10px; vertical-align:middle; width:26px; height:26px"/>
            <el-link @click="goToProfile('balance')" :underline="false" style="font-size:17px">我的余额</el-link>
          </div>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  data() {
    return {

      questionnairesList: []
    }
  },
  mounted: function () {
    this.$http.get('/api/assignment/questionnaire').then(
      response => {
        this.questionnairesList = response.data.assignments
        console.log(response.data.assignments)
      },
      response => console.log(response)
    )
  },
  methods: {

    //发起问卷
    raiseSurvey: function () {

    },
    goToProfile: function (child) {
      this.$router.push('/profile/' + child)
    },
    goToQuestionnaireDetail: function (aid){
      this.$router.push('/QuestionnaireDetail/' + aid)
    }
  }

}
</script>

<style>
.survey-title:hover
{
  color: #175199;
  cursor: pointer;
}

.el-row {
  margin-right: 0px;

}

.article-underline {
  height: 1px;
  width: 80px;
  background: #545455;
  margin: 80px auto 0;
}

.el-card {
  margin-bottom: 20px;
}

.sidebar-num {
  font-size: 48px;

}

.sidebar-item-text {
  color: rgba(102, 102, 102, 1);
  font-size: 22px;
  font-family: SourceHanSansSC-regular;
}

.survey-title {
  color: rgba(41, 64, 87, 1);
  font-size: 25px;
  font-family: Roboto;
}

.survey-info {
  color: rgba(204, 204, 204, 1);
  font-size: 17px;
  font-family: Roboto;
}

.survey-content {
  color: rgba(16, 16, 16, 1);
  font-size: 19px;
  font-family: Roboto;
}
</style>
