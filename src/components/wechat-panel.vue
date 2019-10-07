<template>
    <div class="wechat-panel">
        <h4 class="wechat-panel--title">{{title}}</h4>
        <div class="wechat-panel--content" id="panelContent">
            <WeChatMessageBridge
                :message="message"
                :key="message.id"
                v-for="message in messages"/>
            <div class="emoji-rain--container"
                 :style="emojiContainerStyle"
                v-if="emojis.length > 0">
                <span
                    class="emoji-rain--emoji"
                    v-for="(emoji, index) in emojis"
                    :style="getEmojiStyle()"
                    :key="index"
                    @animationend="onAnimationEnd">{{ emoji }}</span>
            </div>
        </div>
        <div class="wechat-panel--footer">
            <Button @click.native="onFooterClick({type: 'addMessage', data: {content: '生日快乐', type: 'normal'}})">生日快乐</Button>
            <Button @click.native="onFooterClick({type: 'addMessage', data: { title: 'Learn Vue', desc: 'how to use vue?', type: 'link', url: 'example.com' }})">链接信息</Button>
            <Button @click.native="onFooterClick({
                 type: 'addMessage',
                 data: {
                     type: 'image',
                     thumbnail: '//cdn.devdocs.io/assets/sprites/docs@2x-cdcc6bcba322c1a0ccc60722f8ad8e37ea4fc4a4c2701736d9f283ac876d89b1.png',
                     image: '//cdn.devdocs.io/assets/sprites/docs@2x-cdcc6bcba322c1a0ccc60722f8ad8e37ea4fc4a4c2701736d9f283ac876d89b1.png',
                 }
             })">图片信息</Button>
            <Button @click.native="onFooterClick({
                 type: 'addMessage',
                 data: {
                     type: 'envelope',
                     role: 'system',
                     takeBy: '枫叶',
                     envelopeId: 123,
                 }
             })">红包被抢信息</Button>
        </div>
    </div>
</template>
<script>
import WeChatMessageBridge from './wechat-message-bridge.vue';
import Button from './button.vue';
import EmojiRain from '../mixins/emoji-rain';

const messages = [
    {
        id: 1,
        content: "test1",
        role: 'sender',
        type: "normal",
        author: {
            name: '枫叶'
        }
    },
    {
        id: 2,
        content: "google.com",
        role: 'sender',
        type: "normal",
        status: 'loading',
        author: {
            name: '枫叶',
            hasNewVideo: true,
        }
    },
    {
        id: 3,
        title: "NO TITLE",
        desc: "test",
        url: 'http://example.com',
        thumbnail:
        "//cdn.devdocs.io/assets/sprites/docs@2x-cdcc6bcba322c1a0ccc60722f8ad8e37ea4fc4a4c2701736d9f283ac876d89b1.png",
        role: 'recevier',
        type: "link",
        status: 'failed',
        author: {
            name: '叶枫'
        }
    },
    {
        id: 4,
        title: "Upvote Me",
        desc: "This behaviour is only supported within the context of Styled Components",
        upvote: 0,
        downvote: 0,
        role: 'recevier',
        type: "vote",
        author: {
            name: '叶枫'
        }
    }
];

export default {
    mixins: [EmojiRain],
    data() {
        return {
            title: '枫叶',
            messages,
        }
    },
    components: {
        WeChatMessageBridge,
        Button,
    },
    methods: {
        onFooterClick({ type, data }) {
            switch(type) {
                case 'addMessage':
                    this.lazyAddMessages({
                        id: Date.now(),
                        ...data,
                        role: data.role ? data.role : (Math.random() > 0.5 ? 'sender' : 'recevier'),
                        author: {
                            name: '枫叶'
                        }
                    })
                    break;
                default:
                    break;
            }
        }
    },
    created() {
        this.lazyAddMessages = (function() {
            let lastTimeStamp = 0;
            let timer;
            let addedMessages = [];
            const self = this;

            return (message) => {
                const timeStamp = Date.now();

                if (Array.isArray) {
                    addedMessages = addedMessages.concat(message);
                } else {
                    addedMessages.push(message);
                }
                lastTimeStamp = timeStamp;

                clearTimeout(timer);

                timer = setTimeout(() => {
                    if (timeStamp === lastTimeStamp) {
                        self.messages = [
                            ...self.messages.map(m => ({
                                ...m,
                                status: m.status ? m.status : 'read',
                            })),
                            ...addedMessages,
                        ];
                        addedMessages = [];
                    }
                }, 300)
            }
        }.bind(this))();
    }
}
</script>

<style lang="less">
@keyframes fallingAnimation {
    from {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }

    to {
        transform: translate3d(0, 200px, 0);
        opacity: 0;
    }
}

.wechat-panel {
    display: flex;
    flex-direction: column;
    height: 667px;
    width: 375px;
    margin: 20px auto;

    &--title {
        font-size: 14px;
        color: #000;
        background-color: #e5eaea;
        text-align: center;
        flex: 0 0 40px;
        line-height: 40px;
        margin: 0;
    }
    &--content {
        font-size: 14px;
        color: #000;
        background-color: #ededed;
        flex: 1;
        padding-top: 10px;
        position: relative;
        overflow: auto;
    }
    &--footer {
        background-color: #f6f6f6;
        display: flex;
        align-items: center;
        flex: 0 0 80px;
        padding: 8px;
        box-sizing: border-box;

        button {
            padding: 8px;
        }
    }

    .emoji-rain {
        &--container {
            position: fixed;
            top: 40px;
            bottom: 80px;
            pointer-events: none;
        }
        &--emoji {
            animation: fallingAnimation 2s linear;
            position: absolute;
            top: 0;
        }
    }
}
</style>
