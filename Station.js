export default class Station
{
    constructor(id)
    {
        this.id = id
        this.uid = null
        this.waterLevel = null
        this.humidityLevel = null
        this.waterGateState = false
        this.waterGateOpenedAt = null
        this.openTime = 30 * 1000

        // setInterval(this.logData, 1000)
    }

    getUid() { return this.uid }
    setUid(uid) { this.uid = uid }

    getWaterLevel() { return this.waterLevel }
    setWaterLevel(lvl) { this.waterLevel = lvl }
    
    getHumidityLevel() { return this.humidityLevel }
    setHumidityLevel(lvl) { this.humidityLevel = lvl }

    getWaterGateState() { return this.waterGateState }
    setWaterGateState(state) { this.waterGateState = state }

    getWaterGateOpenedAt() { return this.waterGateOpenedAt }
    setWaterGateOpenedAt(time) { this.waterGateOpenedAt = time }

    getOpenTime() { return this.openTime }

    logData = () =>
    {
        if (this.uid !== null) {
            console.log(`[${this.uid}] Water Level: ${this.waterLevel}`)
            console.log(`[${this.uid}] Humidity Level: ${this.humidityLevel}`)
        }
    }
}