var vue = {
    init(){
        //Inicia o Vue, deixe sempre o init ao final do código.
        
        // eventBus é para emitir eventos.
        var eventBus = new Vue();
        // Vue.prototype.$eventHub = new Vue();
        
        new Vue({
            el: "#app",
            data: {
                nome: ''
            }
        })

    },

    components: function(){
        Vue.component("datas", {
            /* Componente: datas
                Implementação do datas
                propriedade: [
                    name: Nome do elemento base
                    label: Texto do label do componente
                    database: Se refere a qual a base de dados será utilizada para exibir as opções
                ]
            */
        template: $('#data').html(),
        props: {
            // name: {
            //     type: String,
            // },
            // label: {}
        },
        // data(){
        //     return {
                
        //     }
        // },
        mounted: function(){



            $('#teste').datepicker({
                format: 'dd/mm/yyyy',
                language: 'pt-BR',
                autoclose: true
            });
            
        }
    })

    Vue.component("select2", {
        /* Componente: Select2
            Implementação do select2
            propriedade: [
                name: Nome do elemento base
                label: Texto do label do componente
                database: Se refere a qual a base de dados será utilizada para exibir as opções
            ]
        */
        template: $('#select2').html(),
        props: {
            name: {
                type: String,
            },
            label: {},
            database: {
                default: 0
            }
        },
        data(){
            return {
                dados: {
                    0: [],
                    1: [
                    "Ave",
                    "Macaco",
                    "Girafa",
                    "MORANDO"
                    ],
                    2: [
                    "NEM",
                    "FER",
                    "RANDO"
                ]},
            }
        },
        beforeMount() {
            var cases = this.database

            // Caso seja acrescentado algum dado que deve vir através do retorno de uma consulta, acrescentar o array no switch abaixo.
            switch(cases){
                case '3':
                case '4':
                    this.dados[cases] = ["MANGALO", "GARGALO"]
                    break
                                
            }

        },
        mounted: function(){
            var component = this
            var uf_select2 = $('.' + component.name + ' .uf-select2')

            uf_select2.select2({
                placeholder: 'Selecione uma opção',
                language: {
                    noResults: function () {
                            return "Nenhum resultado encontrado.";
                    }
                }
            });

            $('.'+ component.name + ' .select2-selection').on('click',function(){
                
                var baseDados = component.dados[component.database]
                
                $(baseDados).each(function(index, element){
                    
                    //Este if procura algum componente no select que tenha um value igual ao inserido, caso haja ele não é inserido novamente.
                    if ( uf_select2.find(`option[value="${element}"]`).length == 0 ) {
                        
                        //Cria a a opção no select (seu valor é igual ao campo 'id' e o texto igual ao campo 'text')
                        var addOption = new Option(element, element, false, false);
                        
                        // Da append nessa opção
                        uf_select2.append(addOption);
    
                    }
    
                })

                uf_select2.trigger('change');
                // Após carregar os novos elementos o select deve ser fechado e reaberto para renderizar estes elementos.
                uf_select2.select2('close').select2('open')
                
            })
            
            uf_select2.on('focusin',function(){
                $('.'+ component.name + ' .select2-selection').trigger('click')
            })
            
        }
    })

        /* Componente: Modal
            A ideia é este componente ser composto pelo botão e pelo html interno do modal.
            propriedade: [
                name: Define o nome do modal, além disso todos elementos ativos devem receber o name + "Complemento"
                cleanclose: Tipo Boolean (Se tem o attr é true, se não tem é false)
                        O modal ao ser fechado salva suas informações ou é sempre limpo.
                
            ]
        */
        Vue.component('modal', {
            template: $('#modal').html(),
            props: {
                name: {},
                cleanclose: { type: Boolean },
            },
            data: function(){
                return{
                    nome: 0
                }
            },
            methods: {
                
            },
            mounted: function(){
                var component = this
                if(component.cleanclose){

                    console.log(this.name)
                    $('[modal="'+component.name+'"] .close, [modal="'+component.name+'"] .modal-dialog .modal-footer .close-footer').on('click', function(){
                        console.log("aqui")
                        console.log('[modal="'+component.name+'"]')

                        $('[modal="'+component.name+'"] input').each(function(i, e){
                            console.log("Aqui n")
                            var $el = $(e)
                            $el.val("")
                        })
                    })
                }
            }
        })

        /*  Componente: Input-Label
            propriedade: [
                tipo: "money" ou "quantidade" (para colocar o mask money corretamente).
                label: O texto da label.
                name: atributo name do input e for do label.
            ]
        */
        Vue.component('input-label', {
            template: $("#input-label").html(),
            props: {
                tipo: {},
                label: {},
                name: {},
                readonly: { type: Boolean },
            },
            mounted: function(){

                if(this.readonly){
                    $('[name="' + this.name + '"]').attr("readonly", "true")
                }

                if(this.tipo == "money"){
                    $("[name='"+this.name+"']").maskMoney({
                        prefix: 'R$',
                        thousands: '.',
                        decimal: ','
                    });
                } else if(this.tipo == "quantidade"){
                    $("[name='"+this.name+"']").maskMoney({
                        prefix: '',
                        thousands: '.',
                        decimal: ','
                    });
                }
            }
            
        })
    },
    directives: function(){
        // A diretiva do tipo v-money coloca o R$ no inicio e a virgula com os centavos ao final.
        // Não funciona como mask money, mas como parseReais.
        Vue.directive('money', {
            inserted(el, binding){
                
                const amount = parseFloat(el.innerHTML).toFixed(2)
                    .replace('.',',')
                    .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
                el.innerHTML = `${binding.value} ${amount}`
            }
        })
    }

}

$( document ).ready(function() {
    
    vue.directives()
    vue.components()
    vue.init()

});
