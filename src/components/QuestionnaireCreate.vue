<template>
  <div style="margin-top:10px">
    <el-row :gutter="20">
      <el-col :offset="4" :span="13">
        <el-card>
          <el-form>
            <el-form-item  label=""
            class="questionnaire-form-item questionnaire-title">
              <el-input class="input-area" v-model="questionnaire.title"></el-input>
            </el-form-item>
            <el-form-item  label=""
            class="questionnaire-form-item questionnaire-description">
              <el-input class="input-area" v-model="questionnaire.title"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <!-- body of the questionnaire -->

            <div v-for="question in displayQuestions" :key="question.qid">
              <el-form-item  :label="String(question.qid+1) + '. ' +question.title" class="questionnaire-form-item">
                <div v-if="question.type === 'input'">
                  <el-input v-model="answers[question.qid]" class="input-area"></el-input>
                  <el-collapse accordion class="edit-board-form-item">
                    <el-collapse-item title="编辑">
                      <el-form-item label="请输入标题" class="questionnaire-form-item">
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
                    <el-collapse accordion class="edit-board-form-item">
                      <el-collapse-item title="编辑">
                        <el-form-item label="请输入标题" class="questionnaire-form-item">
                          <el-input v-model="question.title" class="input-area"></el-input>
                        </el-form-item>
                        <el-button type="primary" @click="addOption(question.qid)">提交问卷</el-button>
                      </el-collapse-item>
                    </el-collapse>
                  </el-radio-group>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayQuestions: [],
      displayOptions: {},
      answers: {},
      currentQuestionIndex: 0,
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
      }
    };
  },
  mounted: function()
  {

  },
  methods: {
    addInput: function()
    {
      this.displayQuestions.push({title: "请输入标题", type: 'input',
       qid: this.currentQuestionIndex++})
    },
    addSingleGroup: function()
    {
      this.displayQuestions.push({title: "标题", type: 'single',
      qid: this.currentQuestionIndex++})
    },
    addMultiGroup: function()
    {
      this.displayQuestions.push({title: "标题", type: 'multi',
      qid: this.currentQuestionIndex++})
    },

  }
};
</script>




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

.edit-board-form-item,
{
  background:  #F8F8F8;
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
