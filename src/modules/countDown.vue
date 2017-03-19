<template>
    <div class="countDown">
        <span class="time">{{day}}</span>天<span class="time">{{hour}}</span>时<span class="time">{{minute}}</span>分<span class="time">{{second}}</span>秒
    </div>
</template>
<script>
export default {
    props: {
        date: {
            default: new Date()
        }
    },
    data() {
        return {
            day: '00',
            hour: '00',
            minute: '00',
            second: '00',
            count: this.date - new Date().getTime(),
            interval: null
        }
    },
    mounted() {
        this.start()
    },
    methods: {
        start() {
            this.interval = setInterval(() => {
                this.count = this.count - 1000
                if (this.count <= 0) {
                    this.second = '00'
                    clearInterval(this.interval)
                    this.timeDown()
                    return
                }
                let n1 = this.count % (60 * 60 * 1000 * 24);
                this.day = parseInt(this.count / (60 * 60 * 1000 * 24));
                this.hour = parseInt(n1 / (60 * 60 * 1000));
                if (this.hour < 10) {
                    this.hour = '0' + this.hour
                }
                let n = this.count % (60 * 60 * 1000)
                this.minute = parseInt(n / (60 * 1000));
                if (this.minute < 10) {
                    this.minute = '0' + this.minute
                }
                let n2 = n % (60 * 1000)
                this.second = parseInt(n2 / 1000);
                if (this.second < 10) {
                    this.second = '0' + this.second
                }
            }, 1000)
        },
        timeDown() {
            this.$emit('timeDown')
        }
    },
    computed: {}
}
</script>
<style scoped>
.countDown{
    color: #fff;
    display: inline-block;
}
.time{
    display: inline-block;
    background: #000;
    color: #ffea00;
    width: 35px; height: 35px;
    line-height: 35px;
    text-align: center;
    border-radius: 3px;
    margin: 0 3px;
}
</style>
