<template>
<div>
 <Row>

        <i-col span="4">
            <Tree :data="myData" @on-select-change="onTree"></Tree>
        </i-col>
        <i-col span="20">
                <i-table border stripe  :highlight-row="true" :columns="cols" :data="tableData" ></i-table>
        </i-col>
    </Row>

</div>
</template>
<script>

// const db = require('../db.js');
import {Dw,Xm,X_Dw_Xm,Zxj_Xmgx} from '../db.js'
   const Sequelize = require("sequelize");

import { EADDRNOTAVAIL } from 'constants';

function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}

  export default {
    name: 'main-page',
    mounted() {
      this.loadTree()      

      this.loadTables("1")      

    },
   data () {
      return {
        myData:[],
        tableData:[],
        allDw:[],
        cols:[{
          title: 'CCM',
          key: 'CCM',
          width:120,
          sortable: true
          },{
          title: 'XMGX',
          key: 'XMGX',
          width:120,
          },{
          title: 'BH',
          key: 'BH',
          width:120,
          sortable: true
          },{
          title: 'MC',
          key: 'MC',
          width:260,
          sortable: true
          },{
          title: 'LX',
          key: 'LX',
          width:120,
          sortable: true
          },{
          title: 'LY',
          key: 'LY',
          width:160,
          sortable: true
          },{
          title: 'JF',
          key: 'JF',
          width:120,
          sortable: true
          }
        ]
            }
        },

    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      onTree(item)
      {
        this.loadTables(item[0].CCM)
      },
      loadTree()
      {
        var _self = this; 
          var root=[];
          var newdata=[]
          this.myData.push({title:"root",CCM:"",id:"",children:[]})
          var curdata=this.myData[0]
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
      
              curdata.children.push({title:aaa[i].MC,CCM:aaa[i].CCM,ID:aaa[i].id,children:[]})
              curdata=curdata.children[curdata.children.length-1]
              datatree.push(curdata)
            }
          })
      },
      loadTables(root)
      {
        var _self = this; 
        _self.tableData.splice(0,_self.tableData.length)
        console.log("========111",root,_self.allDw)
        for(var i=0;i<_self.allDw.length;i++)
        {

          console.log("==========11",root,_self.allDw[i].CCM)
          if(isContains(_self.allDw[i].CCM,root))
          {
            console.log("==============",root,_self.allDw[i].CCM)
            this.loadTable(_self.allDw[i].CCM)
          }
        }
 
      },
      loadTable(ccm)
      {
          var _self = this; 
      //     Xm.sync({force: false}).then(()=>{return Xm.findAll()}).then(aaa => {
      //  //     console.log("----------a",aaa)
      //       for(var j=0;j<aaa.length;j++)
      //       {
      //     //      _self.tableData.push(aaa[j].dataValues)
      //       }
      //    //               console.log("----------a",_self.tableData)
      //     })

          X_Dw_Xm.sync({force: false}).then(()=>{return X_Dw_Xm.findAll(
            {
                where: {
                  DCCM: ccm
                },
                include: [
                {
                    model: Dw,
                    where: { CCM: Sequelize.col('X_Dw_Xm.DCCM') }
                },
                {
                    model: Xm,
                    where: { BH: Sequelize.col('X_Dw_Xm.XMBH') }
                },
                {
                    model: Zxj_Xmgx,
                    where: { DM: Sequelize.col('X_Dw_Xm.XMGX') }
                }
                ]
            }
          )}).then(aaa => {
            console.log("----------aaa",aaa)
            for(var j=0;j<aaa.length;j++)
             {
              var a=aaa[j].dataValues
              var b=aaa[j].xm.dataValues
              var c=aaa[j].dw.dataValues
              var d=aaa[j].Zxj_Xmgx.dataValues
              _self.tableData.push({BH:a.XMBH,MC:b.MC,LX:b.LX,LY:b.LY,JF:b.JF,CCM:c.MC,XMGX:d.XMGX})
             }
          })
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
