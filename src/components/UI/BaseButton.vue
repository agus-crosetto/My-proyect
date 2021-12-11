<template>
    <div>
        <button v-if="!link" class="btn btn-dark">
            <slot></slot>
        </button>
        <router-link v-else :to="to" class="btn btn-secondary">
            <slot></slot>
        </router-link>
    </div>
</template>

<script>
export default {
    props:{
        mode:{
            type:String,
            required:false,
            default: null
        },
        link: {
            type: Boolean,
            required:false,
            default:false
        },
        to: {
            type:String,
            required: false,
            default: '/'
        }
    }
}
</script>

