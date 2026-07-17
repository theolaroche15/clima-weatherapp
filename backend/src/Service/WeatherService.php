<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Contracts\HttpClient\HttpClientInterface;

final class WeatherService
{
    public function __construct(
        private readonly HttpClientInterface $httpClient,

        #[Autowire('%env(WEATHER_API_KEY)%')]
        private readonly string $apiKey,

        #[Autowire('%env(WEATHER_API_BASE_URL)%')]
        private readonly string $baseUrl,
    ) {}

    public function getCurrentWeather(string $city): array
    {
        $response = $this->httpClient->request(
            'GET',
            $this->baseUrl . '/forecast.json',
            [
                'query' => [
                    'key' => $this->apiKey,
                    'q' => $city,
                    'days' => 3,
                    'aqi' => 'no',
                    'alerts' => 'no',
                    'lang' => 'fr',
                ],
            ]
        );

        $data = $response->toArray();

        $today = $data['forecast']['forecastday'][0];

        $hourlyForecast = [];

        foreach ($today['hour'] as $hour) {
            $hourlyForecast[] = [
                'time' => $hour['time'],

                'temperatureCelsius' => $hour['temp_c'],
                'temperatureFahrenheit' => $hour['temp_f'],

                'isDay' => $hour['is_day'] === 1,

                'condition' => [
                    'text' => $hour['condition']['text'],
                    'icon' => $this->formatIconUrl($hour['condition']['icon']),
                    'code' => $hour['condition']['code'],
                ],

                'windSpeedKph' => $hour['wind_kph'],
                'windDegree' => $hour['wind_degree'],
                'windDirection' => $hour['wind_dir'],

                'pressureMb' => $hour['pressure_mb'],

                'precipitationMm' => $hour['precip_mm'],
                'snowCm' => $hour['snow_cm'],

                'humidity' => $hour['humidity'],
                'cloud' => $hour['cloud'],

                'feelsLikeCelsius' => $hour['feelslike_c'],
                'feelsLikeFahrenheit' => $hour['feelslike_f'],

                'willRain' => $hour['will_it_rain'] === 1,
                'rainChance' => $hour['chance_of_rain'],

                'willSnow' => $hour['will_it_snow'] === 1,
                'snowChance' => $hour['chance_of_snow'],

                'visibilityKm' => $hour['vis_km'],

                'gustKph' => $hour['gust_kph'],

                'uvIndex' => $hour['uv'],
            ];
        }

        $dailyForecast = [];

        foreach ($data['forecast']['forecastday'] as $day) {
            $dailyForecast[] = [
                'date' => $day['date'],

                'minimumTemperatureCelsius' => $day['day']['mintemp_c'],
                'minimumTemperatureFahrenheit' => $day['day']['mintemp_f'],

                'maximumTemperatureCelsius' => $day['day']['maxtemp_c'],
                'maximumTemperatureFahrenheit' => $day['day']['maxtemp_f'],

                'averageTemperatureCelsius' => $day['day']['avgtemp_c'],
                'averageTemperatureFahrenheit' => $day['day']['avgtemp_f'],

                'maximumWindKph' => $day['day']['maxwind_kph'],

                'totalPrecipitationMm' => $day['day']['totalprecip_mm'],

                'averageVisibilityKm' => $day['day']['avgvis_km'],

                'averageHumidity' => $day['day']['avghumidity'],

                'dailyWillRain' => $day['day']['daily_will_it_rain'] === 1,
                'dailyRainChance' => $day['day']['daily_chance_of_rain'],

                'dailyWillSnow' => $day['day']['daily_will_it_snow'] === 1,
                'dailySnowChance' => $day['day']['daily_chance_of_snow'],

                'totalSnowCm' => $day['day']['totalsnow_cm'],

                'uvIndex' => $day['day']['uv'],

                'condition' => [
                    'text' => $day['day']['condition']['text'],
                    'icon' => $this->formatIconUrl($day['day']['condition']['icon']),
                    'code' => $day['day']['condition']['code'],
                ],

                'astro' => [
                    'sunrise' => $day['astro']['sunrise'],
                    'sunset' => $day['astro']['sunset'],
                    'isSunUp' => $day['astro']['is_sun_up'] === 1,
                ],
            ];
        }

        return [
            'location' => [
                'name' => $data['location']['name'],
                'region' => $data['location']['region'],
                'country' => $data['location']['country'],
                'latitude' => $data['location']['lat'],
                'longitude' => $data['location']['lon'],
                'timezone' => $data['location']['tz_id'],
                'localTime' => $data['location']['localtime'],
            ],

            'current' => [
                'lastUpdated' => $data['current']['last_updated'],
                'temperatureCelsius' => $data['current']['temp_c'],
                'temperatureFahrenheit' => $data['current']['temp_f'],
                'feelsLikeCelsius' => $data['current']['feelslike_c'],
                'feelsLikeFahrenheit' => $data['current']['feelslike_f'],
                'isDay' => $data['current']['is_day'] === 1,

                'condition' => [
                    'text' => $data['current']['condition']['text'],
                    'icon' => $this->formatIconUrl(
                        $data['current']['condition']['icon']
                    ),
                    'code' => $data['current']['condition']['code'],
                ],

                'windSpeedKph' => $data['current']['wind_kph'],
                'windDegree' => $data['current']['wind_degree'],
                'windDirection' => $data['current']['wind_dir'],
                'windGustKph' => $data['current']['gust_kph'],

                'pressureMb' => $data['current']['pressure_mb'],
                'precipitationMm' => $data['current']['precip_mm'],
                'humidity' => $data['current']['humidity'],
                'cloudCover' => $data['current']['cloud'],
                'visibilityKm' => $data['current']['vis_km'],
                'uvIndex' => $data['current']['uv'],

                'willRain' => $data['current']['will_it_rain'] === 1,
                'rainChance' => $data['current']['chance_of_rain'],
                'willSnow' => $data['current']['will_it_snow'] === 1,
                'snowChance' => $data['current']['chance_of_snow'],
            ],

            'forecast' => [
                'today' => [
                    'date' => $today['date'],

                    'minimumTemperatureCelsius' => $today['day']['mintemp_c'],
                    'minimumTemperatureFahrenheit' => $today['day']['mintemp_f'],

                    'maximumTemperatureCelsius' => $today['day']['maxtemp_c'],
                    'maximumTemperatureFahrenheit' => $today['day']['maxtemp_f'],

                    'averageTemperatureCelsius' => $today['day']['avgtemp_c'],
                    'averageTemperatureFahrenheit' => $today['day']['avgtemp_f'],

                    'maximumWindKph' => $today['day']['maxwind_kph'],
                    'totalPrecipitationMm' => $today['day']['totalprecip_mm'],
                    'averageVisibilityKm' => $today['day']['avgvis_km'],
                    'averageHumidity' => $today['day']['avghumidity'],

                    'dailyWillRain' => $today['day']['daily_will_it_rain'] === 1,
                    'dailyRainChance' => $today['day']['daily_chance_of_rain'],

                    'dailyWillSnow' => $today['day']['daily_will_it_snow'] === 1,
                    'dailySnowChance' => $today['day']['daily_chance_of_snow'],

                    'totalSnowCm' => $today['day']['totalsnow_cm'],
                    'uvIndex' => $today['day']['uv'],

                    'condition' => [
                        'text' => $today['day']['condition']['text'],
                        'icon' => $this->formatIconUrl(
                            $today['day']['condition']['icon']
                        ),
                        'code' => $today['day']['condition']['code'],
                    ],

                    'astro' => [
                        'sunrise' => $today['astro']['sunrise'],
                        'sunset' => $today['astro']['sunset'],
                        'isSunUp' => $today['astro']['is_sun_up'] === 1,
                    ],
                ],

                'hourly' => $hourlyForecast,
                'daily' => $dailyForecast,
            ],
        ];
    }

    private function formatIconUrl(string $iconUrl): string
    {
        if (str_starts_with($iconUrl, '//')) {
            return 'https:' . $iconUrl;
        }

        return $iconUrl;
    }
}
