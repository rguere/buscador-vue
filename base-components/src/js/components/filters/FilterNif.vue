<template>
    <div id="filter_nif">
        <div class="filter-title">
            NIF
        </div>
        <div class="bg-fff">
            <div class="content">

                <textarea class="filter_textarea"></textarea>

                <p class="text-help">
                    *Puede incluir uno o más NIF postales separados por coma o por salto de línea
                </p>

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
        name: 'filter-nif',
    }
</script>

<style lang="scss" scoped>

    @import './resources/sass/filters/filters';

</style>
