<template>
  <div style="margin-top:10px">
    <el-row :gutter="20">
      <el-col :offset="4" :span="13">
        <el-card class="text item" shadow="never" v-loading="loading">
          <div v-for="item in questionnairesList" :key="item._id">
            <el-row>
              <el-col :span="22">
                <div
                  class="title"
                  @click="goToQuestionnaireDetail( item.aid )"
                >{{ item.title }}</div>
              </el-col>
              <el-col :span="1">
                <img src="../assets/coin.png" width="20">
              </el-col>
              <el-col :span="1" class="coin">{{ item.unit }}</el-col>
            </el-row>
            <div class="info">
              <span
                class="info"
              >{{ item.startTime.split(" ")[0] }}~{{ item.endTime.split(" ")[0] }}</span>
              <span>&nbsp;&nbsp;&nbsp;{{ item.copy-item.coin/item.unit}}份/{{ item.copy }}份</span>
            </div>
            <div class="content">{{ item.description }}</div>
            <div
              v-if="now > item.endTime"
              @click="goToQuestionnaireDetail(item.aid)"
              class="survey-footer"
            >已结束</div>
            <div v-else @click="goToQuestionnaireDetail(item.aid)" class="survey-footer">填写问卷></div>
            <el-divider></el-divider>
          </div>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="20"
            layout="total, prev, pager, next, jumper"
            :total="questionnairesNum"
            style="text-align:center"
          ></el-pagination>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <el-row type="flex" justify="center">
            <el-image :src="this.$store.state.user.Avatar" style="width:200px; height:200px"></el-image>
          </el-row>
          <el-row
            type="flex"
            justify="center"
            class="vcard-username"
          >{{ this.$store.state.user.Nickname }}</el-row>
        </el-card>
        <el-card>
          <el-row>
            <div>
              <img
                src="../assets/help.png"
                style="margin:10px; vertical-align:middle; width:26px; height:26px"
              >
              <el-link @click="newQuestion=true" :underline="false" style="font-size:17px">发起求助</el-link>
            </div>
          </el-row>
          <el-row>
            <div>
              <img
                src="../assets/问卷库.png"
                style="margin:10px; vertical-align:middle; width:26px; height:26px"
              >
              <el-link @click="goToProfile('survey')" :underline="false" style="font-size:17px">我的问卷</el-link>
            </div>
          </el-row>
          <el-row>
            <div>
              <img
                src="../assets/icon_提问.png"
                style="margin:10px; vertical-align:middle; width:26px; height:26px"
              >
              <el-link
                @click="goToProfile('question')"
                :underline="false"
                style="font-size:17px"
              >我的提问</el-link>
            </div>
          </el-row>
          <el-row>
            <div>
              <img
                src="../assets/余额.png"
                style="margin:10px; vertical-align:middle; width:26px; height:26px"
              >
              <el-link
                @click="goToProfile('balance')"
                :underline="false"
                style="font-size:17px"
              >我的余额</el-link>
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
      questionnairesList: [],
      questionnairesNum: 0,
      currentPage: 1,
      now: this.$dateFormatter(new Date()),
      loading:true,
    };
  },
  mounted: function() {
    this.loading = true;
    this.$http.get("/api/assignment/questionnaire/" + this.currentPage).then(
      response => {
        this.questionnairesList = response.data.assignments;
        this.questionnairesNum = response.data.asgCount;
        console.log(response.data);
    this.loading = false;

      },
      response => console.log(response)
    );
  },
  methods: {
    handleCurrentChange: function(val) {
      this.currentPage = val;
         this.loading = true;
      this.$http.get("/api/assignment/questionnaire/" + this.currentPage).then(
        response => {
          this.questionnairesList = response.data.assignments;
          this.questionnairesNum = response.data.asgCount;
          console.log(response.data);
            this.loading = false;

        },
        response => console.log(response)
      );
      console.log(`当前页: ${val}`);
    },
    //发起问卷
    raiseSurvey: function() {},
    goToProfile: function(child) {
      this.$router.push("/profile/" + child);
    },
    goToQuestionnaireDetail: function(aid) {
      this.$router.push("/QuestionnaireDetail/" + aid);
    }
  }
};
</script>

<style>
.survey-title:hover {
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
  margin-top: 20px;
}

.survey-footer {
  color: rgba(0, 51, 102, 1);
  font-size: 17px;
  font-family: Roboto;
  margin-top: 20px;
}

.survey-footer:hover {
  color: #175199;
  cursor: pointer;
}

.coin {
  color: rgba(255, 67, 67, 1);
}
</style>
