<template>
<div class="card" style="width:70%;margin:auto;">
      <el-page-header @back="goBack">
</el-page-header>
  <el-card style="margin-top:10px;" shadow="never">
    <el-row>
      <el-col :span="22" :offset="1">
        <div class="questionnaire-title">{{ questionnaire.title }}</div>
        <div class="questionnaire-description">{{ questionnaire.description }}</div>
      </el-col>
      <el-col class="money" :span="1">
        <img class="menu-img" src="../assets/coin.png" width="20"/>
        {{ questionnaire.unit }}
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <!-- body of the questionnaire -->
    <el-form v-if="isValid" :model="answers" :rules="rules"
     ref="questionareForm" @submit.native.prevent>
      <div v-for="question in questions" :key="question.qid">
        <el-form-item class="questionnaire-form-item"
         :prop="String(question.qid)" :label="question.title">
          <el-input class="input-area"
           v-if="question.type === 'input'" v-model="answers[question.qid]"></el-input>
          <el-radio-group class="question-option-group"
           v-else-if="question.type === 'single'" v-model="answers[question.qid]">
            <el-radio class="question-option-item"
             v-for="option in options[question.qid]" :key="option.oid"
             :label="option.oid">{{option.value}}</el-radio>
          </el-radio-group>
          <el-checkbox-group class="question-option-group"
           v-else-if="question.type === 'multi'" v-model="answers[question.qid]">
            <el-checkbox class="question-option-item"
             v-for="option in options[question.qid]" :key="option.oid"
             :label="option.oid">{{option.value}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-divider></el-divider>
      </div>
      <!-- submit button -->
      <el-row type="flex" justify="center">
          <el-button type="primary" @click="onSubmit('questionareForm')">提交问卷</el-button>
      </el-row>
    </el-form>
    <!-- error message: time out, copy limit, etc.-->
    <el-row v-else class="error-msg" type="flex" justify="center">
      {{ errorMsg }}
    </el-row>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'questionnaireDetail',
  data() {
    return {
      aid: null,
      isValid: true,
      errorMsg: "问卷已结束",
      questionnaire: {},
      questions: [],
      questionTypes: {},
      answers: {},
      options: {},
      rules: {}
    }
  },
  mounted() {

    this.aid = this.$route.params.id
    this.$http.get('/api/questionnaire/' + this.aid)
    .then(response =>
    {

      this.questionnaire = response.data
      console.log(this.questionnaire)

      this.isValid = this.questionnaireValidation()

      if (!this.isValid)
        return

      this.questions = this.questionnaire.questions

      let questionIndex = 1;

      // get questions' types
      // make questions' indexex
      for (let question of this.questions)
      {
        this.questionTypes[question.qid] = question.type
        question.title = String(questionIndex++) + ". " + question.title
      }



      // make options' array
      for (let option of response.data.options)
      {
        if (!this.options[option.qid])
          this.options[option.qid] = [option]
        else
          this.options[option.qid].push(option)
      }

      // make answers' container
      for (let qid in this.options)
      {
        //add reactive property
        if (this.questionTypes[qid] == 'multi')
          this.$set(this.answers, qid, [])
        else
          this.$set(this.answers, qid, "")
      }

      for (let question of this.questions)
      {
        this.$set(this.rules, String(question.qid),
          { required: true, message: '请完成该问题', trigger: ['blur', 'change'] })
      }
      console.log(this.answers)
      console.log(this.rules)


    })
    .catch(e =>
    {
      console.log(e)
      console.log(e.response)
    })

  },
  methods:
  {
    onSubmit: function(ruleForm)
    {
      let isFilled = false;
      this.$refs[ruleForm].validate((valid) =>
      {
        isFilled = valid
      });

      if (!isFilled)
      {
        this.$message.error('请完成全部问题')
        return
      }

      let submitContent = this.getSubmitData()
      console.log(submitContent)
      this.$http.post('/api/questionnaire/' + this.aid, submitContent)
      .then(response =>
      {
        this.$message.success('问卷提交成功')
        console.log(response)
        this.$router.push("/all")
      })
      .catch(e =>
      {
        console.log(e.response.data.msg)
        if (e.response.data.msg === "already answer")
          this.$message.error('您已填写过该问卷')
        else
          this.$message.error('问卷已达到最大填写份数')
      })
    },
    getSubmitData: function()
    {
      let submitContent = {}
      submitContent["answers"] = []
      let submitAnswer = submitContent["answers"]

      let submitTime = this.$dateFormatter(new Date)
      console.log(submitTime)
      let uid = this.$store.state.user.Uid


      // convert the answers to the form that server desires
      for (let qid in this.answers)
      {
        if (this.questionTypes[qid] == 'input')
        {
          let answer = {}
          answer["uid"] = uid
          answer["qid"] = Number(qid)
          answer["oid"] = Number(this.options[qid][0].oid)
          answer["value"] = this.answers[qid]
          answer["timestamp"] = submitTime
          submitAnswer.push(answer)
        }
        else if (this.questionTypes[qid] == 'multi')
        {
          for (let oid of this.answers[qid])
          {
            let answer = {}
            answer["uid"] = uid
            answer["qid"] = Number(qid)
            answer["oid"] = Number(oid)
            answer["value"] = "0"
            answer["timestamp"] = submitTime
            submitAnswer.push(answer)
          }
        }
        else if (this.questionTypes[qid] == 'single')
        {
          let answer = {}
          answer["uid"] = uid
          answer["qid"] = Number(qid)
          answer["oid"] = Number(this.answers[qid])
          answer["value"] = "0"
          answer["timestamp"] = submitTime
          submitAnswer.push(answer)
        }
      }

      return submitContent
    },
    questionnaireValidation: function()
    {
      console.log
      let endTime = Date.parse(this.questionnaire.endTime)
      let now = Date.now()
      if (endTime < now)
      {
        this.errorMsg = "问卷已结束"
        return false
      }

      if (this.questionnaire.coin <= 0)
      {
        this.errorMsg = "问卷已达到最大填写份数"
        return false
      }

      return true

    },
    goBack:function () {
       this.$router.back(-1);
    }


  }
}
</script>


<style scoped>

.questionnaire-title
{
  color: black;
  font-size: 25px;
  text-align: center;
}

.questionnaire-description
{
  color: #666666;
  font-size: 19px;
  text-align: center;
  margin: 21px 0 0 0;
}

.money
{
  color: #FF4343;
}

.error-msg
{
  color: #FF4343;
  font-size: 19px;
}

.el-form
{
  margin: 0 auto;
}

.questionnaire-form-item
{
  margin: 0 5%;
}

.questionnaire-form-item > :first-child,
.questionnaire-form-item > :nth-child(2)
{
  color: black;
  font-size: 16px;
  vertical-align: middle;
}

.question-option-group
{
  width: 100%;
  display: inline-block;
  zoom: 114%;
  /*transform: scale(3);
  transform-origin: 0 0;*/
  line-height: 20px;
  padding: 0 15px;
}

.question-option-item
{
  display: block;
}


.input-area
{
  display: block;
  zoom: 114%;
  width: 40%;
  margin: 10px 0;
  padding: 0 15px;
}

.menu-img
{
  vertical-align: middle;
}

</style>
