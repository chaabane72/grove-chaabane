/**
 * Prise en charge du pilote de moteur Grove Mini I2C (DRV8830)
 */
//% groups='["Pilote de moteur Mini I2C (DRV8830)"]'
namespace grove {

    export enum DRV8830Addr {
        //% block="Canal 1"
        Canal1 = 0xCA,
        //% block="Canal 2"
        Canal2 = 0xC0,
    };

    export enum DRV8830Command {
        //% block="Faire tourner"
        FaireTourner = 0x00,
        //% block="Arrêter"
        Arreter = 0x01,
        //% block="Freiner"
        Freiner = 0x02,
        //% block="Défaut"
        Defaut = 0x03,
        //% block="Effacer le défaut"
        EffacerDefaut = 0x04,
    };

    export enum DRV8830Fault {
        //% block="Erreur de connexion"
        ErreurConnexion = -1,
        //% block="Pas de défaut"
        PasDeDefaut = 0x00,
        //% block="Limite de courant"
        LimiteCourant = 0b00010000,
        //% block="Surchauffe"
        Surchauffe = 0b00001000,
        //% block="Sous-tension"
        SousTension = 0b00000100,
        //% block="Surcharge de courant"
        SurchargeCourant = 0b00000010,
        //% block="Défaut inconnu"
        DefautInconnu = 0b00000001,
    };


    let _drv8830_canal1: grove.sensors.DRV8830 = null;
    let _drv8830_canal2: grove.sensors.DRV8830 = null;

    function getDRV8830Instance(
        canal: DRV8830Addr,
        serialLogging: boolean = false
    ): grove.sensors.DRV8830 {
        switch (canal) {
            case DRV8830Addr.Canal1:
                if (!_drv8830_canal1) {
                    _drv8830_canal1 = new grove.sensors.DRV8830(DRV8830Addr.Canal1, serialLogging);
                    while (!_drv8830_canal1.connect());
                }
                return _drv8830_canal1;
            case DRV8830Addr.Canal2:
                if (!_drv8830_canal2) {
                    _drv8830_canal2 = new grove.sensors.DRV8830(DRV8830Addr.Canal2, serialLogging);
                    while (!_drv8830_canal2.connect());
                }
                return _drv8830_canal2;
            default:
                return null;
        }
    }

    /**
     * Régler la vitesse du moteur avec le pilote DRV8830.
     * @param canal Le canal DRV8830 à utiliser (Canal 1 ou Canal 2)
     * @param vitesse La vitesse à régler (-64 à 63)
     */
    //% block="régler %canal à la vitesse %vitesse"
    //% group="Pilote de moteur Mini I2C (DRV8830)"
    //% advanced=true
    //% weight=99
    export function reglerVitesseDRV8830(
        canal: DRV8830Addr = DRV8830Addr.Canal1,
        vitesse: number = 0
    ): boolean {
        const drv8830 = getDRV8830Instance(canal);
        if (!drv8830) return false;
        return drv8830.setSpeed(vitesse);
    }

    /**
     * Régler la vitesse du moteur avec le pilote DRV8830 sans valeur de retour.
     * @param canal Le canal DRV8830 à utiliser (Canal 1 ou Canal 2)
     * @param vitesse La vitesse à régler (-64 à 63)
     */
    //% block="régler %canal à la vitesse %vitesse"
    //% group="Pilote de moteur Mini I2C (DRV8830)"
    //% weight=99
    export function reglerVitesseDRV8830SansRetour(
        canal: DRV8830Addr = DRV8830Addr.Canal1,
        vitesse: number = 0
    ) {
        reglerVitesseDRV8830(canal, vitesse);
    }

    /**
     * Arrêter le moteur avec le pilote DRV8830.
     * @param canal Le canal DRV8830 à utiliser (Canal 1 ou Canal 2)
     */
    //% block="arrêter le moteur sur %canal"
    //% group="Pilote de moteur Mini I2C (DRV8830)"
    //% advanced=true
    //% weight=98
    export function arreterDRV8830(
        canal: DRV8830Addr = DRV8830Addr.Canal1
    ): boolean {
        const drv8830 = getDRV8830Instance(canal);
        if (!drv8830) return false;
        return drv8830.setStop();
    }

    /**
     * Arrêter le moteur avec le pilote DRV8830 sans valeur de retour.
     * @param canal Le canal DRV8830 à utiliser (Canal 1 ou Canal 2)
     */
    //% block="arrêter le moteur sur %canal"
    //% group="Pilote de moteur Mini I2C (DRV8830)"
    //% weight=98
    export function arreterDRV8830SansRetour(
        canal: DRV8830Addr = DRV8830Addr.Canal1
    ) {
        arreterDRV8830(canal);
    }

    /**
     * Freiner le moteur avec le pilote DRV8830.
     * @param canal Le canal DRV8830 à utiliser (Canal 1 ou Canal 2)
     */
    //% block="freiner le moteur sur %canal"
    //% group="Pilote de moteur Mini I2C (DRV8830)"
    //% advanced=true
    //% weight=97
    export function freinerDRV8830(
        canal: DRV8830Addr = DRV8830Addr.Canal1
    ): boolean {
        const drv8830 = getDRV8830Instance(canal);
        if (!drv8830) return false;
        return drv8830.setBrake();
    }

    /**
     * Freiner le moteur avec le pilote DRV8830 sans valeur de retour.
     * @param canal Le canal DRV8830 à utiliser (Canal 1 ou Canal 2)
     */
    //% block="freiner le moteur sur %canal"
    //% group="Pilote de moteur Mini I2C (DRV8830)"
    //% weight=97
    export function freinerDRV8830SansRetour(
        canal: DRV8830Addr = DRV8830Addr.Canal1
    ) {
        freinerDRV8830(canal);
    }

    /**
     * Obtenir l'état de défaut depuis le pilote DRV8830.
     * @param canal Le canal DRV8830 à utiliser (Canal 1 ou Canal 2)
     * @return L'état du défaut comme valeur de l'énumération DRV8830Fault
     */
    //% block="obtenir le défaut de %canal"
    //% group="Pilote de moteur Mini I2C (DRV8830)"
    //% weight=96
    export function obtenirDefautDRV8830(
        canal: DRV8830Addr = DRV8830Addr.Canal1
    ): DRV8830Fault {
        const drv8830 = getDRV8830Instance(canal);
        if (!drv8830) return DRV8830Fault.DefautInconnu;
        const defaut = drv8830.getFault();
        switch (defaut) {
            case 0x00:
                return DRV8830Fault.PasDeDefaut;
            case 0b00010000:
                return DRV8830Fault.LimiteCourant;
            case 0b00001000:
                return DRV8830Fault.Surchauffe;
            case 0b00000100:
                return DRV8830Fault.SousTension;
            case 0b00000010:
                return DRV8830Fault.SurchargeCourant;
            case 0b00000001:
                return DRV8830Fault.DefautInconnu;
            default:
                return DRV8830Fault.ErreurConnexion;
        }
    }

    /**
     * Effacer l'état de défaut sur le pilote DRV8830.
     * @param canal Le canal DRV8830 à utiliser (Canal 1 ou Canal 2)
     * @return Vrai si le défaut a été effacé avec succès, faux sinon
     */
    //% block="effacer le défaut sur %canal"
    //% group="Pilote de moteur Mini I2C (DRV8830)"
    //% advanced=true
    //% weight=95
    export function effacerDefautDRV8830(
        canal: DRV8830Addr = DRV8830Addr.Canal1
    ): boolean {
        const drv8830 = getDRV8830Instance(canal);
        if (!drv8830) return false;
        return drv8830.clearFault();
    }

    /**
     * Effacer l'état de défaut sur le pilote DRV8830 sans valeur de retour.
     * @param canal Le canal DRV8830 à utiliser (Canal 1 ou Canal 2)
     */
    //% block="effacer le défaut sur %canal"
    //% group="Pilote de moteur Mini I2C (DRV8830)"
    //% weight=95
    export function effacerDefautDRV8830SansRetour(
        canal: DRV8830Addr = DRV8830Addr.Canal1
    ) {
        effacerDefautDRV8830(canal);
    }

}
