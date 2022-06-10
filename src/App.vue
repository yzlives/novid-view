<template>
  <div :style="{ backgroundImage: `url(${bg})` }" class="box">
    <div class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日+ {{ store.chinaAdd.localConfirmH5 }}</div>
          <div>{{ store.chinaTotal.localConfirm }}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.nowConfirm }}</div>
          <div>{{ store.chinaAdd.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.confirm }}</div>
          <div>{{ store.chinaAdd.confirm }}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.noInfect }}</div>
          <div>{{ store.chinaAdd.noInfect }}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.importedCase }}</div>
          <div>{{ store.chinaAdd.importedCase }}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.dead }}</div>
          <div>{{ store.chinaAdd.dead }}</div>
          <div>累计死亡</div>
        </section>
      </div>
      <div class="box-left-pie"></div>
      <div class="box-left-line"></div>
    </div>
    <div id="china" class="box-center"></div>
    <div style="color:white" class="box-right">
      <table id="table" cellspacing="0" border="1" width="100%">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group enter-active-class="animate__animated animate__flipInY" tag="tbody">
          <tr v-for="item in store.item" :key="item.name">
            <td align="center">{{ item.name }}</td>
            <td align="center">{{ item.today.confirm }}</td>
            <td align="center">{{ item.total.confirm }}</td>
            <td align="center">{{ item.total.heal }}</td>
            <td align="center">{{ item.total.dead }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import bg from './assets/bgc.webp'
import { onMounted } from 'vue';
import * as echarts from 'echarts'
import { useStore } from './stores'
import './assets/china.js'
import { getCoordMap } from './assets/geoMap'
import 'animate.css'
const store = useStore()

onMounted(async () => {
  await store.getList()
  initCharts()
  initPie()
  initLine()
})
// 中国地图
const initCharts = () => {
  const city = store.list.diseaseh5Shelf.areaTree[0].children;
  store.item = city[3].children
  const data = city.map(v => {
    // console.log(v.name,getCoordMap[v.name].concat(v.total.nowConfirm));
    return {
      name: v.name,
      value: getCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children
    }
  })
  const charts = echarts.init(document.querySelector('#china') as HTMLElement);
  window.addEventListener('resize', function () {
    charts.resize()
  })
  charts.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        // normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        // },
      },
      emphasis: {
        areaColor: "#0f5d9d",
      },
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            // normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
              // },
            },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 16,
        },
        itemStyle: {
          // normal: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
          // },
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        name: 'Top 5',
        type: 'scatter',
        coordinateSystem: 'geo',
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: 'pin',
        symbolSize: [45, 45],
        label: {
          // normal: {
          show: true,
          color: "#fff",
          formatter(value: any) {
            // console.log(value);
            return value.data.value[2]
          }
          // }
        },
        itemStyle: {
          // normal: {
          color: '#1880F4', //标志颜色
          // }
        },
        data: data
      },
    ],
  })

  charts.on('click', (e: any) => {
    // console.log(e);
    store.item = e.data.children
  })
}
// 饼状图
const initPie = () => {
  const charts = echarts.init(document.querySelector('.box-left-pie') as HTMLElement)
  // console.log(store.cityDetail,"===city");
  charts.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '今天新增',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: store.cityDetail.map(v => {
          // console.log(v);       
          return {
            name: v.city,
            value: v['local_confirm_add']
          }
        })
      }
    ]
  })
}
// 线性图
const initLine = () => {
  const charts = echarts.init(document.querySelector('.box-left-line') as HTMLElement)
  charts.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: 'axis'
    },
    axisLine: {
      lineStyle: {
        color: "#fff"
      }
    },
    xAxis: {
      type: 'category',
      data: store.cityDetail.map(v => v.city)
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#fff"
        }
      }
    },
    label: {
      show: true
    },
    series: [
      {
        data: store.cityDetail.map(v => v['local_wzz_add']),
        type: 'line',
        smooth: true
      }
    ]
  })
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  height: 100%;
  background-color: #28303B;
}

.box {
  height: 100%;
  padding: 5px;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
  background-position: center 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  zoom: 1;

  &-left {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    &-card {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      section {
        flex: 33.3%;
        justify-content: center;
        text-align: center;
        color: #fff;
        background-color: #223651;
        border: 1px solid #21202b;
        font-size: 15px;
        padding: 10px 0;

        div:nth-child(2) {
          color: #41b0db;
        }
      }
    }

    &-pie,
    &-line {
      padding-top: 25px;
      height: 320px;
      overflow: hidden;
    }
  }

  &-center {
    flex: 1;
  }

  &-right {
    width: 400px;
    overflow: auto;
    overflow-x: hidden;

    .table {
      width: 100%;
      background: rgba(0, 0, 1, 0.523);

      tr {
        th {
          padding: 5px;
          white-space: nowrap;
        }

        td {
          padding: 5px;
          white-space: nowrap;
        }
      }
    }
  }

}
</style>