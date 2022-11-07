<template>
    <div class="entry-container mb-3 pointer p-2">

        <!-- Titulo -->
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">15</span>
            <span class="mx-1 fs-5">Julio</span>
            <span class="mx-2 fw-light">2021, jueves</span>
        </div>

        <div class="entry-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, blanditiis distinctio laboriosam cum illo
            officiis vitae eveniet suscipit beatae quidem unde asperiores error, exercitationem nulla id! Eveniet
            tenetur nostrum repellendus.
        </div>

    </div>
</template>

<script>
export default {
    name: 'enty-component'

}
</script>

<style lang="scss" scoped>
.entry-container {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }
}

.entry-title {}

.entry-description {
    font-size: 12px;
}
</style>