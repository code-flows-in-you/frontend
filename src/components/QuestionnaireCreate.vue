<template>
  <div style="margin-top:10px">
    <el-row :gutter="20">
      <el-col :offset="4" :span="13">
        <el-card>
          <el-input class="title-input"
          v-model="questionnaire.title" placeholder="输入问卷名称"></el-input>
          <el-input class="description-input"
          v-model="questionnaire.description" placeholder="添加问卷说明"></el-input>
          <el-divider></el-divider>
          <!-- body of the questionnaire -->

          <div v-for="(question, index) in displayQuestions" :key="question.qid">
            <p>
              {{ String(index+1) }}.
              <span v-show="question.title==''">标题</span>
              {{ question.title }}
            </p>
            <div v-if="question.type === 'input'">
              <el-input class="sample-input" placeholder="示例输入框" ></el-input>
            </div>
            <div v-else> <!-- single and multi -->
              <div class="option-box"
               v-for="(option, oid) in displayOptions[index]" :key="oid">
                <img class="option-img" src="../assets/单选-选中.png"
                 v-if="question.type === 'single'">
                <img class="option-img" src="../assets/多选-选中.png"
                 v-else>
                <p>
                  <span v-show="option.value==''">标题 {{ String(oid + 1) }}</span>
                  <span style="margin: 0 10px">{{option.value}}</span>
                </p>
              </div>
            </div>

            <el-button class="show-hide-button"
             @click="beginEdit(index)" v-show="!isEdit[index]">▼编辑</el-button>

            <div v-show="isEdit[index]" class="edit-area">
              <el-input class="question-input"
               v-model="question.title" placeholder="请输入问题标题"></el-input>


              <div v-if="question.type !== 'input'">

                <el-row type="flex" justify="center">
                  <img class="click-img-button"
                   src="../assets/加.png" @click="addOption(index)">
                </el-row>

                <el-row type="flex" justify="center"
                 v-for="(option, oid) in displayOptions[index]" :key="oid">
                  <div class="option-input-group">
                    <el-input class="option-input"
                     v-model="option.value" :placeholder="'选项'+(oid+1)"></el-input>
                     <img class="click-img-button menu-img"
                      src="../assets/删除.png" @click="deleteOption(index)">
                  </div>
                </el-row>
              </div>

              <el-button class="show-hide-button" @click="finishEdit(index)">▲ 完成编辑</el-button>
            </div>

            <el-row type="flex" justify="center">
              <img class="click-img-button menu-img"
               src="../assets/删除.png" @click="deleteQuestion(index)">
            </el-row>

            <el-divider></el-divider>
          </div>

          <el-row type="flex" justify="center">
            <el-button type="primary" @click="showDialog">发布问卷</el-button>
          </el-row>
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
              <img src="../assets/单选-选中.png" class="menu-img">
              <el-link class="menu-text"
               @click="addQuestion('single')" :underline="false">单选</el-link>
            </div>
          </el-row>
          <el-row>
            <div>
              <img src="../assets/多选-选中.png" class="menu-img">
              <el-link class="menu-text"
               @click="addQuestion('multi')" :underline="false">多选</el-link>
            </div>
          </el-row>
          <el-row>
            <div>
              <img src="../assets/填空题.png" class="menu-img">
              <el-link class="menu-text"
               @click="addQuestion('input')" :underline="false">单项填空</el-link>
            </div>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="问卷" :visible.sync="isShowMoneyDialog" width="30%" :before-close="clearInput">
      <el-input
        type="Number"
        min="1"
        prefix-icon="el-icon-edit-outline"
        placeholder="输入问卷份数"
        v-model="questionnaire.copy"
        style="margin-bottom:15px"
        clearable
      ></el-input>
      <el-input
        :rows="4"
        type="Number"
        min="1"
        prefix-icon="el-icon-coin"
        placeholder="输入每份问卷悬赏金额"
        v-model="questionnaire.coin"
        style="margin-bottom:15px"
        clearable
      ></el-input>
      <el-date-picker
        v-model="time"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width:100%; margin-bottom:15px"
        :picker-options="pickerBeginDateAfter"
      ></el-date-picker>
      <span class="dialog-footer" slot="footer" >
        <el-button @click="submitQuestionnaire();" size="small" type="primary">确认</el-button>
        <el-button @click="isShowMoneyDialog=false" size="small" >取消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      displayQuestions: [],
      displayOptions: [],
      answers: {},
      time: "",
      isEdit: [],
      isShowMoneyDialog: false,
      questionnaire:{
        title: "",
        description: "",
        coin:"",
        copy: "",
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
    addQuestion: function(questionType)
    {
      let qid = this.displayQuestions.length
      let question = {title: "", type: questionType}
      this.displayQuestions.push(question)

      this.$set(this.isEdit, qid, true)

      if (questionType != 'input')
      {
        this.$set(this.displayOptions, qid, [])
        this.addOption(qid)
      }
    },
    addOption(qid)
    {
      let option = {questionIndex: qid, value: ""}
      this.displayOptions[qid].push(option)
    },
    deleteQuestion(qid)
    {
      this.displayQuestions.splice(qid, 1)
      this.isEdit.splice(qid, 1)
      this.displayOptions.splice(qid, 1)
    },
    deleteOption(qid, oid)
    {
      this.displayOptions[qid].splice(oid, 1)
    },
    beginEdit: function(qid)
    {
      this.$set(this.isEdit, qid, true)
    },
    finishEdit: function(qid)
    {
      this.$set(this.isEdit, qid, false)
    },
    showDialog: function()
    {
      if(!this.validateQuestionnaire())
        return
      this.isShowMoneyDialog = true
    },
    clearInput: function(done) {
      this.questionnaire.copy = ""
      this.questionnaire.coin = ""
      this.time = ""
      done()
    },
    validateQuestionnaire: function()
    {
      if (this.questionnaire.title == "")
      {
        this.$message.error("请填写问卷标题");
        return false;
      }

      if (this.displayQuestions.length == 0)
      {
        this.$message.error("问卷至少包含一个问题");
        return false;
      }

      for (let qid in this.displayQuestions)
      {
        if (this.displayQuestions[qid].type != 'input')
        {
          if (this.displayOptions[qid].length == 0)
          {
            this.$message.error("问题" + qid + "必须包含至少一个选项");
            return false;
          }
        }
      }

      // auto fill blank

      for (let question of this.questionnaire.questions)
      {
        if (question.title == "")
          question.title == "问题"
      }

      for (let qid in this.displayQuestions)
      {
        if (this.displayQuestions[qid].type != 'input')
        {
          for (let option of this.displayOptions[qid])
          {
            if (option.value == "")
              option.value = "选项"
          }
        }
      }
      return true
    },
    submitQuestionnaire: function()
    {
      // validate
      if (this.questionnaire.copy == ""|| this.questionnaire.copy <= 0)
      {
        this.$message.error("问卷份数必须为正整数");
        return;
      }

      if (this.questionnaire.coin == ""|| this.questionnaire.coin <= 0)
      {
        this.$message.error("悬赏金额必须为正整数");
        return;
      }

      if (Object.prototype.toString.call(this.time) != "[object Array]") {
        this.$message.error("必须选择开始与结束时间");
        return;
      }

      this.questionnaire.questions = this.displayQuestions

      console.log(this.displayOptions)
      //convert options to the form server desires
      for (let qid in this.displayQuestions)
      {
        if (this.questionnaire.questions[qid].type == 'input')
        {
          let option = {questionIndex: Number(qid), value: "0"}
          this.questionnaire.options.push(option)
        }
        else
        {
          if (this.displayOptions[qid].length == 0)
          {
            this.$message.error("问题" + qid + "必须包含至少一个选项");
            return;
          }

          for (let option of this.displayOptions[qid])
          {
            if (option.title == "")
              option.title = "选项"
            option.questionIndex = Number(qid)
            this.questionnaire.options.push(option)
          }
        }
      }

      this.questionnaire.copy = Number(this.questionnaire.copy)
      this.questionnaire.coin = Number(this.questionnaire.coin)
      this.questionnaire.createTime = this.$dateFormatter(new Date)
      this.questionnaire.startTime = this.$dateFormatter(this.time[0])
      this.questionnaire.endTime = this.$dateFormatter(this.time[1])

      this.$http.post('/api/questionnaire/', this.questionnaire)
      .then(response =>
      {
        this.$message.success("问卷已发布")
        this.isShowMoneyDialog=false;
        this.$router.push("/all")
      })
      .catch(e =>
      {
        console.log(e)
        console.log(e.response)
        if(e.response.data.msg=="not enough coin")
          this.$message.error("余额不够")
      })
    }
  }
};
</script>


<style scoped>

input
{
  padding: 0px 10px;
  font-size: 16px;
}

p
{
  font-size: 16px;
}

.title-input
{
  display: block;
  height: 36px;
  width: 360px;
  margin: 5px auto;
  font-size: 25px;
  text-align: center;
  border-radius: 6px;
  border: solid #CCCCCC 1px;
}

.description-input
{
  display: block;
  height: 26px;
  width: 90%;
  margin: 10px auto;
  color: #666666;
  font-size: 19px;
  padding: 0 5px;
  border: none;
}

.click-img-button:hover
{
  cursor: pointer;
}

.question-input
{
  display: block;
  height: 40px;
  width: 56.5%;
  margin: 10px auto;
}

.sample-input
{
  display: block;
  height: 40px;
  width: 60%;
  margin: 10px 20px;
}

.option-input
{
  height: 40px;
  width: 80%;
}

.option-input-group
{
  width: 60%;
  margin: 5px 0;
}

.show-hide-button
{
  color: white;
  width: 100%;
  margin: 10px 0 0 0;
  background: #99CCFF;
  border-radius: 0;
}

.show-hide-button:hover
{
  background: #F8F8F8;
}

.edit-area
{
  background: #F8F8F8;
  width: 95%;
  margin: 0 auto;
  padding: 10px 0 0 0;
}

.menu-img
{
  margin:10px;
  vertical-align: middle;
  width:26px;
  height:26px;
}

.option-img
{
  margin: 5px;
  vertical-align: middle;
  width:20px;
  height:20px;
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

.option-box
{
  height: 40px;
  display: flex;
  align-items:center;
}


.el-row
{
  margin-right: 0px;
}

.article-underline
{
  height: 1px;
  width: 80px;
  background: #545455;
  margin: 80px auto 0;
}

.el-card
{
  margin-bottom: 20px;
}


</style>
