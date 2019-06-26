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
        <div v-for="(reply, replyIndex) in data[options[question.qid][0].oid]" :key="replyIndex">
          {{ replyIndex+1  }}. {{reply.value}}
        </div>

      </div>
      <div v-else> <!-- single and multi -->
        <div v-for="option in options[question.qid]" :key="option.oid">
          <img src="../assets/单选-选中.png" class="menu-img"
           v-if="question.type === 'single'">
          <img src="../assets/多选-选中.png" class="menu-img"
           v-else>
          <p>
            <span style="margin: 0 10px">{{option.value}}</span>
          </p>

          <el-progress  :stroke-width="18" class="progress-bar" :text-inside="true"
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

.title-input
{
  display: block;
  height: 66px;
  width: 360px;
  margin: 5px auto;
  font-size: 22px;
  text-align: center;
  border-radius: 6px;
  border: solid #CCCCCC 1px;
}

.description-input
{
  display: block;
  height: 66px;
  width: 90%;
  margin: 10px auto;
  color: #666666;
  font-size: 22px;
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
  margin: 10px 0;
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
