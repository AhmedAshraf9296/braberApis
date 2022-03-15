
const config  = {
    type : 'mssql',
    user : 'sa',
    password : '123',
    server: '192.168.2.124',
    database: 'LLbarber',
    options:{
        trustedConnection: true,
        enableArithAbort : true,
        cryptoCredentialsDetails:{ minVersion: 'TLSv1'},
        trustServerCertificate: true,
        //encrypt:false,
        instancename : 'MSSQLSERVER'
    },
    port : 1433
}

module.exports = config;