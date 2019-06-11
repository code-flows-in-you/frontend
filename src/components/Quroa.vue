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
              <i class="el-icon-coin"></i>
            </el-col>
            <el-col :span="1">{{ item.coin }}</el-col>
          </el-row>
          <div class="question-info">
            <span class="question-info">{{ item.createTime.substr(0, 10) }}</span>
            <span>   5人已回答</span>
            <span>   已采纳</span>
          </div>
          <div class="question-content">{{ item.description }}</div>
          <el-button type="text" mini @click="quroaDetail( item.aid )">更多</el-button>
          <el-divider></el-divider>
        </div>
      </el-card>

    </el-col>
    <el-col :span="3">
      <el-card>
        <el-row>
          <el-col :span="8">
            <img src="../assets/avatar.png" />
          </el-col>
            <el-col :span="16">
              username
            </el-col>
        </el-row>
      </el-card>
      <el-card>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="sidebar-num">0</div>
          </el-col>
          <el-col :span="8">
            <div class="sidebar-num">0</div>
          </el-col>
          <el-col :span="8">
            <div class="sidebar-num">0</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="sidebar-item-text">回答</div>
          </el-col>
          <el-col :span="8">
            <div class="sidebar-item-text">被采纳</div>
          </el-col>
          <el-col :span="8">
            <div class="sidebar-item-text">已求助</div>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <el-row>
          <el-button type="text" @click="newQuestion=true" icon="el-icon-edit-outline">发起提问</el-button>
        </el-row>
        <el-row>
          <el-button type="text" icon="el-icon-coin">我的余额</el-button>
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
</style>
