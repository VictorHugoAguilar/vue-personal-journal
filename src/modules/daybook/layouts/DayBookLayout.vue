<template>
	<Navbar />

	<div class="row justify-content-center justify-content-md-center" v-if="isLoading">
		<div class="col-3 alert alert-info text-center mt-5">
			Espere por favor...
			<h3 class="mt-2">
				<i class="fa fa-spin fa-sync"></i>
			</h3>
		</div>
	</div>

	<div class="d-flex" v-else>
		<div class="col-4">
			<EntryList />
		</div>
		<div class="col">
			<router-view />
		</div>
	</div>

</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapActions, mapState } from 'vuex'

export default {
	components: {
		Navbar: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */  '../components/Navbar.vue')),
		EntryList: defineAsyncComponent(() => import(/* webpackChunkName: "EntryList" */  '../components/EntryList.vue')),
	},
	methods: {
		...mapActions('journal', ['loadEntries'])
	},
	computed: {
		...mapState('journal', ['isLoading'])
	},
	created() {
		this.loadEntries()
	}
}
</script>

