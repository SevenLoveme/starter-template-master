import request from '../utils/request'

export default {

  getPlayAuth(videoId) {
    return request({
      url: `/eduvod/video/getVideoAuthByVideoId/${videoId}`,
      method: 'get'
    })
  }

}
