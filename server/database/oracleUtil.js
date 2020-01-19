const objOracle = require('oracledb');

conn_string = {
    user          : "USR_ORACLE",
    password      : "oracle123",
    connectString : "localhost:1521/xe"
};

function error(err, rs, cn){
    if(err){
        console.log(err.message);
        rs.contentType('application/json').status(500);
        rs.send(err.message);
        if (cn!=null) close(cn);
        return -1;
    }else{
        return 0;
    }
}

function open(sql, binds, dml, rs){
    /*objOracle.getConnection(conn_string, (err, cn)=>{
        if(error(err, rs, null)==-1) return;
        cn.execute(sql, binds, {autoCommit: dml}, (err, result)=>{
            if(error(err, rs, cn)==-1) return;
            rs.contentType('application/json').status(200);
            if(dml){
                //rs.send(JSON.stringify(result.rowsAffected));
                obj_result = JSON.stringify(result.rowsAffected);
                //return result.rowsAffected;
            }else{
                //rs.send(JSON.stringify(result.rows));
                obj_result = JSON.stringify(result.rows);
                //return result.rows;
            }
            //console.log(obj_result);
            close(cn);
            return obj_result;
        })
    })*/
    return new Promise((res, rej)=>{
        objOracle.getConnection(conn_string)
        .then((cn)=>{
            cn.execute(sql, binds, {autoCommit: dml}).then((result)=>{
                if(dml){
                    res(SON.stringify(result.rowsAffected));
                }else{
                    res(JSON.stringify(result.rows));
                }
                close(cn);
            }).catch((err)=>{
                if(error(err, rs, cn)==-1) return;
            })
        }).catch((err)=>{
            if(error(err, rs, null)==-1) return;
        })
    })
}

function close(cn){
    cn.release(
        function(err){
            if(err) {console.log(err.message);}
        }
    );
}

module.exports = {
    open,
    close
}