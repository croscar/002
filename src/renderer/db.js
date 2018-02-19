
   const Sequelize = require("sequelize");
   const mysql_db = new Sequelize("mysql://root@localhost:3306/001");
   mysql_db
     .authenticate()
     .then(() => {
       console.log("Connection has been established successfully.");
     })
     .catch(err => {
       console.error("Unable to connect to the database:", err);
     });


// const User = mysql_db.define('user', {
//     firstName: {
//       type: Sequelize.STRING
//     },
//     lastName: {
//       type: Sequelize.STRING
//     }
//   });

//   User.sync({force: false}).then(() => {
//     // Table created
//     // return User.create({
//     //   firstName: 'John',
//     //   lastName: 'Hancock'
//     // });
//   }).then(()=>User.findAll().then(users => {
//     console.log("DDDDDDDDDDDD",users)
//   }))

const Dw = mysql_db.define('dw', {
    CCM: {
        type: Sequelize.STRING(36),
        field: 'CCM',
        primaryKey: true
    },
    // id: {
    //     type: Sequelize.STRING(36),
    //     field: 'id',
    //     // primaryKey: true
    // },
    MC: {
        type: Sequelize.STRING(32),
        field: 'MC',
    }
}, {
    timestamps: false,
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 't_dw'
});
 
const Xm = mysql_db.define('xm', {
    BH: {
        type: Sequelize.STRING(36),
        field: 'bh',
        primaryKey: true
    },
    MC: {
        type: Sequelize.STRING(32),
        field: 'MC',
    },
    LX: {
        type: Sequelize.STRING(32),
        field: 'LX',
    },
    JJ: {
        type: Sequelize.STRING(96),
        field: 'JJ',
    },
    KSSJ: {
        type: Sequelize.STRING(32),
        field: 'KSSJ',
    },
    JSSJ: {
        type: Sequelize.STRING(32),
        field: 'JSSJ',
    },
    JB: {
        type: Sequelize.STRING(32),
        field: 'JB',
    },
    LY: {
        type: Sequelize.STRING(32),
        field: 'LY',
    },
    JF: {
        type: Sequelize.INTEGER,
        field: 'JF',
    }
}, {
    timestamps: false,
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 't_xm'
});

const X_Dw_Xm = mysql_db.define('x_dw_xm', {
    XMBH: {
        type: Sequelize.STRING(36),
        field: 'XMBH',
     },
    DCCM: {
        type: Sequelize.STRING(32),
        field: 'DCCM',
    },
    XMGX: {
        type: Sequelize.INTEGER,
        field: 'XMGX',
    },
}, {
    timestamps: false,
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'x_dw_xm'
});


const Zxj_Xmgx = mysql_db.define('Zxj_Xmgx', {
    DM: {
        type: Sequelize.INTEGER,
        field: 'DM',
        primaryKey: true
    },
    XMGX: {
        type: Sequelize.STRING(36),
        field: 'XMGX',
 
    },

}, {
    timestamps: false,
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'Zxj_Xmgx'
});

// console.log("-----------1",Dw)
//X_Dw_Xm.belongsTo(Xm,{foreignKey: 'CCM', targetKey: 'JJCCM'})
//X_Dw_Xm.belongsTo(Xm,{foreignKey: 'JJCCM', targetKey: 'CCM'})
X_Dw_Xm.belongsTo(Xm,{foreignKey: 'XMBH', targetKey: 'BH'})
X_Dw_Xm.belongsTo(Dw,{foreignKey: 'DCCM', targetKey: 'CCM'})
X_Dw_Xm.belongsTo(Zxj_Xmgx,{foreignKey: 'XMGX', targetKey: 'DM'})

//X_Dw_Xm.hasOne(Dw,{as:"dw", foreignKey: 'CCM' })

exports.Dw=Dw  
exports.Xm=Xm
exports.X_Dw_Xm=X_Dw_Xm
exports.Zxj_Xmgx=Zxj_Xmgx

// Dw.sync({force: false}).then(() => {
//   }).then(()=>Dw.findAll().then(aaa => {
//     console.log("dddddddd",aaa)
//   }))

