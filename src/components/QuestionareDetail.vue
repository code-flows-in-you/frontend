<template>
<div class="card" style="width:70%;margin:auto;">
  <el-card style="margin-top:10px;">
    <el-row>
      <el-col :span="22">
        <div class="questionare-title">{{ questionare.title }}</div>
        <div class="questionare-description">{{ questionare.description }}</div>
      </el-col>
      <el-col :span="1">
        <img src="../assets/coin.png" width="20"/>
      </el-col>
      <el-col class="money" :span="1">{{ questionare.unit }}/{{ questionare.coin }}</el-col>

    </el-row>

    <el-divider></el-divider>
    <!-- body of the questionare -->

    <el-form :model="fakeModel" ref = "questionareForm" :rules = "rules"@submit.native.prevent>
      <div v-for = "question in questions" :key="question.qid">
        <div v-if = "question.type === 'input'">
          <el-form-item class = "questionare-form-item" v-bind:label = "question.title" prop = "ques">
            <el-input class = "input-area" v-model = "answers[question.qid]"></el-input>
          </el-form-item>
        </div>
        <div v-else-if = "question.type === 'single'">
          <el-form-item class="questionare-form-item" v-bind:label="question.title" prop="ques">
            <el-radio-group class="question-option-group"  v-model="answers[question.qid]">
              <el-radio class="question-option-item" v-for="option in options[question.qid]" :key="option.oid" v-bind:label="option.oid">{{option.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
          <div v-else-if = "question.type === 'multi'">
            <el-form-item class="questionare-form-item" v-bind:label="question.title" prop="ques">
              <el-checkbox-group class="question-option-group" v-model="answers[question.qid]">
                <el-checkbox class="question-option-item" v-for="option in options[question.qid]" :key="option.oid" v-bind:label="option.oid">{{option.value}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <el-divider></el-divider>
      </div>
      <el-row type="flex" justify="center">
        <el-form-item>
          <el-button type="primary" @click="onSubmit('questionareForm')">提交问卷</el-button>
        </el-form-item>
      </el-row>
    </el-form>

  </el-card>
</div>
</template>

<script>
export default {
  name: 'questionareDetail',
  data() {
    return {
      aid: null,
      questionare: {},
      questions: [],
      questionTypes: {},
      answers: {},
      options: {},
      rules:
      {
        ques: [{
                required: true,
                message: '请完成该问题',
                trigger: 'blur'
              }]
      },
      fakeModel : {}
    }
  },
  mounted() {
    this.aid = this.$route.params.id
    this.$http.get('/api/questionnaire/' + this.aid)
    .then(response =>
    {

      this.questionare = response.data
      this.questions = this.questionare.questions

      let questionIndex = 1;
      // get questions' type
      for (let question of this.questions)
      {
        this.questionTypes[question.qid] = question.type
        question.title = String(questionIndex++) + ". " + question.title
      }
      console.log(this.questions)

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
      console.log(e.response)
    })

  },
  methods:
  {
    onSubmit: function(questionareForm)
    {
      let isValid = false;
      this.$refs[questionareForm].validate((valid) => {
        isValid = valid;
      })

      if (!isValid)
        return

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
      })
    },
    getSubmitData: function()
    {
      let submitContent = {}
      submitContent["answers"] = []
      let submitAnswer = submitContent["answers"]
      let submitTime = new Date(Date.now()).toLocaleString('en-US', { hour12: false })

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
    }


  }
}
</script>


<style scoped>

.questionare-title
{
  color: #333333;
  line-height: 52px;
  font-size: 36px;
  font-family: Roboto;
  text-align: center;
}

.questionare-description
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

.el-form
{
  margin: 0 auto;
}

.questionare-form-item
{
  margin: 0 5%;
}

.questionare-form-item > :first-child, .questionare-form-item > :nth-child(2)
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
