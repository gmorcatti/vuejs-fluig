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
        /* Componente: Modal
        A ideia é este componente ser composto pelo botão e pelo html interno do modal.
        ----------------- ADICIONAR ----------------
        prop: name - Todos elementos dentro do modal serem compostos por esse name + diferencial.
        */
        Vue.component('modal', {
            props: ['tipo'],
            data: function(){
                return{
                    nome: 0
                }
            },
            template: $('#modal').html(),
            methods: {
                submit(){
                    $('#myModal').on('shown.bs.modal', function () {
                        $('#myInput').trigger('focus')
                    })
                },
                money(){
                    if(this.tipo == "money"){
                        $('[name="jorge"]').maskMoney({
                            prefix: '',
                            thousands: '.',
                            decimal: ','
                        });
                    }
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
            componentUpdated(el, binding){
                
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
