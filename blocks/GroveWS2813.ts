/**
 * Support du ruban Grove RGB LED (WS2813)
 */
//% groups='["Ruban RGB LED (WS2813)"]'
namespace grove {

    /**
     * Connecter et configurer le ruban Grove RGB LED (WS2813)
     */
    //% block="connecter au ruban de LED sur %signalPin avec %numLEDs LED(s)"
    //% signalPin.defl=DigitalPin.P1
    //% numLEDs.defl=16
    //% group="Ruban RGB LED (WS2813)"
    //% weight=99
    //% blockSetVariable=strip
    export function connectToWS2813Strip(
        signalPin: DigitalPin = DigitalPin.P1,
        numLEDs: number = 16,
    ): neopixel.Strip {
        let strip = neopixel.create(signalPin, numLEDs, NeoPixelMode.RGB);
        strip.setBrightness(100);
        strip.show();
        return strip;
    }

    /**
     * Afficher une couleur sur tout le ruban
     */
    //% block="changer la couleur du ruban $strip en $color"
    //% strip.defl=strip
    //% color.defl=NeoPixelColors.Red
    //% strip.shadow=variables_get
    //% group="Ruban RGB LED (WS2813)"
    //% weight=89
    export function showColorOnWS2813Strip(
        strip: neopixel.Strip,
        color: NeoPixelColors = NeoPixelColors.Red
    ): void {
        const length = strip.length();
        for (let i = 0; i < length; ++i) {
            strip.setPixelColor(i, color);
        }
        strip.show();
    }

    /**
     * Effacer tout le ruban
     */
    //% block="effacer le ruban $strip"
    //% strip.defl=strip
    //% strip.shadow=variables_get
    //% group="Ruban RGB LED (WS2813)"
    //% weight=88
    export function clearWS2813Strip(strip: neopixel.Strip): void {
        strip.clear();
        strip.show();
    }

    /**
     * Afficher une couleur sur une LED spécifique
     */
    //% block="changer la couleur du ruban $strip à l'index %index en $color"
    //% strip.defl=strip
    //% index.defl=0
    //% color.defl=NeoPixelColors.Red
    //% strip.shadow=variables_get
    //% group="Ruban RGB LED (WS2813)"
    //% weight=87
    export function showColorAtIndexOnWS2813Strip(
        strip: neopixel.Strip,
        index: number,
        color: NeoPixelColors = NeoPixelColors.Red
    ): void {
        if (index < 0 || index >= strip.length()) {
            return;
        }
        strip.setPixelColor(index, color);
        strip.show();
    }

    /**
     * Effacer une LED spécifique
     */
    //% block="effacer le ruban $strip à l'index %index"
    //% strip.defl=strip
    //% index.defl=0
    //% strip.shadow=variables_get
    //% group="Ruban RGB LED (WS2813)"
    //% weight=86
    export function clearAtIndexOnWS2813Strip(strip: neopixel.Strip, index: number): void {
        if (index < 0 || index >= strip.length()) {
            return;
        }
        strip.setPixelColor(index, NeoPixelColors.Black);
        strip.show();
    }

    /**
     * Régler la luminosité du ruban
     */
    //% block="régler la luminosité du ruban $strip à %brightness"
    //% strip.defl=strip
    //% brightness.defl=100
    //% strip.shadow=variables_get
    //% group="Ruban RGB LED (WS2813)"
    //% weight=85
    export function setBrightnessOnWS2813Strip(strip: neopixel.Strip, brightness: number): void {
        if (brightness < 0 || brightness > 255) {
            return;
        }
        strip.setBrightness(brightness);
        strip.show();
    }

    /**
     * Afficher une couleur personnalisée sur tout le ruban
     */
    //% block="changer la couleur du ruban $strip en couleur perso R: %red V: %green B: %blue"
    //% strip.defl=strip
    //% red.defl=255
    //% green.defl=0
    //% blue.defl=0
    //% strip.shadow=variables_get
    //% group="Ruban RGB LED (WS2813)"
    //% weight=85
    export function showCustomColorOnWS2813Strip(
        strip: neopixel.Strip,
        red: number = 255,
        green: number = 0,
        blue: number = 0
    ): void {
        const length = strip.length();
        for (let i = 0; i < length; ++i) {
            strip.setPixelColor(i, neopixel.rgb(red, green, blue));
        }
        strip.show();
    }

    /**
     * Afficher une couleur personnalisée sur une LED spécifique
     */
    //% block="changer la couleur du ruban $strip à l'index %index en couleur perso R: %red V: %green B: %blue"
    //% strip.defl=strip
    //% index.defl=0
    //% red.defl=255
    //% green.defl=0
    //% blue.defl=0
    //% strip.shadow=variables_get
    //% group="Ruban RGB LED (WS2813)"
    //% weight=84
    export function showCustomColorAtIndexOnWS2813Strip(
        strip: neopixel.Strip,
        index: number,
        red: number = 255,
        green: number = 0,
        blue: number = 0
    ): void {
        if (index < 0 || index >= strip.length()) {
            return;
        }
        strip.setPixelColor(index, neopixel.rgb(red, green, blue));
        strip.show();
    }

}
