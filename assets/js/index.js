let layer = layui.layer

$(function(){
  // 调用函数
  getUserInfo()
})

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url:'/my/userinfo',
    success(res) {
      if(res.code !== 0) return layer.msg(res.message)
      // 按需渲染头像
      renderArr(res)
    },
    // // 不论成功还是失败，最终都会调用 complete 回调函数
    // // complete:function(res) {
    // //   if(res.responseJSON.status === 1 && res.responseJSON.message === '认证失败') {
    // //     localStorage.removeItem('token')
    // //     location.href = '/login.html'
    // //   }

    // }
  })
}

const renderArr =(res) => {
  if(res.user_pic) {
    $('.text_avatar').hide()
    $('.user-box img').attr('src',res.user_pic).show()
  }else {
    $('.layui-nav-img').hide()
    const name = res.data.nickname || res.data.username
    const char = name[0].toUpperCase()
    $('.text_avatar').css('display','flex').html(char).show()
  }
  $('.text').html(`欢迎&nbsp;&nbsp;${res.data.username}`)
}

// // function renderArr(user) {
// //   // 获取用户名称
// //   let name = user.nickname || user.username
// //   // 设置欢迎的文本
// //   $('#welcome').html('欢迎&nbsp;&nbsp;'+ name)
// //   // 按需渲染用户的头像
// //   if(user.user_pic !== null) {
// //   // 渲染图片头像
// //   $('.layui-nav-img').attr('src',user.user_pic).show()
// //   $('.text-avatar').hide()
// //   }else {
// //     // 渲染文本头像
// //     $('.layui-nav-img').hide()
// //     let first = name[0].toUpperCase()
// //     $('.text-avatar').html(first).show()
//   }
// }

$('#btnLogout').on('click',function() {
  layer.confirm(
    '确定要退出吗',
    {icon:3,title:'提示'},
    function(index) {
      localStorage.removeItem('big_news_token')
      localStorage.href = '/login.html'
      layer.close(index)
    }
  )
})