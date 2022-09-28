// 注意：每次调用$.get()或$.post()或$.ajax()的时候，
// 会先调用 ajaxPrefilter 这个函数
// 这个函数会拿到给ajax提供的配置对象

$.ajaxPrefilter(function(options) {
// 发起ajax请求之前，统一拼接请求的根路径
  options.url = 'http://big-event-api-t.itheima.net' + options.url
  console.log(options.url)
})