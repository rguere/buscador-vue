<template>
    <div id="filter_sector_actividad">
        <div class="filter-title">
            Sector/Actividad
        </div>
        <div class="bg-fff">
            <div class="content">
                <div>
                    <label class="custon-checkboxs">
                        <input type="checkbox" name="">
                        <span class="geekmark"></span>
                        <span class="name-checkbox">Checkbox</span>
                        <span class="num-fil">(100.000)</span>
                    </label>
                </div>

                <div class="flex-space-between-center">
                    <button class="btn btn-ver-mas">Ver más</button>
                    <select>
                        <option>Todos</option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                    </select>
                </div>

                <div>
                    <label class="custon-checkboxs">
                        <input type="checkbox" name="">
                        <span class="geekmark"></span>
                        <span class="name-checkbox">Checkbox</span>
                        <span class="num-fil">(100.000)</span>
                    </label>
                </div>

                <div class="flex-space-between-center">
                    <button class="btn btn-ver-mas">Ver más</button>
                    <select>
                        <option>Todos</option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                    </select>
                </div>

                <div class="flex-space-between-flex-end">
                    <p></p>
                    <p class="text-help">
                        * Puede elegir más de una opción
                    </p>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'filter-sector-actividad',
    }
</script>

<style lang="scss" scoped>

    @import './../../sass/filters/filters';
    .flex-space-between-center {
        button {
            width: auto;
        }
        select {
            width: 70%;
        }
    }

</style>
