// 注意：每次调用$.get()或$.post()或$.ajax()的时候，
// 会先调用 ajaxPrefilter 这个函数
// 这个函数会拿到给ajax提供的配置对象

$.ajaxPrefilter(function(options) {
  // 将key=value形式的数据，转成json格式的字符串
  const format2Json = (source) => {
    let target = {}
    source.split('&').forEach((el) => {
      let kv = el.split('=')
      target[kv[0]] = kv[1]
    })
    return JSON.stringify(target)
  }
// 发起ajax请求之前，统一拼接请求的根路径
  options.url = 'http://big-event-api-t.itheima.net' + options.url
// 统一设置请求头 Content-Type 值
  options.contentType = 'application/json'
// 统一设置请求的参数 - post 请求
  options.data =options.data &&  format2Json(options.data)
// 统一为有权限的接口，设置headers请求头
// index Of statartsWith endWith  includes includes 包含
  if(options.url.includes('/my/')) {
    options.headers = {
      Authorization:localStorage.getItem('big_news_token') || ''
      }
  }


  // 统一添加错误回调 或 complete 回调
  options.error = function(err) {
    if(
      err.responseJSON?.code === 1 &&
      err.responseJSON?.message === '身份认证失败'
    ) {
      // 进此处的话，可以认为请求有误
      localStorage.clear()
      location.href = '/login.html'
    }
  }
})