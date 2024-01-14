"use strict";

(function(){

    if(KE_Formulario_acciones && KE_Formulario_acciones.drop)
        return;

    KE_Formulario_acciones.drop = {};

    KE_Formulario_acciones.drop.Drop = new Class({

        initialize: function(){

            this.__instalar();
        },

        __instalar: function(){

            ["dragleave", "dragover"].each(function(e){
            
                $("html").on(e, function(event) {

                    event.preventDefault();  

                    event.stopPropagation();
                
                }.bind(this));

            }.bind(this));

            $('html').on("drop", function(e){

                if(e.originalEvent.dataTransfer){
                    if(e.originalEvent.dataTransfer.files.length) {
                        e.preventDefault();
                        e.stopPropagation();
                        /*UPLOAD FILES HERE*/
                        this.__cargaFichero(e.originalEvent.dataTransfer.files[0]);
                    }   
                }
            }.bind(this))
        },
        
        __cargaFichero: function(data){

            console.log(data);

            if(!data.name.match(/\.yml$/)){
                alert("No parece un fichero de kanji");
                return;
            }

            var fr = new FileReader();

            fr.onload = function(d){

                new KE_Formulario_acciones.dropKanji(fr.result)
            };
    
            fr.readAsText(data);
        }
    


    });

})();
