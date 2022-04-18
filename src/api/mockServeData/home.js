// 该页面生成的数据主要用于Home组件页面
import Mock from 'mockjs'

let List = []
export default {
  getStatisticalData: () => {
    // mock.Random.float 产生随机数100到8000之间，保留小数最小0位，最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          苹果: Mock.Random.float(100, 8000, 0, 0),
          vivo: Mock.Random.float(100, 8000, 0, 0),
          oppo: Mock.Random.float(100, 8000, 0, 0),
          魅族: Mock.Random.float(100, 8000, 0, 0),
          三星: Mock.Random.float(100, 8000, 0, 0),
          小米: Mock.Random.float(100, 8000, 0, 0),
        })
      )
    }
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
            {
              name: "苹果",
              value: 6999
            },
            {
              name: "vivo",
              value: 1999
            },
            {
              name: "oppo",
              value: 1899
            },
            {
              name: "魅族",
              value: 2599
            },
            {
              name: "三星",
              value: 4999
            },
            {
              name: "小米",
              value: 2999
            }
        ],
        // 柱状图
        userData: [
          {
            date: '周一',
            new: 5,
            active: 200
          },
          {
            date: '周二',
            new: 5,
            active:500
          },
          {
            date: '周三',
            new: 5,
            active: 770
          },
          {
            date: '周四',
            new: 5,
            active: 200
          },
          {
            date: '周五',
            new: 60,
            active: 550
          },          {
            date: '周六',
            new: 65,
            active: 500
          },
          {
            date: '周日',
            new: 63,
            active: 800
          },
        ]
        ,
        // 折线图
        orderData: {
          date: ['20191001','20191002','20191003','20191004','20191005','20191006','20191007',],
          data: List
        }
      }

    }
  }
}