<?php

namespace App\Controller;

use App\Entity\SearchHistory;
use App\Entity\User;
use App\Repository\SearchHistoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api/search-history')]
final class SearchHistoryController extends AbstractController
{
    #[Route('', methods: ['POST'])]
    public function create(
        #[CurrentUser] ?User $user,
        Request $request,
        EntityManagerInterface $entityManager,
        SearchHistoryRepository $searchHistoryRepository
    ): JsonResponse {
        if (!$user) {
            return $this->json([
                'error' => 'Authentication required.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json([
                'error' => 'Invalid JSON.',
            ], Response::HTTP_BAD_REQUEST);
        }

        $existingSearch = $searchHistoryRepository->findOneBy([
            'user' => $user,
            'cityName' => $data['cityName'],
        ]);

        if ($existingSearch) {
            $entityManager->remove($existingSearch);
        }

        $searchHistory = new SearchHistory();

        $searchHistory->setUser($user);
        $searchHistory->setCityName($data['cityName']);
        $searchHistory->setRegion($data['region']);
        $searchHistory->setCountry($data['country']);
        $searchHistory->setLatitude($data['latitude']);
        $searchHistory->setLongitude($data['longitude']);
        $searchHistory->setSearchedAt(new \DateTimeImmutable());

        $entityManager->persist($searchHistory);
        $entityManager->flush();

        $searchHistoryList = $searchHistoryRepository->findBy(
            ['user' => $user],
            ['searchedAt' => 'DESC']
        );

        if (count($searchHistoryList) > 5) {
            $oldSearches = array_slice($searchHistoryList, 5);

            foreach ($oldSearches as $oldSearch) {
                $entityManager->remove($oldSearch);
            }

            $entityManager->flush();
        }

        return $this->json([
            'message' => 'Search saved successfully.',
        ], Response::HTTP_CREATED);
    }

    #[Route('', methods: ['GET'])]
    public function index(
        #[CurrentUser] ?User $user,
        SearchHistoryRepository $searchHistoryRepository
    ): JsonResponse {
        if (!$user) {
            return $this->json([
                'error' => 'Authentication required.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $searchHistory = $searchHistoryRepository->findBy(
            ['user' => $user],
            ['searchedAt' => 'DESC']
        );

        $history = [];

        foreach ($searchHistory as $search) {
            $history[] = [
                'id' => $search->getId(),
                'cityName' => $search->getCityName(),
                'region' => $search->getRegion(),
                'country' => $search->getCountry(),
                'latitude' => $search->getLatitude(),
                'longitude' => $search->getLongitude(),
                'searchedAt' => $search->getSearchedAt()->format(DATE_ATOM),
            ];
        }

        return $this->json([
            'history' => $history,
        ]);
    }

    #[Route('', methods: ['DELETE'])]
    public function deleteAll(
        #[CurrentUser] ?User $user,
        SearchHistoryRepository $searchHistoryRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        if (!$user) {
            return $this->json([
                'error' => 'Authentication required.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $searchHistory = $searchHistoryRepository->findBy([
            'user' => $user,
        ]);

        foreach ($searchHistory as $search) {
            $entityManager->remove($search);
        }

        $entityManager->flush();

        return $this->json([
            'message' => 'Search history deleted successfully.',
        ]);
    }
}
