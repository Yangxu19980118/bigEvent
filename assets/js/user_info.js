$(function() {
  let form = layui.form
  let layer = layui.layer
  form.verify({
    nickname:function(value) {
      if(value.length > 6) {
        return '昵称长度在1-6字符之间'
      }
    }
  })

  Userinfo()

  // 初始化用户的信息
  function Userinfo() {
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success:function(res) {
        if(res.status !== 0) {
          return layer.msg('获取用户信息失败')
        }
        console.log(res)
        // 调用 form.val()快速为表单赋值
        form.val('formUserInfo',res.data)
      }
    })
  }

  // 重置表单的数据
  $('#btnRest').on('click',function(e) {
    e.preventDefault()
    Userinfo()
  })

  // 监听表单的提交事件
  $('.layui-form').on('click',function(e) {
    e.preventDefault()
    // 发起ajax请求
    $.ajax({
      method:'POST',
      url:'/my/userinfo',
      data:$(this).serialize(),
      success:function(res) {
        if(res.status !== 0) {
          return layer.msg('更新信息失败')
        }
        layer.msg('更新信息成功')
        // 调用父页面中的方法，重新渲染头像和用户信息
const getUserInfo = () => {
        window.parent.getUserInfo()
      }
    })
  })
})