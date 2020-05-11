$( document ).ready(function() {
    
    Vue.directive('money', {
        inserted(el, binding){
            const amount = parseFloat(el.innerHTML).toFixed(2)
                .replace('.',',')
                .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
            el.innerHTML = `${binding.value} ${amount}`
        }
    })
    
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

    Vue.component('input-label', {
        props: ['tipo', 'label', 'name'],
        data: function(){
            return {
                
            }
        },
        template: $("#input-label").html(),
        mounted: function(){
            console.log("[name='"+this.name+"']")
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
    
    var eventBus = new Vue();
    // Vue.prototype.$eventHub = new Vue();
    
    new Vue({
        el: "#app",
        data: {
            nome: ''
        }
    })
});
