// 该页面生成的数据主要用于User组件页面
import Mock from 'mockjs'

// 将 url 的 ? 后的参数转化成“对象”形式
// 即params to Object
function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g,'\\"')
      .replace(/&/g,'","')
      .replace(/=/g,'":"') +
      '"}'
  )
}

let List = [        
  {
    id: 955,
    name: '王',
    addr: '北',
    age: '12',
    birth: '2010-01-25',
    sexLabel: "男"
  },
]
// const count = 200

export default {
  // 新增用户
  createUser: config => {
    const { name, addr, age, birth, sex } = JSON.parse(config.body)
    console.log(JSON.parse(config.body));
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      addr: addr,
      age: age,
      birth: birth,
      sex: sex
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  // 编辑用户信息
  updateUser: config => {
    console.log(config);
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body)
    const sex_num = parseInt(sex)
    List.some(u => {
      console.log(u);
      if(u.id === id){
        console.log('进没进来');
        u.name = name
        u.addr = addr
        u.age = age
        u.birth = birth
        u.sex = sex_num
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  },
  /**
   * 获取列表
   * 要带参数 name, page, limit; name可以不填, page, limit有默认值
   * @param name, page, limit 
   * @return {{code: number, count: number, data: *[]}} 
   */
  getUserList: config => {
    // 解构赋值语法
    const {name, page = 1, limit = 20} = param2Obj(config.url)
    console.log('name:' + name,'page:' + page, '分页大小limit:' + limit)
    const mockList = List.filter(user => {
      if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  },
  // 删除用户
  deleteUser: config => {
    const { id } = param2Obj(config.url)
    console.log(id);
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  }
}