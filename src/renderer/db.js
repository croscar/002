
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



const Ry = mysql_db.define('Ry', {
    SFZH: {
        type: Sequelize.STRING(36),
        field: 'SFZH',
        primaryKey: true
    },
    XM: {
        type: Sequelize.STRING(36),
        field: 'XM',
    },
    XB: {
        type: Sequelize.INTEGER,
        field: 'XB',
    },
    CSNY: {
        type: Sequelize.STRING(36),
        field: 'CSNY',
    },
    JG: {
        type: Sequelize.STRING(36),
        field: 'JG',
    },
    MZ: {
        type: Sequelize.STRING(36),
        field: 'MZ',
    },
    ZP: {
        type: Sequelize.STRING(36),
        field: 'ZP',
    },
    BZ: {
        type: Sequelize.STRING(36),
        field: 'BZ',
    },
}, {
    timestamps: false,
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 't_Ry'
});

const Ry_Xq = mysql_db.define('Ry_Xq', {
    SFZH: {
        type: Sequelize.STRING(36),
        field: 'SFZH',
        primaryKey: true
    },
    HYZK: {
        type: Sequelize.STRING(36),
        field: 'HYZK',
    },
    ZZMM: {
        type: Sequelize.STRING(36),
        field: 'ZZMM',
    },
    ZC: {
        type: Sequelize.STRING(36),
        field: 'SFZH',
    },
    XL: {
        type: Sequelize.STRING(36),
        field: 'XL',
    },
    XW: {
        type: Sequelize.STRING(36),
        field: 'XW',
    },
    JTCY: {
        type: Sequelize.STRING(36),
        field: 'JTCY',
    },
    LXFS: {
        type: Sequelize.STRING(36),
        field: 'LXFS',
    },
    JTZZ: {
        type: Sequelize.STRING(36),
        field: 'JTZZ',
    },
    SJYJL: {
        type: Sequelize.STRING(36),
        field: 'SJYJL',
    },
    JCQK: {
        type: Sequelize.STRING(36),
        field: 'JCQK',
    },
    XQAH: {
        type: Sequelize.STRING(36),
        field: 'XQAH',
    },
    ZYCG: {
        type: Sequelize.STRING(36),
        field: 'ZYCG',
    },
    BZ: {
        type: Sequelize.STRING(36),
        field: 'BZ',
    },

}, {
    timestamps: false,
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'T_Ry_xq'
});

const Zrj_MZ = mysql_db.define('Zrj_MZ', {
    DM: {
        type: Sequelize.STRING(36),
        field: 'DM',
        primaryKey: true
    },
    MZ: {
        type: Sequelize.STRING(36),
        field: 'MZ',
    },
}, {
    timestamps: false,
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'Zrj_MZ'
});

const Zrj_XB = mysql_db.define('Zrj_XB', {
    DM: {
        type: Sequelize.STRING(36),
        field: 'DM',
        primaryKey: true
    },
    XB: {
        type: Sequelize.STRING(36),
        field: 'XB',
    },
}, {
    timestamps: false,
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'Zrj_XB'
}); 

const Zrk_HYZK = mysql_db.define('Zrk_HYZK', {
    DM: {
        type: Sequelize.STRING(36),
        field: 'DM',
        primaryKey: true
    },
    HYZK: {
        type: Sequelize.STRING(36),
        field: 'HYZK',
    },
}, {
    timestamps: false,
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'Zrk_HYZK'
});

const Zrk_XL = mysql_db.define('Zrk_XL', {
    DM: {
        type: Sequelize.STRING(36),
        field: 'DM',
        primaryKey: true
    },
    XL: {
        type: Sequelize.STRING(36),
        field: 'XL',
    },
}, {
    timestamps: false,
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'Zrk_XL'
});

const Zrk_XW = mysql_db.define('Zrk_XW', {
    DM: {
        type: Sequelize.STRING(36),
        field: 'DM',
        primaryKey: true
    },
    XW: {
        type: Sequelize.STRING(36),
        field: 'XW',
    },
}, {
    timestamps: false,
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'Zrk_XW'
});

const Zrk_ZC = mysql_db.define('Zrk_ZC', {
    DM: {
        type: Sequelize.STRING(36),
        field: 'DM',
        primaryKey: true
    },
    ZC: {
        type: Sequelize.STRING(36),
        field: 'ZC',
    },
}, {
    timestamps: false,
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'Zrk_ZC'
});

const Zrk_ZZMM = mysql_db.define('Zrk_ZZMM', {
    DM: {
        type: Sequelize.STRING(36),
        field: 'DM',
        primaryKey: true
    },
    ZZMM: {
        type: Sequelize.STRING(36),
        field: 'ZZMM',
    },
}, {
    timestamps: false,
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'Zrk_ZZMM'
});

Ry.belongsTo(Zrj_XB,{foreignKey: 'XB', targetKey: 'DM'})
Ry.belongsTo(Zrj_MZ,{foreignKey: 'MZ', targetKey: 'DM'})
Ry.hasOne(Ry_Xq,{foreignKey: 'SFZH', targetKey: 'SFZH'})
//Ry.belongsTo(Zrj_JG,{foreignKey: 'JG', targetKey: 'DM'})

// Ry.belongsTo(Ry_Xq,{foreignKey: 'SFZH', targetKey: 'SFZH'})
//Ry_Xq.belongsTo(Ry,{foreignKey: 'SFZH', targetKey: 'SFZH'})

Ry_Xq.belongsTo(Zrk_XL,{foreignKey: 'XL', targetKey: 'DM'})
Ry_Xq.belongsTo(Zrk_XW,{foreignKey: 'XW', targetKey: 'DM'})
Ry_Xq.belongsTo(Zrk_ZC,{foreignKey: 'ZC', targetKey: 'DM'})
Ry_Xq.belongsTo(Zrk_ZZMM,{foreignKey: 'ZZMM', targetKey: 'DM'})
Ry_Xq.belongsTo(Zrk_HYZK,{foreignKey: 'HYZK', targetKey: 'DM'})



const X_Ry_Dw = mysql_db.define('X_Ry_Dw', {
    AUID: {
        type: Sequelize.INTEGER,
        field: 'AUID',
        primaryKey: true
    },
    SFZH: {
        type: Sequelize.STRING(36),
        field: 'SFZH',
    },
    JJCCM: {
        type: Sequelize.STRING(36),
        field: 'JJCCM',
    },
}, {
    timestamps: false,
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'X_Ry_Dw'
});

X_Ry_Dw.belongsTo(Ry,{foreignKey: 'SFZH', targetKey: 'SFZH'})
X_Ry_Dw.belongsTo(Dw,{foreignKey: 'JJCCM', targetKey: 'CCM'})

exports.Dw=Dw  
exports.Xm=Xm
exports.X_Dw_Xm=X_Dw_Xm
exports.Zxj_Xmgx=Zxj_Xmgx

exports.Ry=Ry
exports.Ry_Xq=Ry_Xq
exports.X_Ry_Dw=X_Ry_Dw

exports.Zrj_MZ=Zrj_MZ
exports.Zrj_XB=Zrj_XB
exports.Zrk_HYZK=Zrk_HYZK
exports.Zrk_XL=Zrk_XL
exports.Zrk_XW=Zrk_XW
exports.Zrk_ZC=Zrk_ZC
exports.Zrk_ZZMM=Zrk_ZZMM



// Dw.sync({force: false}).then(() => {
//   }).then(()=>Dw.findAll().then(aaa => {
//     console.log("dddddddd",aaa)
//   }))

