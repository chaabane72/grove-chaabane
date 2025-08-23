/**
 * Grove - AHT20 Bloc personnalisé
 */
//% groups=['AHT20']
namespace grove {
    function Read(aht20: grove.sensors.AHT20): { Humidity: number, Temperature: number } {
        if (!aht20.GetState().Calibrated) {
            aht20.Initialization();
            if (!aht20.GetState().Calibrated) return null;
        }

        aht20.TriggerMeasurement();
        for (let i = 0; ; ++i) {
            if (!aht20.GetState().Busy) break;
            if (i >= 500) return null;
            basic.pause(10);
        }

        return aht20.Read();
    }

    /**
     * Lire la température (°C) depuis Grove-AHT20 (SKU#101990644)
     */
    //% group="AHT20"
    //% block="Grove - Capteur Temp&Humi | Lire la température (°C)"
    //% weight=3
    export function aht20ReadTemperatureC(): number {
        const aht20 = new grove.sensors.AHT20();
        const val = Read(aht20);
        if (val == null) return null;

        return val.Temperature;
    }

    /**
     * Lire la température (°F) depuis Grove-AHT20 (SKU#101990644)
     */
    //% group="AHT20"
    //% block="Grove - Capteur Temp&Humi | Lire la température (°F)"
    //% weight=2
    export function aht20ReadTemperatureF(): number {
        const aht20 = new grove.sensors.AHT20();
        const val = Read(aht20);
        if (val == null) return null;

        return val.Temperature * 9 / 5 + 32;
    }

    /**
     * Lire l'humidité depuis Grove-AHT20 (SKU#101990644)
     */
    //% group="AHT20"
    //% block="Grove - Capteur Temp&Humi | Lire l'humidité (%)"
    //% weight=1
    export function aht20ReadHumidity(): number {
        const aht20 = new grove.sensors.AHT20();
        const val = Read(aht20);
        if (val == null) return null;

        return val.Humidity;
    }

}
