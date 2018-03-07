var app = {    
    initialize: function() {
        this.bindEvents();
    },    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },    
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },    
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
var xurlq	= "http://programundi.com.br/loteria/API/api.php";
var utoken  = localStorage.getItem("token");

function list_blutoo(){	
	BTPrinter.list(function(data){
		$("#config_print_list").html("");		
		for (var i = 0; i < data.length; i++) {				
			$("#list_bb").append("<tr><td>"+data[i]+"</td><td><button onClick='conect_bb(\""+data[i]+"\");'>CONECTAR</button></td></tr>");
		}			
	},
	function(err){			
		alert(err);			
		console.log(err);
	});
}
function conect_bb(aparelho){	
	BTPrinter.connect(function(data){		
		alert(data)
	},
	function(err){		
		alert(err)
	}, aparelho);
}
function printt_texto(ttexto){	
	BTPrinter.printText(function(data){		
		//alert(data);
	},
	function(err){		
		alert(err);
	}, ttexto);	
}

function ligar_pesq_select(xx, text){
	 xcv = $(xx+"_chosen").text();
	 if(xcv !== ""){
		 $(xx).trigger("chosen:updated");
	 }
	 else{       
		 $(xx).chosen({
			 disable_search_threshold: 10,
			 no_results_text: text,
			 width: "100%"
		 });
	 }
 }
function set_value_chosen(i,v){    
    $(i+" option[value='"+v+"']").prop("selected", true);
    $(i).trigger("chosen:updated");
}
function remove_caracter(valor,caracter){
    var i = 0;
    while(i < valor.length){
        valor = valor.replace(caracter,"");
        i = i + 1;
    }
    return valor;
}
function convert_moeda_banco(str) {     
    str2 = remove_caracter(str,".");
    var res = str2.replace(",", ".");
    return parseFloat(res);
}
function convert_banco_moeda(i){
    r1 = numeroParaMoeda(i, 2, ",", ".");
    return r1;
}
function numeroParaMoeda(n, c, d, t){
        c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}
function set_tela(id_tela){
	if(id_tela == "1"){
		list_contribuinte();
		list_tipo_contribuicao();
		list_json_contribuicoes();
	}
}
function list_contribuinte(){
	set_value_chosen("#list_contribuinte","");
	$("#list_contribuinte").html("");
	$.ajax({
		url: xurlq,
         data: {		
            s: "1",
			u: utoken		
		},    
		dataType: "json",
		type: "POST",
        success: function(a) {	
			$("#list_contribuinte").html("<option value='-1'>SELECIONE</option>");
 	    	for (var i = 0; i < a.length; i++) {                
                if(a[i].result !== "false"){                   
					$("#list_contribuinte").append("<option value='"+a[i].id_contribuinte+"'>"+a[i].cpf_contribuinte+" - "+a[i].nome_contribuinte.toUpperCase()+"</option>");
                }
                else{
                    alert(a[i].p1);                    
                }
            }	
			ligar_pesq_select("#list_contribuinte", "CONTRIBUINTE NÃO LOCALIZADO");
       	}
    });
}
function list_tipo_contribuicao(){
	set_value_chosen("#list_tipo_contribuicao","");
	$("#list_tipo_contribuicao").html("");
	$.ajax({
		url: xurlq,
         data: {		
            s: "2",
			u: utoken		
		},    
		dataType: "json",
		type: "POST",
        success: function(a) {	
			$("#list_tipo_contribuicao").html("<option value='-1'>SELECIONE</option>");
 	    	for (var i = 0; i < a.length; i++) {                
                if(a[i].result !== "false"){                   
					$("#list_tipo_contribuicao").append("<option value='"+a[i].id_tipo_contribuicao+"'>"+a[i].descricao_tipo_contribuicao.toUpperCase()+"</option>");
                }
                else{
                    alert(a[i].p1);                    
                }
            }	
			ligar_pesq_select("#list_tipo_contribuicao", "TIPO CONTRIBUIÇÃO NÃO LOCALIZADO");
       	}
    });
}
function on_menu_lateral(){
	if($(".menu_lateral").css("display") == "none"){
		$(".menu_lateral").css("display", "block");
		$(".menu_lateral_back").css("display", "block");
	}
	else{
		$(".menu_lateral").css("display", "none");
		$(".menu_lateral_back").css("display", "none");
	}
}
function set_contribuicao_json(){
	tipo_cont  		= $("#list_tipo_contribuicao option:selected").val();
	tipo_cont_desc  = $("#list_tipo_contribuicao option:selected").text();
	vl0 			= $("#valor_cont").val();
	if(vl0 == ""){
		alert("INFORME UM VALOR VÁLIDO");
		return false;
	}
	
	valor_cont 		= convert_moeda_banco(vl0);
	
	if(tipo_cont == "-1"){
		alert("SELECIONE UMA CONTRIBUIÇÃO");
		return false;
	}
	
	if(valor_cont <= convert_moeda_banco("0")){
		alert("INFORME UM VALOR VÁLIDO");
		return false;
	}
	add_json_contribuicoes(tipo_cont,tipo_cont_desc,valor_cont);
	
}
function add_json_contribuicoes(p1,p2,p3){
	dados = localStorage.getItem("contribu_lanc");
    
    if(dados == null){
        localStorage.setItem("contribu_lanc", "[]");       
        return add_json_contribuicoes(p1,p2,p3);     
    }
    else{
        dados = JSON.parse(dados);
        var a = new Object();
        a.id_contribuicao = p1;  
		a.desc_contribuicao = p2; 
		a.vl_contribuicao = p3; 
        dados.push(a);      
        var b = JSON.stringify(dados, null, 0);
        localStorage.setItem("contribu_lanc", b);  
		list_json_contribuicoes();
		list_tipo_contribuicao();
		$("#valor_cont").val("");
    }
}
function dell_json_contribuicoes(p1){    
    r = localiza_json_contribuicoes(p1);
    if(r == undefined){
        alert("erro");
    }
    else{        
        w = apagar_json_contribuicoes(r);
        if(w == true){            
            list_json_contribuicoes();
        }   
        else{
            alert("erro");  
        }
    }
}
function localiza_json_contribuicoes(p1){   
    var dados = localStorage.getItem("contribu_lanc");   
    if(dados == "[]" || dados == null){
        return "n";
    }
    var dados = JSON.parse(dados);
    for (var i = 0; i < dados.length; i++) {        
        if(dados[i].id_contribuicao == p1){           
            return i;                       
        }                               
    }
    return "n";    
}
function apagar_json_contribuicoes(id){
    
    var dados = localStorage.getItem("contribu_lanc");
    dados = JSON.parse(dados);
    
    delete dados[id];
    var novoDados = [];
    var j = 0;    
    for (var i =0; i < dados.length; i++) {
        if (dados[i] != null) {
            novoDados[j] = dados[i];
            j++;
        }
    }
	novoDados = JSON.stringify(novoDados, null, 0);
    localStorage.setItem("contribu_lanc", novoDados);
    return true;    
}
function list_json_contribuicoes(){ 
    var dados = localStorage.getItem("contribu_lanc");
    
    if(dados !== null){   
    	var dados = JSON.parse(dados);
    	$("#list_contri_selecionadas").html("");
		valor_total = 0;
		for (var i = 0; i < dados.length; i++) {
			$("#list_contri_selecionadas").append("<tr><td class='font_sist'>"+dados[i].desc_contribuicao+"</td><td class='font_sist' style='text-align:right'>"+convert_banco_moeda(dados[i].vl_contribuicao)+"</td><td style='text-align: center'><button class='btn btn-danger' onClick='dell_json_contribuicoes("+dados[i].id_contribuicao+")'><img src='../img/cancel.png'></button></td></tr>");          
			valor_total = parseFloat(valor_total)+parseFloat(dados[i].vl_contribuicao);
		}
		$("#list_contri_selecionadas").append("<tr style='background: #ffffb4;font-weight: bold;'><td class='font_sist'>TOTAL</td><td class='font_sist' style='text-align:right'>"+convert_banco_moeda(valor_total)+"</td><td style='text-align: center'></td></tr>"); 
    }
}
function get_tipo_impressora_padrao(){
	tp_print = localStorage.getItem("tp_impressora_p");
	if(tp_print == null){
        localStorage.setItem("tp_impressora_p", "1");       
        return get_tipo_impressora_padrao();    
		//(tp = 1) = 32 caracteres
		//(tp = 2) = 48 caracteres
    }
	return tp_print;
}
function confirmar_pagamento(){
	$("#btn_pagto").attr("disabled", true);
	id_contribuinte 	= $("#list_contribuinte option:selected").val();
	list_contribuicoes  = localStorage.getItem("contribu_lanc");
	impressora_padrao	= get_tipo_impressora_padrao();
	
	if(id_contribuinte == "-1"){
		alert("SELECIONE O CONTRIBUINTE");
		$("#btn_pagto").attr("disabled", false);
		return false;
	}
	if(list_contribuicoes == null){
		localStorage.setItem("contribu_lanc", "[]");
		confirmar_pagamento();
		return false;
	}
	var dados = JSON.parse(list_contribuicoes);
    if(dados.length <= 0){
		alert("INFORME TRIBUTOS");
		$("#btn_pagto").attr("disabled", false);
		return false
	}
	 if(dados.length > 0){
		 
		 $.ajax({
			url: xurlq,
			 data: {		
				s: "6",
				u: utoken,
				p1: id_contribuinte,
				p2: list_contribuicoes,
				p3: impressora_padrao
			},    
			dataType: "json",
			type: "POST",
			success: function(a) {	
				
				for (var i = 0; i < a.length; i++) {                
					if(a[i].result !== "false"){					
						localStorage.setItem("contribu_lanc", "[]");
						list_json_contribuicoes();
						list_tipo_contribuicao();
						$("#valor_cont").val("");
						list_contribuinte();
						$("#btn_pagto").attr("disabled", false);
						for (var i2 = 0; i2 < a[i].p1.length; i2++) { 
							printt_texto(a[i].p1[i2].linha);
						}
					}
					else{
						alert(a[i].p1);   
						$("#btn_pagto").attr("disabled", false);
					}
				}	
				
			}
		});
		 
		return false;
	 }
}
function config_impressora(){
	list_blutoo();
	$("#modal_config_blue").modal("show");
}