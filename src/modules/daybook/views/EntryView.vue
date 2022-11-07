<template>
    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">
                    {{ day }}
                </span>
                <span class="mx-1 fs-3">
                    {{ month }}
                </span>
                <span class="mx-2 fs-4 fw-light">
                    {{ yearDay }}
                </span>
            </div>

            <div>
                <button class="btn btn-danger">Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>

                <button class="btn btn-primary">Subir foto
                    <i class="fa fa-upload"></i>
                </button>
            </div>
        </div>

        <hr />

        <div class="d-flec flex-colum px-3 h-75">
            <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
        </div>

        <img class="img-thumbnail"
            src="https://images.wikidexcdn.net/mwuploads/esssbwiki/c/cb/latest/20220530212008/Mario_Mario_Party_Superstars.png"
            alt="img" />

    </template>

    <Fab icon="fa-save" />

</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapGetters } from 'vuex'
import getDayMonthYear from '../helpers/getDayMonthYear';

export default {
    name: 'enty-view',
    props: {
        id: {
            type: String,
            required: true,
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fav.vue'))
    },
    data() {
        return {
            entry: null
        }
    },
    computed: {
        ...mapGetters('journal', ['getEntryById']),
        day() {
            const { day } = getDayMonthYear(this.entry.date)
            return day;
        },
        month() {
            const { month } = getDayMonthYear(this.entry.date)
            return month;
        },
        yearDay() {
            const { yearDay } = getDayMonthYear(this.entry.date)
            return yearDay;
        },
    },
    methods: {
        loadEntry() {
            // llamada al state getEntriesById
            const entry = this.getEntryById(this.id)
            if (!entry) {
                return this.$router.push({ name: 'no-entry' });
            }
            this.entry = entry;
        }
    },
    created() {
        this.loadEntry()
    },
    watch: {
        id(value, oldValue) {
            console.log({ value, oldValue })
            this.loadEntry()
        }
    }

}
</script>

<style lang="scss" scoped>
textarea {
    font-size: 20px;
    border: none;
    height: 100%;
    width: 100%;

    &:focus {
        outline: none;
    }
}

img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>