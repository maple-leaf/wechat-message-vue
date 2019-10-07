<template>
    <div class="message-block"
         :class="{'message-block--sender': message.role === 'sender'}">
        <div class="message-wrapper">
            <div class="message-prefix">
                <slot name="messagePrefix">
                    <Loading v-if="message.status === 'loading'"/>
                    <span
                        class="message-prefix--failed-mark"
                        @click="onFailedClick"
                        v-else-if="message.status === 'failed'">!</span>
                </slot>
            </div>
            <div class="message-item"
                 :class="{'message-item-link': isLink(message.content)}">
                <slot>
                    {{ message.content }}
                </slot>
            </div>
        </div>
        <div class="message-postfix">
            <slot name="messagePostfix">
                <a href="#">
                    <img :src="message.author.thumbnail" v-if="message.author.thumbnail"/>
                    <template v-else>
                        {{ message.author.name.substring(0, 1) }}
                    </template>
                </a>
            </slot>
        </div>
    </div>
</template>

<script>
import Loading from './loading';

const isLink = str => str ? /^(https?:)?(\/\/)?\w+\.\w+$/.test(str) : false;

export default {
    props: {
        message: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        Loading,
    },
    methods: {
        isLink,
        onFailedClick() {
            this.message.status = 'loading';
        }
    }
}
</script>

<style lang="less" scoped>
.message-block {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    color: #000;
    font-size: 14px;
    margin: 0 10px;
    position: relative;

    &--sender {
        justify-content: flex-end;
        .message-prefix {
            order: 0;
        }
        .message-item {
            background-color: #95ec69;
            &:before {
                border-left-color: #95ec69;
                border-right-color: transparent;
                right: -12px;
                left: auto;
            }
        }
        .message-postfix {
            margin-left: 12px;
            order: 2;
        }
    }
}
.message-wrapper {
    display: flex;
    align-items: center;
    order: 1;
}
.message-prefix {
    margin: 0 8px;
    width: 24px;
    height: 24px;
    order: 2;
    &--failed-mark {
        display: block;
        background: #b52f4c;
        font-size: 12px;
        width: 18px;
        height: 18px;
        color: #fff;
        text-align: center;
        line-height: 18px;
        border-radius: 50%;
        cursor: pointer;
    }
}
.message-item {
    border-radius: 4px;
    padding: 10px;
    max-width: 80%;
    color: #000;
    order: 1;
    position: relative;
    background-color: #fff;

    &.message-item-link {
        color: #2782d7;
    }

    &:before {
        content: "";
        border-width: 6px;
        border-style: solid;
        border-color: transparent;
        position: absolute;
        top: 10px;
        border-right-color: #fff;
        left: -12px;
    }
}
.message-postfix {
    flex: 0 0 48px;
    order: 0;
    a {
        font-size: 24px;
        color: #000;
        display: block;
        height: 48px;
        line-height: 48px;
        text-align: center;
        border-radius: 4px;
        background-color: #fff;
        text-decoration: none;
        margin-right: 12px;
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }
}
</style>
