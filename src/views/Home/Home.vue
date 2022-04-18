<template>
  <div class="home-container">
    <el-row class="home" :gutter="20">
      <el-col :span="8" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2020-7-19</span></p>
            <p>上次登录地点：<span>广东</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px; height: 460px" class="tableShow">
          <el-table :data="tableData" style="width: 100%">
            <!-- 在键值对的情况下，index即是 键key -->
            <el-table-column
              v-for="(val, index) in tableLabel"
              :key="index"
              :prop="index"
              :label="val"
              width="120"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="margin-top: 20px">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 ,height: '80px'}"
          >
          <i class="icon" :class="`el-icon-${item.icon}`"
          :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <div class="rowGraph">
          <el-card style="height: 280px" class="lineChart">
            <div style="height: 280px" ref="lineChart"></div>
          </el-card>
        </div>
        <div class="graph">
          <!-- 柱状图 -->
          <el-card style="height: 260px" class="barChart">
            <div style="height: 260px" ref="barChart"></div>
          </el-card>
          <!-- 饼图 -->
          <el-card style="height: 260px" class="pieChart">
            <div style="height: 260px" ref="pieChart"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getData} from '../../api/data.js'
import * as echarts from 'echarts'

export default {
  name: "myHome",
  data() {
    return {
      userImg: require("../../assets/images/ldh.png"),
      // 表格数据
      tableData: [
        {
          todayBuy: 100,
          name: "oppo",
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          todayBuy: 100,
          name: "vivo",
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          todayBuy: 100,
          name: "苹果",
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          todayBuy: 100,
          name: "华为",
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          todayBuy: 100,
          name: "小米",
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          todayBuy: 100,
          name: "一加",
          monthBuy: 300,
          totalBuy: 800,
          id: 6,
        },
      ],
      tableLabel: {
        name: "品牌",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 1234,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 1234,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then((res) => {
      const { code , data} = res.data
      // 判断接口状态，使用 echarts 渲染。
      if (code === 20000) {
        // 折线图
        {
               
          const order = data.orderData
          // 日期，作为 X 轴
          const xData = order.date
          // Object.keys() 传入对象，返回对象的 key 值
          // keyArray同时也是品类数组，作为 Y 轴使用。
          const keyArray = Object.keys(order.data[0])
          // 利用 key 值 和 forEach，map方法，将数据重新整理成新的格式
          const series = []
          keyArray.forEach(key => {
            series.push({
              name: key,
              data: order.data.map(function(item) {return item[key]}),
              type: "line"
            })
          })

          const lineOption = {
            title: {
              text: '手机品牌一周销量趋势',
              left: 'center'
            },
            xAxis: {
              type: 'category',
              data: xData
            },
            yAxis: {
              type: 'value',
            },
            // 图例
            legend: {
              data: keyArray,
              right: 'right'
            },
            series: series
          };
          var lineChart = echarts.init(this.$refs.lineChart);
          lineOption && lineChart.setOption(lineOption);
        }
        // 柱状图
        { 
          const barOption = {
             xAxis: {
              type: 'category',
              data: data.userData.map(item => item.date)
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '新增用户',
                data: data.userData.map(item => item.new),
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
                }
              },
              {
                name: '活跃用户',
                data: data.userData.map(item => item.active),
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
                }
              }
            ]
          }
          var barChart = echarts.init(this.$refs.barChart);
          barOption && barChart.setOption(barOption);
        }
        // 饼图
        { 
          const pie = data.videoData
          const pieSeries = [{
            // name: 'Access From',
            type: "pie",
            radius: '50%',
            data: pie,
            label: {
              //  字符串模板 模板变量有：
              //  {a}：系列名。  {b}：数据名。  {c}：数据值。
              //  {@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。
              //  {@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。
              formatter: '{b} {d}%'}
          }]
          
          const pieOption = {
            title: {
              text: '手机品牌市场份额占比',
              subtext: 'Fake Data',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
            },
            series: pieSeries
          };
          var pieChart = echarts.init(this.$refs.pieChart);
          pieOption && pieChart.setOption(pieOption);
        }

      }
    })
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  justify-content: left;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 3px solid #eee;
  img {
    height: 144px;
    width: 144px;
    // cover 适应大小
    object-fit: cover;
    border-radius: 50%;
  }
  // 用户信息
  p {
    margin: 5px 0;
  }
  .userinfo {
    margin-left: 16px;
    // 用户名
    .name {
      font-size: 24px;
      font-weight: 700;
    }
    // 用户权限
    .access {
      font-size: 14px;
      color: #ccc;
    }
  }
}
.num {
  // display: flex;
  /deep/ .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
    display: inline-block;
    width: 30%;
    box-sizing: border-box;
    margin: 8px
    }
  // icon 样式
  i {
    width: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
  }
  p {
    margin: 8% 0 5% 5%;
    min-width: 120px;
    width: 100%;
  }
  // 数字大小
  .num {
    font-size: 24px;
  }
  .txt {
    color: #bbb;
  }
}
.graph {
  display: flex;
  .el-card {
    margin-top: 20px;
    flex: 1;
    /deep/ .el-card__body {
      padding: 0;
    }
  }
  .pieChart {
    margin-left: 20px;
    padding-top: 10px;
    box-sizing: border-box;
  }
}
</style>
