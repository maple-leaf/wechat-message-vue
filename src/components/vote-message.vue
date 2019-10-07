<template>
    <div class="vote-message">
        <div class="vote-message--title">{{ message.title }}</div>
            <div class="vote-message--desc">{{ message.desc }}</div>
            <div class="vote-message--btns">
                <Button @click.native="message.upvote += 1">
                    ↑ <span v-if="message.upvote > 0">{{ message.upvote }}</span>
                </Button>
                <Button @click.native="message.downvote += 1">
                    ↓ <span v-if="message.downvote > 0">{{ message.downvote }}</span>
                </Button>
            </div>
    </div>
</template>

<script>
import Button from './button';

export default {
    props: {
        message: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        Button,
    }
}
</script>

<style lang="less" scoped>
.vote-message {
    &--title {
        font-size: 14px;
        color: #000;
        margin: 0;
    }
    &--desc {
        font-size: 12px;
        color: #999;
        flex: 1;
        margin: 0 18px 0 0;
        height: 60px;
    }
    &--btns {
        display: flex;
        height: 30px;
        margin-top: 4px;
        justify-content: space-between;
        margin: 0 -10px -10px;
        border-top: 1px solid #999;

        button {
            flex: 1;
            margin-left: 8px;
            cursor: pointer;
            &:last-child {
                border-left: 1px solid #999;
            }
        }
    }
    &--count {
        display: inline-block;
        vertical-align: middle;
        min-width: 20px;
        height: 20px;
        line-height: 20px;
        background: #eee;
        border-radius: 50%;
    }
}
</style>
