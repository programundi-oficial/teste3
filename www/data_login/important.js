var xurlq 			= "http://programundi.com.br/loteria/API/api.php";
function click() {
	if (event.button==2||event.button==3) {
		oncontextmenu='return false';
	}
}
document.onmousedown=click
document.oncontextmenu = new Function("return false;") 
function gbdid(){
	v = localStorage.getItem("xCy&@");
	if(v !== null){
		return decode_text(v);
	}
	else{
		return false;
	}
}
function loadIframe(iframeName, url) {
    if (window.frames[iframeName] ) {
        window.frames[iframeName].location = url;   
        return false;
    }
    return true;
}
function NewWindow(mypage, myname, w, h, scroll) {
	var winl = (screen.width - w) / 2;
	var wint = (screen.height - h) / 2;
	winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+scroll+',resizable'
	win = window.open(mypage, myname, winprops)
	if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
}
function xzoper(){
	v = localStorage.getItem("xzoper");
	if(v !== null){
		return (v);
	}
	else{
		return false;
	}
}
function encode_text(t){
	b = window.btoa(t);
	return b;
}
function decode_text(t){
	b = window.atob(t);
	return b;
}
function get_url(n) {
    var r = location.search.substring(1, location.search.length),
        a = !1,
        t = r.split("&");
    for (i = 0; i < t.length; i++) param_name = t[i].substring(0, t[i].indexOf("=")), param_name == n && (a = t[i].substring(t[i].indexOf("=") + 1));
    return a ? a : !1
}
dfgr = "color:white;background:red;font-size:36px;border: 1px solid black;";
dfgr2 = "color:black;font-size:18px;";
console.log("%c CUIDADO! ", dfgr);
console.log("%cEste é um recurso de navegador voltado para desenvolvedores.\nDúvidas entre em contato conosco.\nE-mail: contato@programundi.com.br", dfgr2);
document.onkeyup=function(e){if(e.which == 123){alert("f12");}}
function direct(){	
	p1 = $("#log").val(); 
	p2 = $("#pass").val();
	
	$.ajax({
		url: xurlq,
         data: {		
            s: "5",
			p1: p1,
			p2: p2			
		},    
		dataType: "json",
		type: "POST",
        success: function(a) {			
 	    	for (var i = 0; i < a.length; i++) {                
                if(a[i].result == "true"){                       
                    localStorage.setItem("token", a[i].p1);    
					location.href='sistema/index.html';
                }
                else{
                    alert(a[i].p1);                    
                }
            }			
       	}
    });
}