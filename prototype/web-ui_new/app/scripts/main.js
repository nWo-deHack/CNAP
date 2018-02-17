var admin_id = localStorage.getItem('admin_id');
var znap_id = localStorage.getItem('znap_id');
var users;
console.log(znap_id);
function getUsers() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://znap.pythonanywhere.com/api/v1.0/web_user/', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    users = JSON.parse(xhr.response);
    console.log(users);
    var rates_count = 0;
    for (var i = 0; i < users.length; i++) {
        $('#list').append('<tr class=\'user\'><th class=\'id\' scope=\'row\'></th><th class=\'name\'></th><' +
                'th class=\'last_name\'></th><th class=\'email\'></th><th  class=\'phone\'></th><' +
                'th class=\'is_closed\'></th><th  class=\'rate\'></th></tr>');
        var id = users[i].id;
        var first_name = users[i].first_name;
        var last_name = users[i].last_name;
        var email = users[i].email;
        var phone = users[i].phone;
        var open_rates = false;
        rates_count += users[i].rates.length;
        if (users[i].rates.length > 0) {
            for (var j = 0; j < users[i].rates.length; j++) {
                if (users[i].rates[j].is_closed) {
                    open_rates = true;
                    break;
                }
            }
        }

        $('#list tr:last .id').append(id);
        $('#list tr:last .name').append(first_name);
        $('#list tr:last .last_name').append(last_name);
        $('#list tr:last .email').append(email);
        $('#list tr:last .phone').append(phone);
        if (open_rates) {
            $('#list tr:last .is_closed').append('No');
        } else {
            $('#list tr:last .is_closed').append('Yes');
        }
        if (users[i].rates.length > 0) {
            $('#list tr:last .rate').append(' <button id="dialog-opener" type="button" class="btn btn-primary active ui-butto' +
                    'n ui-corner-all ui-widget " onClick="openRates(' + users[i].id + ')">Написати</button>');
        } else {
            $('#list tr:last .rate').append('<button type="button" class ="btn .btn-warning disabled">Немає відгуків</button>');
        }
    }
    $('#users_count').text(users.length);
    $('#rates_count').text(rates_count);
}

function getUser(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://znap.pythonanywhere.com/api/v1.0/user/' + id + '/', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    var user = JSON.parse(xhr.response);
    return user;
}

function getRate() {
    //  console.log(admin_id);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://znap.pythonanywhere.com/api/v1.0/znap/' + znap_id + '/rate/', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    var rates = JSON.parse(xhr.response);
    console.log(rates);

    for (var i = rates.length - 1; i >= 0; i--) {
        var user = getUser(rates[i].user_id);
        console.log(user);
        var first_name = user.first_name;
        var last_name = user.last_name;
        var middle_name = user.middle_name;

        $('#list2').append('<li class="list-group-item" xmlns="http://www.w3.org/1999/html"><div class="row"' +
                '> <div class="col-md-6"><h4 class="name"></h4><h6 class="description"></h6></div' +
                '><div class="col-md-6 text-right"><h4 class="quality"></h4><h6 class="time"></h6' +
                '></div></div></li>');

        $('#list2 li:last .name').append(first_name + ' ' + last_name);
        $('#list2 li:last .quality').append(rates[i].quality);
        //$('#list2 li:last .time').append(rates[i].dialog[0].timeStamp);
        $('#list2 li:last .description').append(rates[i].description);

        console.log(rates[i].description);
        console.log(rates[i].quality);
    }
}

function getAdminRates() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://znap.pythonanywhere.com/api/v1.0/admin/' + admin_id + '/rate/', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    var rates = JSON.parse(xhr.response);
    console.log(rates);
}

function closeRate(id) {
    var closeRate = {
        'is_closed': true
    };

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://znap.pythonanywhere.com/api/v1.0/rate/' + id + '/', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(closeRate));
}

function putAdmin(admin_id, rate_id) {
    var adminInRate = {
        admin: admin_id
    };
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://znap.pythonanywhere.com/api/v1.0/rate/' + rate_id + '/', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(adminInRate));

}
function openRates(id) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            console.log(users[i]);
            for (var j = 0; j < users[i].rates.length; j++) {
                console.log(users[i].rates[j]);
                $('#rates-modal .rates-content').append(users[i].rates[j].toString());
            }
        }

    }

    $('#wrapper').addClass('blur');
    $('#rates-modal').show();

}

$('#rates-modal .close')
    .on('click', function () {
        $(this)
            .closest('#rates-modal')
            .hide();
        $('#wrapper').removeClass('blur');
        $('#rates-modal .rates-content').empty();
    });