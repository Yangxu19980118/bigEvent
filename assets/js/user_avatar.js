$(function () {
  let layer = layui.layer

  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)



  // 为上传按钮绑定点击事件
  $('#btnChoose').on('click', function () {
    // 打开文件选择框 id 比较特殊
    file.click()
  })

  // 为文件选择框绑定change 事件
  $('#file').on('change', function (e) {
    // 获取用户选择的文件
    // 为数组
    const filelist = e.target.filelist
    if (filelist.iength === 0) {
      return layer.msg('请选择照片')
    }
    // 需要转成blob格式的图片对象
    const blobUrl = URL.createObjectURL(FileList[0])
    $image  
    .cropper('destroy') // 销毁旧的裁剪区域
    .attr('src', imgURL) // 重新设置图片路径
    .cropper(options) // 重新初始化裁剪区域
  })

  $('#btnUpload').on('click',function() {
    // 截取到裁剪区域的图片
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')
      // base64格式的字符串(就是你选中的那一块图片)
    $.ajax({
      method:'PATCH',
      url:'/my/update/avatar',
      data:{
        avatar:dataURL
      },

      success(res) {
        if(res.status !== 0) {
          return layer.msg('更换头像失败')
        }
        layer.msg('更换头像成功')
        window.parent.getUserInfo()
      }
    })
  })



})