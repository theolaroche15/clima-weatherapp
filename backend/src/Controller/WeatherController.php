<?php

namespace App\Controller;

use App\Service\WeatherService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class WeatherController extends AbstractController
{
    #[Route(
        '/api/weather/search',
        name: 'api_weather_search',
        methods: ['GET']
    )]
    public function search(
        Request $request,
        WeatherService $weatherService
    ): JsonResponse {
        $query = trim((string) $request->query->get('query', ''));

        if ($query === '') {
            return $this->json([
                'error' => 'The "query" parameter is required.',
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            $cities = $weatherService->searchCities($query);

            return $this->json([
                'cities' => $cities,
            ]);
        } catch (\Throwable $exception) {
            return $this->json([
                'error' => 'Unable to search cities.',
                'details' => $exception->getMessage(),
            ], Response::HTTP_BAD_GATEWAY);
        }
    }

    #[Route(
        '/api/weather/current',
        name: 'api_weather_current',
        methods: ['GET']
    )]
    public function current(
        Request $request,
        WeatherService $weatherService
    ): JsonResponse {
        $city = trim((string) $request->query->get('city', ''));

        if ($city === '') {
            return $this->json([
                'error' => 'Le paramètre "city" est obligatoire.',
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            $weather = $weatherService->getCurrentWeather($city);

            return $this->json($weather);
        } catch (\Throwable $exception) {
            return $this->json([
                'error' => 'Impossible de récupérer la météo.',
                'details' => $exception->getMessage(),
            ], Response::HTTP_BAD_GATEWAY);
        }
    }
}
