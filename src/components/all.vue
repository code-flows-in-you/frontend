<template>
  <div style="margin-top:10px">
    <el-row :gutter="20">
      <el-col :offset="4" :span="13">
        <el-card class="text item">
          <div v-for="item in tasksList" :key="item._id">
            <el-row v-if="item.type == 'qa'">
              <el-col :span="22">
                <div class="title" @click="quroaDetail( item.aid )">{{ item.title }}</div>
              </el-col>
              <el-col :span="1">
                <img src="../assets/coin.png" width="20">
              </el-col>
              <el-col :span="1">{{ item.coin }}</el-col>
            </el-row>
            <el-row v-else-if="item.type == 'questionnaire'">
              <el-col :span="22">
                <div class="title" @click="goToQuestionareDetail( item.aid )">{{ item.title }}</div>
              </el-col>
              <el-col :span="1">
                <img src="../assets/coin.png" width="20">
              </el-col>
              <el-col :span="1">{{ item.unit }}</el-col>
            </el-row>
            <div class="info" v-if="item.type == 'qa'">
              <span class="info">{{ item.createTime.substr(0, 10) }}</span>
              <span>&nbsp;&nbsp;&nbsp; {{ item.answerCount }}人已回答</span>
              <span v-if="item.bestCount === 1">&nbsp;&nbsp;&nbsp;已采纳</span>
            </div>
            <div class="info" v-else-if="item.type == 'questionnaire'">
              <span class="info">{{ item.startTime.substr(0, 10) }}</span>
              <span>&nbsp;&nbsp;&nbsp;{{ item.copy-item.coin/item.unit}}份/{{ item.copy }}份</span>
            </div>
            <div class="content">{{ item.description }}</div>
            <el-divider></el-divider>
          </div>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="20"
            layout="total, prev, pager, next, jumper"
            :total="tasksNum"
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
              <el-link @click="newTask=true" :underline="false" style="font-size:17px">发起求助</el-link>
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
    <el-dialog :visible.sync="newTask" width="20%" center>
      <el-row type="flex" justify="center" style="font-size:20px">请选择求助类型</el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newQuestion=true;newTask=false;" size="small" type="primary">发起提问</el-button>
        <el-button @click="newTask=false;" size="small" type="primary">发起问卷</el-button>
      </span>
    </el-dialog>
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
      newTask: false,
      payforQuestion: false,
      newQuestionDescription: "",
      newQuestionTitle: "",
      newQuestionBonus: "",
      time: "",
      tasksList: [],
      tasksNum: 0,
      currentPage: 1,
      pickerBeginDateAfter: {
        disabledDate: time => {
          return time.getTime() <= Date.now() - 8.64e7;
        }
      }
    };
  },
  mounted: function() {
    this.$http.get("/api/assignment/" + this.currentPage).then(
      response => {
        this.tasksList = response.data.assignments;
        this.tasksNum = response.data.asgCount;
        console.log(response.data);
      },
      response => console.log(response)
    );
  },
  methods: {
    handleCurrentChange: function(val) {
      this.currentPage = val;
      this.$http.get("/api/assignment/" + this.currentPage).then(
        response => {
          this.tasksList = response.data.assignments;
          this.tasksNum = response.data.asgCount;
          console.log(response.data);
        },
        response => console.log(response)
      );
      console.log(`当前页: ${val}`);
    },
    //发起提问
    raiseQuestion: function() {
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
      content = {
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
    goToQuestionareDetail: function(aid) {
      console.error(aid);
      this.$router.push("/questionareDetail/" + aid);
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
.title:hover {
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

.title {
  color: rgba(41, 64, 87, 1);
  font-size: 25px;
  font-family: Roboto;
}

.info {
  color: rgba(204, 204, 204, 1);
  font-family: Roboto;
  font-size: 17px;
}

.content {
  color: rgba(16, 16, 16, 1);
  font-size: 19px;
  font-family: Roboto;
}
</style>
