<template>
    <WeChatMessage
        class="message"
        :class="{'message-system': isSystemMessage}"
        :message="message"
    >
        <template v-if="isSystemMessage">
            <template slot="messagePrefix">{{""}}</template>
            <SystemMessage :message="message"/>
            <template slot="messagePostfix">{{""}}</template>
        </template>
        <template v-else>
            <LinkMessage
                v-if="message.type === 'link'"
                :message="message"
                @click.native="clickOnLink(message)"/>
            <VoteMessage
                v-if="message.type === 'vote'"
                :message="message"/>
            <ImageMessage
                v-if="message.type === 'image'"
                :message="message"/>
        </template>
    </WeChatMessage>
</template>

<script>
import WeChatMessage from "./wechat-message";
import LinkMessage from "./link-message";
import VoteMessage from './vote-message';
import ImageMessage from './image-message';
import SystemMessage from './system-message';
//import AvatarWithVideoMark from "./avatar-with-video-mark";

export default {
    components: {
        WeChatMessage,
        LinkMessage,
        VoteMessage,
        ImageMessage,
        SystemMessage,
        //AvatarWithVideoMark,
    },
    props: {
        message: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        isSystemMessage() {
            return this.message.role === 'system'
        }
    },
    methods: {
        clickOnLink(message) {
            alert(message.url);
        }
    }
}
</script>

<style lang="less" scoped>
.message {
    min-width: 120px;
    margin-bottom: 14px;
    &-normal {
        min-width: 80px;
    }
}
.message-system {
    justify-content: center;
    /deep/ .message-item {
        padding: 0;
        background: none;
        &:before {
            display: none;
        }
    }
}
</style>
