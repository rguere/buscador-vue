<template>
    <div class="panel panel-default cd" id="filter_auditores">
        <div class="panel-heading">
            <p class="panel-title roboto white">
                Auditores
            </p>
        </div>
        <div class="panel-body">
            <div class="grid-4-columns-1fr" v-if="search.auditor && search.auditor.length > 0">
                <div v-for="(item, key) in search.auditor" :key="key">
                    <label class="custon-checkboxs">
                        <input type="checkbox" name="">
                        <span class="geekmark"></span>
                        <span class="name-checkbox">{{ item.label }}</span>
                        <span class="num-fil">({{ item.data }})</span>
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
    //import { mapGetters } from 'vuex'
    export default {
        name: 'filter-auditores',
        props: {
            search: Object
        },
    }
</script>

<style lang="scss" scoped>

    @import './../../sass/filters/filters';

</style>
