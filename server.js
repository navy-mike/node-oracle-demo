
let connection;
var oracledb = require('oracledb');
oracledb.lobPrefetchSize = 65536; //0=no limit to number of rows fetched
oracledb.maxRows = 0; //0=no limit

console.log("Oracle client library version number is " + oracledb.oracleClientVersionString)
//db1.world = "(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (COMMUNITY = tcp.world)(PROTOCOL = TCP)(Host = ucdb1)(Port = 1521)) (ADDRESS = ////(COMMUNITY = tcp.world)(PROTOCOL = TCP)(Host = ucdb1)(Port = 1526)))(CONNECT_DATA = (SID = ORCL)))"

config = {
  user: 'bikes',
  password: 'chain',
  connstring: 'db1.world'
}

//var tdate = new Date()
//var startms = tdate.getMilliseconds();
//non-pooled connection
async function runnp() {
  let connection;
  try 
  {
    connection = await oracledb.getConnection({
      user: config.user,
      password: config.password,
      connectString: config.connstring
    });
    // console.log("Successfully connected to Oracle!")
    // console.log(connection)
   let result = await connection.execute('SELECT userid, lsaname from bikes_users');
    console.log(result.rows);
    var tedate = new Date()
    var endms = tedate.getMilliseconds();
    console.log(endms - startms)
  } catch (err) 
  {
    console.error(err);
  } finally 
  {
    if (connection) 
    {
      try 
      {
        await connection.close();
      } catch (err) 
      {
        console.error(err);
      }
    }
  }
}

//pooled connections
async function runp() {
  let pool;
  
  let connection;
  try 
  {
    pool = await oracledb.createPool({
      user: "bikes",
      password: "chain",
      connectString: "db1.world"
    });

    connection = await pool.getConnection()
    // console.log("Successfully connected to Oracle!")
    // console.log(connection)
    let result = await connection.execute('SELECT userid, lsaname from bikes_users');
    console.log(result.rows);
    var tedate = new Date()
    var endms = tedate.getMilliseconds();
    console.log(endms - startms)

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function runnp_withparm() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "bikes",
      password: 'chain',
      connectString: "db1.world"
    });
    // console.log("Successfully connected to Oracle!")
    // console.log(connection)
    var userid = 1
    var userids = [1]
    let result = await connection.execute('SELECT userid, lsaname from bikes_users WHERE userid = :id', userids);
    console.log(result.rows);
    //var tedate = new Date()
    //var endms = tedate.getMilliseconds();
    //console.log(endms - startms)
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}


//runnp(); //run non-pooled version of run
//runp(); //run pooled version of run
runnp_withparm();



/* Connection {
  tag: '',
  callTimeout: 0,
  oracleServerVersionString: '12.2.0.1.0',
  oracleServerVersion: 1202000100,
  action: null,
  module: null,
  clientId: null,
  stmtCacheSize: 30,
  setMaxListeners: [Function: setMaxListeners],
  getMaxListeners: [Function: getMaxListeners],
  emit: [Function: emit],
  addListener: [Function: addListener],
  on: [Function: addListener],
  prependListener: [Function: prependListener],
  once: [Function: once],
  prependOnceListener: [Function: prependOnceListener],
  removeListener: [Function: removeListener],
  off: [Function: removeListener],
  removeAllListeners: [Function: removeAllListeners],
  listeners: [Function: listeners],
  rawListeners: [Function: rawListeners],
  listenerCount: [Function: listenerCount],
  eventNames: [Function: eventNames],
  _events: [Object: null prototype] {},
  _eventsCount: 0,
  _maxListeners: undefined,
  getStatementInfo: [Function],
  queryStream: [Function: queryStream],
  execute: [Function],
  executeMany: [Function],
  commit: [Function],
  createLob: [Function],
  rollback: [Function],
  close: [Function],
  release: [Function],
  break: [Function],
  changePassword: [Function],
  ping: [Function],
  subscribe: [Function],
  unsubscribe: [Function],
  getSodaDatabase: [Function: getSodaDatabase] }
  */