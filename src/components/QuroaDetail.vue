<template>
  <div style="width:60%;margin:auto;">
    <el-page-header @back="goBack"></el-page-header>
    <el-card shadow="never" style="margin-top:10px;">
      <el-row>
        <el-col :span="22">
          <div class="question-title" style="font-weight:bold">{{ question.title }}</div>
        </el-col>
        <el-col class="money" :span="2">
          <img src="../assets/coin.png" class="menu-img" width="20">
          {{ question.coin }}
        </el-col>
      </el-row>

      <div class="question-description">{{ question.description }}</div>
      <el-row>
        <!-- <el-button @click="answer=true" size="small" type="primary">我来回答</el-button> -->
      </el-row>
      <!-- <el-divider></el-divider>
      <el-row style="margin: 10px 0 0 0">
        <el-col :span="20">
          <el-row>
            <el-col :span="1">
              <el-avatar size="large" :src="question.avatar"></el-avatar>
            </el-col>
            <el-col :span="4">
              <el-row class="creator-user">{{ question.creator }}</el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :offset="21" :span="3">
          <div class="question-data">{{question.createTime ? question.createTime.split(' ')[0] : ' '}}</div>
        </el-col>
      </el-row> -->
    </el-card>
    <!-- 我来回答编辑解界面 -->
    <el-card v-show="!isAnswered && !bestAnswerUserId && !isCreator" shadow="never">
      <el-row>
        <el-col :span="1">
          <el-avatar size="large" :src="this.$store.state.user.Avatar"></el-avatar>
        </el-col>
        <el-col :span="3" style="margin-left:10px;">
          <el-row>{{ this.$store.state.user.Nickname }}</el-row>
          <el-row class="question-data">{{ this.$dateFormatter(this.time).split(' ')[0] }}</el-row>
        </el-col>
      </el-row>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="content"
        maxlength="100"
        show-word-limit
        style="margin-top:20px;"
      ></el-input>
      <!-- <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      ></quill-editor>-->

      <el-row>
        <el-col :offset="21">
          <el-button
            @click="answerQuestion"
            size="small"
            type="primary"
            style="margin-top:10px;"
          >提交回答</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card v-if="answers.length" shadow="never">
      <div v-for="item in answers" :key="item._id">
        <el-row type="flex" align="middle">
          <el-col :span="1">
            <el-avatar size="large" :src="item.avatar"></el-avatar>
          </el-col>
          <el-col :span="3" style="margin-left:10px;">
            <div class="answser-user">{{ item.user.split('@')[1] }}</div>
            <div class="question-data">{{ item.timestamp.split(' ')[0] }}</div>
          </el-col>
          <el-col :span="3" :offset="17">
            <el-button
              v-if="isCreator && !bestAnswerUserId"
              @click="acceptAnswer(item.qaid)"
              size="small"
              type="primary"
            >采纳</el-button>
            <span v-if="bestAnswerUserId == item.user.split('@')[0]">
              <img src="../assets/采纳.png" class="menu-img" width="20">
              已采纳
            </span>
          </el-col>
        </el-row>
        <div class="answer-content">{{ item.answer }}</div>
        <!-- <el-col :offset="10">
          <el-button type="text" size="mini" style="margin:auto;">
            展开显示全文
            <i class="el-icon-arrow-down"></i>
          </el-button>
        </el-col>-->
        <el-divider></el-divider>
      </div>
    </el-card>
    <el-card v-else>
      <div>暂无回答</div>
    </el-card>
  </div>
</template>

<script>
// import { quillEditor } from 'vue-quill-editor'

export default {
  name: "quroaDetail",
  components: {
    // quillEditor
  },
  data() {
    return {
      answer: false,
      isAnswered: false,
      question: {},
      answers: [],
      time: new Date(),
      content: "",
      pid: 0,
      isCreator: false,
      bestAnswerUserId: {},
      editorOption: {
        modules: {
          toolbar: [
            [{ size: ["small", false, "large"] }],
            ["bold", "italic"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"]
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          }
        }
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    answerQuestion: function() {
      if (this.content.trim() == "") {
        this.$message.error("回答不能为空");
        return;
      }

      let aid = this.$route.params.id;
      let content = {
        pid: this.pid,
        answer: this.content,
        timestamp: this.$dateFormatter(new Date())
      };
      this.$http
        .post("/api/qa/" + aid, content)
        .then(
          response => {
            this.$message.success("回答问题成功");
            console.log(response);
            this.content = "";
            this.fetchData();
          },
          response => console.log(response)
        )
        .catch(e => {
          let feedback = e.response.data.msg;
          if (feedback === "already have a best answer") {
            this.$message.error("该问题已有最佳答案");
          } else if (feedback === "already answer") {
            this.$message.error("您已经回答过该问题");
          }
        });
    },
    acceptAnswer: function(qaid) {
      let aid = this.$route.params.id;
      this.$http
        .put("/api/qa/" + aid + "/" + qaid)
        .then(response => {
          this.$message.success("采纳成功");
          this.fetchData();
        })
        .catch(e => {
          let feedback = e.response.data.msg;
          this.$message.error(feedback);
        });
    },
    fetchData: function() {
      let aid = this.$route.params.id;
      this.$http
        .get("/api/qa/" + aid)
        .then(response => {
          this.question = response.data;
          this.answers = this.question.answers;
          this.pid = this.question.pid;
          this.bestAnswerUserId = this.question.best.user
            ? this.question.best.user.split("@")[0]
            : undefined;
          console.log("answers:", this.answers);
          console.log("question:", response.data);
          console.log("bestAnswerUserId:", this.bestAnswerUserId);
          let userUid = this.$store.state.user.Uid;
          this.isCreator = userUid == this.question.creatorID;
          console.log("isCreator:", this.isCreator);
          for (let answer of this.answers) {
            let uidLength = answer.user.indexOf("@");
            let uid = answer.user.substr(0, uidLength);
            if (uid == userUid) this.isAnswered = true;
          }
        })
        .catch(e => {
          let feedback = e.response.data.msg;
          this.$message.error(feedback);
        });
    },
    goBack: function() {
      this.$router.back(-1);
    }
  }
};
</script>


<style scoped>
.question-title {
  color: rgba(41, 64, 87, 1);
  /* font-size: 36px;
   */
  font-size: 25px;
  font-family: Roboto;
}

.question-description {
      margin-bottom: 10px;
    color: #313131;
  font-size: 19px;
  font-family: Roboto;
  margin: 21px 0 0 0;
}

.question-data {
  font-size: 12px;
  font-size: 12px;
  /* color: #5f5f5f; */
}

.timestamp {
  color: rgba(204, 204, 204, 1);
}

.answer-content {
  color: #313131;
  margin-top: 5px;
  margin-bottom: 10px;
}
.answser-user {
  margin-top: 5%;
}

.creator-user {
  margin-top: 7%;
  margin-left: 15%;
}

.money {
  color: #ff4343;
}

.menu-img {
  vertical-align: middle;
}
</style>
