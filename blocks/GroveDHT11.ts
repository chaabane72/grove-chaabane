/**
 * Grove Capteur de Température & Humidité (DHT11)
 */
//% groups='["Capteur de Température & Humidité (DHT11)"]'
namespace grove {

    /**
    * Connecter et configurer le capteur Grove de Température & Humidité (DHT11)
    * @param signalPin La broche numérique connectée au capteur
    * @param serialLogging Activer le journal série pour le débogage
    * @return Une instance DHT11Helper pour lire température et humidité
    */
    //% block="connecter le capteur sur %signalPin, journal série %serialLogging"
    //% signalPin.defl=DigitalPin.P1
    //% blockSetVariable=dht11
    //% group="Capteur de Température & Humidité (DHT11)"
    //% weight=99
    //% color="#AA278D"
    export function connectToDHT11(signalPin: DigitalPin = DigitalPin.P1, serialLogging: boolean = false): grove.sensors.DHT11Helper {
        return new grove.sensors.DHT11Helper(signalPin, serialLogging);
    }

    /**
     * Lire la température et l'humidité du capteur
     * @param sensor L'instance DHT11Helper
     * @param forceRead Forcer une lecture même si la dernière est récente (2s), false recommandé en usage normal
     * @return True si la lecture a réussi, sinon false
     */
    //% block="lire température et humidité de $sensor, forcer lecture %forceRead"
    //% sensor.defl=dht11
    //% sensor.shadow=variables_get
    //% group="Capteur de Température & Humidité (DHT11)"
    //% weight=98
    //% color="#008D63"
    export function readTemperatureHumidity(sensor: grove.sensors.DHT11Helper, forceRead: boolean = false): boolean {
        if (sensor) {
            return sensor.readSensorData(forceRead);
        }
        return false;
    }


    /**
     * Obtenir l'humidité en pourcentage
     * @param sensor L'instance DHT11Helper
     * @param autoRead Lire automatiquement avant d'obtenir l'humidité
     * @return L'humidité en %, ou NaN si le capteur n'est pas connecté
     */
    //% block="obtenir humidité depuis $sensor"
    //% sensor.defl=dht11
    //% sensor.shadow=variables_get
    //% group="Capteur de Température & Humidité (DHT11)"
    //% weight=89
    export function getHumidity(sensor: grove.sensors.DHT11Helper, autoRead: boolean = true): number {
        if (sensor) {
            if (autoRead) {
                sensor.readSensorData();
            }
            return sensor.humidity;
        }
        return NaN;
    }

    /**
     * Obtenir la température en Celsius
     * @param sensor L'instance DHT11Helper
     * @param autoRead Lire automatiquement avant d'obtenir la température
     * @return La température en °C, ou NaN si le capteur n'est pas connecté
     */
    //% block="obtenir température en celsius depuis $sensor"
    //% sensor.defl=dht11
    //% sensor.shadow=variables_get
    //% group="Capteur de Température & Humidité (DHT11)"
    //% weight=88
    export function getTemperatureCelsius(sensor: grove.sensors.DHT11Helper, autoRead: boolean = true): number {
        if (sensor) {
            if (autoRead) {
                sensor.readSensorData();
            }
            return sensor.temperature;
        }
        return NaN;
    }

    /**
     * Obtenir la température en Fahrenheit
     * @param sensor L'instance DHT11Helper
     * @param autoRead Lire automatiquement avant d'obtenir la température
     * @return La température en °F, ou NaN si le capteur n'est pas connecté
     */
    //% block="obtenir température en fahrenheit depuis $sensor"
    //% sensor.defl=dht11
    //% sensor.shadow=variables_get
    //% group="Capteur de Température & Humidité (DHT11)"
    //% weight=87
    export function getTemperatureFahrenheit(sensor: grove.sensors.DHT11Helper, autoRead: boolean = true): number {
        if (sensor) {
            if (autoRead) {
                sensor.readSensorData();
            }
            const celsius = sensor.temperature;
            return (celsius * 1.8) + 32;
        }
        return NaN;
    }

}
