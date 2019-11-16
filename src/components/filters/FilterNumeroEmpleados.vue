<template>
    <div class="panel panel-primary" id="filter_numero_de_empleados">
        <div class="panel-heading">
            Número de empleados
        </div>
        <div class="panel-body">
            <div class="grid-2-columns-1fr">
                <div>
                    <label class="custon-checkboxs">
                        <input type="checkbox" name="">
                        <span class="geekmark"></span>
                        <span class="name-checkbox">Checkbox</span>
                        <span class="num-fil">(100.000)</span>
                    </label>
                </div>
                <div>
                    <label class="custon-checkboxs">
                        <input type="checkbox" name="">
                        <span class="geekmark"></span>
                        <span class="name-checkbox">Checkbox</span>
                        <span class="num-fil">(100.000)</span>
                    </label>
                </div>
                <div>
                    <label class="custon-checkboxs">
                        <input type="checkbox" name="">
                        <span class="geekmark"></span>
                        <span class="name-checkbox">Checkbox</span>
                        <span class="num-fil">(100.000)</span>
                    </label>
                </div>
                <div>
                    <label class="custon-checkboxs">
                        <input type="checkbox" name="">
                        <span class="geekmark"></span>
                        <span class="name-checkbox">Checkbox</span>
                        <span class="num-fil">(100.000)</span>
                    </label>
                </div>
            </div>
            <div class="flex-space-between-flex-end">
                <button class="btn btn-warning">Ver detalles <i class="fa fa-plus-circle"></i></button>
                <p class="text-help">* Puede elegir más de una opción</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'filter-numero-empleados',
    }
</script>

<style lang="scss" scoped>

    @import './../../sass/filters/filters';

</style>
