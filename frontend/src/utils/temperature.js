export function convertTemperature(temperature, unit = 'celsius') {
    if (temperature === null || temperature === undefined) {
        return '--'
    }

    if (unit === 'fahrenheit') {
        return Math.round((temperature * 9) / 5 + 32)
    }

    return Math.round(temperature)
}

export function getTemperatureUnit(unit = 'celsius') {
    return unit === 'fahrenheit' ? '°F' : '°C'
}