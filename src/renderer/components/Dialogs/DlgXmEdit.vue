<template>
<div>
    <Button type="primary" @click="modal1 = true">编辑</Button>
        
    <Modal
        v-model="modal1"
        title="项目信息"
        @on-ok="ok"
        @on-cancel="cancel">
    <Row>
        <i-col span="4">

        </i-col>
        <i-col span="20">
        <row>
          项目编号：{{row.BH}}
        </row>  
        <row>
          项目名称：<input v-model="row.MC">
        </row>  
        <row>
          项目类型：<input v-model="row.LX">
          <!-- <Select v-model="row.LX" style="width:200px">  </Select>
                          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
          
        </row>  
        <row>
          项目领域：<input v-model="row.LY">
        </row>  
        </i-col>
    </Row>

    </Modal>
</div>
</template>

<script>

import {Dw,Xm,X_Dw_Xm,Zxj_Xmgx} from '../../db.js'

const Sequelize = require("sequelize");

function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}

  export default {
    name: 'DlgXmEdit',

    props: {
      BH: String
    },

    mounted() {
        var _self=this

        Xm.sync({force: false}).then(()=>{return Xm.findOne(
            {
                where: {
                  BH: _self.BH
                },
                include: [
                // { model: Dw },
                // { model: Xm },
                // { model: Zxj_Xmgx }
                ]
            }
          )}).then(aaa => { 

              _self.MC=aaa.dataValues.MC
              _self.LX=aaa.dataValues.LX
              _self.LY=aaa.dataValues.LY  

              _self.row=aaa

            // var xmEnd=(new Date()).getTime()
            // console.log("**********1****xm",xmEnd-xmStart,xmEnd,xmStart)
            // for(var j=0;j<aaa.length;j++)
            //  {
            //   var a=aaa[j].dataValues
            //   var b=aaa[j].xm.dataValues
            //   var c=aaa[j].dw.dataValues
            //   var d=aaa[j].Zxj_Xmgx.dataValues
            //    _self.tbDataXm.push({BH:a.XMBH,MC:b.MC,LX:b.LX,LY:b.LY,JF:b.JF,DW:c.MC,XMGX:d.XMGX})

            //   _self.option1.xAxis[0].data.push(b.MC)
            //   _self.option1.series[0].data.push(b.JF)
            //  }
            //  _self.showa=true
          })


    },

    data () {
      return {
        row:{},
        MC:"MC",
        LX:"LX",
        LY:'LY',
        modal1:false,
        }
    },

    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
            ok () {
              var _self=this

              //  Xm.update(_self.row,{'where':{'BH':{eq:_self.row.BH}}})
              console.log("**********2****xm",_self.row,_self.row.save)
              _self.row.save().then(()=>{
                this.$Message.info('save ok');
              })

            },
            cancel () {
                this.$Message.info('edit cancel');
            }
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
