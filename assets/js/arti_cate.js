$(function(){
 let  layer = layui.layer
 let form = layui.form

  initArCateList()

  // 获取文章分类的列表
  function initArCateList() {
    $.ajax({
      method:'GET',
      URL:'/my/cate/list',
      success:function(res) {
        let htmlStr = template('tpl-table',res)
        $('tbody').html(htmlStr)
      }
    })
  }



  // 为添加类别按钮添加点击事件
  let indexAdd = null
  $('#btnAddCate').on('click',function() {
    indexAdd = layer.open({
      type:1,
      area:['500px','250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
  })


  // 通过代理的形式，为form-add表单绑定 submit 事件
  $('body').on('submit','#form-add',function(e) {
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/my/article/add',
      data:$(this).serialize(),
      success:function(res) {
        if(res.status !== 0) {
          return layer.msg('新增失败')
        }
        initArCateList()
        layer.msg('新增成功')

        // 根据索引，关闭对应的弹出层
        layer.close(indexAdd)
      }
    })
  })

  // 通过代理的形式，为 btn-edit 按钮绑定点击事件
  let indexEdit = null
  $('tbody').on('click','.btn-edit',function() {
    // 弹出一个修改文章分类信息的层
    indexEdit = layer.open({
      type:1,
      area:['500px','250px'],
      title: '添加文章分类',
      content: $('#dialog-edit').html()
    })
  })



  let id = $(this).attr('data-id')
  // 发起请求获取对应的分类的数据
  $.ajax({
    method:'GET',
    url:'/my/article/info'+ id,
    success: function(res) {
      form.val('form-edit',res.data)
    }
  })



  // 通过代理的形式,为修改分类的表单绑定submit事件
  $('body').on('submit','#form-edit',function(e) {
    e.preventDefault()
    $.ajax({
      method:'POST',
      URL:'/my/article/add',
      data:$(this).serialize(),
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg('更新失败')
        }
        layer.msg('更新成功')
        layer.close(indexEdit)
        initArCateList()
      }
    })
  })


  // 通过代理的形式,为删除按钮绑定点击事件
  $('tbody').on('click','.btn-delete',function() {
    let id = $(this).attr('data-id')
    // 提示用户是否要删除
    //eg1
    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
      $.ajax({
        metnod:'GET',
        url:'/my/cate/del'+id,
        success:function(res) {
          if(res.status !==0 ) {
            return layer.msg('删除失败')
          } 
          layer.msg('删除成功')
          layer.close(index)
          initArCateList( )
        }
      })
    })
  })
})