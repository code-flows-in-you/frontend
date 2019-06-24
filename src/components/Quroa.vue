<template>
<div style="margin-top:10px">
  <el-row :gutter="20">
    <el-col :offset="4" :span="13">
      <el-card class="text item">
        <div v-for="item in questionsList" :key="item._id">
          <el-row>
            <el-col :span="22">
              <div class="question-title" @click="queryDetail( item.aid )">{{ item.title }}</div>
            </el-col>
            <el-col :span="1">
              <img src="../assets/coin.png" width="20"/>
            </el-col>
            <el-col :span="1">{{ item.coin }}</el-col>
          </el-row>
          <div class="question-info">
            <span class="question-info">{{ item.createTime.substr(0, 10) }}</span>
            <span>   {{ item.answerCount }}人已回答</span>
            <span v-if="item.bestCount === 1">   已采纳</span>
          </div>
          <div class="question-content">{{ item.description }}</div>
          <el-button type="text" mini @click="quroaDetail( item.aid )">更多</el-button>
          <el-divider></el-divider>
        </div>
      </el-card>

    </el-col>
    <el-col :span="4">
      <el-card>
        <el-row type="flex" justify="center">
           <el-image :src="this.$store.state.user.Avatar" style="width:200px; height:200px"></el-image>
        </el-row>
        <el-row type="flex" justify="center" class="vcard-username">
          {{ this.$store.state.user.Nickname }}
        </el-row>
      </el-card>
      <el-card>
        <el-row>
          <div>
            <img src="../assets/help.png" style="margin:10px; vertical-align:middle; width:26px; height:26px"/>
            <el-link @click="newQuestion=true" :underline="false" style="font-size:17px">发起求助</el-link>
          </div>
        </el-row>
        <el-row>
          <div>
            <img src="../assets/问卷库.png" style="margin:10px; vertical-align:middle; width:26px; height:26px"/>
            <el-link @click="goToProfile('survey')" :underline="false" style="font-size:17px">我的问卷</el-link>
          </div>
        </el-row>
        <el-row>
          <div>
            <img src="../assets/icon_提问.png" style="margin:10px; vertical-align:middle; width:26px; height:26px"/>
            <el-link @click="goToProfile('question')" :underline="false" style="font-size:17px">我的提问</el-link>
          </div>
        </el-row>
        <el-row>
          <div>
            <img src="../assets/余额.png" style="margin:10px; vertical-align:middle; width:26px; height:26px"/>
            <el-link @click="goToProfile('balance')" :underline="false" style="font-size:17px">我的余额</el-link>
          </div>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  <el-dialog title="提问" :visible.sync="newQuestion">

    <el-input type="textarea" :rows="2" placeholder="用一句话描述你的问题" v-model="newQuestionTitle">
    </el-input>
    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="添加问题背景描述（选填）" v-model="newQuestionDescription">
    </el-input>
    <!-- <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload> -->
    <el-row>
      <el-col :offset="21">
        <el-button @click="payforQuestion=true;newQuestion=false;" size="small" type="primary" style="margin-top:10px;">发布问题</el-button>
      </el-col>
    </el-row>
  </el-dialog>
  <el-dialog title="支付" :visible.sync="payforQuestion">
    <el-form ref="payForm" :model="payForm" label-width="80px">
      <el-form-item label="悬赏金额">
        <el-input v-model="payForm.money"></el-input>
      </el-form-item>
       <el-form-item label="支付密码">
        <el-input v-model="payForm.password"></el-input>
      </el-form-item>
      <el-form-item>
    <el-button type="primary">返回上一步</el-button>
    <el-button>确认支付</el-button>
  </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      newQuestion: false,
      payforQuestion: false,
      newQuestionDescription: '',
      newQuestionTitle: '',
      payForm: {
        money: '',
        password: ''
      },
      questionsList: []
    }
  },
  mounted: function () {
    this.$http.get('/api/assignment/qa').then(
      response => {
        this.questionsList = response.data.assignments
        console.log(response.data.assignments)
      },
      response => console.log(response)
    )
  },
  methods: {

    //发起提问
    raiseQuestion: function () {

    },
    quroaDetail: function (id) {
      this.$router.push('/quroaDetail/' + id)
    },
    goToProfile: function (child) {
      this.$router.push('/profile/' + child)
    }
  }
}
</script>

<style>
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

.question-title {
  color: rgba(41, 64, 87, 1);
  font-size: 28px;
  font-family: Roboto;
}

.question-info {
  color: rgba(204, 204, 204, 1);
  font-family: Roboto;
}

.question-content {
  color: rgba(16, 16, 16, 1);
  font-size: 22px;
  font-family: Roboto;
}

.vcard-username {
    color: #666;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 24px;
    margin: 10px;
}
</style>
