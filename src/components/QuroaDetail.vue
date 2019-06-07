<template>
<div style="width:70%;margin:auto;">
  <el-card style="margin-top:10px;">
    <div class="question-title">title</div>
    <div>content</div>
    <el-row>
      <el-button @click="answer=true" size="small" type="primary">我来回答</el-button>

    </el-row>
  </el-card>
  <!-- 我来回答编辑解界面 -->
  <el-card v-if="answer">
    <!-- markown 编辑器 -->
    <el-row>
      <el-col :span="1">
        <img src="../assets/avatar.png" height="50px"/>
    </el-col>
        <el-col :span="3">
          <el-row>
            username
          </el-row>
          <el-row>
            2019-04-21
          </el-row>
        </el-col>
    </el-row>
    <el-input type="text" placeholder="请输入内容"  maxlength="10" show-word-limit>
    </el-input>
    <el-row>
      <el-col :offset="21">
        <el-button size="small" type="primary" style="margin-top:10px;">提交回答</el-button>
      </el-col>
    </el-row>

  </el-card>
  <el-card>
    <div v-for="o in 4" :key="o">
      <el-row>
        <el-col :span="1">
          <img src="../assets/avatar.png" height="50px"/>
        </el-col>
          <el-col :span="4">
            <el-row>
              username
            </el-row>
            <el-row>
              2019-04-21
            </el-row>
          </el-col>
          <!-- <el-col :span="2" >
          已采纳
        </el-col> -->
      </el-row>
      <div>
        回答内容
      </div>
      <el-col :offset="10">
        <el-button type="text" size="mini" style="margin:auto;">展开显示全文<i class="el-icon-arrow-down"></i></el-button>

      </el-col>
      <el-divider></el-divider>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'quroaDetail',
  data() {
    return {
      answer: false,
    }
  },
  mounted() {

  },
  methods: {}
}
</script>


<style scoped>

.question-title {
line-height: 52px;
color: rgba(41, 64, 87, 1);
font-size: 36px;
font-family: Roboto;
}
</style>
