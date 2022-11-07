<template>
    <button class="btn btn-primary" @click="$emit('on:click')">
        <i class="fa fa-2x" :class="icon"></i>
    </button>
</template>

<script>
export default {
    name: 'fav-component',
    props: {
        icon: {
            type: String,
            default: 'fa-plus'
        }
    },

}
</script>

<style class="scss" scoped>
button {
    border-radius: 100%;
    bottom: 20px;
    height: 60px;
    position: fixed;
    right: 20px;
    width: 60px;
}
</style>