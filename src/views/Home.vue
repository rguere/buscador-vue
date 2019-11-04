<template>
	<div class="home">
		<div class="banner-top">
			<div>
				<div>
					<h2>Buscador de Empresas</h2>
					<h5>Buscador de Empresas</h5>
					<a href="">Leer más...</a>
				</div>
				<div>
					<p>¿Le gustaría poder acceder a la <b>información más completa y reciente de todas las empresas que operan en España</b> que sean de su interés?</p>
				</div>
			</div>
		</div>
		<div class="bg-gris">
			<div class="container-fluid">
				<filter-buttons></filter-buttons>
				<filter-actions-top></filter-actions-top>
				<filter-list-checkboxs></filter-list-checkboxs>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
}
</script>
