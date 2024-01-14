"use strict";

var KE_Formulario;

(function(){

    if(KE_Formulario) return;

    KE_Formulario = {

    };

    KE_Formulario.test = {

        esKanji: function(texto){

            return !!texto.match(/^[\u4E00-\u9FAF]+$/) ||

            texto == '𠂉' || 

            texto == '⺘' ||

            texto == '龹' ||

            texto == '龶' ||

            texto == '𦰩' ||

            texto == '⺍' ||

            texto == '⻖' ||

            texto == '𤴓' ||

            texto == '𠃑' ||
      
            texto == '𠂤' ||

            texto == '龷' ||

			texto == '𠀎' ||

            texto == '𠂆' ||

            texto == '𠂢' ||

            texto == '𠙻' ||

            texto == '㑒' ||

            texto == 'ユ' ||

            texto == '夬' ||

            //control de custom
            texto.match(/^\#(\w+)/) || 

            false;
            
        }


    };

    KE_Formulario.baseRest = new Class({

        run : function(){

            throw "run: ¡¡ABSTRACTO!!"

        },

        __run: function(args, callback){

            callback = callback || this.callback;

            new Request({

                url: this.URL,

                method: this.VERBO,

                onSuccess: function(data){

                    data = JSON.parse(data);

                    callback(data);

                }.bind(this)

            }).send(this.__parseArgs(args));

        },

        __parseArgs: function(args){

            if(!args) return undefined;

            var cadena = "";

            for(var nombre in args){
                cadena += nombre + "=" + args[nombre] + "&";
            }

            return cadena.replace(/\&$/, "");
        }

    });

    KE_Formulario.AcercaDe = new Class({

        Extends: KE_Formulario.baseRest,

        URL: "/acerca_de",

        VERBO: "get",

        run: function(callback){
            this.__run(undefined, callback);
        }

    });

    KE_Formulario.dumper  = new Class({

        initialize: function(nombre){

            this.nombre = nombre;
        },

        crearFichero: function(datos){

            var datos_yaml = this.__aYaml(datos);
            
            var fichero = this.__aFichero(datos_yaml);

            saveAs(fichero);
        },

        __aYaml: function(datos){

            var f = jsyaml.dump(datos);

            console.log(f);

            return f;
        },

        __aFichero: function(datos_yaml){

            return new File([datos_yaml], this.nombre, {type:"text/plain; charset=utf-8"})
        }


    });

    KE_Formulario.baseHtml = new Class({

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

    KE_Formulario.mini_modal = new Class({

        Extends: KE_Formulario.baseHtml,

        APPEND: true,

        url: "../html/mini_modal.html",

        backdrop: new Element('div', {

            class: "modal-backdrop fade in"

        }),

        iniciar: function(mensaje){

            this.mensaje = mensaje;

            this.__pedirHtml(
            
                this.url,

                document.body

            )
        },


        __instalado: function(arbol, elementos){

            this.__modalAbierto();

            this.mensaje.cabecera.inject(Slick.search(elementos[0], "h4.cabecera")[0]);

            this.mensaje.cuerpo.inject(Slick.search(elementos[0], "div.contenido")[0]);

            Slick.search(elementos[0], '.close')[0].addEvent('click', function(){

                this.__modalCerrado(elementos[0]);

            }.bind(this));
        },

        __modalAbierto: function(){

            document.body.addClass('modal-open');

            this.backdrop.inject(document.id('panel'), "after")

        },

        __modalCerrado: function(e){

            document.body.removeClass('modal-open');

            this.backdrop.dispose();

            e.dispose();
        }
    

    });

    KE_Formulario.formulario = new Class({

        Extends: KE_Formulario.baseHtml,

        url: "../html/formulario.html",

        initialize: function(){

            this.data = {};

            this.enCarga = false;

        },
    
        iniciar: function(){

            this.__pedirHtml(

                this.url,

                document.id('panel')

            );

        },

        cargar: function(kanji){

            this.enCarga = true;

            this.data = jsyaml.load(kanji);

            this.iniciar();
        },

        getKanji: function(valor){

            if(KE_Formulario.test.esKanji(valor)){

                this.data.id = valor;

                return true;
            }
            else{
                this.error = "Tienes que introducir un kanji";
                return false;
            }
        
        },

        getClave: function(clave){

            if(!clave.match(/^[a-z_\u00E0-\u00FC\.]+$/i)){
                this.error = "La clave tiene que estar en romaji";
                return false;
            }

            this.data.clave = clave;

            return true;
        },

        getHistoria: function(historia){

            this.data.historia = historia;

            return true;

        },

        getComponentes: function(){

            var componentes = [];

            $$('.componente').forEach(function(e){

                var valor = e.get('value');

                if(valor){
                    componentes.push(valor);
                }

            });

            this.data.componentes = componentes;

            return true;
        },

        getComoComponente: function(){

            var como_componente = [];
    
            try{

                $$('.como_componente').forEach(function(e){

                    var valor = e.get("value");

                    if(valor){

                        if(!valor.match(/^\s*[a-z_\u00E0-\u00FC\.]+\s*,\s*[^\s]+$/)){
                            this.error="El formato tiene que ser (clave,kanji), Ejemplo: palo,一"
                            throw "error";
                        }
                        else{
                            como_componente.push(valor);
                        }
                    }
                    

                }.bind(this));
            }
            catch(e){
                console.log(this.error);
                return false;
            }

            this.data.como_componente = como_componente;

            return true;

        },

        descargarKanji: function(){

            if(this.__validarEsquema()){

                var nombre_fichero = this.data.id + ',' + this.data.clave + ".yml";

                new KE_Formulario.dumper(nombre_fichero).crearFichero(this.data);
            }

        },

        __validarEsquema: function(){

            var ok = true;

            ['kanji', 'clave', 'historia'].forEach(function(e){

                var comprobar = e;
        
                if(e == 'kanji') comprobar = "id";

                if(!this.data[comprobar]){
                 
                   this.__koInput(e + '_form', "Falta este campo");

                   ok = false;
                }

            }.bind(this));

            if(!this.getKanji(this.data.id)){
                this.__koInput('kanji_form', this.error);
                return false;
            }

            if(!this.getClave(this.data.clave)){
                this.__koInput('clave_form', this.error);
                return false;
            }

            if(!this.getHistoria(this.data.historia)){
                this.__koInput('historia_form', this.error);
                return false;
            }

            if(!this.getComponentes()){
                this.__koInput('componentes_form', this.error);
                return false;
            }

            if(!this.getComoComponente()){
                this.__koInput('como_componente_form', this.error);
                return false;
            }

            if(!ok) return false;

            return ok;            

        },

        __instalado: function(){

            //para kanji
            document.id('input_kanji').addEvent('change', function(el){

                if(this.getKanji(el.target.get('value'))){
                    this.__okInput('kanji_form');
                }
                else{
                    this.__koInput('kanji_form', this.error);
                }

            }.bind(this));

            //para clave
            document.id('input_clave').addEvent('change', function(el){

                if(this.getClave(el.target.get('value'))){
                    this.__okInput('clave_form');
                }
                else{
                    this.__koInput('clave_form', this.error);
                }
            }.bind(this));

            //para historia
            document.id('input_historia').addEvent('change', function(el){

                if(this.getHistoria(el.target.get('value'))){
                    this.__okInput('historia_form');
                }

            }.bind(this));

            //para dump
            document.id('accion_descargar').addEvent('click', function(el){

                this.descargarKanji();


            }.bind(this));

            //para limpiar el formulario de kanji
            document.id('accion_limpiar_form').addEvent('click', function(){

                if(confirm("La info del kanji se perderá, ¿seguro?")){
                    KE_Formulario_acciones.nuevoKanji();
                }

            });

            //para componentes
            document.id('componante_mas').addEvent('click', function(){

                var e = $$('.componente')[0].clone();

                e.set('value', '');

                e.inject($$('.componente')[0].getParent(), 'bottom')

            });

            // para seccion como_componente
            document.id("como_componente_mas").addEvent('click', function(){

                var e = $$('.como_componente')[0].clone();

                e.set('value', '');

                e.inject($$('.como_componente')[0].getParent(), 'bottom')
            });

            if(this.enCarga){
                this.__cargarDatos();
            }
        },

        __okInput: function(grupo){
            document.id(grupo).removeClass('has-error').addClass('has-success');

            document.id(grupo + '_mensaje').set('text', '');
        },

        __koInput: function(grupo, ayuda){

            document.id(grupo).removeClass('has-success').addClass('has-error');

            document.id(grupo + '_mensaje').set('text', ayuda);
        },

        __cargarDatos: function(){

            document.id("input_kanji").set('value', this.data.id)
            document.id("input_clave").set('value', this.data.clave)
            document.id("input_historia").set('value', this.data.historia);

            var componente_zero;

            this.data.componentes.each(function(c){
    
                var componente;

                if(!componente_zero){
                    componente_zero = $$('.componente')[0];
                    componente = componente_zero;
                }
                else{
                    componente = componente_zero.clone();
                }
    
                componente.set('value', c);

                componente.inject($$('.componente')[0].getParent(), 'bottom')

            });

            this.data.como_componente.each(function(c){

                var como_componente;

                if(!componente_zero){
                    componente_zero = $$('.como_componente')[0];
                    como_componente = componente_zero;
                }
                else{
                    como_componente = componente_zero.clone();
                }

                como_componente.set('value', c);

                como_componente.inject($$('.como_componente')[0].getParent(), 'bottom')
    
            })
        }
               


    });


})();
