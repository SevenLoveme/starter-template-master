import request from "../utils/request";
export default {
  getCrouseList(page,limit,searchObj){
    return request({
      url:`/eduservice/coursefront/getFrontCourseList/${page}/${limit}`,
      method:'post',
      data:searchObj
    })
  },
  getAllSubject(){
    return request({
      url:`/eduservice/subject/getAllSubject`,
      method:'get'
    })
  },
  getCourseInfoById(courseId){
    return request({
      url:`/eduservice/coursefront/getCourseFrontInfoById/${courseId}`,
      method:'get'
    })
  },
  getCourseCommentPages(courseId,page,limit){
    return request({
      url:`/eduservice/comment/getCourseCommentPages/${courseId}/${page}/${limit}`,
      method:'get'
    })
  },
  //添加评论
  addCourseComment(comment){
    return request({
      url:`/eduservice/comment/addComment`,
      method:'post',
      data:comment
    })
  },
  getUserInfo(){
    return request({
      url:`/educenter/member/getUserInfo`,
      method:'get',
    })
  },
  deleteComment(commentId){
    return request({
      url:`/eduservice/comment/deleteComment/${commentId}`,
      method:'get',
    })
  },
  getCommentAnswer(commentId,courseId){
    return request({
      url:`/eduservice/comment/getCommentAnswer/${commentId}/${courseId}`,
      method:'get'
    })
  },
}
