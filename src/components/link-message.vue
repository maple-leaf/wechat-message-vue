<template>
    <div class="link-message">
        <div class="link-message--title">{{ message.title }}</div>
        <div class="link-message--desc-wrap">
            <div class="link-message--desc">{{ message.desc }}</div>
            <img class="link-message--thumb"
                 v-if="message.thumbnail"
                 :src="message.thumbnail"/>
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
    }
}
</script>

<style lang="less" scoped>
.link-message {
    cursor: pointer;
    &--title {
        font-size: 14px;
        color: #000;
        margin: 0;
    }
    &--desc-wrap {
        display: flex;
        margin-top: 4px;
        justify-content: space-between;
        min-width: 120px;
    }
    &--desc {
        font-size: 12px;
        color: #999;
        flex: 1;
        margin: 0 18px 0 0;
    }
    &--thumb {
        height: 60px;
        width: 60px;
    }
}
</style>
