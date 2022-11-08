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
                <input type="file" @change="onSelectedImage" ref="imageSelector" v-show="false"
                    accept="image/jpg, image/png, image/webp" />

                <button class="btn btn-danger" @click="onDeleteEntry" v-if="entry.id">Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>

                <button class="btn btn-primary" @click="onSelectImage">Subir foto
                    <i class="fa fa-upload"></i>
                </button>
            </div>
        </div>

        <hr />

        <div class="d-flec flex-colum px-3 h-75">
            <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
        </div>

        <img v-if="entry.picture && !localImage" class="img-thumbnail" :src="entry.picture" alt="img" />
        <img v-if="localImage" class="img-thumbnail" :src="localImage" alt="img" />

    </template>

    <Fab icon="fa-save" @on:click="saveEntry" />

</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2';

import getDayMonthYear from '../helpers/getDayMonthYear';
import uploadImage from '../helpers/uploadImage';

export default {
    name: 'entry-view',
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
            entry: null,
            localImage: null,
            file: null,
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
        ...mapActions('journal', ['updateEntries', 'createEntries', 'deleteEntry']),

        loadEntry() {
            let entry;
            if (this.id === 'new') {
                entry = {
                    text: '',
                    date: new Date().getTime()
                }
            } else {
                // llamada al state getEntriesById
                entry = this.getEntryById(this.id)
                if (!entry) {
                    return this.$router.push({ name: 'no-entry' });
                }
            }
            this.entry = entry;
        },
        async saveEntry() {
            // new Swal({
            //     title: 'Espere por favor',
            //     allowOutsideClick: false
            // })
            // Swal.showLoading();
            const { url } = await uploadImage(this.file)
            console.log('picture url', url)
            this.entry.picture = url;

            if (this.entry.id) {
                console.log('updating entry....')
                await this.updateEntries(this.entry)
            } else {
                console.log('creating entry....')
                const id = await this.createEntries(this.entry)
                this.$router.push({ name: 'entry', params: { id } })
            }
            this.file = null;
            this.localImage = null;
            Swal.fire({
                icon: 'success',
                title: 'Entrada de registro correcta',
                showConfirmButton: false,
                timer: 1500
            })
        },
        async onDeleteEntry() {
            const { isConfirmed } = await Swal.fire({
                title: '¿Estas seguro?',
                text: 'Una vez borrado no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })
            if (isConfirmed) {
                console.log('deleting entry ....', this.entry)
                await this.deleteEntry(this.entry.id)
                Swal.fire({
                    icon: 'success',
                    title: 'Registro borrado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$router.push({ name: 'no-entry' })
            }
        },
        onSelectedImage({ target }) {
            console.log(target.files[0])
            const file = target.files[0]
            if (!file) {
                this.localImage = null;
                this.file = null;
                return;
            }
            this.file = file;
            const fr = new FileReader();
            fr.onload = () => this.localImage = fr.result;
            fr.readAsDataURL(file);
        },
        onSelectImage() {
            this.$refs.imageSelector.click();
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
    },


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