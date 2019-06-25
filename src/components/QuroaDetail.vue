<template>
  <div style="width:70%;margin:auto;">
    <el-card style="margin-top:10px;">
      <div class="question-title">{{ question.title }}</div>
      <div>{{ question.description }}</div>
      <el-row>
        <!-- <el-button @click="answer=true" size="small" type="primary">我来回答</el-button> -->
        <el-col :offset="20"><div>{{question.startTime}}</div></el-col>
        
      </el-row>
    </el-card>
    <!-- 我来回答编辑解界面 -->
    <el-card>
      <!-- markown 编辑器 -->
      <el-row>
        <el-col :span="1">
           <!-- <el-image :src="this.$store.state.user.Avatar" style="height:50px"></el-image> -->
             <el-avatar size="large" :src="this.$store.state.user.Avatar"></el-avatar>
        </el-col>
        <el-col :span="2" style="margin-left:10px;">
          <el-row >{{ this.$store.state.user.Nickname }}</el-row>
          <el-row>{{ this.$dateFormatter(this.time).split(' ')[0] }}</el-row>
        </el-col>
      </el-row>
      <el-input type="text" placeholder="请输入内容"  :v-model="content" maxlength="10" show-word-limit style="margin-top:20px;">
      </el-input>
      <!-- <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      ></quill-editor> -->
     
      <el-row>
        <el-col :offset="21">
          <el-button size="small" type="primary" style="margin-top:10px;">提交回答</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card v-if="answers.length">
      <div  v-for="item in answers" :key="item._id">
        <el-row>
          <el-col :span="1">
            <img src="../assets/avatar.png" height="50px">
          </el-col>
          <el-col :span="4">
            <el-row>{{ item.user }}</el-row>
            <el-row>{{ item.timestamp.substr(0, 10) }}</el-row>
          </el-col>
        </el-row>
        <div>{{ item.answer }}</div>
        <el-col :offset="10">
          <el-button type="text" size="mini" style="margin:auto;">
            展开显示全文
            <i class="el-icon-arrow-down"></i>
          </el-button>
        </el-col>
        <el-divider></el-divider>
      </div>
    </el-card>
    <el-card v-else>
      <div>暂无回答</div>
    </el-card>
  </div>
</template>

<script>
// import { quillEditor } from 'vue-quill-editor'

export default {
  name: "quroaDetail",
  components: {
    // quillEditor
  },
  data() {
    return {
      answer: false,
      question: {},
      answers: [],
      time: new Date(),
      content: "<h2>I am Example</h2>",
      editorOption: {
        modules: {
          toolbar: [
            [{ size: ["small", false, "large"] }],
            ["bold", "italic"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"]
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          }
        }
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    let aid = this.$route.params.id;
    this.$http.get("/api/qa/" + aid).then(
      response => {
        this.question = response.data;
        this.answers = this.question.answers;
        console.log(this.answer)
        // if(this)
        console.log(response.data);
      },
      response => console.log(response)
    );
  },
  methods: {}
};
</script>


<style scoped>
.question-title {
  line-height: 52px;
  color: rgba(41, 64, 87, 1);
  font-size: 36px;
  font-family: Roboto;
}
</style>
