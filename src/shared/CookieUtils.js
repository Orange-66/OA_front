/*
以下内容来源于菜鸟网站
*/

//设置cookie
export function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
};

//获取cookie
export function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
};

//修改cookie
//使用setCookie重新设置即可

//删除cookie
export function deleteCookie(cname){
	document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};