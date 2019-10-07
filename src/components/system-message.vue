<template>
    <div class="system-message">
        <div class="message-envelope" v-if="message.type === 'envelope'">
            {{ message.takeBy }} 领取了你的 <a :href="'#' + message.envelopeId">红包</a>
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
}
</script>

<style lang="less" scoped>
.message-envelope {
    font-size: 12px;
    color: #000;
    background: rgba(255, 255, 255, 0.5);
    line-height: 30px;
    display: inline-block;
    padding: 0 12px;

    a {
        color: #FF9800;
        text-decoration: none;
    }
}
</style>

// 红包被领通知
const RedEnvelope = ({ message }: EnvelopeMessageProps) => {
    const { takeBy, envelopeId  }= message;
    return (
    )
}
