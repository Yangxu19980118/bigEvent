$(function() {
  const form = layui.form

  form.verify({
    pwd:[
      /^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
    samePwd:function(value) {
      if(value === $('[name=old_Pwd]').val()
      ) {
        return '新旧密码不能相同'
      }
    },
    rePwd: function (value) {
      if(value !== $('[name=new_Pwd]').val())
      {
        return ('两次密码不一致')
      }
    }
  })

  
  $('.layui-form').on('submit',function(e) {
    e.preventDefault()
    $.ajax({
      method:'PATCH',
      url:'/my/updatepwd',
      data:$(this).serialize(),
      success:function(res) {
        if(res.status !== 0) {
          return layui.layer.msg('更新失败')
        }
        layer.msg('更新成功')
        // 重置表单
        // $('#btnRest').click 调用 type = 'reset' 按钮
        // 清空表单
        $('.layui-form')[0].reset()
      }
    })
  })






})