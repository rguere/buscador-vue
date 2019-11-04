<template>
    <div id="filter_nombre_o_razon_social">
        <div class="filter-title">
            Nombre o razón social
        </div>
        <div class="bg-fff">
            <div class="content">

                <textarea class="filter_textarea" placeholder="Escriba aqui el nombre o razón social de la empresa"></textarea>

                <div class="flex-space-between-flex-end">
                    <button class="btn btn-ver-mas">Ver más</button>
                    <button class="btn btn-action-search wi">BUSCAR</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'filter-razon-social',
    }
</script>

<style lang="scss" scoped>

    @import './../../sass/filters/filters';

    .filter_textarea {
        max-height: 60px;
    }

</style>
