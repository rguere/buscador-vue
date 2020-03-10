<template>
    <div class="panel panel-default cd div_capa_superpuesta" id="filter_cargos">
        <div class="panel-heading">
            <p class="panel-title roboto white">
                Cargos
            </p>
        </div>
        <div class="panel-body">
            <div class="grid-4-columns-1fr">
                <div>
                    <label class="custon-checkboxs">
                        <input type="checkbox" name="">
                        <span class="geekmark"></span>
                        <span class="name-checkbox">Checkbox</span>
                        <span class="num-fil"> (100.000)</span>
                    </label>
                </div>
                <div>
                    <label class="custon-checkboxs">
                        <input type="checkbox" name="">
                        <span class="geekmark"></span>
                        <span class="name-checkbox">Checkbox</span>
                        <span class="num-fil"> (100.000)</span>
                    </label>
                </div>
                <div>
                    <label class="custon-checkboxs">
                        <input type="checkbox" name="">
                        <span class="geekmark"></span>
                        <span class="name-checkbox">Checkbox</span>
                        <span class="num-fil"> (100.000)</span>
                    </label>
                </div>
                <div>
                    <label class="custon-checkboxs">
                        <input type="checkbox" name="">
                        <span class="geekmark"></span>
                        <span class="name-checkbox">Checkbox</span>
                        <span class="num-fil"> (100.000)</span>
                    </label>
                </div>
            </div>
            <div class="flex-space-between-flex-end">
                <button class="btn btn-warning">Ver detalles <i class="fa fa-plus-circle"></i></button>
                <p class="text-help">* Puedes elegir más de una opción</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'filter-cargos',
    }
</script>

<style lang="scss" scoped>

    @import './../../sass/filters/filters';

</style>
