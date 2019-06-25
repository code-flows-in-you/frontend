<template>
  <div style="margin-top:10px">
    <el-row :gutter="20">
      <el-col :offset="4" :span="13">
        <el-card>
          <el-form>
            <el-form-item label=""
            class="questionnaire-form-item questionnaire-title">
              <el-input class="input-area" v-model="questionnaire.title"></el-input>
            </el-form-item>
            <el-form-item label=""
            class="questionnaire-form-item questionnaire-description">
              <el-input class="input-area" v-model="questionnaire.description"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <!-- body of the questionnaire -->

            <div v-for="question in displayQuestions" :key="question.qid">
              <el-form-item  :label="String(question.qid+1) + '. ' +question.title" class="questionnaire-form-item">

                <div v-if="question.type === 'input'">
                  <el-input v-model="answers[question.qid]" class="input-area"></el-input>

                  <el-collapse accordion>
                    <el-collapse-item title="编辑">
                      <el-form-item label="请输入标题" class="edit-board-form-item">
                         <el-input v-model="question.title" class="input-area"></el-input>
                      </el-form-item>
                    </el-collapse-item>
                  </el-collapse>
                </div>

                <div v-else-if="question.type === 'single'">
                  <el-radio-group
                   class="question-option-group" v-model="answers[question.qid]">
                    <div v-for="option in displayOptions[question.qid]" :key="option.oid">
                      <el-radio class="question-option-item" :label="option.oid">
                        {{option.value}}
                      </el-radio>
                    </div>
                  </el-radio-group>

                  <el-collapse accordion>
                    <el-collapse-item title="编辑">

                      <el-form-item label="请输入标题" class="questionnaire-form-item">
                        <el-input v-model="question.title" class="input-area"></el-input>
                      </el-form-item>

                      <el-button type="primary" @click="addOption(question.qid)">添加选项</el-button>

                      <el-form-item v-for="option in displayOptions[question.qid]"
                      label="请输入标题" class="questionnaire-form-item">
                        <el-input v-model="option.value" class="input-area"></el-input>
                      </el-form-item>

                    </el-collapse-item>
                  </el-collapse>

                </div>


                <el-checkbox-group v-else-if="question.type === 'multi'"
                 class="question-option-group" v-model="answers[question.qid]">
                 <div v-for="option in displayOptions[question.qid]" :key="option.oid">
                  <el-checkbox
                  class="question-option-item" :label="option.oid">{{option.value}}</el-checkbox>


                </div>
                </el-checkbox-group>
              </el-form-item>
              <el-divider></el-divider>
            </div>
            <el-button type="primary" @click="showDialog">发布问卷</el-button>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <el-row type="flex" justify="center">
            <div>
              <p class="menu-title">题目类型</p>
            </div>
          </el-row>
          <el-row>
            <div>
              <img src="../assets/单选框 选中.png" class="menu-img">
              <el-link @click="addSingleGroup" :underline="false"
               class="menu-text">单选</el-link>
            </div>
          </el-row>
          <el-row>
            <div>
              <img src="../assets/多选-选中.png" class="menu-img">
              <el-link @click="addMultiGroup" :underline="false"
               class="menu-text">多选</el-link>
            </div>
          </el-row>
          <el-row>
            <div>
              <img src="../assets/填空题.png" class="menu-img">
              <el-link @click="addInput" :underline="false"
               class="menu-text">单项填空</el-link>
            </div>
          </el-row>
        </el-card>
      </el-col>
    </el-row>


    <el-dialog title="问卷" :visible.sync="isShowMoneyDialog" width="30%" :before-close="clearInput">
      <el-input
        placeholder="输入问卷份数"
        v-model="questionnaire.copy"
        maxlength="20"
        show-word-limit
        style="margin-bottom:15px"
        clearable
      ></el-input>
      <el-input
        :rows="4"
        placeholder="输入每份问卷悬赏金额"
        v-model="questionnaire.coin"
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
      <!--<div style="text-align:right;">
        <img src="../assets/coin.png" width="20" style="vertical-align:middle;margin-right:10px">
        <el-input placeholder="输入悬赏金额" clearable style="width:50%;"></el-input>
      </div>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitQuestionnaire();isShowMoneyDialog=false;" size="small" type="primary">发布问卷</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      displayQuestions: [],
      displayOptions: {},
      answers: {},
      time: "",
      isShowMoneyDialog: false,
      questionnaire:{
        title: "",
        description: "",
        coin: 0,
        copy: 0,
        createTime: "",
        startTime: "",
        endTime: "",
        questions: [], // {title: string, type: 'input' / 'single' / 'multi'}
        options: [] // {"questionIndex": int, "questionIndex": string}
      },
      pickerBeginDateAfter: {
        disabledDate: time => {
          return time.getTime() <= Date.now() - 8.64e7;
        }
      }
    };
  },
  mounted: function()
  {

  },
  methods: {
    addInput: function()
    {
      let qid = this.displayQuestions.length
      let question = {title: "请输入标题", type: 'input', qid: qid}
      this.displayQuestions.push(question)
    },
    addSingleGroup: function()
    {
      let qid = this.displayQuestions.length
      let question = {title: "请输入标题", type: 'single', qid: qid}
      this.displayQuestions.push(question)
      this.$set(this.displayOptions, qid, [])
      this.addOption(qid)
    },
    addMultiGroup: function()
    {
      let qid = this.displayQuestions.length
      let question = {title: "请输入标题", type: 'multi', qid: qid}
      this.displayQuestions.push(question)
      this.$set(this.displayOptions, qid, [])
      this.addOption(qid)
    },
    addOption(qid)
    {
      let option = {questionIndex: qid, value: "选项标题"}
      this.displayOptions[qid].push(option)

    },
    showDialog: function()
    {
      this.isShowMoneyDialog = true
    },
    clearInput: function(done) {
      this.questionnaire.copy = ""
      this.questionnaire.coin = ""
      this.time = ""
      done()
    },
    submitQuestionnaire: function()
    {
      //convert questions to the form server desires
      for (let question of this.displayQuestions)
      {
        let submitQuestion = {title: question.title, type:question.type}
        this.questionnaire.questions.push(submitQuestion)
      }

      console.log(this.displayOptions)
      //convert options to the form server desires
      for (let qid in this.displayQuestions)
      {
        for (let option of this.displayOptions[qid])
        {
          this.questionnaire.options.push(option)
        }
      }

      this.questionnaire.copy = Number(this.questionnaire.copy)
      this.questionnaire.coin = Number(this.questionnaire.coin)
      this.questionnaire.createTime = this.$dateFormatter(new Date)
      this.questionnaire.startTime = this.$dateFormatter(this.time[0])
      this.questionnaire.endTime = this.$dateFormatter(this.time[1])

      console.log(this.questionnaire)
      /*if (this.newQuestionTitle.trim() == "") {
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
      }*/
      /*
      this.$http.post('/api/questionnaire')
      .then(response =>
      {
        this.$http.success("问卷已发布")
      })
      .catch(e =>
      {
        console.log(e)
        console.log(e.response)
      })*/
    }
  }
};
</script>


<style>

.edit-board-form-item,
{
  background: red !important;
}

</style>


<style scoped>

.menu-img
{
  margin:10px;
  vertical-align:middle;
  width:26px;
  height:26px;
}

.menu-text
{
  color: black;
  font-size:17px
}

.menu-title
{
  color: black;
  font-size: 17px;
  font-weight: bold;
}




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
