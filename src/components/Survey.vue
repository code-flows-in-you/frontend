<template>
<div style="margin-top:10px">
  <el-row :gutter="20">
    <el-col :offset="4" :span="13">
      <el-card class="text item">
        <div v-for="item in questionnairesList" :key="item._id">
          <el-row>
            <el-col :span="22">
              <div class="survey-title" @click="queryDetail( item.aid )">{{ item.title }}</div>
            </el-col>
            <el-col :span="1">
              <img src="../assets/coin.png" width="20"/>
            </el-col>
            <el-col :span="1">{{ item.unit }}</el-col>
          </el-row>
          <div class="survey-info">
            <span class="survey-info">{{ item.startTime.substr(0, 10) }}</span>
            <span>   共5题</span>
            <span>   5份/10份</span>
          </div>
          <div class="survey-content">{{ item.description }}</div>
          <el-divider></el-divider>
        </div>
      </el-card>

    </el-col>
    <el-col :span="3">
      <el-card>
        <el-row>
          <el-col :span="8">
            <img src="../assets/avatar.png" />
          </el-col>
            <el-col :span="16">
              username
            </el-col>
        </el-row>
      </el-card>
      <el-card>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="sidebar-num">0</div>
          </el-col>
          <el-col :span="8">
            <div class="sidebar-num">0</div>
          </el-col>
          <el-col :span="8">
            <div class="sidebar-num">0</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="sidebar-item-text">回答</div>
          </el-col>
          <el-col :span="8">
            <div class="sidebar-item-text">被采纳</div>
          </el-col>
          <el-col :span="8">
            <div class="sidebar-item-text">已求助</div>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <el-row>
          <el-button type="text" @click="raisesurvey" icon="el-icon-edit-outline">发起提问</el-button>
        </el-row>
        <el-row>
          <el-button type="text" icon="el-icon-coin">我的余额</el-button>
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

    }
  }
}
</script>

<style>
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
  font-size: 28px;
  font-family: Roboto;
}

.survey-info {
  color: rgba(204, 204, 204, 1);
  font-family: Roboto;
}

.survey-content {
  color: rgba(16, 16, 16, 1);
  font-size: 22px;
  font-family: Roboto;
}
</style>
