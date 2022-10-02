$(function() {
  // 从layui 中 获取 form 表单
  const form = layui.form
  const layer= layui.layer
  // 注册账号
    $('#go2Reg').on('click',function() {
      $('.login-wrap').hide()
      $('.reg-wrap').show()
    })
  // 登录账号
    $('#go2Login').on('click',function() {
      $('.reg-wrap').hide()
      $('.login-wrap').show()
    })

  
  // 通过form.verify函数自定义校验规则
  form.verify({
    // 自定义一个叫pwd的校验规则
    pwd: [/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'
    ],


    // 检验两次密码是否一致
    repwd:function(value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息
    if($('#password').val() !== value) {
      return '密码不一致'
    }
    }
  })


  // 监听表单注册提交事件
  $('#formReg').on('submit',function(e) {
    e.preventDefault()
    // 发起ajax的POST请求
    $.ajax({
      method:'POST',
      url:'/api/reg',
      // 快速获取表单中的数据
      // data:JSON.stringify({
      //   username:$('#form_reg [name=username]').val(),
      //   password:$('#form_reg [name=password]').val()
      // }),
      data:format2Json($(this).serialize()),
      success(res) {
        if(res.code !== 0) return layer.msg(res.message)
        $('#go2Login').click()
        layer.msg('成功')
      }
    })

  })

  // // 监听登陆表单的提交事件
  $('#formLogin').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/api/login',
      // 快速获取表单中的数据
      // data:JSON.stringify({
      //   username:$('#form_reg [name=username]').val(),
      //   password:$('#form_reg [name=password]').val()
      // }),
      data:$(this).serialize(),
      success(res) {
        if(res.code !== 0) return layer(res.message)
        localStorage.setItem('big_news_token',res.token)
        location.href = '/home.html'
      }
    })
  })  
})