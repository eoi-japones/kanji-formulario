"use strict";

var KE_Formulario_yomi_grupo;

//const PREFIX = "/kanji-formulario/html";

(function(){

    if(KE_Formulario_yomi_grupo) return

    KE_Formulario_yomi_grupo.baseHtml = new Class({

        __pedirHtml: function(url, elemento){

            var opciones = {

                url: url,

                update: elemento,

                onSuccess: function(arbol, elementos, html, js){

                    this.__instalado(arbol, elementos, html, js);
                
                }.bind(this)

            };

            if(this.APPEND){

                delete opciones["update"];

                opciones["append"] = elemento;

            }

            new Request.HTML(opciones).get();

        },

        __instalado: function(){}

    });


})()
