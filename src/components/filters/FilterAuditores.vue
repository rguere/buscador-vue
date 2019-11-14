<template>
    <div id="filter_auditores">
        <div class="filter-title">
            Auditores
        </div>
        <div class="bg-fff">
            <div class="content">
                <div class="grid-4-columns-1fr">
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
                    <button class="btn btn-ver-mas">Ver detalles</button>
                    <p class="text-help">* Puede elegir más de una opción</p>
                </div>
                <div v-if="search.auditor && search.auditor.length === 0" class="alert alert-dismissible alert-primary">
                  <strong>Oh!</strong> datos no encontrados. <button type="button" class="btn" @click="fetchSearch">Recargar</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'filter-auditores',
        computed: mapGetters({
          search: 'search/search',
        })
    }
</script>

<style lang="scss" scoped>

    @import './../../sass/filters/filters';

</style>
