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
    <div>
  </div>
    <el-form>
      <div v-for="question in questions" :key="question.qid">
        <el-form-item  :label="question.title" class="questionnaire-form-item">
          <div v-if="question.type === 'input'">
            <el-input v-model="answers[question.qid]"
             class="input-area"></el-input>
             {{ data[options[question.qid][0].oid]  }}
           </div>
          <el-radio-group v-else-if="question.type === 'single'"
           class="question-option-group" v-model="answers[question.qid]">
            <div v-for="option in options[question.qid]" :key="option.oid">
              <el-radio
              class="question-option-item" :label="option.oid">{{option.value}}</el-radio>
              <el-progress  :stroke-width="18" class="progress-bar" :text-inside="true"
              :percentage="getPercentage(option.oid)"></el-progress>
              <span class="fraction">{{ data[option.oid].length }} / {{ numOfAnswers }}</span>
              {{ data[option.oid] }}
              <br />
              {{ option.oid }}
            </div>
          </el-radio-group>
          <el-checkbox-group v-else-if="question.type === 'multi'"
           class="question-option-group" v-model="answers[question.qid]">
           <div v-for="option in options[question.qid]" :key="option.oid">
            <el-checkbox
            class="question-option-item" :label="option.oid">{{option.value}}</el-checkbox>
            <el-progress  :stroke-width="14" class="progress-bar"
              :percentage="getPercentage(option.oid)"></el-progress>
            {{ data[option.oid] }}
            <br />
            {{ data[option.oid] }}
          </div>
          </el-checkbox-group>
        </el-form-item>
        <el-divider></el-divider>
      </div>
    </el-form>
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
      this.numOfAnswers = (this.questionnaire.copy - this.questionnaire.coin) /
                          this.questionnaire.unit
      console.log(this.questionnaire)

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


<style>
.input-area input.el-input__inner
{
    border: 0.5px black solid;
    border-radius: 0;
    color: black
}
</style>

<style scoped>

.questionnaire-title
{
  color: #333333;
  line-height: 52px;
  font-size: 36px;
  font-family: -apple-system, "SF UI Text", "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif;
  text-align: center;
}

.questionnaire-description
{
  color: #666666;
  line-height: 38px;
  font-size: 26px;
  font-family: -apple-system, "SF UI Text", "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif;
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
  font-family: -apple-system, "SF UI Text", "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif;
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
  color: black;
  font-size: 22px;
  font-family: -apple-system, "SF UI Text", "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif;
  vertical-align: middle;
}

.question-option-group
{
  width: 100%;
  display: inline-block;
  zoom: 130%;
  font-size: 14px;
  font-family: -apple-system, "SF UI Text", "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif;
  line-height: 20px;
  padding: 0 15px;
}

.question-option-item
{
  display: block;
}

.progress-bar
{
 width: 40%;
 margin: 10px;
 display: inline-block;
}

.input-area
{
  display: block;
  zoom: 130%;
  font-family: -apple-system, "SF UI Text", "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif;
  width: 40%;
  margin: 10px 0;
  padding: 0 15px;
}



.fraction
{
  color: #409EFF;
}

.el-radio, .el-checkbox
{
  color: black;
}


</style>
