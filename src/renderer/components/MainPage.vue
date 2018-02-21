<template>
<div>
 <Row>
        <i-col span="4">
            <Tree :data="treeDataDw" @on-select-change="onTree"></Tree>
        </i-col>

        <i-col span="20">

        <Tabs value="name1">
            <TabPane label="项目" name="name1">
                <i-table v-if="showa" border stripe  :highlight-row="true" :columns="cols" :data="tbDataXm" ></i-table>
            </TabPane>
            <TabPane label="人员" name="name2">
                <i-table  v-if="showb" border stripe  :highlight-row="true" :columns="cols2" :data="tbDataRy" ></i-table>
            </TabPane>
            <TabPane label="资产" name="name3">
                <i-table v-if="showb"  border stripe  :highlight-row="true" :columns="cols3" :data="tbDataZc" ></i-table>
            </TabPane>
            <TabPane label="图表" name="name4">

              <chart :style="{width:'300px',heigh:'300px'}" :options="option1"></chart>
                    <DlgXmEdit></DlgXmEdit>
            </TabPane>
        </Tabs>

        </i-col>
    </Row>


</div>
</template>

<script>
import DlgXmEdit from './Dialogs/DlgXmEdit'

import Vue from 'vue'
import ECharts from 'vue-echarts/components/ECharts'
//require('echarts/lib/chart/line')
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

Vue.component('chart', ECharts)


// const db = require('../db.js');
import {Dw,Xm,X_Dw_Xm,Zxj_Xmgx} from '../db.js'
import {Ry,Ry_Xq,X_Ry_Dw,Zrj_MZ,Zrj_XB,Zrk_HYZK,Zrk_XL,Zrk_XW,Zrk_ZC,Zrk_ZZMM} from '../db.js'

const Sequelize = require("sequelize");

import { EADDRNOTAVAIL } from 'constants';

function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}

  export default {
    name: 'main-page',
    components: { DlgXmEdit },
    mounted() {
      this.loadTree()      
      this.loadAllXm("1")      
    },
   data () {
    let data = []
    for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
    }

      return {
        showa:true,
        showb:true,
        showc:true,
        treeDataDw:[],
        tbDataXm:[],
        tbDataRy:[],
        tbDataZc:[],
        allDw:[],
        cols:[{
          title: '单位',
          key: 'DW',
          width:120,
          sortable: true
          },{
          title: '项目关系',
          key: 'XMGX',
          width:120,
          },{
          title: '编号',
          key: 'BH',
          width:120,
          sortable: true
          },{
          title: '项目名称',
          key: 'MC',
          width:260,
          sortable: true
          },{
          title: '项目类型',
          key: 'LX',
          width:120,
          sortable: true
          },{
          title: '领域',
          key: 'LY',
          width:160,
          sortable: true
          },{
          title: '经费',
          key: 'JF',
          width:120,
          sortable: true
          },{
          title: '操作',
          render: (h, params) => {
          return h("DlgXmEdit",{attrs:{},on:{click:()=>{
                }}},["Edit"]) 
          }
          }


          
        ],
        cols2:[{
          title: 'XM',
          key: 'XM',
          width:120,
          sortable: true
          },{
          title: 'SFZH',
          key: 'SFZH',
          width:120,
          sortable: true
          },{
          title: 'XB',
          key: 'XB',
          width:120,
          sortable: true
        }],
        cols3:[{
          title: 'CCM',
          key: 'CCM',
          width:120,
          sortable: true
          },{
          title: 'CCM',
          key: 'CCM',
          width:120,
          sortable: true
        }],

        polar: {
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      },

        option1:{
          title: {
              text: '十大高耗水行业用水量八减两增',    //标题
              backgroundColor: '#ff0000',            //背景
              subtext: '同比百分比(%)',               //子标题

              textStyle: {
                fontWeight: 'normal',              //标题颜色
                color: '#408829'
              },

              x:"center"    
            },

                    tooltip: {
                        show: true
                    },
                    legend: {
                        data:['经费']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            "name":"项目",
                            "type":"bar",
                            "data":[5, 20, 40, 10, 10, 20]
                        }
                    ]
                }
        }
        },

    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      onTree(item)
      {
        // this.showa=false
        // this.showb=false
        this.loadAllXm(item[0].CCM)
        this.loadRy(item[0].CCM)
        // this.showa=true
        // this.showb=true
      },
      loadTree()
      {
          var _self = this; 

          var ltStart=(new Date()).getTime()

          var root=[];
          var newdata=[]
          this.treeDataDw.push({title:"root",CCM:"",id:"",expand: true,children:[]})
          var curdata=this.treeDataDw[0]
          var datatree=[]
          datatree.push(curdata)

          Dw.sync({force: false}).then(()=>{return Dw.findAll()}).then(aaa => {
            for(var i=0;i<aaa.length;i++)
            {
              _self.allDw.push(aaa[i])
              while (!isContains(aaa[i].CCM,curdata.CCM)){
                curdata=datatree.pop()
              }
              datatree.push(curdata)
      
              curdata.children.push({title:aaa[i].MC,CCM:aaa[i].CCM,ID:aaa[i].id,expand: true,children:[]})
              curdata=curdata.children[curdata.children.length-1]
              datatree.push(curdata)
            }

            var ltEnd=(new Date()).getTime()
            console.log("**************",ltEnd-ltStart,ltEnd,ltStart)

          })
      },
      loadAllXm(rootCcm)
      {
        var _self = this; 
        var xmStart=(new Date()).getTime()

        _self.tbDataXm.splice(0,_self.tbDataXm.length)
        _self.option1.xAxis[0].data=[]
        _self.option1.series[0].data=[]

        var curDw=_self.allDw.filter((e)=>{
        return isContains(e.CCM,rootCcm)
        })

        var ccms=[]
        for (var i=0;i<curDw.length;i++){
          ccms.push(curDw[i].CCM)
        }

         X_Dw_Xm.sync({force: false}).then(()=>{return X_Dw_Xm.findAll(
            {
                where: {
                  DCCM: {in: ccms}
                },
                include: [
                { model: Dw },
                { model: Xm },
                { model: Zxj_Xmgx }
                ]
            }
          )}).then(aaa => { 

            var xmEnd=(new Date()).getTime()
            console.log("**********1****xm",xmEnd-xmStart,xmEnd,xmStart)
            for(var j=0;j<aaa.length;j++)
             {
              var a=aaa[j].dataValues
              var b=aaa[j].xm.dataValues
              var c=aaa[j].dw.dataValues
              var d=aaa[j].Zxj_Xmgx.dataValues
               _self.tbDataXm.push({BH:a.XMBH,MC:b.MC,LX:b.LX,LY:b.LY,JF:b.JF,DW:c.MC,XMGX:d.XMGX})

              _self.option1.xAxis[0].data.push(b.MC)
              _self.option1.series[0].data.push(b.JF)
             }
            //  _self.showa=true
          })

        //console.log("======a==111111",root,_self.allDw,curDw)


        // console.log("========111",root,_self.allDw)
        // for(var i=0;i<_self.allDw.length;i++){
        //   console.log("==========11",root,_self.allDw[i].CCM)
        //   if(isContains(_self.allDw[i].CCM,root))
        //   {
        //     console.log("==============",root,_self.allDw[i].CCM)
        //     this.loadXm(_self.allDw[i].CCM)
        //   }
        // }
      },
      loadXm(ccm)
      {
          var xmStart=(new Date()).getTime()
          var _self = this; 
          X_Dw_Xm.sync({force: false}).then(()=>{return X_Dw_Xm.findAll(
            {
                where: {
                  DCCM: ccm
                },
                include: [
                {
                    model: Dw,
                    // where: { CCM: Sequelize.col('X_Dw_Xm.DCCM') }
                },{
                    model: Xm,
                    // where: { BH: Sequelize.col('X_Dw_Xm.XMBH') }
                },{
                    model: Zxj_Xmgx,
                    // where: { DM: Sequelize.col('X_Dw_Xm.XMGX') }
                }
                ]
            }
          )}).then(aaa => { 
           // console.log("----------xm",aaa)

            var xmEnd=(new Date()).getTime()
            console.log("**************xm",xmEnd-xmStart,xmEnd,xmStart)
            for(var j=0;j<aaa.length;j++)
             {
              var a=aaa[j].dataValues
              var b=aaa[j].xm.dataValues
              var c=aaa[j].dw.dataValues
              var d=aaa[j].Zxj_Xmgx.dataValues
               _self.tbDataXm.push({BH:a.XMBH,MC:b.MC,LX:b.LX,LY:b.LY,JF:b.JF,DW:c.MC,XMGX:d.XMGX})
             }

             _self.showa=true
          })
      },
      loadRy(rootCcm){
          var _self = this;   
          _self.tbDataRy.splice(0,_self.tbDataRy.length)

        var curDw=_self.allDw.filter((e)=>{
        return isContains(e.CCM,rootCcm)
        })

        var ccms=[]
        for (var i=0;i<curDw.length;i++){
          ccms.push(curDw[i].CCM)
        }
            console.log("----------ry1",rootCcm,ccms)
          X_Ry_Dw.sync({force: false}).then(()=>{return X_Ry_Dw.findAll(
            {
                where: {
                  JJCCM: {in: ccms}
                },
                include:[
                {
                    model: Ry,
                    include:[{all:true}],
                },
                 {all:true} ,
                ]
            }
          )}).then(aaa => {
            console.log("----------ry",aaa)
            for(var j=0;j<aaa.length;j++)
             {
              var a=aaa[j].Ry.dataValues
              _self.tbDataRy.push({
                XM:a.XM,
                SFZH:a.SFZH,
                XB:a.Zrj_XB.XB,
                 })

              //_self.tbDataRy.push(a)
              // var b=aaa[j].xm.dataValues
              // var c=aaa[j].dw.dataValues
              // var d=aaa[j].Zxj_Xmgx.dataValues
              // _self.tbDataXm.push({BH:a.XMBH,MC:b.MC,LX:b.LX,LY:b.LY,JF:b.JF,DW:c.MC,XMGX:d.XMGX})
             }
          })
      },
    }
  }



</script>


<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
