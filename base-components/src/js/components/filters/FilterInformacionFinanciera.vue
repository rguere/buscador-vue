<template>
    <div id="filter_informacion_financiera">
        <div class="filter-title">
            Información Financiera
        </div>
        <div class="bg-fff">
            <div class="content">

                <div class="grid-2-columns-1fr">
                    <div>
                        <div class="flex">
                            <div class="width-50-porcent">
                                <div class="_flex-row">
                                    <div class="padding-0-5">
                                        <div class="title-informacion-financiera">
                                            Partida financiera
                                        </div>
                                        <div>
                                            <select class="select-partida-financiera">
                                                <option>Seleccionar</option>
                                                <option value="">1</option>
                                                <option value="">2</option>
                                                <option value="">3</option>
                                                <option value="">4</option>
                                                <option value="">5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <button class="btn btn-ver-mas">Ver más</button>
                                    </div>
                                </div>
                            </div>
                            <div class="width-50-porcent">
                                <div class="padding-0-5">
                                    <div class="padding-0-0-10-0">
                                        <div class="title-informacion-financiera">
                                            Minimo
                                        </div>
                                        <div class="conten-input-informacion-financiera">
                                            <input type="text" value="1000" name="min" id="min">
                                            <label for="min">Miles de Euros</label>
                                        </div>
                                    </div>

                                    <div class="padding-0-0-10-0">
                                        <div class="title-informacion-financiera">
                                            Maximo
                                        </div>
                                        <div class="conten-input-informacion-financiera">
                                            <input type="text" value="1000" name="max" id="max">
                                            <label for="max">Miles de Euros</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div class="title-informacion-financiera">
                                Seleccionar Ejercicio
                            </div>

                            <div class="anios_checkboxs">
                                <div>
                                    <label class="custon-checkboxs">
                                        <input type="checkbox" name="">
                                        <span class="geekmark"></span>
                                        <span class="title">2018</span>
                                    </label>
                                </div>

                                <div>
                                    <label class="custon-checkboxs">
                                        <input type="checkbox" name="">
                                        <span class="geekmark"></span>
                                        <span class="title">2017</span>
                                    </label>
                                </div>

                                <div>
                                    <label class="custon-checkboxs">
                                        <input type="checkbox" name="">
                                        <span class="geekmark"></span>
                                        <span class="title">2016</span>
                                    </label>
                                </div>

                                <div>
                                    <label class="custon-checkboxs">
                                        <input type="checkbox" name="">
                                        <span class="geekmark"></span>
                                        <span class="title">Ultimo año con consultas disponibles</span>
                                    </label>
                                </div>
                            </div>

                            <div class="flex-space-between-flex-end">
                                <p></p>
                                <p class="text-help">* Puede elegir más de una opción</p>
                            </div>


                        </div>
                        <div>
                            <div class="bg-g">
                                <label class="custon-checkboxs">
                                    <input type="checkbox" name="">
                                    <span class="geekmark"></span>
                                    <span class="title">Aplicar en la búsqueda <i>al menos uno</i> de los años seleccionados</span>
                                </label>
                            </div>
                            <div class="bg-g">
                                <label class="custon-checkboxs">
                                    <input type="checkbox" name="">
                                    <span class="geekmark"></span>
                                    <span class="title">Aplicar en la búsqueda <i>TODOS</i> los años seleccionados</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'filter-informacion-financiera',
    }
</script>

<style lang="scss" scoped>

    @import './resources/sass/filters/filters';

    .title-informacion-financiera {
        background-color: #dbe3f3;
        padding: 5px 20px;
        font-weight: bold;
        text-align: center;
        width: 100%;
    }

    .padding-0-5 {
        padding: 0 5px;
    }

    .padding-0-0-10-0 {
        padding: 0 0 10px 0;
    }

    ._flex-row {
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        align-content: space-between;
    }

    ._flex-row > div {
        width: 100%;
    }

    .flex {
        display: flex;
        flex-wrap: wrap;
    }

    .select-partida-financiera {
        width: 100%;
        margin: 5px 0;
    }

    .flex > div.width-50-porcent {
        width: 50%;
    }

    .conten-input-informacion-financiera {
        display: flex;
        text-justify: center;
        align-items: center;

        margin: 5px 0;

        input , label{
            width: 50%;
        }

        label {
            background: #eee;
            margin: 0;
            font-weight: bold;
            padding: 3px 2.5px;
            cursor: pointer;
        }
    }

    .anios_checkboxs {
        display: flex;
        flex-wrap: wrap;
        div {
            margin: 0 3px 0 0;

            label {
                font-size: 14px;
            }
        }
    }

    .bg-g {
        background-color: #aaa;
        margin: 5px 0;
        color: #fff;
        padding: 2px 5px;

        label.custon-checkboxs {
            margin: 0;

            font-size: 12px;

            span.title {
                i {
                    text-decoration: underline;
                }
            }
        }

    }

</style>
