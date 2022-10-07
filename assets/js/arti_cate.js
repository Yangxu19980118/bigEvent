$(function () {
  let layer = layui.layer
  let form = layui.form

  initArCateList()

  // 获取文章分类的列表
  function initArCateList() {
    $.ajax({
      method: 'GET',
      URL: '/my/cate/list',
      success: function (res) {
        let htmlStr = template('tpl-table', res)
        $('tbody').empty().html(htmlStr)
      }
    })
  }

  // 为添加类别按钮添加点击事件
  let indexAdd = null
  $('#btnAddCate').on('click', function () {
    // 打开弹窗
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialogAdd').html()
    })
  })

  let isEdit = false
  // 通过代理的形式，为form-add表单绑定 submit 事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    if (isEdit) {
      $.ajax({
        method: 'PUT',
        url: '/my/cate/info',
        data: $(this).serialize(),
        success(res) {
          if (res.status !== 0) return layer.msg('新增失败')
          layer.msg('新增成功')
          // 列表重新刷新
           initArCateList()
        }
      })
    } else {
      $.ajax({
        method: 'POST',
        url: '/my/cate/add',
        data: $(this).serialize(),
        success(res) {
          if (res.status !== 0) return layer.msg('新增失败')
          layer.msg('新增成功')
          // 列表重新刷新
           initArCateList()
        }
      })
    }

    isEdit = false
    // 根据索引，关闭对应的弹出层
    layer.close(indexAdd)
    

  })

  // 通过代理的形式，为 btn-edit 按钮绑定点击事件
  $('tbody').on('click', '.btn-Edit', function () {
    isEdit = true
    // $(this).attr('data-id')
    // 弹出一个修改文章分类信息的层
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类名称',
      content: $('#dialog-edit').html()
    })
  })


  const id = $(this).attr('data-id')
  // 需要回显表单
  $.ajax({
    method: 'GET',
    url: `/my/cate/info?id=${id}`,
    success(res) {
      if (res.code !== 0) return layer.msg('获取分类详情失败')
      // 快速为表单进行赋值
      form.val('form-edit', res.data)
    }
  })


  // 通过代理的形式,为删除按钮绑定点击事件
  $('tbody').on('click', '.btn-delete', function () {
    const result = confirm('确定要删除该分类吗？')
    let id = $(this).attr('data-id')
    // 提示用户是否要删除
    //eg1
    if(result) {
      $.ajax({
        metnod: 'DELETE',
        url: `/my/cate/del?id=${id}`,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除失败')
          }
          layer.msg('删除成功')
          initArCateList()
        }
      })
    }
  })
})