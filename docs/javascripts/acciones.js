"use strict";

var KE_Formulario_acciones = undefined;

(function(){

    if(KE_Formulario_acciones) return;

    KE_Formulario_acciones = {};

    KE_Formulario_acciones.instalar = function(){

        document.id("nuevo_kanji").addEvent('click', function(){

            KE_Formulario_acciones.nuevoKanji();

        });

        document.id('cargar_kanji').addEvent('click', function(){

            KE_Formulario_acciones.cargarKanji();   
        });

        document.id('acerca_de').addEvent('click', function(){

            KE_Formulario_acciones.acercaDe();

        });

        new KE_Formulario_acciones.drop.Drop();
    };
    
    KE_Formulario_acciones.nuevoKanji = function(){

        new KE_Formulario.formulario().iniciar();
    };

    KE_Formulario_acciones.dropKanji = function(kanji){

        new KE_Formulario.formulario().cargar(kanji);

    };

    KE_Formulario_acciones.cargarKanji = function(){

        new KE_Formulario.mini_modal().iniciar({

            cabecera: new Element(

                "span",

                {
                    text: "Subir Fichero de Kanji"
                }

            ),

            cuerpo: new Element(

                "div",

                {
                    "html" : '<input type="file" accept="yml/*" /><input type="submit" id="subir_fichero">'
                }

            )

        });        

    };


    KE_Formulario_acciones.acercaDe = function(){
        
        new KE_Formulario.AcercaDe().run(function(d){

            new KE_Formulario.mini_modal().iniciar({

                cabecera: new Element(

                    "span",

                    {
                        "text" : d.app
                    }

                ),

                cuerpo: new Element(

                    "h5",
        
                    {       
                        text: "Version: " +  d.version

                    }

                )

            });

        });       

    };    


    window.addEvent('domready', function(){

        KE_Formulario_acciones.instalar();
    
    });

}());
