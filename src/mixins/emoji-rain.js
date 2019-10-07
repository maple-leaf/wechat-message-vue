const rules = {
    '生日快乐': '🎂',
};

export default {
    data() {
        return {
            endCount: 0,
            emojiTotal: 10,
            emojis: [],
            emojiContainerRect: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: 0,
                height: 0,
            }
        };
    },
    computed: {
        emojiContainerStyle() {
            const { left, width, top, height } = this.emojiContainerRect;
            return {
                left: `${left}px`,
                width: `${width}px`,
                top: `${top}px`,
                height: `${height}px`,
            }
        }
    },
    methods: {
        onAnimationEnd() {
            this.endCount += 1;
            if (this.endCount >= this.emojiTotal) {
                this.emojis = [];
            }
        },
        getEmojiStyle() {
            return {
                left: `${Math.random() * this.emojiContainerRect.width}px`,
            };
        },
        showEmojiRain() {
            const emoji = this.messages
                .filter(m => m.status !== 'read')
                .map(message => rules[(message.content || '').trim()])
                .filter(emoji => emoji)
                .pop();

            if (emoji) {
                this.emojis = new Array(this.emojiTotal).fill(emoji);
            }
        }
    },
    mounted() {
        const container = document.body.querySelector('#panelContent');
        this.emojiContainerRect = container.getBoundingClientRect();

        this.showEmojiRain();
    },
    watch: {
        messages() {
            this.showEmojiRain();
        }
    }
}
