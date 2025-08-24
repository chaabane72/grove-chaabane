/**
 * Blocs pour Grove LCD 16x2 (v1)
 */
//% groups=['LCD1602v1']
namespace grove {
    let _lcdI2cAddr = 0x3e;
    let _displayfunction = 0;
    let _displaycontrol = 0;
    let _displaymode = 0;

    function i2c_send_byte(buf: Buffer) {
        pins.i2cWriteBuffer(_lcdI2cAddr, buf, false);
    }

    function lcd_send_cmd(cmd: number) {
        let buf: Buffer = pins.createBuffer(2);
        buf[0] = 0x80;
        buf[1] = cmd;
        i2c_send_byte(buf);
    }

    function lcd_send_data(data: number) {
        let buf: Buffer = pins.createBuffer(2);
        buf[0] = 0x40;
        buf[1] = data;
        i2c_send_byte(buf);
    }

    function lcd_set_cursor(col: number, row: number) {
        let buf: Buffer = pins.createBuffer(2);
        col = (row == 0 ? col | 0x80 : col | 0xc0);
        buf[0] = 0x80;
        buf[1] = col;
        i2c_send_byte(buf);
    }

    /**
     * Initialiser l'écran LCD
     */
    //% group="LCD1602v1"
    //% block="initialiser l'écran"
    //% weight=3
    export function lcd_init() {
        _displayfunction |= 0x08;
        lcd_send_cmd(0x20 | _displayfunction); // séquence de commande

        _displaycontrol = 0x04 | 0x00 | 0x00;
        lcd_send_cmd(0x08 | _displaycontrol); // contrôle de l'affichage

        _displaymode = 0x02 | 0x00;
        lcd_send_cmd(0x04 | _displaymode); // mode d'affichage

        lcd_clear(); // effacer
    }

    /**
     * Afficher un nombre sur l'écran LCD à une position donnée
     */
    //% group="LCD1602v1"
    //% block="afficher nombre %n colonne %x ligne %y"
    //% weight=3
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    export function lcd_show_number(n: number, x: number, y: number): void {
        let s = n.toString()
        lcd_show_string(s, x, y)
    }

    /**
     * Afficher un texte sur l'écran LCD à une position donnée
     */
    //% group="LCD1602v1"
    //% block="afficher texte %s colonne %x ligne %y"
    //% weight=3
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    export function lcd_show_string(s: string, x: number, y: number): void {
        lcd_set_cursor(x, y);
        for (let i = 0; i < s.length; i++) {
            lcd_send_data(s.charCodeAt(i))
        }
    }

    /**
     * Allumer l'écran LCD
     */
    //% group="LCD1602v1"
    //% block="allumer l'écran"
    //% weight=3
    export function lcd_display_on(): void {
        _displaycontrol |= 0x04;
        lcd_send_cmd(0x08 | _displaycontrol);
    }

    /**
     * Éteindre l'écran LCD
     */
    //% group="LCD1602v1"
    //% block="éteindre l'écran"
    //% weight=3
    export function lcd_display_off(): void {
        _displaycontrol &= ~0x04;
        lcd_send_cmd(0x08 | _displaycontrol);
    }

    /**
     * Effacer tout le contenu de l'écran
     */
    //% group="LCD1602v1"
    //% block="effacer l'écran"
    //% weight=3
    export function lcd_clear(): void {
        lcd_send_cmd(0x01);
        basic.pause(2);
    }
}
