var xurlq 			= "http://sicapsolucoes.com.br/PROGRAMUNDI/API/api.php";
var y = localStorage.getItem("ide");

var imgrel = "http://31.220.59.48:8080/imgprefeitura/"+decode_text(localStorage.getItem("xCy&@img"))+"_2.png";
var get_url_relatorio 	= "../../../relatorios/gerenciadorrelatorio?y="+y+"&relatorio=";
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
console.log("%cEste é um recurso de navegador voltado para desenvolvedores.\nDúvidas entre em contato conosco.\nE-mail: contato@vendanex.com\nFone: 81 991.119.106\nVENDANEX.COM", dfgr2);
document.onkeyup=function(e){if(e.which == 123){alert("f12");}}
function xxcbskjdn(){	
	p1 = localStorage.getItem("xzoper"); 
	if(u == false){
		alert("Não está logado!");
		location.href='http://sicapsolucoes.com.br/contabilidade/';
		localStorage.removeItem("xzoper");	
	}
	$.ajax({
		url: xurlq,
         data: {
            y: y,
			u: u,
            s: "251",
			p1: p1			
		},       
		type: "POST",
        success: function(a) {
			//console.log(a);
 	    	if(a == "off"){
				alert("Não está logado!");
				location.href='http://sicapsolucoes.com.br/contabilidade/';
				localStorage.removeItem("xzoper");	
			}			
       	}
    });
}