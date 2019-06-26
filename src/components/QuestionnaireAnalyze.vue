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

    <div v-for="(question, index) in questions" :key="question.qid">
      <p>{{ String(index+1) }}. {{ question.title }}</p>
      {{options[index]}}
      <div v-if="question.type === 'input'">
        <input placeholder="示例输入框" class="sample-input"></input>
        <div v-for="(reply, replyIndex) in data[options[question.qid][0].oid]" :key="replyIndex"
        class="reply">
        <p>{{ replyIndex+1  }}. {{reply.value}}</p>
        </div>

      </div>
      <div v-else> <!-- single and multi -->
        <div v-for="option in options[question.qid]" :key="option.oid" class="option-box">
          <img src="../assets/单选-选中.png" class="menu-img"
           v-if="question.type === 'single'">
          <img src="../assets/多选-选中.png" class="menu-img"
           v-else>
          <p><span style="margin: 0 10px">{{option.value}}</span></p>

          <el-progress  :stroke-width="22" class="progress-bar" :text-inside="true"
           :percentage="getPercentage(option.oid)"></el-progress>
          <span class="fraction">{{ data[option.oid].length }} / {{ numOfAnswers }}</span>

        </div>
      </div>


      <el-divider></el-divider>
    </div>
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
      data: {},
      numOfAnswers: 0
    }
  },
  mounted() {

    this.aid = this.$route.params.id
    this.$http.get('/api/questionnaire/answer/' + this.aid)
    .then(response =>
    {

      this.questionnaire = response.data
      this.numOfAnswers = (this.questionnaire.copy - this.questionnaire.coin/this.questionnaire.unit)

      console.log(this.questionnaire)

      this.questions = this.questionnaire.questions

      // get questions' types
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

      console.log(this.options)

      // make answers' container
      for (let qid in this.options)
      {
        //add reactive property
        if (this.questionTypes[qid] == 'multi')
          this.$set(this.answers, qid, [])
        else
          this.$set(this.answers, qid, "")
      }

      for (let option of response.data.options)
      {
        let oid = option.oid
        let answersOfOption = response.data[oid]
        this.data[oid] = answersOfOption
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
    getPercentage: function (oid)
    {
      let result = 0
      if (this.numOfAnswers != 0)
        result = this.data[oid].length / this.numOfAnswers * 100
      return Math.round(result)
    }
  }

}
</script>




<style scoped>

input
{
  padding: 0px 10px;
  font-size: 17px;
}

p
{
  font-size: 17px;
}

.reply
{
  margin: 10px 20px;
}

.sample-input
{
  display: block;
  height: 40px;
  width: 60%;
  margin: 10px 20px;
}

.menu-img
{
  margin:10px;
  vertical-align: middle;
  width:26px;
  height:26px;
}

.option-box
{
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

.progress-bar
{
 width: 40%;
 margin: 10px;
 display: inline-block;
}

.questionnaire-title
{
  color: #333333;
  line-height: 52px;
  font-size: 36px;
  text-align: center;
}
.questionnaire-description
{
  color: #666666;
  line-height: 38px;
  font-size: 26px;

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
}

.fraction
{
  color: #409EFF;
}
</style>
