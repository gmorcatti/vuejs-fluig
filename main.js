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

        Vue.component("select2", {
            template: $('#select2').html(),
            mounted(){
                $('.js-example-basic-single').select2({
                    placeholder: 'Selecione uma opção',
                    tokenSeparators: [',', ' '],
                    language: {
                        noResults: function () {
                                return "Nenhum resultado encontrado.";
                        }
                    }
                });
                
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
            props: {
                name: {},
                cleanclose: { type: Boolean },
            },
            data: function(){
                return{
                    nome: 0
                }
            },
            template: $('#modal').html(),
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
            props: ['tipo', 'label', 'name'],
            data: function(){
                return {
                    
                }
            },
            template: $("#input-label").html(),
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
