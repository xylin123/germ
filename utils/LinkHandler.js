const USER_WS = {};
const linkPools = {
  ALL: []
};
const ID_PREFIX = 'USER_';

class Link {
  constructor(userName, ws, open = true) {
    this.id = ID_PREFIX + userName;
    this.userName = userName;
    this.ws = ws;
    this.open = open;
  }

  close() {
    this.open = false;
  }

  isOpen() {
    return this.open;
  }

  getWs() {
    return this.ws;
  }

}


// 新加入的
function addLink(ws, userName) {

  let link = new Link(userName, ws);

  linkPools.ALL.push(link);
  USER_WS[userName] = link;

  ws.on('message', msg => sendMessage('all', msg));
  ws.on('error', () => {
    link.close();
    delete USER_WS[link.userName];
    pushUserList();
  });
  ws.on('close', () => { 
    link.close();
    delete USER_WS[link.userName];
    pushUserList();
  });
  
  pushUserList();

}

function sendMessage(methods, msg) {
  // console.log(msg);
  switch(methods) {
    case 'all': 
      linkPools.ALL.forEach(link => {
        if(link.isOpen()) link.getWs().send(msg);
      });
  }
}


function pushUserList() {
  let message = {
    type: 'userlist',
    sender: 'system'
  },
  userList = Object.keys(USER_WS).reduce((arr, val) => { arr.push({name: val}); return arr; }, []);
  message.data = userList;
  
  sendMessage('all',  JSON.stringify(message));
}



module.exports = {
  addLink,
  sendMessage
}
