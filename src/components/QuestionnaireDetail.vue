<template>
<div class="card" style="width:70%;margin:auto;">
  <el-card style="margin-top:10px;">
    <el-row>
      <el-col :span="22" :offset="1">
        <div class="questionnaire-title">{{ questionnaire.title }}</div>
        <div class="questionnaire-description">{{ questionnaire.description }}</div>
      </el-col>
      <el-col class="money" :span="1">
        <img src="../assets/coin.png" width="20"/>
        {{ questionnaire.unit }}
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <!-- body of the questionnaire -->

    <el-form v-if="isValid" @submit.native.prevent>
      <el-form-item v-for="question in questions" :key="question.qid"
       class="questionnaire-form-item" :label="question.title">
        <el-input v-if="question.type === 'input'"
         class="input-area" v-model="answers[question.qid]"></el-input>
        <el-radio-group v-else-if="question.type === 'single'"
         class="question-option-group"  v-model="answers[question.qid]">
          <el-radio v-for="option in options[question.qid]" :key="option.oid"
          class="question-option-item" :label="option.oid">{{option.value}}</el-radio>
        </el-radio-group>
        <el-checkbox-group v-else-if="question.type === 'multi'"
         class="question-option-group" v-model="answers[question.qid]">
          <el-checkbox v-for="option in options[question.qid]" :key="option.oid"
          class="question-option-item" :label="option.oid">{{option.value}}</el-checkbox>
        </el-checkbox-group>
        <el-divider></el-divider>
      </el-form-item>

      <el-row type="flex" justify="center">
          <el-button type="primary" @click="onSubmit">提交问卷</el-button>
      </el-row>

    </el-form>
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
      }
    })
    .catch(e =>
    {
      console.log(e)
      console.log(e.response)
    })

  },
  methods:
  {
    onSubmit: function()
    {

      let submitContent = this.getSubmitData()
      console.log(submitContent)
      this.$http.post('/api/questionnaire/' + this.aid, submitContent)
      .then(response =>
      {
        this.$message.success('问卷提交成功')
        console.log(response)
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

    }


  }
}
</script>


<style scoped>

.questionnaire-title
{
  color: #333333;
  line-height: 52px;
  font-size: 36px;
  font-family: Roboto;
  text-align: center;
}

.questionnaire-description
{
  color: #666666;
  line-height: 38px;
  font-size: 26px;
  font-family: Roboto;
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
  font-size: 22px;
  font-family: SourceHanSansSC-regular;
}

.el-form
{
  margin: 0 auto;
}

.questionnaire-form-item
{
  margin: 0 5%;
}

.questionnaire-form-item > :first-child, .questionnaire-form-item > :nth-child(2)
{
  font-size: 22px;
  font-family: SourceHanSansSC-regular;
  vertical-align: middle;
}

.question-option-group
{
  width: 100%;
  display: inline-block;
  zoom: 130%;
  /*transform: scale(3);
  transform-origin: 0 0;*/
  font-family: SourceHanSansSC-regular;
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
  zoom: 130%;
  font-family: SourceHanSansSC-regular;
  width: 40%;
  margin: 10px 0;
  padding: 0 15px;
}

.el-form-item__error
{
  transform: scale(10);
}

</style>
