/**
 * Support IA SenseCraft pour le module Grove Vision AI V2
 */
//% groups='["Vision AI V2"]'
namespace grove {

    namespace vision_ai_v2 {
        export let transport: grove.plugins.sscma.Transport;
        export let atClient: grove.plugins.sscma.ATClient;

        export let detectionResults: DetectionResult[] = [];
        export let classificationResults: ClassificationResult[] = [];
        export let errorCode: OperationCode = OperationCode.Unknown;
    }

    /**
     * Connecter et configurer le module Grove Vision AI V2 via I2C
     */
    //% block="connecter et configurer l'appareil, journal série %serialLogging"
    //% group="Vision AI V2"
    //% weight=100
    //% color="#AA278D"
    export function connectAndSetupGroveVisionAIV2(
        serialLogging: boolean = false,
        i2cAddress: number = 0x62,
        i2cClock: number = 400000,
        force: boolean = false
    ) {
        if (force || !vision_ai_v2.transport) {
            vision_ai_v2.transport = grove.plugins.sscma.Transport.connect(
                i2cAddress,
                i2cClock
            );
        }

        if (force || !vision_ai_v2.atClient) {
            vision_ai_v2.atClient = new grove.plugins.sscma.ATClient(
                vision_ai_v2.transport,
                serialLogging
            );
        } else if (vision_ai_v2.atClient && vision_ai_v2.atClient.getDeviceStatus() === DeviceStatus.Disconnected) {
            vision_ai_v2.atClient.getDeviceStatus();
        }
    }

    /**
     * Obtenir l'état de l'appareil Grove Vision AI V2
     */
    //% block="obtenir l'état de l'appareil"
    //% group="Vision AI V2"
    //% advanced=true
    //% weight=99
    export function getGroveVisionAIV2DeviceStatus(fromCache: boolean = true): DeviceStatus {
        if (vision_ai_v2.atClient) {
            return vision_ai_v2.atClient.getDeviceStatus(fromCache);
        }
        return DeviceStatus.Disconnected;
    }

    /**
     * Obtenir le nom de l'appareil Grove Vision AI V2
     */
    //% block="obtenir le nom de l'appareil"
    //% blockSetVariable=nomAppareil
    //% group="Vision AI V2"
    //% advanced=true
    //% weight=98
    export function getGroveVisionAIV2DeviceName(fromCache: boolean = true): string {
        if (vision_ai_v2.atClient) {
            return vision_ai_v2.atClient.getDeviceName(fromCache);
        }
        return "";
    }

    /**
     * Obtenir l'ID de l'appareil Grove Vision AI V2
     */
    //% block="obtenir l'ID de l'appareil"
    //% blockSetVariable=idAppareil
    //% group="Vision AI V2"
    //% advanced=true
    //% weight=97
    export function getGroveVisionAIV2DeviceId(fromCache: boolean = true): string {
        if (vision_ai_v2.atClient) {
            return vision_ai_v2.atClient.getDeviceId(fromCache);
        }
        return "";
    }

    /**
     * Obtenir les infos du modèle IA du Grove Vision AI V2
     */
    //% block="obtenir les infos du modèle IA"
    //% blockSetVariable=infosModele
    //% group="Vision AI V2"
    //% advanced=true
    //% weight=89
    export function getAIModelInfo(fromCache: boolean = true): ModelInfo {
        if (vision_ai_v2.atClient) {
            return vision_ai_v2.atClient.getModelInfo(fromCache);
        }
        return new ModelInfo("", "", []);
    }

    /**
     * Démarrer l'inférence IA sur le Grove Vision AI V2
     */
    //% block="démarrer l'inférence IA"
    //% group="Vision AI V2"
    //% weight=79
    //% color="#AA278D"
    export function startAIInference(timeout: number = 1000, force: boolean = true): boolean {
        if (vision_ai_v2.atClient) {
            if (force && vision_ai_v2.atClient.isInference(timeout)) {
                vision_ai_v2.atClient.stopInference(timeout);
            }
            return vision_ai_v2.atClient.startInference(timeout);
        }
        return false;
    }

    let _onDetectionResultsHandler: (detectionResults: DetectionResult[]) => void = null;
    let _onClassificationResultsHandler: (classificationResults: ClassificationResult[]) => void = null;
    let _onErrorHandler: (errorCode: OperationCode) => void = null;

    function _onReceiveDetectionResults(detectionResults: DetectionResult[]) {
        vision_ai_v2.detectionResults = detectionResults;
        if (_onDetectionResultsHandler) {
            _onDetectionResultsHandler(vision_ai_v2.detectionResults);
        }
    }

    function _onReceiveClassificationResults(classificationResults: ClassificationResult[]) {
        vision_ai_v2.classificationResults = classificationResults;
        if (_onClassificationResultsHandler) {
            _onClassificationResultsHandler(vision_ai_v2.classificationResults);
        }
    }

    function _onReceiveError(errorCode: OperationCode) {
        vision_ai_v2.errorCode = errorCode;
        if (_onErrorHandler) {
            _onErrorHandler(vision_ai_v2.errorCode);
        }
    }

    /**
     * Récupérer les résultats d'inférence IA
     */
    //% block="récupérer les résultats d'inférence IA"
    //% group="Vision AI V2"
    //% weight=78
    //% color="#008D63"
    export function fetchAIInferenceResults(
        maxResults: number = 15,
        timeout: number = 1000,
    ): boolean {
        vision_ai_v2.detectionResults = []
        vision_ai_v2.classificationResults = []

        if (vision_ai_v2.atClient) {
            return vision_ai_v2.atClient.fetchInferenceResult(
                _onReceiveDetectionResults,
                _onReceiveClassificationResults,
                _onReceiveError,
                maxResults,
                timeout
            );
        }
        return false;
    }

    /**
     * Arrêter l'inférence IA
     */
    //% block="arrêter l'inférence IA"
    //% group="Vision AI V2"
    //% advanced=true
    //% weight=77
    export function stopAIInference(timeout: number = 1000) {
        if (vision_ai_v2.atClient) {
            vision_ai_v2.atClient.stopInference(timeout);
        }
    }

    /**
     * Compter les objets par ID
     */
    //% block="compter les objets avec ID %ids"
    //% group="Vision AI V2"
    //% advanced=true
    //% weight=69
    export function countObjectById(ids: number[]): number {
        let count = 0;
        for (let detectionResult of vision_ai_v2.detectionResults) {
            for (let id of ids) {
                if (detectionResult.id == id) {
                    ++count;
                }
            }
        }
        for (let classificationResult of vision_ai_v2.classificationResults) {
            for (let id of ids) {
                if (classificationResult.id == id) {
                    ++count;
                }
            }
        }
        return count;
    }

    /**
     * Compter les objets par nom
     */
    //% block="compter les objets nommés %labels"
    //% group="Vision AI V2"
    //% weight=68
    export function countObjectByName(labels: string[]): number {
        let count = 0;
        for (let detectionResult of vision_ai_v2.detectionResults) {
            for (let label of labels) {
                if (detectionResult.label == label) {
                    ++count;
                }
            }
        }
        for (let classificationResult of vision_ai_v2.classificationResults) {
            for (let label of labels) {
                if (classificationResult.label == label) {
                    ++count;
                }
            }
        }
        return count;
    }

    /**
     * Vérifier si des objets avec ID existent
     */
    //% block="contient un objet avec ID %ids"
    //% group="Vision AI V2"
    //% advanced=true
    //% weight=67
    export function containsObjectId(ids: number[]): boolean {
        return countObjectById(ids) > 0;
    }

    /**
     * Vérifier si des objets avec nom existent
     */
    //% block="contient un objet nommé %labels"
    //% group="Vision AI V2"
    //% weight=66
    export function containsObjectName(labels: string[]): boolean {
        return countObjectByName(labels) > 0;
    }

    /**
     * Quand des résultats de détection sont reçus
     */
    //% block="quand résultats de détection reçus"
    //% group="Vision AI V2"
    //% advanced=true
    //% weight=59
    //% color="#AA278D"
    export function onReceiveDetectionResult(handler: (detectionResults: DetectionResult[]) => void) {
        _onDetectionResultsHandler = handler;
    }

    /**
     * Quand des résultats de classification sont reçus
     */
    //% block="quand résultats de classification reçus"
    //% group="Vision AI V2"
    //% advanced=true
    //% weight=58
    //% color="#AA278D"
    export function onReceiveClassificationResult(handler: (classificationResults: ClassificationResult[]) => void) {
        _onClassificationResultsHandler = handler;
    }

    /**
     * Quand une erreur est reçue
     */
    //% block="quand une erreur est reçue"
    //% group="Vision AI V2"
    //% advanced=true
    //% weight=57
    //% color="#AA278D"
    export function onReceiveError(handler: (errorCode: OperationCode) => void) {
        _onErrorHandler = handler;
    }

    /**
     * Obtenir les résultats de détection récupérés
     */
    //% block="obtenir résultats de détection"
    //% blockSetVariable=resultatsDetection
    //% group="Vision AI V2"
    //% weight=56
    export function getFetchedDetectionResults(): DetectionResult[] {
        return vision_ai_v2.detectionResults;
    }

    /**
     * Obtenir les résultats de classification récupérés
     */
    //% block="obtenir résultats de classification"
    //% blockSetVariable=resultatsClassification
    //% group="Vision AI V2"
    //% weight=55
    export function getFetchedClassificationResults(): ClassificationResult[] {
        return vision_ai_v2.classificationResults;
    }

    /**
     * Obtenir le code d'erreur d'inférence IA
     */
    //% block="obtenir code d'erreur d'inférence IA"
    //% blockSetVariable=codeErreur
    //% group="Vision AI V2"
    //% advanced=true
    //% weight=54
    export function getAIInferenceErrorCode(): OperationCode {
        return vision_ai_v2.errorCode;
    }
};
