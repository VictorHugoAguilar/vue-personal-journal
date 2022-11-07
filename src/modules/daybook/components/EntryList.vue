<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2">
            <input type="text" class="form-control" placeholder="Buscar entrada..." v-model="term" />
        </div>

        <div class="entry-scrollera">
            <Entry v-for="entry in entriesByTerm" :key="entry.id" :entry="entry" />
        </div>

    </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapGetters } from 'vuex'

export default {
    name: 'entry-list-component',
    components: {
        Entry: defineAsyncComponent(() => import( /* webpackChunkName: "Entry" */  './Entry.vue'))
    },
    computed: {
        ...mapGetters('journal', ['getEntriesByTerm']),
        entriesByTerm() {
            return this.getEntriesByTerm(this.term);
        }

    },
    data() {
        return {
            term: '',
        }
    },

    created() {
        // console.log('this.$store.state', this.$store)
    }
}



</script>

<style lang="scss" scoped>
input {
    height: 25px;
}

.entry-list-container {
    border-right: 1px solid #2c3e50;
    height: calc(100vh - 56px);
}

.entry-scrollera {
    height: calc(100vh - 110px);
    overflow: scroll;
}
</style>