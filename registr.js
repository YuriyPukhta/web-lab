const register_url = 'http://localhost:6996/user';
async function register(id) {
    const inputs = document.getElementById(id).elements;
    var name = inputs['Name'].value;
    var username = inputs['Username'].value;
    var password = inputs['Password'].value;

    var Rpassword = inputs['Password-r'].value;
    const select = document.getElementById('Status');
    var status = select.options[select.selectedIndex].value;
    if (Rpassword != password) {
        alert("you already has forgot your possword :/");
        return 0;// eslint-disable-line no-alert, quotes, semi
    }
    var data = {
        "name": name,
        "username": username,
        "password": password,
        "rang": status
    }
    var url = register_url;
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async (response) => {
        var res = await response.json();
        if (response.status == 200) {
            var token = res.access_token
            localStorage.setItem('token', token);
            window.location.replace("./account.html");
        }
        else {
            alert(res.info);
            var result = confirm("you arent unique. please be, ok?");
            if (!result) {
                Location.reload() // eslint-disable-line no-alert, quotes, semi
            }
        }
    });
}