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
        /* Componente: Select2
            Implementação do select2
            propriedade: [
                name: Nome do elemento base
            ]
        */
        Vue.component("select2", {
            template: $('#select2').html(),
            props: {
                name: {
                    // type: String,
                    required: true
                  },
                label: {},

            },
            data(){
                return {
                    dados: [
                        "Ave",
                        "Macaco",
                        "Girafa",
                        "MORANDO"
                    ]
                }
            },
            mounted: function(){
                var component = this
                
                $('.' + component.name + ' .uf-select2').select2({
                    placeholder: 'Selecione uma opção',
                    language: {
                        noResults: function () {
                                return "Nenhum resultado encontrado.";
                        }
                    }
                });

                $('.'+ component.name + ' .selection').on('click', function(){
                    console.log("AQUI");
                        
                    $(component.dados).each(function(index, element){
        
                        //Este if procura algum componente no select que tenha um value igual ao inserido, caso haja ele não é inserido novamente.
                        if ( $('.' + component.name + ' .uf-select2').find(`option[value="${element}"]`).length == 0 ) {
                            
                            //Cria a a opção no select (seu valor é igual ao campo 'id' e o texto igual ao campo 'text')
                            var mudançaOpção = new Option(element, element, false, false);
                            
                            // Da append nessa opção
                            $('.' + component.name + ' .uf-select2').append(mudançaOpção).trigger('change');
        
                        }
        
                    })
                    
                    // Após carregar os novos elementos o select deve ser fechado e reaberto para renderizar estes elementos.
                    $('.' + component.name + ' .uf-select2').select2('close').select2('open')
                    
        
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
                if(this.cleanclose){
                    $('#myModal .close, .modal-footer .close-footer').on('click', function(){
                        $('#myModal input').each(function(i, e){
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
            props: ['tipo', 'label', 'name'],
            data: function(){
                return {
                    
                }
            },
            mounted: function(){

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
