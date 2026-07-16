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
            $this->baseUrl . '/current.json',
            [
                'query' => [
                    'key' => $this->apiKey,
                    'q' => $city,
                    'aqi' => 'no',
                    'lang' => 'fr',
                ],
            ]
        );

        return $response->toArray();
    }
}
