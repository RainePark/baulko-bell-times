checkMobile()
checkCookie()

function setCookie(cname, cvalue) {
    var expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 6)
    document.cookie = cname + "=" + cvalue + ";" + "Expires=" + expiryDate.toGMTString() + ";" + " SameSite=None; Secure; path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
return "";
}

function button_light() {
    document.getElementsByTagName("body")[0].classList.add("theme_light");
    document.getElementsByTagName("body")[0].classList.remove("theme_dark");
    setCookie('theme','light')
}
  
function button_dark() {
    document.getElementsByTagName("body")[0].classList.add("theme_dark");
    document.getElementsByTagName("body")[0].classList.remove("theme_light");
    setCookie('theme','dark')
}

function checkMobile() {
    isMobile = window.matchMedia("only screen and (max-width: 720px)").matches;
}

function checkCookie() {
    let theme=getCookie("theme")
    if (theme=="light") {
        button_light()
    }
    else {
        button_dark()
    }
}