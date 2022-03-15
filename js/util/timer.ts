export default class Timer {
    private timeout = 0;
    public start(minutes: number) {
        this.timeout = Date.now() + (minutes * 60000);
    }
    public isActive() {
        return (Date.now() <= this.timeout);
    }
    public cooldownCheck() {
        const dif = new Date(this.timeout - Date.now());
        return this.formatTime(dif);
    }
    public convertToTime(num: number) {
        const dif = new Date(num * 60000);
        return this.formatTime(dif);
    }
    private formatTime(dif: Date) {
        if (dif.getMinutes() > 0) {
            if (dif.getMinutes() < 2) {
                return `${dif.getMinutes()} minuto${dif.getSeconds() == 0 ? '' : ' e ' + dif.getSeconds() + ' segundos'}`;
            } else {
                return `${dif.getMinutes()} minutos${dif.getSeconds() == 0 ? '' : ' e ' + dif.getSeconds() + ' segundos'}`;
            }
        } else {
            return `${dif.getSeconds()} segundos`;
        }
    } 
}