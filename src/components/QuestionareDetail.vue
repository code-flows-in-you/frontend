<template>
<div style="width:70%;margin:auto;">
  <el-card style="margin-top:10px;">
    <div class="questionare-title"><h1>{{ questionare.title }}</h1></div>
    <div><h2>{{ questionare.description }}</h2></div>

    <!-- body of the questionare -->
    <el-form @submit.native.prevent>
      <div v-for="question in questions" :key="question.qid">
        <el-row>
          <div v-if = "question.type == 'input'">
            <el-form-item v-bind:label="question.title">
              <el-input v-model="answers[question.qid]"></el-input>
            </el-form-item>
          </div>
          <div v-else-if = "question.type == 'single'">
            <el-form-item v-bind:label="question.title">
              <el-radio-group v-model="answers[question.qid]">
                <el-radio v-for="option in options[question.qid]" :key="option.oid" v-bind:label="option.oid">{{option.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div v-else-if = "question.type == 'multi'">
            <el-form-item v-bind:label="question.title">
              <el-checkbox-group v-model="answers[question.qid]">
                <el-checkbox v-for="option in options[question.qid]" :key="option.oid" v-bind:label="option.oid">{{option.value}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
        </el-row>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交问卷</el-button>
      </el-form-item>
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
      options: {}
    }
  },
  mounted() {
    this.aid = this.$route.params.id
    this.$http.get('/api/questionnaire/' + this.aid)
    .then(response =>
    {

      this.questionare = response.data
      this.questions = this.questionare.questions

      // get questions' type
      for (let question of this.questions)
      {
        this.questionTypes[question.qid] = question.type
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
        console.log(e.response)
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
          answer["Timestamp"] = submitTime
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
            answer["Timestamp"] = submitTime
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
          answer["Timestamp"] = submitTime
          submitAnswer.push(answer)
        }
      }

      return submitContent
    }


  }
}
</script>


<!--<style scoped>

.questionare-title {
line-height: 52px;
color: rgba(41, 64, 87, 1);
font-size: 36px;
font-family: Roboto;
}
</style>

-->
