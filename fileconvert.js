$(document).ready(function () {
    $('#form').on('submit', function(e) {
        e.preventDefault();

        $("#loading").removeClass("hide");

        $.ajax({
            url : "getProductsWoo.php",
            type: "POST",
            data: {
              'url': $("#url").val(),
              'ck': $("#consumerKey").val(),
              'cs': $("#consumerSecretKey").val(),
              'cmd': $("#cmd").val().replace(/&/g, '\&')
            },
            success: function (data) {
              
              //console.log(data);
              var xmlFile = new Blob([convertWooToBuscape(JSON.parse(data))], { type: 'text/xml;charset="UTF-8"' });

              $("#download").attr("href", window.URL.createObjectURL(xmlFile));
              $("#loading").addClass("hide");
              $("#download").removeClass("hide");

            },
            error: function (jXHR, textStatus, errorThrown) {
                alert("aa" + errorThrown);
            }
        });
    });
});

function convertJSon2XML(json) {
    var x2js = new X2JS();
    var d = new Date();

    //"<?xml version="1.0" encoding="UTF-8" ?>',

    var xml = {
      buscape: {
        "data_atualizacao": d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear(),
        "produtos": json
      }
    };


    console.log(JSON.stringify(xml));

    return x2js.json2xml_str(xml);
}


function convertWooToBuscape(data) {

  var json = {
    produto: []
  };

  var value = 0;

  $.each(data, function(i, f) {

    var valor_total = parseFloat(f.price);
    var valor_parcela_cartao_3x_sem_juros = valor_total / 3;
    var valor_parcela_cartao_12x_com_juros = valor_total * 0.10040;
    var valor_total_cartao_12x_com_juros = valor_parcela_cartao_12x_com_juros * 12;
    
    json.produto.push({
      "agrupador" : f.id,
      "titulo" : f.name,
      "descricao" : f.short_description.replace(/"/g,"\'").replace(/&nbsp;/g," "),
      
      "canal_buscape" : {
        "canal_url": f.permalink,
        "valores": {
          "valor" : [
            {"forma_de_pagamento": "cartao_avista",
            "parcelamento": ("1x de R$ " + valor_total.toFixed(2)).replace('.',','),
            "canal_preco": ("R$ " + valor_total.toFixed(2)).replace('.',',') },

            {"forma_de_pagamento": "cartao_parcelado_com_juros",
            "parcelamento": ("12x de R$ " + valor_parcela_cartao_12x_com_juros.toFixed(2)).replace('.',','),
            "canal_preco": ("R$ " + valor_total_cartao_12x_com_juros.toFixed(2)).replace('.',',')},

            {"forma_de_pagamento": "cartao_parcelado_sem_juros",
            "parcelamento": ("3x de R$ " + valor_parcela_cartao_3x_sem_juros.toFixed(2)).replace('.',','),
            "canal_preco": ("R$ " + valor_total.toFixed(2)).replace('.',',')}
          ]
        }
      },

      "id_oferta": f.sku,
      "imagens": {
        "imagem": [{}]
      },
      "categoria": f.categories[0].name,
      "cod_barra": "",
      "isbn": "",
      "disponibilidade": "",
      "altura": f.dimensions.height,
      "comprimento": f.dimensions.width,
      "largura": f.dimensions.length,
      "peso": f.weight,
      "especificacoes":{
        "especificacao":{}
      },
      "atributos":{
        "atributo":{}
      }
    });

    if(f.stock_quantity != null){
      json.produto[value].disponibilidade = f.stock_quantity;
    }

    json.produto[value].imagens.imagem = f.images;

    $.each(json.produto[value].imagens.imagem,function(i,f){
      json.produto[value].imagens.imagem[i] = f.src;
    });

    if(f.attributes.length > 0){
      json.produto[value].especificacoes.especificacao = [f.attributes.length];

      $.each(f.attributes,function(i,f){
        var valor = "";
        $.each(f.options,function(i,ff){
          if(i < (f.options.length-1)){
            valor += ff + "/";
          }
          else {
            valor += ff ;
          }
        });

        var especif = {
          "nome": f.name,
          "valor": valor
        };

        json.produto[value].especificacoes.especificacao[i] = especif;

      });
    }
    else{
      json.produto[value].especificacoes.especificacao = [{
        "nome": " ",
        "valor": " "
      }];
    }

    json.produto[value].atributos.atributo = [{
      "nome": " ",
      "valor": " "
    }];

    value++;
  });

  return convertJSon2XML(json); //'<?xml version="1.0" encoding="ISO-8859-1" ?>\n' 

};
