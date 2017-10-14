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
function nottof(idpassado){	
	if(idpassado==2){
		alert(device.model);
	}
	if(idpassado==3){
		function onSuccess(position) {
        	var element = document.getElementById('geolocation');
        	element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            '<hr />'      + element.innerHTML;
			alert('Latitude: '  + position.coords.latitude);
    }
	    
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    // Options: throw an error if no update is received every 30 seconds.
    //
    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError);
		//navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
	}
	if(idpassado==4){
		alert("list bb");
		BTPrinter.list(function(data){			
			var element = document.getElementById('geolocation');
			alert(data);
			lista = data.split(","); 
			for (var i = 0; i < lista.length; i++) {	
				alert(lista[i]);
				element.innerHTML = "<div onclick='conect_bb(\""+lista[i]+"\")'>"+lista[i]+"</div>";
			}			
		},
		function(err){			
			alert(err);			
			console.log(err);
		});
	}
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
function imprimir_tt(){	
	var element_t = document.getElementById("textoex").value;
	
	printt_texto(element_t);
}
/**/
function MascaraMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e){
        var sep = 0;
        var key = '';
        var i = j = 0;
        var len = len2 = 0;
        var strCheck = '0123456789-';
        var aux = aux2 = '';
        var whichCode = (window.Event) ? e.which : e.keyCode;
        if (whichCode == 13) return true;
        key = String.fromCharCode(whichCode); // Valor para o codigo da Chave
        if (strCheck.indexOf(key) == -1) return false; // Chave invÃ¡lida
        len = objTextBox.value.length;
        for(i = 0; i < len; i++)
            if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;
        aux = '';
        for(; i < len; i++)
            if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);
        aux += key;
        len = aux.length;
        if (len == 0) objTextBox.value = '';
        if (len == 1) objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;
        if (len == 2) objTextBox.value = '0'+ SeparadorDecimal + aux;
        if (len > 2) {
            aux2 = '';
            for (j = 0, i = len - 3; i >= 0; i--) {
                if (j == 3) {
                    aux2 += SeparadorMilesimo;
                    j = 0;
                }
                aux2 += aux.charAt(i);
                j++;
            }
            objTextBox.value = '';
            len2 = aux2.length;
            for (i = len2 - 1; i >= 0; i--)
            objTextBox.value += aux2.charAt(i);
            objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);
        }
        return false;
}
function remove_caracter(valor,caracter){
    var i = 0;
    while(i < valor.length){
        valor = valor.replace(caracter,"");
        i = i + 1;
    }
    return valor;
}
function on_load_carga(tp,id9){
    if(tp=="on"){
        if ($('#c_loading_hsytf')[0]) {
            return false;
        } 
        else {
            $("body").append("<div class='icon_hsgsrd' id='c_loading_hsytf'><img src='http://sicapsolucoes.com.br/contt/img/icone_loading.gif'></div>");
            $(id9).attr("disabled", true);
        } 
    }
    if(tp=="off"){
        if ($('#c_loading_hsytf')[0]) {
            $("#c_loading_hsytf").remove();
            $(id9).attr("disabled", false);
        } 
        else {
            return false;            
        }  
    }   
}
function convert_banco_data(date){    
    if(date == "" || date == null){
        return "";
    }
    else{       
        var newdate = date.split("-").reverse().join("/");
        return newdate;
    }
}
function convert_moeda_banco(str) {     
    str2 = remove_caracter(str,".");
    var res = str2.replace(",", ".");
    return res;
}
function convert_banco_moeda(i){
    r1 = numeroParaMoeda(i, 2, ",", ".");
    return r1;
}
function numeroParaMoeda(n, c, d, t){
        c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
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
function btn_add(idd){
	/*ADD CATEGORIA*/
	if(idd==1){		
		$("#modal_01").modal("show");
		return false;
	}
	/*ADD PRODUTO*/
	if(idd==2){		
		list_categoria_add_prod("#list_categori_addprod");
		$("#modal_02").modal("show");
		setTimeout(function(){$("#cod_barras_prod_add").focus();},600);
		
		return false;
	}
	
	if(idd==4){		
		$("#modal_04").modal("show");	
		return false;
	}
	if(idd==5){	
		list_acompanhamentos_list_add();
		$("#modal_05").modal("show");
		return false;
	}
	if(idd==6){	
		$("#modal_05").modal("hide");
		$("#modal_06").modal("show");	
		return false;
	}
	if(idd==7){	
		$("#modal_06").modal("hide");
		list_acompanhamentos_list_add();
		$("#modal_05").modal("show");	
		return false;
	}
	if(idd==8){
		$("#modal_01").modal("hide");
		list_categoria();
		$("#modal_03").modal("show");
		return false;
	}
	if(idd==9){
		$("#modal_07").modal("show");
		return false;
	}	
	if(idd==10){
		$("#modal_conect_impressora").modal("show");
		list_blutoo();
		return false;
	}
}
function new_tr_prod(vr){
	cont=$("#tr_prod_"+vr).html();
	vr2=$("#tr_prod_"+vr).attr("idx");
	if ($("#list_prod_card tr[idx='"+(parseInt(vr2)+1)+"']").length) { 		 
		$("#tr_prod_"+vr).attr("remvline","true");			
		$("#list_prod_card tr[idx='"+(parseInt(vr2)+1)+"']").attr("remvline","false");
		$("#list_prod_card tr[idx='"+(parseInt(vr2))+"']").next().after("<tr class='tr_table_prod' idx='"+(parseInt(vr2)+1)+"' id='tr_prod_"+vr+"'>"+cont+"</tr>");
		$("#list_prod_card tr[remvline='true']").remove();
		$("#list_prod_card tr[remvline='false']").attr("idx",vr2);
		$("#list_prod_card tr[remvline='false']").removeAttr("remvline");
	}
}
function down_tr_prod(vr){
	vr2=$("#tr_prod_"+vr).attr("idx");	
	if ($("#list_prod_card tr[idx='"+(parseInt(vr2)-1)+"']").length) {
		id=$("#list_prod_card tr[idx='"+(parseInt(vr2)-1)+"']").attr("id");	
		res = id.split("_");   		
		new_tr_prod(res[2]);
	}
}
function addlinecomposicaoprod(){
	var vrvcon= '<tr><td><input id="desc_additenl_extra" value="DESCRIÇÃO" type="text" class="form-control"></td><td colspan="2"><div class="col-lg-10" style="padding:0;max-width: 250px;"><div class="form-group"><select id="list_acompadd" multiple class="form-control"></select></div></div><div class="col-lg-2" style="padding-right:0"><div class="form-group"><input id="qtd_additenl" type="number" class="form-control"></div></div><div class="brack"></div></td><td colspan="2"><div class="col-lg-10" style="padding:0;max-width: 250px;"><div class="form-group"><select multiple id="list_acompadd_extra" class="form-control"></select></div></div><div class="col-lg-2" style="padding-right:0"><div class="form-group"><input id="qtd_additenl_extra" type="number" class="form-control"></div></div><div class="brack"></div></td><td class="text-right"><button type="button" class="btn btn-sm btn-primary btn_icon" onclick="addlistcriatprodcompost();"><img src="../img/save.png"></button></td></tr>  '
	$("#list_comp_cad_prod").html(vrvcon);
	list_acompanhamentos();
	list_acompanhamentos_extra();
}
function selecedtipoaddprod(){
	v1=$("#tipoprodaddprod").val();
	if(v1=="2"){		
		listallcomposicaoaddprod();
		$("#contene_compsicaoaddprod").css("display","");	
	}
	else{
		$("#contene_compsicaoaddprod").css("display","none");
	}
}
function list_acompanhamentos(p){
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "3"
        },
        dataType: "json",
        type: "POST",
        success: function(json) {   
            el3="#list_acompadd";
            $(el3).html("");             
            for (var i = 0; i < json.length; i++) {                               
            	$(el3).append("<option value='"+json[i].id+"'>"+json[i].descricao+" - 0,00</option>");                
            }
            if(p !== undefined){$(el3).val(p);}
            //ligar_pesq_select(el3,"NÃO LOCALIZADA");
        }
    });
}
function list_acompanhamentos_extra(p){
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "3"
        },
        dataType: "json",
        type: "POST",
        success: function(json) {   
            el3="#list_acompadd_extra";
            $(el3).html("");             
            for (var i = 0; i < json.length; i++) {                               
            	$(el3).append("<option value='"+json[i].id+"'>"+json[i].descricao+" - "+convert_banco_moeda(json[i].valor)+"</option>");                
            }
            if(p !== undefined){$(el3).val(p);}
            //ligar_pesq_select(el3,"NÃO LOCALIZADA");
        }
    });
}
function addlistcriatprodcompost(){
	listj01="";
	virg01="";
	$('#list_acompadd :selected').each(
		function(i, selected){	
			if(listj01!==""){virg01=",";}	 
			listj01+=virg01+'{"id": "'+$(selected).val()+'","desc":"'+$(selected).text()+'"}';
		}
	); 
	listacomp ="["+listj01+"]";   
    
	qtd_n=$("#qtd_additenl").val();
	if(qtd_n==""){
		qtd_n=0;
	}
	listj02="";
	virg02="";
	$('#list_acompadd_extra :selected').each(
		function(i, selected){	
			if(listj02!==""){virg02=",";}	 
			listj02+=virg02+'{"id": "'+$(selected).val()+'","desc":"'+$(selected).text()+'"}';
		}
	); 
	listacomp_extra ="["+listj02+"]";
	
	qtd_e=$("#qtd_additenl_extra").val();
	if(qtd_e==""){
		qtd_e=0;
	}
	if(qtd_n==0 && qtd_e==0){
		alert("VERIFIQUE AS INFORMAÇÕES CADASTRAS");
		return false;
	}
	if(listacomp=="[]" && listacomp_extra=="[]"){
		alert("VERIFIQUE AS INFORMAÇÕES CADASTRAS");
		return false;
	}
	desccomp=$("#desc_additenl_extra").val();	additem_acomp_addprod('{"item_d":"'+desccomp+'","item_n":'+listacomp+',"item_n_d":'+qtd_n+',"item_e":'+listacomp_extra+',"item_e_d":'+qtd_e+'}');	
	
}
function additem_acomp_addprod(p1){
	var dados = localStorage.getItem("listadd01");   
	virgaddjj="";
    if(dados == null){
        localStorage.setItem("listadd01", "");       
        additem_acomp_addprod(p1);     
    }
    else{		
       if(dados!==""){
		   virgaddjj=",";		   
	   }
		b=dados+virgaddjj+p1;
       localStorage.setItem("listadd01", b);      
    }
	listallcomposicaoaddprod();
}
function listallcomposicaoaddprod(){
	listt = localStorage.getItem("listadd01"); 
	if(listt == null){
        localStorage.setItem("listadd01", "");       
        return false;     
    }
	dados = JSON.parse("["+listt+"]");
	$("#list_comp_cad_prod").html("");
	sval=0;
	for (var i = 0; i < dados.length; i++) {	
		listcoppn="";
		listcoppnv="";
		for (var i2 = 0; i2 < dados[i].item_n.length; i2++) {
			if(listcoppn!==""){listcoppnv="<br>";}
			listcoppn+=listcoppnv+dados[i].item_n[i2].desc;
		}	
		listcoppne="";
		listcoppnev="";
		for (var i2 = 0; i2 < dados[i].item_e.length; i2++) {
			if(listcoppne!==""){listcoppnev="<br>";}
			listcoppne+=listcoppnev+dados[i].item_e[i2].desc;
		}
		$("#list_comp_cad_prod").append("<tr><td>"+dados[i].item_d+"</td><td>"+listcoppn+"</td><td>"+dados[i].item_n_d+"</td><td>"+listcoppne+"</td><td>"+dados[i].item_e_d+"</td><td></td></tr>");  
	}
}
function list_categoria(){
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "4"
        },
        dataType: "json",
        type: "POST",
        success: function(j) {   
            el4="#liscategpgprod";
            $(el4).html("");             
            for (var i = 0; i < j.length; i++) {                               
            	$(el4).append("<tr><td id='desc_categ_"+j[i].id+"'>"+j[i].descricao+"</td><td class='text_c'>"+j[i].qtd_utilizando+"</td><td class='text-right'><button style='display:none' type='button' class='btn_cate_list_edition2 btn btn-sm btn-primary btn_icon' onClick=''><img src='../img/up-arrow.png'></button><button style='margin-left: 3px;display:none' type='button' class='btn_cate_list_edition2 btn btn-sm btn-primary btn_icon' onClick=''><img src='../img/arrow-down.png'></button><button type='button' class='btn_cate_list_edition1 btn btn-sm btn-primary btn_icon' onClick='edit_cate_but("+j[i].id+");'><img src='../img/edit.png'></button><button style='margin-left: 3px;' id='btn_categ_dell_"+j[i].id+"' type='button' class='btn_cate_list_edition1 btn btn-sm btn-danger btn_icon' onClick='dell_categoria("+j[i].id+",\""+j[i].descricao+"\");'><img src='../img/trash.png'></button><button style='margin-left: 3px;display:none' title='SALVAR ALTERAÇÃO' type='button' class='btn_cate_list_edition2 btn btn-sm btn-primary btn_icon' onclick='save_categ_prod("+j[i].id+");'><img src='../img/save.png'></button><button style='margin-left: 3px;display:none' type='button' id='line_btn_dell_item_prod_"+j[i].id+"' title='CANCELAR OPERAÇÃO' class='btn_cate_list_edition2 btn btn-sm btn-danger btn_icon' onclick='list_categoria();'><img src='../img/close.png'></button></td></tr>");				               
            }            
        }
    });
}
function list_categoria_add_prod(el4a,p){
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "4"
        },
        dataType: "json",
        type: "POST",
        success: function(json) {            
            $(el4a).html("<option value='-1'>SELECIONE</option>");             
            for (var i = 0; i < json.length; i++) {                               
            	$(el4a).append("<option value="+json[i].id+">"+json[i].descricao.toUpperCase()+"</option>");    
            }	
			if(p!==undefined){
				$(el4a).val(p);
			}
        }
    });
}
function list_tipo_prod_add_prod(el22,p){
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "22"
        },
        dataType: "json",
        type: "POST",
        success: function(json) {            
            $(el22).html("<option value='-1'>SELECIONE</option>");             
            for (var i = 0; i < json.length; i++) {                               
            	$(el22).append("<option value="+json[i].id+">"+json[i].descricao.toUpperCase()+"</option>");    
            }	
			if(p!==undefined){
				$(el22).val(p);
			}
        }
    });
}
function add_prod(){
	name=$("#nome_prod_add").val();
	tp_prod=$("#tipoprodaddprod option:selected").val();
	tp_categ=$("#list_categori_addprod option:selected").val();
	vl_prod=$("#vl_prod_add").val();
	desc_prod=$("#desc_prod_add").val();
	list_acomp_add="";
	if(tp_prod=="2"){
		listt = localStorage.getItem("listadd01"); 
		if(listt == null){
			localStorage.setItem("listadd01", "");       
			return false;     
		}
		list_acomp_add = "["+listt+"]";
	}
	vl_prod=convert_moeda_banco(vl_prod);
	codbb=$("#cod_barras_prod_add").val();
	if(codbb !== ""){
		if(codbb.length !== 13){
			alert("PREENCHA CORRETAMENTE O CAMPO CÓDIGO DE BARRAS");
			return false;
		}
	}
	if(tp_categ == "-1"){
		alert("SELECIONE A CATEGORIA");
		return false;
	}
	on_load_carga("on","#btn_add_prod");
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "1",
			p1:name,
			p2:desc_prod,
			p3:vl_prod,
			p4:tp_prod,
			p5:tp_categ,
			p6:codbb,
			p7:list_acomp_add
        },
        type: "POST",
        success: function(a) {            
			if(a=="true"){
				localStorage.removeItem("listadd01");
				$("#cod_barras_prod_add").val("");
				$("#nome_prod_add").val("");
				$("#tipoprodaddprod").val("-1");
				list_categoria_add_prod("#list_categori_addprod");
				$("#vl_prod_add").val("");
				$("#desc_prod_add").val("");
				$("#modal_02").modal("hide");
				list_produto_tladdprod();
				$("#list_comp_cad_prod").html("");
				on_load_carga("off","#btn_add_prod");
				pergunta_if_new_prod();
            }	
			else{
				alert(a);
				console.log(a);
				on_load_carga("off","#btn_add_prod");
			}
        }
    });
}
function pergunta_if_new_prod(){
	var r = confirm("DESEJA CADASTRAR NOVO PRODUTO?");       
     
    if(r == false) {
        return false;  
    }
    if (r == true) {
	 	setTimeout(function(){$("#modal_02").modal("show");},1000); 
	}
}
function list_produto_tladdprod(){
	el2="#list_prod_card";
    $(el2).html("BUSCANDO LISTA");
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "2"
        },
        dataType: "json",
        type: "POST",
        success: function(j) {  
			vrl="";
            for (var i = 0; i < j.length; i++) {       
				vrl+="<tr class='tr_table_prod' idx='"+i+"' id='tr_prod_"+j[i].idprod_item+"'>";
					vrl+="<td><img src='"+j[i].img_logo+"'></td>";
					vrl+="<td>"+j[i].nome+"</td>";
					vrl+="<td>"+j[i].cod_barras+"</td>";
					vrl+="<td>R$ "+j[i].valor+"</td>";
					vrl+="<td>"+j[i].desc_cat+"</td>";					
					vrl+="<td>"+j[i].idprod_item+"</td>";
					vrl+="<td>"+j[i].desc_tipo+"</td>";
					vrl+="<td class='text-right'>";
						vrl+="<button type='button' class='btn btn-sm btn-primary btn_icon' onclick='down_tr_prod(\""+j[i].idprod_item+"\");'><img src='../img/up-arrow.png'></button>";
						vrl+="<button type='button' class='btn btn-sm btn-primary btn_icon' onclick='new_tr_prod(\""+j[i].idprod_item+"\");'><img src='../img/arrow-down.png'></button>";
						vrl+="<button type='button' class='btn btn-sm btn-primary btn_icon' onclick='btn_add(\""+j[i].idprod_item+"\");'><img src='../img/edit.png'></button>";
						vrl+="<button type='button' iid='line_btndelladd_"+j[i].idprod_item+"' class='btn btn-sm btn-danger btn_icon' onclick='btn_dell_prod_cad(\""+j[i].idprod_item+"\");'><img src='../img/trash.png'></button>";
					vrl+="</td>";
				vrl+="</tr>";            								  				               
            }  
			$(el2).html(vrl);
        }
    });
}
function btn_dell_prod_cad(iid,desc){
	var r = confirm("DESEJA EXCLUIR "+desc+"?");       
     
    if(r == false) {
        return false;  
    }
    if (r == true) {
		
		on_load_carga("on","#line_btndelladd_"+iid);
		$.ajax({            
			url: xurlq,
			 data: {
				y: y,
				u: "",
				s: "6",
				p1: iid
			},
			type: "POST",
			success: function(a) {            
				if(a=="true"){
					on_load_carga("off","#line_btndelladd_"+iid);
					list_produto_tladdprod();							
				}	
				else{
					alert(a);
					console.log(a);
					on_load_carga("off","#line_btndelladd_"+iid);
				}
			}
		});
	}
}
function fun_lanc_prod_vendas(){
	codbb=$("#codbbarras").val();
	qtdp=$("#qtd_vend_prod").val();
	
	if(codbb.length < 7 && codbb!==""){		
		$("#qtd_vend_prod").val(codbb);		
		$("#codbbarras").val("");
		localStorage.setItem("getcodaddprod", "0");
		$("#codbbarras").focus();
		
		return false;
	}
	if(codbb.length!== 13){
		console.log("erro leitura");
		localStorage.setItem("getcodaddprod", "0");
		$("#codbbarras").focus();
		
		return false;
	}
	on_load_carga("on","#codbbarras");
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "11",
			p1: "1",
			p2: codbb,
			p3: "true"
        },
		dataType: "json",
        type: "POST",
        success: function(j) {	
			
			on_load_carga("off","#codbbarras");
			$("#codbbarras").val("");
			
			for (var i = 0; i < j.length; i++) { 
				if(j[i].result=="false"){
					localStorage.setItem("getcodaddprod", "0");
					alert("PRODUTO NÃO LOCALIZADO");
					$("#codbbarras").focus();
					return false;
				}
				add_produto_caixa_memoria(j[i].cod_barras,j[i].nome.toUpperCase(),j[i].valor,qtdp,j[i].idd);				
			}				 
			$("#qtd_vend_prod").val(1);				
			localStorage.setItem("getcodaddprod", "0");
			$("#codbbarras").focus();
        },
		error: function(XMLHttpRequest, textStatus, errorThrown) {			
			localStorage.setItem("getcodaddprod", "0");
			on_load_carga("off","#codbbarras");			
		}
    });
}
function setfocos_cod_barras(){
	if(localStorage.getItem("tp_pesquisa") == 1 && localStorage.getItem("modal_ativo_caixa") == 0){
		$("#codbbarras").focus();
	}
}
function list_acompanhamentos_list_add(){
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "3"
        },
        dataType: "json",
        type: "POST",
        success: function(j) {   
            el3b="#lis_item_prod";
            $(el3b).html("");             
            for (var i = 0; i < j.length; i++) {                               
            	$(el3b).append("<tr><td id=desc_edit_item_p_"+j[i].id+">"+j[i].descricao+"</td><td class='text_r' id=vl_edit_item_p_"+j[i].id+">"+convert_banco_moeda(j[i].valor)+"</td><td  class='text_c'>??</td><td class='text-right'><button type='button' class='btn_edition_itep1 btn btn-sm btn-primary btn_icon' onclick='edit_item_prod(\""+j[i].id+"\");'><img src='../img/edit.png'></button><button style='margin-left: 3px;' type='button' id='line_btn_dell_item_prod_"+j[i].id+"' class='btn_edition_itep1 btn btn-sm btn-danger btn_icon' onclick='btn_dell_item_prod_cad(\""+j[i].id+"\");'><img src='../img/trash.png'></button><button style='display:none' type='button' class='btn_edition_itep2 btn btn-sm btn-primary btn_icon' id='btn_edit_item_prod_"+j[i].id+"' onclick='save_item_prod(\""+j[i].id+"\");'><img src='../img/save.png'></button><button style='margin-left: 3px;display:none' type='button' id='line_btn_dell_item_prod_"+j[i].id+"' class='btn_edition_itep2 btn btn-sm btn-danger btn_icon' onclick='list_acompanhamentos_list_add();'><img src='../img/close.png'></button></td></tr>");                
            }           
        }
    });
}
function edit_item_prod(iid){
	desc_e=$("#desc_edit_item_p_"+iid).text();
	vl_e=$("#vl_edit_item_p_"+iid).text();
	
	$("#desc_edit_item_p_"+iid).html("<input type='text' id='desc_input_edit_item_p_"+iid+"' class='form-control' value='"+desc_e+"'>");
	$("#vl_edit_item_p_"+iid).html("<input type='text' id='vl_input_edit_item_p_"+iid+"' class='form-control text_r'  onkeypress=\" return(MascaraMoeda(this,'.',',',event))\" onblur=\"return(MascaraMoeda(this,'.',',',event))\" onfocus=\" return(MascaraMoeda(this,'.',',',event))\" value='"+vl_e+"'>");
	
	$(".btn_edition_itep1").css("display","none");
	$(".btn_edition_itep2").css("display","");
}
function edit_cate_but(idd){
	desccate=$("#desc_categ_"+idd).text();
	$("#desc_categ_"+idd).html("<input type='text' id='desc_input_categ_"+idd+"' class='form-control' value='"+desccate+"'>");
	$(".btn_cate_list_edition1").css("display","none");
	$(".btn_cate_list_edition2").css("display","");
}
function save_new_item_prod(){
	desc_new_item=$("#desc_item_prod").val();
	vl_new_item=$("#vl_item_prod").val();
	vl_new_item=convert_moeda_banco(vl_new_item);
	on_load_carga("on","#btn_new_item_prod");
	
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "8",
			p1:desc_new_item,
			p2:vl_new_item
        },
		dataType: "json",
        type: "POST",
        success: function(j) {  
			for (var i = 0; i < j.length; i++) { 
				if(j[i].result=="true"){				
					$("#desc_item_prod").val("");
					$("#vl_item_prod").val("");
					on_load_carga("off","#btn_new_item_prod");
					btn_add('7');
				}	
				else{
					alert(j[i].result);
					console.log(j[i].result);
					on_load_carga("off","#btn_new_item_prod");
				}
			}
        }
    });
}
function save_item_prod(idd){
	desc_edit=$("#desc_input_edit_item_p_"+idd).val();
	vl_edit=$("#vl_input_edit_item_p_"+idd).val();
	vl_edit=convert_moeda_banco(vl_edit);
	on_load_carga("on","#btn_edit_item_prod_"+idd);
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "9",
			p1:desc_edit,
			p2:vl_edit,
			p3: idd
        },
		dataType: "json",
        type: "POST",
        success: function(j) {  
			for (var i = 0; i < j.length; i++) { 
				if(j[i].result=="true"){									
					on_load_carga("off","#btn_edit_item_prod_"+idd);
					list_acompanhamentos_list_add();
				}	
				else{
					alert(j[i].result);
					console.log(j[i].result+" code erro -> "+decode_text(j[i].pe));
					on_load_carga("off","#btn_edit_item_prod_"+idd);
				}
			}
        }
    });
}
function add_new_categ(){
	desc_edit=$("#desc_categ").val();	
	on_load_carga("on","#btn_new_categ");
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "10",
			p1: desc_edit
        },
		dataType: "json",
        type: "POST",
        success: function(j) {  
			for (var i = 0; i < j.length; i++) { 
				if(j[i].result=="true"){									
					on_load_carga("off","#btn_new_categ");
					$("#desc_categ").val("");
					btn_add('8');
				}	
				else{
					alert(j[i].result);
					console.log(j[i].result+" code erro -> "+decode_text(j[i].pe));
					on_load_carga("off","#btn_new_categ");
				}
			}
        }
    });
}
function save_categ_prod(idd21){
	descn=$("#desc_input_categ_"+idd21).val();
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "21",
			p1: idd21,
			p2: descn
        },
        dataType: "json",
        type: "POST",
        success: function(json) {  
			for (var i = 0; i < json.length; i++) { 
				if(json[i].result !== "false"){
					list_categoria();
				}
				else{					
					alert("ERRO "+decode_text(json[i].pe));					
				}
			}
		}
	});	
}
function direciona_url(p_url){
	location.href=p_url;
}
function pagload(p_load,sub_el){
	if(p_load==1){
		
	}
	if(p_load==2){
		list_produto_tladdprod();
	}
	$(".li_menu_l").removeClass("li_ativa_pai");
	$(".li_menu_l_f").hide();
	$("#m_l_"+p_load).addClass("li_ativa_pai");
	$("#m_l_"+p_load+"_f").show();
	$("#seta_menu_"+p_load).attr("src","../img/arrow_down.png");
	$("#m_l_"+p_load+"_"+sub_el).css("background","#c5c4c4");
}
function click_menu_l(p_menu){
	if($("#m_l_"+p_menu+"_f").css("display")=="none"){
		$("#seta_menu_"+p_menu).attr("src","../img/arrow_down.png");
		$("#m_l_"+p_menu+"_f").show();
	}
	else{
		$("#seta_menu_"+p_menu).attr("src","../img/arrow_right.png");
		$("#m_l_"+p_menu+"_f").hide();
	}
}
function buscar_produto_app_caixa(){
	localStorage.setItem("modal_ativo_caixa", "1");
	$("#modal_pesquisa_caixa").modal("show");
}
function fechar_modal_tela_caixa(m_name){
	localStorage.setItem("modal_ativo_caixa", "0");
	$("#"+m_name).modal("hide");
}
function set_tipo_consulta_caixa(idtipoconsulta){
	if(idtipoconsulta==1){
		localStorage.setItem("tp_pesquisa", "1");
		$("#venda_categ_caixa").show();
		$("#venda_codbarras_caixa").hide();
		$(".categoria_contener").hide();
		$(".codbarrasvendas").show();
	}
	if(idtipoconsulta==2){
		localStorage.setItem("tp_pesquisa", "2");
		listar_categorias_tela_caixa();
		$("#venda_codbarras_caixa").show();
		$("#venda_categ_caixa").hide();
		$(".codbarrasvendas").hide();
		$(".categoria_contener").show();
	}
}
function gerar_linhas_imprimir(){
	
	for (var i = 0; i < info_emp.length; i++) {	
		printt_texto
		mostrar_print(formatar_texto(info_emp[i].nome,"c"));   
		mostrar_print(formatar_texto(info_emp[i].municipio,"c")); 
		mostrar_print(formatar_texto(info_emp[i].endereco,"e")); 
		mostrar_print(formatar_texto(info_emp[i].cnpj,"e")); 
		mostrar_print(formatar_texto(info_emp[i].fone,"e"));
	}
	
}
function mostrar_print(vva){
	console.log(vva);
}
function formatar_texto(texto,alinhamento){
	tp_printt=localStorage.getItem("tp_impressora_t");
	if(tp_printt==null){
		localStorage.setItem("tp_impressora_t", 1);
		return formatar_texto(texto,alinhamento);		
	}
	if(tp_printt=="1"){
		tp_printt_caracter=32;
	}
	if(tp_printt=="2"){
		tp_printt_caracter=48;
	}
	
	if(is_impa_par(texto.length)=="1"){		
		texto=texto+" ";
	}
	
	if(alinhamento=="c"){
		calc_c = parseInt(tp_printt_caracter) - parseInt(texto.length);
		texto = preencher_vazio(calc_c/2)+texto+preencher_vazio(calc_c/2);
	}
	if(alinhamento=="d"){
		calc_c = parseInt(tp_printt_caracter) - parseInt(texto.length);
		texto = preencher_vazio(calc_c)+texto;
	}
	if(alinhamento=="e"){
		calc_c = parseInt(tp_printt_caracter) - parseInt(texto.length);
		texto = texto+preencher_vazio(calc_c);
	}
	return (texto.toUpperCase());
	
}
function preencher_vazio(qtdvazio){	
	vazio_pp= " ";
	resultado_pp="";
	for (var i = 0; i < qtdvazio; i++) {	
		resultado_pp=resultado_pp+vazio_pp;
	}
	return resultado_pp;
}
function is_impa_par(numis){
	numis/2;
	if(numis & 1){
		return "1";
	} 
	else {
		return "0";
	}	
}
function add_produto_caixa_memoria(codbarras,descprod,valor,qtd,id_item){
    var ddpcx = localStorage.getItem("mmlistprodcx");
	if(ddpcx == null){
		localStorage.setItem("mmlistprodcx", "[]");
		add_produto_caixa_memoria(codbarras,descprod,valor,qtd,id_item);
		return false;
	}    
        
	dados = JSON.parse(ddpcx);
	var a = new Object();
	a.codbarras = codbarras;
	a.descprod = descprod;
	a.valor = valor; 
	a.qtd = qtd;
	a.id_item = id_item;
	a.is_composicao = false;
	a.composicao = [];
	dados.push(a);      
	var b = JSON.stringify(dados, null, 0);
	localStorage.setItem("mmlistprodcx", b);	
	list_prod_caixa();
}
function list_prod_caixa(){
	var dados = localStorage.getItem("mmlistprodcx");
    $("#subtotal_title").html("0,00");
    if(dados == null){
                
    }
    else{
        var dados = JSON.parse(dados);
        $("#list_notta").html("");
        sval=0;
        for (var i = 0; i < dados.length; i++) {
            sval = parseFloat(sval)+parseFloat(dados[i].valor*dados[i].qtd);			
			$("#list_notta").append("<tr class='td_super_pgato'><td>"+("000"+(parseInt(i)+parseInt(1))).slice(-3)+"</td><td colspan='2'>"+dados[i].codbarras+"</td><td colspan='2'><div>"+dados[i].descprod+"</div></td></tr>");
			$("#list_notta").append("<tr class='td_botton_pgato'><td class='text-center'>"+dados[i].qtd+"</td><td class='text-center'>und</td><td class='text-center'>"+convert_banco_moeda(dados[i].valor)+"</td><td class='text-center'>=</td><td class='text-right'>"+convert_banco_moeda(parseFloat(dados[i].valor)*dados[i].qtd)+"</td></tr>"); 
			console.log(sval);
        }
        if(sval == 0){return false;}
		
        $("#subtotal_title").html(convert_banco_moeda(sval));    
		$('#scrol_list_prod').scrollTop($('#scrol_list_prod')[0].scrollHeight);
    }
}
function listar_categorias_tela_caixa(){
	$("#list_categoria_tela_cx").html("");
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "12"
        },
		dataType: "json",
        type: "POST",
        success: function(j) {							
			$("#list_categoria_tela_cx").html("");		
			if(j==null){
				return false;
			}
			for (var i = 0; i < j.length; i++) { 
				$("#title_vend_categ_caixa").text("Vendas Por Categoria");
				$("#list_categoria_tela_cx").append("<li><div class='col-lg-8 col-md-8 col-sm-8' style='padding: 0'>"+j[i].descricao.toUpperCase()+"</div><div class='col-lg-4 col-md-4 col-sm-4' style='padding-right: 0;text-align: right'><button type='button' class='btn btn-primary btn-sm' onclick='list_prod_por_categ_tl_caixa("+j[i].id+",\""+j[i].descricao.toUpperCase()+"\")'>"+j[i].qtd_prod+" PRODUTOS</button></div><div class='brack'></div></li>");								
			}			
        },
		error: function(XMLHttpRequest, textStatus, errorThrown) {			
					
		}
    });
}
function list_prod_por_categ_tl_caixa(idcatg,descateg){
	$("#list_categoria_tela_cx").html("");
	$("#title_vend_categ_caixa").html("");
	on_load_carga("on","#codbbarras");
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "11",
			p1: "4",
			p2: idcatg,
			p3: "false"
        },
		dataType: "json",
        type: "POST",
        success: function(j) {	
			
			on_load_carga("off","#codbbarras");			
			
			for (var i = 0; i < j.length; i++) { 
				if(j[i].result=="false"){					
					alert("PRODUTO NÃO LOCALIZADO");					
					return false;
				}
				$("#title_vend_categ_caixa").html("<button type='button' onclick='set_tipo_consulta_caixa(2);' class='btn btn-primary btn-sm'>VOLTAR</button> Categoria: "+descateg);
				$("#list_categoria_tela_cx").append("<li><div class='col-lg-8 col-md-8 col-sm-8' style='padding: 0;overflow: auto;'>"+j[i].nome.toUpperCase()+"</div><div class='col-lg-4 col-md-4 col-sm-4' style='padding-right: 0;text-align: right'><button type='button' class='btn btn-primary btn-sm' onclick='add_prod_get_qtd_categ(\""+j[i].cod_barras+"\",\""+j[i].nome.toUpperCase()+"\",\""+j[i].valor+"\",\""+j[i].idd+"\",\""+j[i].qtd_composicao+"\");'>ADD PRODUTO</button></div><div class='brack'></div></li>");			
			}			
        },
		error: function(XMLHttpRequest, textStatus, errorThrown) {			
			on_load_carga("off","#codbbarras");			
		}
    });
}
function add_prod_get_qtd_categ(cod_barras,desc_p,valor,iddp,qtd_composicao){	
	if(qtd_composicao == "0"){		
		$("#title_qtd_categ_cax").text(desc_p);	
		$("#qtd_prod_pesq_categ_cx").attr("cod_barras",cod_barras);
		$("#qtd_prod_pesq_categ_cx").attr("valor",valor);
		$("#qtd_prod_pesq_categ_cx").attr("iddp",iddp);
		$("#qtd_prod_pesq_categ_cx").attr("descprod",desc_p);
		$("#qtd_prod_pesq_categ_cx").val("1,000");
		$("#modal_get_unid_pesqcateg_caixa").modal("show");
		setTimeout(function(){$("#qtd_prod_pesq_categ_cx").focus();$("#qtd_prod_pesq_categ_cx").select();},600);
		return false
	}
	if(qtd_composicao !== "0"){		
		get_prod_composto_caixa(iddp);
	}
}
function add_prod_memory_categ_caixa(){
	codbarras=$("#qtd_prod_pesq_categ_cx").attr("cod_barras");
	valor=$("#qtd_prod_pesq_categ_cx").attr("valor");
	descprod=$("#qtd_prod_pesq_categ_cx").attr("descprod");
	id_item=$("#qtd_prod_pesq_categ_cx").attr("iddp");
	qtd=$("#qtd_prod_pesq_categ_cx").val();
	add_produto_caixa_memoria(codbarras,descprod,valor,qtd,id_item);
	$("#modal_get_unid_pesqcateg_caixa").modal("hide");
}
function get_prod_composto_caixa(iddp){
	on_load_carga("on","#codbbarras");
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "11",
			p1: "3",
			p2: iddp,
			p3: "true"
        },
		dataType: "json",
        type: "POST",
        success: function(j) {				
			on_load_carga("off","#codbbarras");			
			
			for (var i = 0; i < j.length; i++) { 
				if(j[i].result=="false"){					
					alert("PRODUTO NÃO LOCALIZADO");					
					return false;
				}
				localStorage.setItem("prod_composto_cx_qtd_total", j[i].qtd_composicao);
				localStorage.setItem("prod_composto_cx_qtd_inicio", "0");
				localStorage.setItem("prod_composto_cx_listt", JSON.stringify(j[i].composicao, null, 0));		
				$("#name_prod_composto_pedido").text(j[i].nome);
				get_next_composi_cx_pedido("1");
				$("#modal_prod_composto_caixa").modal("show");
			}			
        },
		error: function(XMLHttpRequest, textStatus, errorThrown) {			
			on_load_carga("off","#codbbarras");			
		}
    });
}
function get_next_composi_cx_pedido(seq_compos){
	
	var listt_comp = localStorage.getItem("prod_composto_cx_listt");
    $("#list_composicao_modal_cx").html("");
	$("#title_compos_pord_caix").text("");
    if(listt_comp == null){
                
    }
    else{
        var listt_comp = JSON.parse(listt_comp);
        
        for (var i = 0; i < listt_comp.length; i++) {
			if(listt_comp[i].seq == seq_compos){
				$("#title_compos_pord_caix").text(listt_comp[i].desc);
				$("#desc_prod_comp_caix").text("Selecione os complemento desejados. Mínimo: 0 / Máximo:"+listt_comp[i].qtd_n);
				for (var i2 = 0; i2 < listt_comp[i].list_n.length; i2++) {					
					$("#list_composicao_modal_cx").append("<li><div class='col-lg-8 col-md-8 col-sm-8' style='padding: 0'>"+listt_comp[i].list_n[i2].desc.toUpperCase()+"</div><div class='col-lg-4 col-md-4 col-sm-4' style='padding-right: 0;text-align: right'><button type='button' onclick='set_acomp(1,"+listt_comp[i].id_composicao+","+listt_comp[i].list_n[i2].id_composicao_item+","+listt_comp[i].qtd_n+",1);' class='cor_vermelho'>REMOVER</button><input class='acomp_number_"+listt_comp[i].list_n[i2].id_composicao_item+"' name='acomp_n_"+listt_comp[i].id_composicao+"' type='text' disabled style='width: 30px;margin: 0 5px;text-align: center' value='0'><button type='button' onclick='set_acomp(2,"+listt_comp[i].id_composicao+","+listt_comp[i].list_n[i2].id_composicao_item+","+listt_comp[i].qtd_n+",1);' class='cor_verd'>ADICIONAR</button></div><div class='brack'></div></li>");
				}	
				if(listt_comp[i].qtd_e == "0"){
					$("#contener_extra_caixa_compost").hide();
				}
				if(listt_comp[i].qtd_e !== "0"){
					$("#contener_extra_caixa_compost").show();
					$("#title_compos_pord_caix_ex").text("Opções Extras");
					$("#desc_prod_comp_caix_ex").text("Selecione os complemento desejados. Mínimo: 0 / Máximo:"+listt_comp[i].qtd_e);
					for (var i2 = 0; i2 < listt_comp[i].list_e.length; i2++) {
						$("#list_composicao_modal_cx_ex").append("<li><div class='col-lg-6 col-md-6 col-sm-6 col-xd-6' style='padding: 0'>"+listt_comp[i].list_e[i2].desc.toUpperCase()+"</div><div class='col-lg-3 col-md-3 col-sm-3 col-xd-3' style='padding-right: 0;text-align: right'>R$ "+convert_banco_moeda(listt_comp[i].list_e[i2].valor)+"</div><div class='col-lg-3 col-md-3 col-sm-3' style='padding-right: 0;text-align: right'><button type='button' onclick='set_acomp(1,"+listt_comp[i].id_composicao+","+listt_comp[i].list_e[i2].id_composicao_item+","+listt_comp[i].qtd_e+",2);' class='cor_vermelho'>REMOVER</button><input class='acomp_number_e_"+listt_comp[i].list_e[i2].id_composicao_item+"' name='acomp_e_"+listt_comp[i].id_composicao+"' type='text' disabled style='width: 30px;margin: 0 5px;text-align: center' value='0'><button type='button' onclick='set_acomp(2,"+listt_comp[i].id_composicao+","+listt_comp[i].list_e[i2].id_composicao_item+","+listt_comp[i].qtd_e+",2);' class='cor_verd'>ADICIONAR</button></div><div class='brack'></div></li>");
					}	
				}
				
				$("#list_composicao_modal_cx_butn_next").html("<li onclick='netx_acomp("+listt_comp[i].id_composicao+");' class='btn btn-primary btn-sm'>PRÓXIMO</li>");
			}		 
        }        
    }
}
function set_acomp(tp,vlg,vli,max_v,tp2){
	if(tp2==1){
		if(tp==1){
			vlatu=$(".acomp_number_"+vli).val();
			vlg_sum=0; 
			subta=parseInt(vlatu)-parseInt(1);	
			$("input[name='acomp_n_"+vlg+"']").each(function(){vlg_sum=parseInt(vlg_sum)+parseInt($(this).val());});
			if(subta>=0){
				$(".acomp_number_"+vli).val(subta);
			}		
		}
		if(tp==2){
			vlatu=$(".acomp_number_"+vli).val();
			vlg_sum=0; 
			subta=parseInt(vlatu)+parseInt(1);	
			$("input[name='acomp_n_"+vlg+"']").each(function(){vlg_sum=parseInt(vlg_sum)+parseInt($(this).val());});
			console.log(vlg_sum);
			if(vlg_sum>=max_v){
				alert("Quantidade não permitida");
			}
			if(subta>=0 && vlg_sum<max_v){
				$(".acomp_number_"+vli).val(subta);
			}
		}
	}
	if(tp2==2){
		if(tp==1){
			vlatu=$(".acomp_number_e_"+vli).val();
			vlg_sum=0; 
			subta=parseInt(vlatu)-parseInt(1);	
			$("input[name='acomp_e_"+vlg+"']").each(function(){vlg_sum=parseInt(vlg_sum)+parseInt($(this).val());});
			if(subta>=0){
				$(".acomp_number_e_"+vli).val(subta);
			}		
		}
		if(tp==2){
			vlatu=$(".acomp_number_e_"+vli).val();
			vlg_sum=0; 
			subta=parseInt(vlatu)+parseInt(1);	
			$("input[name='acomp_e_"+vlg+"']").each(function(){vlg_sum=parseInt(vlg_sum)+parseInt($(this).val());});
			console.log(vlg_sum);
			if(vlg_sum>=max_v){
				alert("Quantidade não permitida");
			}
			if(subta>=0 && vlg_sum<max_v){
				$(".acomp_number_e_"+vli).val(subta);
			}
		}
	}
}
function direcionar(linkd){
	location.href=linkd;
}
function list_blutoo(){	
	BTPrinter.list(function(data){
		$("#config_print_list").html("");		
		for (var i = 0; i < data.length; i++) {				
			$("#config_print_list").append("<li onclick='conect_bb(\""+data[i]+"\")'>"+data[i]+"</li>");
		}			
	},
	function(err){			
		alert(err);			
		console.log(err);
	});
}
function cancel_compra_caixa(){
	var r = confirm("DESEJA CANCELAR A COMPRA?");       
     
    if(r == false) {
        return false;  
    }
    if (r == true) {
		localStorage.setItem("mmlistprodcx", "[]");
		list_prod_caixa();
	}
}
function set_contener_cad(idcontt){
	$(".lista_lateral li").removeClass("ativo_contener_cad"); 
	$(".marcador_conter_js_cad").hide();
	$("#contener_cadastro_"+idcontt).show();
	$("#li_set_cont_"+idcontt).addClass("ativo_contener_cad");
	if(idcontt==1){
		list_produto_tladdprod();
	}
}
function list_produto_tladdprod(){
	el2="#list_prod_card";
    $(el2).html("BUSCANDO LISTA");
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "2"
        },
        dataType: "json",
        type: "POST",
        success: function(j) {  
			vrl="";
            for (var i = 0; i < j.length; i++) {       
				vrl+="<tr class='tr_table_prod' idx='"+i+"' id='tr_prod_"+j[i].idprod_item+"'>";				
					vrl+="<td>"+j[i].nome.toUpperCase()+"</td>";
					vrl+="<td>"+j[i].cod_barras+"</td>";
					vrl+="<td>R$ "+convert_banco_moeda(j[i].valor)+"</td>";
					vrl+="<td>"+j[i].desc_cat+"</td>";		
				vrl+="<td class='text_r'><button type='button' class='btn btn-sm btn-primary btn_icon' onclick='detalhes_prod_adm("+j[i].id_prod+");'><img src='../img/edit.png'></button><button style='margin-left: 3px;' type='button' class='btn btn-sm btn-danger btn_icon' onclick='btn_dell_prod_cad(\""+j[i].id_prod+"\",\""+j[i].nome+"\");'><img src='../img/trash.png'></button></td>";
				vrl+="</tr>";            								  				               
            }  
			$(el2).html(vrl);
        }
    });
}
function direct(){
	log=$("#log").val();
	senha=$("#pass").val();
	y = localStorage.getItem("ide");
	$.ajax({            
		url: xurlq,
		 data: {
			y: y,            
			s: "13",
			p1: log,
			p2: senha,
			p3: "false"
		},
		dataType: "json",
		type: "POST",
		success: function(json) {
			
			if(json!==null){
				for (var i = 0; i < json.length; i++) {     
					if(json[i].result !== "false"){	
						localStorage.setItem("namee", encode_text(json[i].nome));						
						localStorage.setItem("ide", json[i].id_banco);
						location.href="sistema/index.html";					
					} 
					else{
						alert("VERIFIQUE SEU LOGIN "+decode_text(json[i].pe));
					}
				}
			}
			else{
				alert("VERIFIQUE SEU LOGIN");
			}
		},
        error: function(XMLHttpRequest, textStatus, errorThrown) {            
            alert("VERIFIQUE AS INFORMAÇÕES, E TENTE NOVAMENTE");                    
        }
	});		
}
function sair_sistema_web(){	
	location.href='../index.html';
    //localStorage.removeItem("ide"); 
}
function valid_login(){
	vlo = localStorage.getItem("namee");  	
	$("#empresas_log_user").html("<option value='"+decode_text(vlo)+"'>"+decode_text(vlo)+"</option>");
	valid_login2();
	setInterval(valid_login2,3000);
}
function valid_login2(){	
	vlo2 = localStorage.getItem("ide"); 
	if(vlo2==null){
		sair_sistema_web();
	}
}
function finalizar_compra_cx(){
	localStorage.setItem("formpagtocx", "[]");
	$("#list_pagto_selectd").html("");
	list_forma_pagamento_caixa();
	list_cliente_tela_pagto_cx("xxx");
	$("#modal_finalize_compra").modal("show");
}
function list_forma_pagamento_caixa(){
	el16="#list_form_pagto_caixa";
    $(el16).html("BUSCANDO LISTA");
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "16"
        },
        dataType: "json",
        type: "POST",
        success: function(j) {  
			$(el16).html("");
            for (var i = 0; i < j.length; i++) {				
				$(el16).append("<div class='col-lg-3 col-md-3 col-sm-3 col-xs-3'><div onclick='salve_vl_form_pagto_cx("+j[i].id_forma_pagamento+",\""+j[i].descricao+"\");' class='form-group text_c f_pagto'><img src='../img/"+j[i].img+"'><p>"+j[i].descricao+"</p></div></div>");
            }		
        }
    });
}
function set_pagto_forma(idf_pagto,desc){
	vlntsum=convert_moeda_banco($("#subtotal_title").text());
	sumseld=sum_formpagto_seled_caixa();
	console.log("p1-> "+vlntsum);
	console.log("p2-> "+sumseld);
	if(parseFloat(vlntsum) <= parseFloat(sumseld)){
		console.log("aqui");
		return false
	}
	add_tipo_form_pagto_memoria(idf_pagto,desc,(parseFloat(vlntsum)-parseFloat(sumseld)));
}
function is_existe_crediario(){	        
	dadosisexit = JSON.parse(localStorage.getItem("formpagtocx"));	
	for (var i = 0; i < dadosisexit.length; i++) {
		if(dadosisexit[i].id == "2"){
			return("true");
		}				
	}       
	return("false");    
}
function finalizar_compra_cx2(){
	p_list_p 			= localStorage.getItem("mmlistprodcx");
	p_list_from_pagto	= localStorage.getItem("formpagtocx");
	id_cliente			= $("#id_cliente_list_pagto_cx option:selected").val();
	
	valid_crediario=is_existe_crediario();
	
	if(valid_crediario=="true"){
		if(id_cliente == "-1"){
			alert("SELECIONE O CREDOR");
			return false;
		}		
	}
	
	on_load_carga("on","#btn_finaly_compra_cx");
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "1",
            s: "14",
			p1: p_list_p,
			p2: p_list_from_pagto,
			p3: id_cliente
        },
        dataType: "json",
        type: "POST",
        success: function(j) {			
            for (var i = 0; i < j.length; i++) { 
				if(j[i].result=="false"){
					alert(decode_text(j[i].pe));
					console.log(decode_text(j[i].pe));
					on_load_carga("off","#btn_finaly_compra_cx");	
					return false;
				}
				if(j[i].result=="true"){
					on_load_carga("off","#btn_finaly_compra_cx");					
					localStorage.removeItem("mmlistprodcx");
					localStorage.removeItem("prod_composto_cx_listt");
					$("#list_notta").html("");
					$("#subtotal_title").html("0,00");
					alert("COMPRA REALIZADA COM SUCESSO");					
					
					for (var i2 = 0; i2 < j[i].p1.length; i2++) { 
						printt_texto(formatar_texto(j[i].p1[i2].empresa.toUpperCase(),"c"));
						printt_texto(formatar_texto(" ","c"));
						printt_texto(formatar_texto(j[i].p1[i2].telefone,"c"));
						printt_texto(formatar_texto(j[i].p1[i2].endereco+" "+j[i].p1[i2].numero,"c"));
						printt_texto(formatar_texto(j[i].p1[i2].cidade+" "+j[i].p1[i2].uf,"c"));
						printt_texto(formatar_texto(j[i].p1[i2].data_hora,"c"));
						printt_texto(formatar_texto("--------------------------------","c"));
						printt_texto(formatar_texto("COD: "+j[i].p1[i2].sequencia,"e"));
						printt_texto(formatar_texto("--------------------------------","c"));
						printt_texto(formatar_texto(" ","c"));
						for (var i3 = 0; i3 < j[i].p1[i2].list_itens.length; i3++) { 
													
							printt_texto(formatar_texto(("000"+j[i].p1[i2].list_itens[i3].seq).slice(-3)+" "+j[i].p1[i2].list_itens[i3].nome,"e")); 
							printt_texto(formatar_texto(j[i].p1[i2].list_itens[i3].qtd+" unid "+convert_banco_moeda(j[i].p1[i2].list_itens[i3].valor)+" = "+convert_banco_moeda(j[i].p1[i2].list_itens[i3].vl_total),"e")); 
						}
						printt_texto(formatar_texto("--------------------------------","c"));
						printt_texto(formatar_texto("TOTAL: "+convert_banco_moeda(j[i].p1[i2].valor_total),"d"));
					}
					printt_texto(formatar_texto(" ","c"));
					printt_texto(formatar_texto("VENDANEX.COM","c"));
					printt_texto(formatar_texto(" ","c"));
					printt_texto(formatar_texto(" ","c"));
					printt_texto(formatar_texto("--------------------------------","c"));
					printt_texto(formatar_texto(" ","c"));
				}
				
            } 		
			$("#modal_finalize_compra").modal("hide");
			on_load_carga("off","#btn_finaly_compra_cx");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            on_load_carga("off","#btn_finaly_compra_cx");
			alert("ERROR TENTE NOVAMENTE");
        }
    });	
}
function list_all_vendas(){
	elem_15="#list_all_vendas";
	$(elem_15).html("BUSCANDO LISTA");
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "15"
        },
		dataType: "json",
        type: "POST",
        success: function(j) {			
			$(elem_15).html("");
			ddiia="";
			line_head=0;
			soma_loop_15=0;
			for (var i = 0; i < j.length; i++) { 
				if(j[i].result=="false"){					
					alert("ERRO");					
					return false;
				}		
				if(ddiia !== j[i].dia){
					ddiia = j[i].dia;
					soma_loop_15=0;
					line_head=parseInt(line_head)+parseInt(1);
					
					$(elem_15).append("<tr class='marq_line'><td></td><td></td><td class='text_c' style='font-weight: bold;'>"+j[i].dia+"</td><td></td><td style='font-weight: bold;' id='line_head_"+line_head+"' class='text_r'></td><td></td></tr>");
				}
				if(ddiia == j[i].dia){
					soma_loop_15=parseFloat(soma_loop_15)+parseFloat(j[i].soma);					
					$("#line_head_"+line_head).html(convert_banco_moeda(soma_loop_15));
				}
				$(elem_15).append("<tr><td>"+j[i].sequencia+"</td><td class='text_c'>"+j[i].situacao+"</td><td class='text_c'>"+j[i].data_hora+"</td><td class='text_c'>"+j[i].origem+"</td><td class='text_r'>"+convert_banco_moeda(j[i].soma)+"</td><td class='text_c'><button "+j[i].cod_barras+">DETALHE</button></td></tr>");	  			
			}			
        },
		error: function(XMLHttpRequest, textStatus, errorThrown) {			
			on_load_carga("off","#codbbarras");			
		}
    });
}
function add_tipo_form_pagto_memoria(iddform,descform,valorform){
    var ddfpcx = localStorage.getItem("formpagtocx");
	if(ddfpcx == null){
		localStorage.setItem("formpagtocx", "[]");
		return add_produto_caixa_memoria(iddform,descform,valorform);		
	}        
	dados = JSON.parse(ddfpcx);
	var a = new Object();
	a.id = iddform;
	a.desc = descform;
	a.valor = valorform; 	
	dados.push(a);      
	var b = JSON.stringify(dados, null, 0);
	localStorage.setItem("formpagtocx", b);	
	list_formpagto_seled_caixa();
}
function list_formpagto_seled_caixa(){
	var dados = localStorage.getItem("formpagtocx");
    
    if(dados == null){
                
    }
    else{
        var dados = JSON.parse(dados);
		elesel="#list_pagto_selectd";
        $(elesel).html("");
        sval3=0;
        for (var i = 0; i < dados.length; i++) {
            sval3 = parseFloat(sval3)+parseFloat(dados[i].valor);			
			$(elesel).append("<tr><td>"+(parseInt(i)+parseInt(1))+"</td><td>"+dados[i].desc+"</td><td class='text_r' idform='"+dados[i].id+"' descform='"+dados[i].desc+"' id='line_pagto_form_pagto_"+i+"'>"+convert_banco_moeda(dados[i].valor)+"</td><td class='text_r'><button type='button' id='btn_salve_forma_pgto_"+i+"' onclick='salve_vl_form_pagto_cx1("+i+");' class='btn btn-primary btn-sm btnsavelistformpagto' style='margin-right: 6px;display:none;'>SALVAR</button><button type='button' onclick='edi_vl_form_pagto_cx("+i+");' class='btn btn-success btn-sm btnformpagtoocult' style='margin-right: 6px;'>EDITAR</button><button type='button' onclick='dell_list_form_pagto("+i+");' class='btn btn-danger btn-sm btnformpagtoocult'>CANCELAR</button></td></tr>");
			
			
        }        
        $(elesel).append("<tr class='marq_line'><td></td><td style='font-weight: bold;'>TOTAL</td><td style='font-weight: bold;' class='text_r'>R$ "+convert_banco_moeda(sval3)+"</td><td></td></tr>");  
		vlnota_sum=$("#subtotal_title").text();
		if(convert_banco_moeda(sval3) == vlnota_sum){
			$("#btn_finliz_pagto_cxx").attr("disabled", false);
		}
		if(convert_banco_moeda(sval3) !== vlnota_sum){
			$("#btn_finliz_pagto_cxx").attr("disabled", true);
		}
    }
}
function sum_formpagto_seled_caixa(pp){
	var dados = localStorage.getItem("formpagtocx");
    
    if(dados == null){
                
    }
    else{
        var dados = JSON.parse(dados);		
        sval=0;
        for (var i = 0; i < dados.length; i++) {
			if(pp == undefined){
				sval = parseFloat(sval)+parseFloat(dados[i].valor);	
			} 
			if(pp !== undefined){
				if(pp !== i){
					sval = parseFloat(sval)+parseFloat(dados[i].valor);	
				}				
			} 
        }        
        return sval;
    }
}
function edi_vl_form_pagto_cx(idform){	
	$("#line_pagto_form_pagto_"+idform).html("<input indexx='"+idform+"' id='imput_line_pagto_form_pagto_"+idform+"' class='form-control text_r input_edit_vl_pagto' onkeypress=\" return(MascaraMoeda(this,'.',',',event))\" onblur=\"return(MascaraMoeda(this,'.',',',event))\" onfocus=\" return(MascaraMoeda(this,'.',',',event))\" type='text' value='"+$("#line_pagto_form_pagto_"+idform).text()+"'>");
	
	$("#btn_salve_forma_pgto_"+idform).css("display","");
	$(".btnformpagtoocult").hide();
	$("#imput_line_pagto_form_pagto_"+idform).select();
}
function salve_vl_form_pagto_cx1(idform2){	
	sumlistatual	= sum_formpagto_seled_caixa(idform2);
	input_edit		= $("#imput_line_pagto_form_pagto_"+idform2).val();
	totalnt			= convert_moeda_banco($("#subtotal_title").text());
	suminfos		= convert_banco_moeda(parseFloat(sumlistatual)+parseFloat(input_edit));
	
	
	if(parseFloat(convert_moeda_banco(suminfos)) <= parseFloat(totalnt)){	
		idformpagtto	=$("#line_pagto_form_pagto_"+idform2).attr("idform");
		descformpagtto	=$("#line_pagto_form_pagto_"+idform2).attr("descform");
		dell_list_form_pagto(idform2);	
		
		add_tipo_form_pagto_memoria(idformpagtto,descformpagtto,convert_moeda_banco(input_edit));
	}
}
function salve_vl_form_pagto_cx(idform,desc){
	sumlistatual	= sum_formpagto_seled_caixa();	
	totalnt			= convert_moeda_banco($("#subtotal_title").text());
	suminfos		= (parseFloat(totalnt)-parseFloat(sumlistatual));	
	
	if(suminfos==0){
		return false;
	}
	
	if(parseFloat(suminfos) <= parseFloat(totalnt)){	
		add_tipo_form_pagto_memoria(idform,desc,suminfos);
	}
}
function dell_list_form_pagto(id){    
    var dados = localStorage.getItem("formpagtocx");
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
    localStorage.setItem("formpagtocx", novoDados);
	list_formpagto_seled_caixa();
    return true;    
}
function list_cliente_tela_pagto_cx(pp){
	ele17="#id_cliente_list_pagto_cx";
	$(ele17).html("");
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "17"
        },
        dataType: "json",
        type: "POST",
        success: function(json) {               
            $(ele17).html("<option value='-1'>SELECIONE</option>");  
			if(json==null){
				$(ele17).html("<option value='-1'>NÃO EXISTE CLIENTE</option>");
				return false;
			}
            for (var i = 0; i < json.length; i++) {                               
            	$(ele17).append("<option value='"+json[i].id+"'>"+json[i].nome+"</option>");        
            } 
			if(pp !== "xxx"){
				$(ele17).val(pp);
			}			
        }
    });
}
function add_cliente_pagto_cx(){
	$("#modal_finalize_compra").modal("hide");
	list_estado_generic("#estado_cliente_new");
	list_cidade_generic("#cidade_cliente_new","xxx");
	$("#modal_add_cliente").modal("show");
}
function mascaracpf_cnpj(o,f){
    v_obj=o
    v_fun=f
    setTimeout('execmascara()',1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function volta_tela_form_pagto_cx(){	
	$("#modal_add_cliente").modal("hide");
	$("#modal_finalize_compra").modal("show");
}
function cpfCnpj(a){
    return a=a.replace(/\D/g,""),a.length<=12?(a=a.replace(/(\d{3})(\d)/,"$1.$2"),a=a.replace(/(\d{3})(\d)/,"$1.$2"),a=a.replace(/(\d{3})(\d{1,2})$/,"$1-$2")):(a=a.replace(/^(\d{2})(\d)/,"$1.$2"),a=a.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3"),a=a.replace(/\.(\d{3})(\d)/,".$1/$2"),a=a.replace(/(\d{4})(\d)/,"$1-$2")),a
}
function list_estado_generic(ele_g_18){	
	$(ele_g_18).html("<option value='-1'>BUSCANDO LISTA</option>");
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "18"
        },
        dataType: "json",
        type: "POST",
        success: function(json) {               
            $(ele_g_18).html("<option value='-1'>SELECIONE</option>");  
			if(json==null){
				$(ele_g_18).html("<option value='-1'>NÃO EXISTE CLIENTE</option>");
				return false;
			}
            for (var i = 0; i < json.length; i++) {                               
            	$(ele_g_18).append("<option value='"+json[i].id+"' uf='"+json[i].uf+"'>"+json[i].nome+"</option>");      
            }            
        }
    });
}
function list_cidade_generic(ele_g_19,filtr19){	
	$(ele_g_19).html("<option value='-1'>BUSCANDO LISTA</option>");
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "19"
        },
        dataType: "json",
        type: "POST",
        success: function(json) {               
            $(ele_g_19).html("<option value='-1'>SELECIONE</option>");  
			if(json==null){
				$(ele_g_19).html("<option value='-1'>NÃO EXISTE CLIENTE</option>");
				return false;
			}
            for (var i = 0; i < json.length; i++) {    
				if(filtr19 !== "xxx" && filtr19 == json[i].uf){
					$(ele_g_19).append("<option value='"+json[i].id+"' uf='"+json[i].uf+"'>"+json[i].nome+"</option>"); 
				}
				if(filtr19 == "xxx"){
					$(ele_g_19).append("<option value='"+json[i].id+"' uf='"+json[i].uf+"'>"+json[i].nome+"</option>"); 
				}            	     
            }            
        }
    });
}
function sele_cid_generic(ttpec){
	if(ttpec=="e"){		
		ufselec=$(".estadds option:selected").attr("uf");
		list_cidade_generic("#cidade_cliente_new",ufselec);
	}
	if(ttpec=="c"){
		ufselec=$(".cidadds option:selected").attr("uf");		
		$(".estadds option[uf='"+ufselec+"']").prop("selected", true);		
	}
}
function save_new_cliente_cx(){
	name_20		= $("#name_cliente_new").val();
	cpf_20		= $("#cpf_cliente_new").val();
	cep_20		= $("#cpe_cliente_new").val();
	cidad_20	= $("#cidade_cliente_new option:selected").val();
	enderenc_20	= $("#ender_cliente_new").val();
	num_20		= $("#num_cliente_new").val();
	obs_20		= $("#obs_cliente_new").val();
	
	on_load_carga("on","#btn_add_new_cliente_cxx");
	
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "20",
			p1: name_20,
			p2: cpf_20,
			p3: cep_20,
			p4: cidad_20,
			p5: enderenc_20,
			p6: num_20,
			p7: obs_20
        },
        dataType: "json",
        type: "POST",
        success: function(json) {  
			for (var i = 0; i < json.length; i++) { 
				if(json[i].result !== "false"){
					$("#name_cliente_new").val("");
					$("#cpf_cliente_new").val("");
					$("#cpe_cliente_new").val("");
					$("#ender_cliente_new").val("");
					$("#num_cliente_new").val("");
					$("#obs_cliente_new").val("");
					alert("ADICIONADO COM SUCESSO");
					$("#modal_add_cliente").modal("hide");
					$("#modal_finalize_compra").modal("show");
					list_cliente_tela_pagto_cx(json[i].p1);
					on_load_carga("off","#btn_add_new_cliente_cxx");
				}
				else{
					on_load_carga("off","#btn_add_new_cliente_cxx");
					alert("ERRO "+decode_text(json[i].pe));					
				}
			}
		}
	});		
}
function detalhes_prod_adm(idprodd){
	$("#title_prod_edit").attr("id_prod_edit","-1");
	$("#title_prod_edit").html("");
	$("#cod_barras_prod_add_edit").val("");
	$("#nome_prod_add_edit").val("");	
	$("#vl_prod_add_edit").val("");	
	$("#desc_prod_add_edit").val("");	
	
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "11",
			p1: "5",
			p2: idprodd,
			p3: "true"
        },
		dataType: "json",
        type: "POST",
        success: function(j) {	
						
			for (var i = 0; i < j.length; i++) { 
				if(j[i].result=="false"){					
					alert("PRODUTO NÃO LOCALIZADO");					
					return false;
				}
				$("#title_prod_edit").html(j[i].nome);
				$("#title_prod_edit").attr("id_prod_edit",j[i].id_prod);
				if(j[i].cod_barras=="0"){
					codbarrasj="";
				}
				if(j[i].cod_barras!=="0"){
					codbarrasj=j[i].cod_barras;
				}
				$("#cod_barras_prod_add_edit").val(codbarrasj);
				$("#nome_prod_add_edit").val(j[i].nome);	
				$("#vl_prod_add_edit").val(convert_banco_moeda(j[i].valor));	
				$("#desc_prod_add_edit").val(j[i].descricao);
				list_categoria_add_prod("#list_categori_addprod_edit",j[i].id_cat);
				list_tipo_prod_add_prod("#tipoprodaddprod_edit",j[i].id_tipo);
			}				 
			
        },
		error: function(XMLHttpRequest, textStatus, errorThrown) {			
			alert("erro");					
		}
    });
	
	$("#modal_02_detalhe_edit").modal("show");
}
function edit_prod(){
	idproddedit=$("#title_prod_edit").attr("id_prod_edit");
	if(idproddedit == "-1"){
		alert("ERRO, FAVOR LOGAR NO SISTEMA NOVAMENTE");
		return false;
	}
	
	nome_prod_edit	=$("#nome_prod_add_edit").val();	
	tp_prod_edit	=$("#tipoprodaddprod_edit option:selected").val();
	tp_categ_edit	=$("#list_categori_addprod_edit option:selected").val();
	valor_prod_edit	=$("#vl_prod_add_edit").val();	
	desc_prod_edit	=$("#desc_prod_add_edit").val();	
	
	valor_prod_edit = convert_moeda_banco(valor_prod_edit);
	
	$.ajax({            
        url: xurlq,
         data: {
            y: y,
            u: "",
            s: "23",
			p1: idproddedit,
			p2: nome_prod_edit,
			p3: tp_prod_edit,
			p4: tp_categ_edit,
			p5: valor_prod_edit,
			p6: desc_prod_edit
        },
		dataType: "json",
        type: "POST",
        success: function(j) {	
						
			for (var i = 0; i < j.length; i++) { 
				if(j[i].result=="false"){					
					alert("PRODUTO NÃO ALTERADO");					
					return false;
				}
				alert("ALTERADO COM SUCESSO");
				list_produto_tladdprod();
				$("#modal_02_detalhe_edit").modal("hide");
			}				 
			
        },
		error: function(XMLHttpRequest, textStatus, errorThrown) {			
			alert("erro");					
		}
    });
}
function dell_categoria(idcateg,desc){
	var r = confirm("DESEJA EXCLUIR "+desc+"?");       
     
    if(r == false) {
        return false;  
    }
    if (r == true) {
		
		on_load_carga("on","#btn_categ_dell_"+idcateg);
		$.ajax({            
			url: xurlq,
			 data: {
				y: y,
				u: "",
				s: "24",
				p1: idcateg
			},
			dataType: "json",
			type: "POST",
			success: function(j) {  
				for (var i = 0; i < j.length; i++) { 
					if(j[i].result=="true"){	
						on_load_carga("off","#btn_categ_dell_"+idcateg);
						list_categoria();					
					}	
					else{
						alert(j[i].p1);
						console.log(j[i].p1);
						on_load_carga("off","#btn_categ_dell_"+idcateg);
					}
				}
			}
		});
	}
}
$(document).keypress(function(e) {
    if(e.which == 13) {
        if($(".input_edit_vl_pagto").val() !== undefined){		
			console.log("aqui"+$("input.input_edit_vl_pagto").focus());
			salve_vl_form_pagto_cx1(parseInt($(".input_edit_vl_pagto").attr("indexx")));
		}
    }
});