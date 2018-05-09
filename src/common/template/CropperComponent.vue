<template>
    <div class="highcharts-container"></div>
</template>
<script>
    import VueCropper from 'vue-cropper';
    export default {
        props: ['options', 'styles'],
        name: 'highcharts',
        data() {
            return {
                chart: null
            }
        },
        mounted() {
            this.initChart(this.options);
        },
        watch: {
            options(val) {
                this.initChart(val);
            }
        },
        methods: {
            initChart(params) {
                this.$el.style.width = (this.styles.width || 800) + 'px';
                this.$el.style.height = (this.styles.height || 400) + 'px';
            }
        }
    }
</script>

<style lang="scss">
    .highcharts-container {
        width: 100% !important;
        height: 400px;
    }
</style>