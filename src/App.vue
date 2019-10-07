<template>
    <div id="app">
        <div class="app-title">Wechat messager vue component demo</div>
        <WeChatPanel/>
    </div>
</template>

<script>
import WeChatPanel from './components/wechat-panel.vue';

export default {
    name: 'app',
    components: {
        WeChatPanel,
    },
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
.app-title {
    font-size: 24px;
    color: #000;
    border-bottom: 2px solid rgba(0, 0, 0, .3);
}
</style>
