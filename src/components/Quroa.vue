<template>
  <div style="margin-top:10px">
    <el-row :gutter="20">
      <el-col :offset="4" :span="13">
        <el-card class="text item">
          <paginate name='questions' :list='questionsList' :per='3' class="paginate-list">
            <div v-for="item in paginated('questions')" :key="item._id">
              <el-row>
                <el-col :span="22">
                  <div class="question-title" @click="quroaDetail( item.aid )">{{ item.title }}</div>
                </el-col>
                <el-col :span="1">
                  <img src="../assets/coin.png" width="20">
                </el-col>
                <el-col :span="1">{{ item.coin }}</el-col>
              </el-row>
              <div class="question-info">
                <span class="question-info">{{ item.createTime.substr(0, 10) }}</span>
                <span>&nbsp;&nbsp;&nbsp; {{ item.answerCount }}人已回答</span>
                <span v-if="item.bestCount === 1">&nbsp;&nbsp;&nbsp;已采纳</span>
              </div>
              <div class="question-content">{{ item.description }}</div>
              <el-divider></el-divider>
            </div>
          </paginate>
          <div class="el-pagination">
            <paginate-links for="questions" :limit="2" :show-step-links="true"></paginate-links>
          </div>
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
    <el-dialog title="提问" :visible.sync="newQuestion" width="30%" :before-close="clearInput">
      <el-input
        placeholder="用一句话描述你的问题"
        v-model="newQuestionTitle"
        maxlength="20"
        show-word-limit
        style="margin-bottom:15px"
        clearable
      ></el-input>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="添加问题背景描述（选填）"
        v-model="newQuestionDescription"
        maxlength="50"
        show-word-limit
        style="margin-bottom:15px"
        clearable
      ></el-input>
      <!-- <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>-->
      <el-date-picker
        v-model="time"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width:100%; margin-bottom:15px"
        :picker-options="pickerBeginDateAfter"
      ></el-date-picker>
      <div style="text-align:right;">
        <img src="../assets/coin.png" width="20" style="vertical-align:middle;margin-right:10px">
        <el-input placeholder="输入悬赏金额" v-model="newQuestionBonus" clearable style="width:50%;"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="raiseQuestion();newQuestion=false;" size="small" type="primary">发布问题</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newQuestion: false,
      payforQuestion: false,
      newQuestionDescription: "",
      newQuestionTitle: "",
      newQuestionBonus: "",
      time: "",
      questionsList: [],
      paginate: ['questions'],
      pickerBeginDateAfter: {
        disabledDate: time => {
          return time.getTime() <= Date.now() - 8.64e7;
        }
      }
    };
  },
  mounted: function() {
    this.$http.get("/api/assignment/qa").then(
      response => {
        this.questionsList = response.data.assignments;
        console.log(response.data.assignments);
      },
      response => console.log(response)
    );
  },
  methods: {
    //发起提问
    raiseQuestion: function()
    {
      if (this.newQuestionTitle.trim() == "") {
        this.$message.error("问题标题不能为空");
        return;
      }
      if (Object.prototype.toString.call(this.time) != "[object Array]") {
        this.$message.error("必须选择开始与结束时间");
        return;
      }
      if (!/^\d+$/.test(this.newQuestionBonus)) {
        this.$message.error("悬赏金额不能为空且必须为正整数");
        return;
      }
      let content = {
        title: this.newQuestionTitle,
        description: this.newQuestionDescription,
        coin: parseInt(this.newQuestionBonus),
        createTime: this.$dateFormatter(new Date()),
        startTime: this.$dateFormatter(this.time[0]),
        endTime: this.$dateFormatter(this.time[1]),
        detail: ""
      };
      this.$http.post("/api/qa/", content).then(
        response => {
          this.$message.success("问题发布成功");
          console.log(response);
        },
        response => console.log(response)
      );
    },
    quroaDetail: function(id) {
      this.$router.push("/quroaDetail/" + id);
    },
    goToProfile: function(child) {
      this.$router.push("/profile/" + child);
    },
    clearInput: function(done) {
      this.newQuestionDescription = "";
      this.newQuestionTitle = "";
      this.newQuestionBonus = "";
      this.time = "";
      done();
    }
  }
};
</script>

<style>
.question-title:hover {
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

.question-title {
  color: rgba(41, 64, 87, 1);
  font-size: 25px;
  font-family: Roboto;
}

.question-info {
  color: rgba(204, 204, 204, 1);
  font-family: Roboto;
  font-size: 17px;
}

.question-content {
  color: rgba(16, 16, 16, 1);
  font-size: 19px;
  font-family: Roboto;
}

.vcard-username {
  color: #666;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  margin: 10px;
}
</style>
