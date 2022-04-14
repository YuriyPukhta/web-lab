const get_list_created = "http://localhost:6996/buy"
const get_list_bought = "http://localhost:6996/tickets"

async function GetUserList(e) 
{
  var url;
  var token = localStorage.getItem('token');
  if(token == null)
  {
    window.location.replace("./login.html");
  }
  const query =  e.target.value
  if (query =='bought'){
    url = get_list_bought;
  }
  else if(query == 'created'){
    url = get_list_created;
  }
  else{
    return 0;
  }
  var myList = document.getElementById('id-list');

  let h = new Headers({
      'Access-Control-Allow-Origin': '*'
  });
  let auth = 'Bearer ' + token;
  h.append('Authorization', auth);
  const request = new Request(url, 
  {
    method: 'GET',
    credentials: 'same-origin',
    mode:'cors',
    headers: h
  });
 
  const response = await fetch(request).then(async (response) => {
     var res= await response.json();
    if(response.status == 200){
    }
    else if(response.status == 401){
      window.location.replace("./login");
    }
    else{

      return 0;
    }
    console.log(res)
    myList.innerHTML = '';
    for (var i = 0; i < res.length; i++) {
            var ticket = res[i]
            var name; 
            if (ticket.name == null){
              name = ticket.namefilm;
            }
            else{
              name = ticket.name;
            }
            let li = document.createElement("li");
            li.className = "list-element";
            var a = document.createElement('a');
            a.textcontent = ticket.id
            let linkText = document.createTextNode(name);
            a.appendChild(linkText);
            a.href = url+'/ticket?id='+ticket.id;
            li.appendChild(a);
            myList.appendChild(li);
    }
  return 0;
});
}
