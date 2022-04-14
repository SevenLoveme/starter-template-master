<template>

  <div id="aCoursesList" class="bg-fa of">

    <!-- /课程列表 开始 -->

    <section class="container">

      <header class="comm-title">

        <h2 class="fl tac">

          <span class="c-333">
          <a href="/course">全部课程</a>
          </span>

        </h2>

      </header>

      <section class="c-sort-box">

        <section class="c-s-dl">

          <dl>

            <dt>

              <span class="c-999 fsize14">课程类别</span>

            </dt>

            <dd class="c-s-dl-li">

              <ul class="clearfix">

                <li v-for="(subject,index) in subjectNestedList" :key="index">

                  <a :title="subject.title" @click="showChildren(subject.id,index)"
                     :class="{active:oneIndex==index}">{{ subject.title }}</a>

                </li>

              </ul>

            </dd>

          </dl>

          <dl>

            <dt>

              <span class="c-999 fsize14"></span>

            </dt>

            <dd class="c-s-dl-li">

              <ul class="clearfix">

                <li v-for="(item,index) in subSubjectList" :key="index">

                  <a :title="item.title" href="#" @click="queryBySubjectId(item.id,index)" :class="{active:twoIndex==index}" >{{ item.title }}</a>

                </li>

              </ul>

            </dd>

          </dl>

          <div class="clear"></div>

        </section>

        <div class="js-wrap">

          <section class="fr">

         <span class="c-ccc">

           <i class="c-master f-fM">1</i>/

           <i class="c-666 f-fM">1</i>

         </span>

          </section>

          <section class="fl">

            <ol class="js-tap clearfix">

              <li :class="{'current bg-orange':buyCountSort!=''}">

                <a title="销量"   @click="searchBuyCount">销量&nbsp;

                  <span :class="{hide:buyCountSort==''}">↓</span>

                </a>
              </li>


              <li :class="{'current bg-orange':gmtCreateSort!=''}">

                <a title="最新"  @click="searchGmtCreate">最新&nbsp;

                  <span :class="{hide:gmtCreateSort==''}">↓</span>

                </a>
              </li>


              <li :class="{'current bg-orange':priceSort!=''}">

                <a title="价格"    @click="searchPrice">价格&nbsp;

                  <span :class="{hide:priceSort==''}">↓</span>
                </a>

              </li>

            </ol>
          </section>

        </div>

      </section>


      <!-- /无数据提示 开始-->

      <section v-if="data.total==0" class="no-data-wrap">

        <em class="icon30 no-data-ico">&nbsp;</em>

        <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>

      </section>

      <!-- /无数据提示 结束-->

      <div class="mt40">
        <article class="comm-course-list">

          <ul class="of" id="bna">

            <li v-for="(course,index) in data.items" :key="index">

              <div class="cc-l-wrap">

                <section class="course-img">

                  <img :src="course.cover" class="img-responsive" :alt="course.title">

                  <div class="cc-mask">

                    <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>

                  </div>

                </section>

                <h3 class="hLh30 txtOf mt10">

                  <a :href="'/course/'+course.id" :title="course.title"
                     class="course-title fsize18 c-333">{{ course.title }}</a>

                </h3>

                <section class="mt10 hLh20 of">

                 <span class="fr jgTag bg-green">

                   <i class="c-fff fsize12 f-fA">{{ course.price == 0 ? '免费' : course.price }}</i>

                 </span>

                  <span class="fl jgAttr c-ccc f-fA">

                   <i class="c-999 f-fA">{{ course.viewCount }}9634人学习</i>

                   |

                   <i class="c-999 f-fA">9634评论</i>

                 </span>

                </section>

              </div>

            </li>

          </ul>

          <div class="clear"></div>

        </article>

        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)">首</a>
            <a
              v-if="data.hasPrevious"
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>
            <a
              v-if="data.hasNext"
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current+1)">&gt;</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="gotoPage(data.pages)">末</a>
            <div class="clear"/>
          </div>

        </div>
        <!-- 公共分页 结束 -->
      </div>



    </section>


  </div>

</template>

<script>

import course from "../../api/course";
import cookie from 'js-cookie'
export default {
  data() {
    return {
      page: 1,
      data: {},
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      searchObj: {}, // 查询表单对象
      oneIndex: -1,
      twoIndex: -1,
      buyCountSort: "",
      gmtCreateSort: "",
      priceSort: "",
    }
  },
  created() {
    this.orderNo = this.$route.params.id
    this.searchObj.title=cookie.get("search")
    cookie.set('search','',{domain:'localhost'})
    this.initCourseFirst()
    this.getAllSubject()
  },
  methods: {

    //购买量查询
    searchBuyCount() {
      this.buyCountSort = "1";
      this.gmtCreateSort = "";
      this.priceSort = "";
      this.searchObj.buyCountSort = this.buyCountSort;
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;
      this.gotoPage(this.page)
    },
    //更新时间查询
    searchGmtCreate() {
      this.buyCountSort = "";
      this.gmtCreateSort = "1";
      this.priceSort = "";
      this.searchObj.buyCountSort = this.buyCountSort;
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;
      this.gotoPage(this.page)
    },
    //价格查询
    searchPrice() {
      this.buyCountSort = "";
      this.gmtCreateSort = "";
      this.priceSort = "1";
      this.searchObj.buyCountSort = this.buyCountSort;
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;
      this.gotoPage(this.page)
    },


    //二级分类查询
    queryBySubjectId(id,index) {
      this.twoIndex = index
      this.searchObj.subjectParentId = ""
      this.searchObj.subjectId = id
      this.gotoPage(1)
    },

    //显示二级分类 并查询一级分类
    showChildren(id, index) {
      this.searchObj = {}
      this.oneIndex = index
      for (let subjectNestedListElement of this.subjectNestedList) {
        if (subjectNestedListElement.id == id) {
          this.subSubjectList = subjectNestedListElement.children
        }
      }
      this.searchObj.subjectParentId = id
      this.gotoPage(1)
    },
    //显示一级分类
    getAllSubject() {
      course.getAllSubject().then(result => {
        this.subjectNestedList = result.data.data.allSubject;
      })
    },

    //初始化页面
    initCourseFirst() {
      course.getCrouseList(1, 8, this.searchObj).then(result => {
        this.data = result.data.data
      })
    },

    //分页切换
    gotoPage(page) {
      course.getCrouseList(page, 8, this.searchObj).then(result => {
        this.data = result.data.data
      })
    }
  }
};
</script>
<style scoped>
.active {
  background: #68CB9B;
  color: white;
}

.hide {
  display: none;
}

.show {
  display: block;
}
</style>
