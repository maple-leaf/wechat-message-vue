<template>
    <div class="image-message">
        <img class="image-message--thumb" :src="message.thumbnail" @click="visible = true"/>
        <div class="image-message--viewer"
             v-if="visible"
             :style="viewerStyle"
             @click="visible = false">
            <img :src="message.image"/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        viewerStyle() {
            const rect = this.panelRect;
            return {
                left: `${rect.left}px`,
                width: `${rect.width}px`,
                top: `${rect.top}px`,
                height: `${rect.height}px`,
                lineHeight: `${rect.height}px`,
            };
        }
    },
    data() {
        return {
            panelRect: {
                left: 0,
                width: 0,
                top: 0,
                height: 0,
            },
            visible: false,
        }
    },
    mounted() {
        const container = document.body.querySelector('#panelContent');
        this.panelRect = container.getBoundingClientRect();
    },
}
</script>

<style lang="less" scoped>
.image-message {
    &--thumb {
        max-width: 60px;
    }
    &--viewer {
        text-align: center;
        position: fixed;

        &:after {
            content: "";
            background: rgba(0, 0, 0, .6);
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }

        img {
            position: relative;
            z-index: 1;
            vertical-align: middle;
            max-width: 80%;
        }
    }
}
</style>
