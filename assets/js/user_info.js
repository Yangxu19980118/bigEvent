$(function () {
  let form = layui.form
  let layer = layui.layer
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度在1-6字符之间'
      }
    }
  })


  // 获取用户的信息
  const Userinfo = () => {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success(res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败')
        }
        // console.log(res)
        // 调用 form.val()快速为表单赋值
        // 给表单进行回显数据
        // form.val(‘你要指定那个表单’，‘你要指定的那个值’)
        form.val('formUserInfo', res.data)
      }
    })
  }
  Userinfo()


  // 重置表单的数据
  $('#btnRest').on('click', function (e) {
    // 阻止默认行为
    e.preventDefault()
    // 重新刷新用户信息
    Userinfo()
  })


  // 监听表单的提交事件
  $('.layui-form').on('click', function (e) {
    e.preventDefault()

    // $(this).serialize() => key=value&ley=value
    // form.val('formUserInfo') => {key:value,key:value}
    // 发起ajax请求
    $.ajax({
      method: 'PUT',
      url: '/my/userinfo',
      // @=>%40进行了专一操作 （空格 =》 20%）
      data: form.val('formUserInfo'),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新信息失败')
        }
        // 刷新整体页面
          window.parent.getUserInfo()
          layer.msg('更新信息成功')
        }
      })
  })
})



