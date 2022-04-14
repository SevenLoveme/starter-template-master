<template xmlns:v-swiper="http://www.w3.org/1999/xhtml">


  <div>

    <br>
      <el-carousel :interval="4000" type="card" height="420px" >
        <el-carousel-item v-for="banner in bannerList" :key="banner.id">
        <a target="_blank" :href="banner.linkUrl">

          <img :src="banner.imageUrl" :alt="banner.title" style="width: 1050px;height: 420px">

        </a>
        </el-carousel-item>
      </el-carousel>

    <div id="aCoursesList">

      <!-- 网校课程 开始 -->

      <div>

        <section class="container">

          <header class="comm-title">

            <h2 class="tac">

              <span class="c-333">热门课程</span>

            </h2>

          </header>

          <div>

            <article class="comm-course-list">

              <ul class="of" id="bna">

                <li v-for="course in courseList" :key="course.id">

                  <div class="cc-l-wrap">

                    <section class="course-img">

                      <img

                        :src="course.cover"

                        class="img-responsive"

                        :alt="course.title"

                      >

                      <div class="cc-mask">

                        <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>

                      </div>

                    </section>

                    <h3 class="hLh30 txtOf mt10">

                      <a href="#" :title="course.title" class="course-title fsize18 c-333">{{course.title}}</a>

                    </h3>

                    <section class="mt10 hLh20 of">

                   <span class="fr jgTag bg-green">

                     <i class="c-fff fsize12 f-fA">{{Number(course.price)===0?'免费':course.price}}</i>

                   </span>

                      <span class="fl jgAttr c-ccc f-fA">

                     <i class="c-999 f-fA">{{course.viewCount}}</i>

                     |

                     <i class="c-999 f-fA">9634评论</i>

                   </span>

                    </section>

                  </div>

                </li>

              </ul>

              <div class="clear"></div>

            </article>

            <section class="tac pt20">

              <a href="/course" title="全部课程" class="comm-btn c-btn-2">全部课程</a>

            </section>

          </div>

        </section>

      </div>

      <!-- /网校课程 结束 -->

      <!-- 网校名师 开始 -->

      <div>

        <section class="container">

          <header class="comm-title">

            <h2 class="tac">

              <span class="c-333">名师大咖</span>

            </h2>

          </header>

          <div>

            <article class="i-teacher-list">

              <ul class="of">

                <li v-for="teacher in teacherList" :key="teacher.id">

                  <section class="i-teach-wrap">

                    <div class="i-teach-pic">

                      <a href="/teacher/1" :title="teacher.name">

                        <img :alt="teacher.name" :src="teacher.avatar">

                      </a>

                    </div>

                    <div class="mt10 hLh30 txtOf tac">

                      <a href="/teacher/1" :title="teacher.name" class="fsize18 c-666">{{teacher.name}}</a>

                    </div>

                    <div class="hLh30 txtOf tac">

                      <span class="fsize14 c-999">{{Number(teacher.level)===1?'高级讲师':'首席讲师'}}</span>

                    </div>

                    <div class="mt15 i-q-txt">
                      <p class="c-999 f-fA">{{teacher.intro}}</p>
                    </div>

                  </section>

                </li>

              </ul>

              <div class="clear"></div>

            </article>

            <section class="tac pt20">

              <a href="/teacher" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>

            </section>

          </div>

        </section>

      </div>

      <!-- /网校名师 结束 -->

    </div>

  </div>

</template>

<script>
import banner from "../api/banner";
import index from "../api/index"

export default {
  data() {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: '.swiper-pagination'//分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: '.swiper-button-next',//下一页dom节点
          prevEl: '.swiper-button-prev'//前一页dom节点
        }
      },
      //banner数组
      bannerList: [],
      courseList: [],
      teacherList: []
    }
  },
  created() {
    this.getBannerList()
    this.getIndex()
  },
  methods: {

    //回显用户信息

    getBannerList() {
      banner.getListBanner()
        .then(result => {
          this.bannerList = result.data.data.list
        })
    },

    getIndex() {
      index.getIndexData()
      .then(result => {
        this.courseList = result.data.data.courseList
        this.teacherList = result.data.data.teacherList
      })
    }
  }
}
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
