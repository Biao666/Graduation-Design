<template>
  <div class="fshow">
    <div style="width: 1100px;">
      <div id="Sel">
        <ul>
          <div class="cato">
            <li class="Mname">种苗 ：</li>
            <li>
              <a
                href
                @click.prevent
                :class="activeClass == index ? 'active1':''"
                v-for="(item,index) in MCato"
                :key="index"
                @click="getItem(item,index)"
              >{{item}}</a>
            </li>
          </div>
          <div class="cato">
            <li class="Mname">供求 ：</li>
            <li>
              <a
                href
                @click.prevent
                :class="activeClass2 == index ? 'active1':''"
                v-for="(sad,index) in SAD"
                :key="index"
                @click="getItem2(sad,index)"
              >{{sad}}</a>
            </li>
          </div>
          <div class="search">
                <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                  <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="联系人" value="contact"></el-option>
                    <el-option label="文章" value="title"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </div>
        </ul>
      </div>
      <div class="fashow">
        <tr class="bhead">
          <td>供求信息列表</td>
        </tr>
        <table>
          <tbody v-for="(item,index) in dataList" :key="index">
            <tr class="trh">
              <table>
                <tr class="trtrh">
                  <td>
                    <a
                      :href="'/FaX/detailshow/'+item.id"
                      target="_blank"
                      @click="insertB(item)"
                    >{{item.title+'('+item.doing+')'}}</a>
                  </td>
                  <td style="color:red">{{item.start}}</td>
                </tr>
              </table>
            </tr>
            <tr class="trh">
              <table>
                <tr class="trtrh">
                  <td style="width:20%">
                    <a href>
                      <img :src="item.img" alt="点击图片浏览更详细信息" style="width:86px;height:86px;">
                    </a>
                  </td>
                  <td>
                    <font style="font-size:15px;">{{item.content | ellipsis}}</font>
                  </td>
                </tr>
              </table>
            </tr>
            <tr class="trdet" v-if="!user==''">
              <td>
                联系人：
                <span style="color:skyblue;">{{item.contact}}</span>
              </td>
              <td>电子邮件：<span style="color:skyblue;">{{item.email}}</span></td>
              <td>电话：<span style="color:skyblue;">{{item.phone}}</span></td>
              <td>地址：<span style="color:skyblue;">{{item.location}}</span></td>
            </tr>
            <tr class="trdet" v-if="user==''">
              登陆查看更多信息
            </tr>
          </tbody>
        </table>
        
      </div>
      <div style="display:flex;justify-content:center;">
          <router-link :to="'/FaX/'+page">
            <el-pagination layout="prev, pager, next" 
          :total="pages" @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"></el-pagination>
          </router-link>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  inject: ['reload'],
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 150) {
        return value.slice(0, 150) + "...";
      }
      return value;
    }
  },
  data() {
    return {
      activeClass: 0, // 0为默认选择第一个，-1为不选择
      activeClass2: 0,
      MCato: [
        "不限",
        "南美白对虾",
        "斑节对虾草虾",
        "罗氏沼虾",
        "河虾青虾",
        "东方对虾中国对虾",
        "竹节虾日本对虾",
        "波士顿龙虾",
        "生蚝"
      ],
      SAD: ["所有信息", "供方", "求方"],
      dataList: [],
      page: 1,
      pages: 10,
      currentPage1: 1,
      s: 0,
      e: 6,
      categories: "不限",
      sad: "所有信息",
      user: "",
      flag:false,
      input5:'',
      select: '',
    };
  },
  created() {
    this.flag = false
    this.getDataO()
    if (sessionStorage.getItem("user") != null) {
      this.user = JSON.parse(sessionStorage.getItem("user")).account;
    }
  },
  methods: {
    insertB(item){
      if(this.user!=""){
        this.axios.post(this.HOST+"/FaX/page/"+this.page+"/categories/"+this.categories+"/sad/"+this.sad,{
                item:item,
                user:this.user
          })
      }
    },
    getItem(item, index) {
      this.activeClass = index; // 把当前点击元素的index，赋值给activeClass
      //console.log(item);
      this.categories = item;
      this.page = 1
      this.s = 0
      this.e = 6
      if(!this.flag)
        this.getDataO();
      else
        this.search()
    },
    getItem2(sad,index) {
      this.activeClass2 = index; // 把当前点击元素的index，赋值给activeClass2
      this.sad = sad;
      this.page = 1
      this.s = 0
      this.e = 6
      if(!this.flag)
        this.getDataO();
      else
        this.search()
    },
    getDataO(){
      this.axios
      .get(this.HOST+"/FaX/page/"+this.page+"/categories/"+this.categories+"/sad/"+this.sad)
      .then(res => {
        this.dataList = res.data.slice(this.s,this.e);
        this.pages = Math.ceil(res.data.length/6)*10;
      })
      .catch(err => {
        console.log(err);
      });
    },
    handleCurrentChange(val){
      //  console.log(`当前页: ${val}`);
       this.page = val
       this.s = val * 6 - 6
       this.e = val * 6
      //  this.reload()
      //  console.log(this.page)
      if(!this.flag)
        this.getDataO();
      else
        this.search()
    },
    search(){
      this.flag = true
      this.axios.post(this.HOST+'/search',{
        type:this.select,
        s:this.input5,
        categ:this.categories,
        sad:this.sad
      }).then(res=>{
        this.dataList = res.data.slice(this.s,this.e);
        this.pages = Math.ceil(res.data.length/6)*10;
      })
    }
  },
};
</script>
<style scoped>
.fshow {
  display: flex;
  justify-content: center;
}
#Sel {
  width: 100%;
  border: 1px solid;
  border-radius: 4px;
  margin-top: 20px;
}
.cato {
  margin-left: 20px;
  height: 50px;
  display: flex;
  align-items: center;
}

.cato li {
  margin: 0px;
  line-height: 60px;
  text-align: center;
  list-style: none;
}

a {
  padding: 0 12px;
  color: #333;
}

.active1 {
  border-radius: 4px;
  background: #ff5837;
  color: #fff;
}
.Mname {
  width: 70px;
  line-height: 50px;
  background-color: #fafafa;
}
.fashow {
  margin-top: 20px;
}
.bhead {
  width: 1080px;
  display: block;
  color: #1f376d;
  font-weight: bold;
  background-image: url("../assets/bg_td.gif");
  padding-left: 15px;
}
.trh {
  background-color: rgb(231, 229, 229);
}
.trtrh {
  width: 1090px;
  display: flex;
  justify-content: space-between;
}
.trtrh a {
  color: #1f376d;
  font-weight: bold;
}
.trdet {
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px dashed;
}
</style>