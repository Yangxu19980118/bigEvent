$(function() {
  // 定义一个查询的参数对象,将来请求数据的时候
  // 需要将请求参数对象提交到服务器
  let layer = layui.layer 
  let form = layui.form
  let  laypage = layui.laypage

  // 定义美化时间的过滤器
  template.dafaults.imports.dataFormat = function(date) {
    const dt = new Date(date)
    let y = dt.getFullYear()
    let m = (dt.getMonth()+1+'').padStart(2,'0')
    let d = (dt.getDate()+'').padStart(2,'0')
    let hh = (dt.getHours()+'').padStart(2,'0')
    let mm = (dt.getMinutes()+'').padStart(2,'0')
    let ss = (dt.getSeconds()+'').padStart(2,'0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }


  let q = {
    // 页码值,默认请求第一页的数据
    pagenum: 1,
    // 每次显示几条数据,默认每页显示2条
    pagesize: 2,
    // 文章分类的id
    cate_id:'',
    // 文章的发布状态
    state:''
  }

  initTable()
  initCate()


  // 获取文章列表数据的方法
  function initTable () {
    $.ajax({
      method:'GET',
      url:'/my/article/list',
      data:q,
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg('获取文章列表失败')
        }
        // 使用模板引擎渲染页面的数据
        let htmlStr = template('tpl-table',res)
        $('tbody').html(htmlStr)
        // 调用渲染分页的方法
        renderPage(res.total)
      }
    })
  }




  // 初始化文章分类的方法
  function initCate() {
    $.ajax({
      method:'GET',
      url:'/my/article/list',
      success:function(res) {
        if(res.status !== 0) {
          return layer.msg('获取数据失败')
        }
        // 调用模板引擎渲染分类的可选项
        let htmlStr = template('tpl-cate',res)
        $('[name=cate_id]').html(htmlStr)
        // 通过layui重新渲染表单区域的ui结构
        form.render()

      }
    })
  }

  // 为筛选表单绑定submit事件
  $('#form-search').on('submit',function(e) {
    e.preventDefault()
    // 获取表单中的选中项的值
    let cate_id = $('[name=cate_id]').val()
    let state = $('[name=state]').val()
    // 为查询参数对象  q  中对应的属性值赋值
    q.cate_id = cate_id
    q.state = state
    // 根据最新的筛选条件，重新渲染表格的数据
    initTable()

  })

  // 定义渲染分页的方法
  function renderPage(total) {
    // 调用 layui.laypage() 方法来渲染分页的结构
    laypage.render({
      // 分页容器的id
      elem:'pageBox',
      // 总数居条数
      count:total,
      // 每页显示几条数据
      limit:q.pagesize,
      // 设置默认被选中的分页
      curr:q.pagenum,
      layout:['count','limit','prev','page','next','skip'],
      limits:[1,3,5,7],
      // 分页发生切换的时候，触发jump回调
      // 触发jump回调的方式有两种
      // 1.点击页码时，回触发jump 回调
      // 2. 只要调用了laypage.render(),就会触发jump回调
      jump: function(obj,first) {
        // 通过first的值，判断触发的jump回调
        // 如果first的值为true，证明是方式2触发的
        // 否则就是1触发的v
        console.log(first)
        console.log(obj.curr)
         // 把最新的页码值，赋值到q这个查询参数对象中
        q.pagenum = obj.curr  
        // 把最新的条目数，赋值到q这个查询参数对象pagesize属性中
        q.pagesize = obj.limit
        // 根据最新的q获取对应的数据列表，并渲染表格
        if(!first){
          initTable()
        }
      }



    })
  }

  // 通过代理的形式，为删除按钮绑定点击事件处理函数
  $('tbody').on('click','.btn-delete',function() {
    // 获取删除按钮的个数
    let len = $('.btn-delete').length
    // 获取文章的id
    let id = $(this).attr('data-id')
    // 询问用户是否要删除数据
    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
      $.ajax({
        method:'GET',
        url:'/my/article/info' + id,
        success: function(res) {
          if(res.status !== 0) {
            return layer.msg('删除文章失败')
          }
          layer.msg('删除成功')

          if(len == 1) {
            // 如果len 的数值等于1,证明删除完毕之后，页面上旧没有任何数值
            // 页码值最小必须是1
            q.pagenum = q.pagenum === 1?1 : q.pagenum - 1
          }
          initTable()
        }
      })
    })
    layer.close(index)
  })
  
})