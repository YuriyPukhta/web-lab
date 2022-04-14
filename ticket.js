const get_list_bought = "http://localhost:6996/tickets"
const params = new URLSearchParams(window.location.search);

if (!params.has('id')) {
  alert(":(((") // eslint-disable-line no-alert, quotes, semi
  window.location.replace("http://vns.lpnu.ua/");
}
  var id = params.get('id');

  var url = get_list_bought +'/'+id;
  var token = localStorage.getItem('token');
  if(token == null)
  {
    alert(":(((")  // eslint-disable-line no-alert, quotes, semi
    window.location.replace("./login.html");
  }


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
 
  fetch(request).then(async (response) => {
    var res= await response.json();

    if(response.status == 401){
      window.location.replace("./login");
    }
    else{
      return 0;
    }
    var namefilm=res.namefilm;
    var price = res.buy;
    var date =res.datatime;
    var type = res.reservation;

    document.getElementById("name").textContent +=namefilm ;
    document.getElementById("price").textContent +=price;
    document.getElementById("date").textContent +=date ;
    document.getElementById("type").textContent +=type ;

  return 0;
});