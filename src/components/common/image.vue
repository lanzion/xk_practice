<template>
    <img :src="src" @error.once="removeImage(defaultImage)">
</template>

<script>
export default {
    name: 'default-image',
    
    props: {
        src: {
            type: String,
            default: ''
        },
        defaultImage: {
            type: String,
            default: ''
        }
    },

    methods: {
        removeImage(image) {
            var img = event.target
            img.src = image
        }
    }
}
</script>
