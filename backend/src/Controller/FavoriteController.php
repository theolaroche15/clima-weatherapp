<?php

namespace App\Controller;

use App\Entity\Favorite;
use App\Entity\User;
use App\Repository\FavoriteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api/favorites')]
final class FavoriteController extends AbstractController
{
    #[Route('', methods: ['POST'])]
    public function create(
        #[CurrentUser] ?User $user,
        Request $request,
        FavoriteRepository $favoriteRepository,
        EntityManagerInterface $entityManager
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

        if (
            !isset(
                $data['cityName'],
                $data['country'],
                $data['latitude'],
                $data['longitude']
            )
        ) {
            return $this->json([
                'error' => 'Missing required fields.',
            ], Response::HTTP_BAD_REQUEST);
        }

        $existingFavorite = $favoriteRepository->findOneBy([
            'user' => $user,
            'latitude' => $data['latitude'],
            'longitude' => $data['longitude'],
        ]);

        if ($existingFavorite) {
            return $this->json([
                'error' => 'This city is already in favorites.',
            ], Response::HTTP_CONFLICT);
        }

        $favoritesCount = $favoriteRepository->count([
            'user' => $user,
        ]);

        if ($favoritesCount >= 5) {
            return $this->json([
                'error' => 'You can only have 5 favorites.',
            ], Response::HTTP_CONFLICT);
        }

        $favorite = new Favorite();

        $favorite->setUser($user);
        $favorite->setCityName($data['cityName']);
        $favorite->setRegion($data['region'] ?? null);
        $favorite->setCountry($data['country']);
        $favorite->setLatitude($data['latitude']);
        $favorite->setLongitude($data['longitude']);
        $favorite->setCreatedAt(new \DateTimeImmutable());

        $entityManager->persist($favorite);
        $entityManager->flush();

        return $this->json([
            'favorite' => [
                'id' => $favorite->getId(),
                'cityName' => $favorite->getCityName(),
                'region' => $favorite->getRegion(),
                'country' => $favorite->getCountry(),
                'latitude' => $favorite->getLatitude(),
                'longitude' => $favorite->getLongitude(),
                'createdAt' => $favorite->getCreatedAt()->format(DATE_ATOM),
            ],
        ], Response::HTTP_CREATED);
    }

    #[Route('', methods: ['GET'])]
    public function index(
        #[CurrentUser] ?User $user,
        FavoriteRepository $favoriteRepository
    ): JsonResponse {
        if (!$user) {
            return $this->json([
                'error' => 'Authentication required.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $favorites = $favoriteRepository->findBy(
            ['user' => $user],
            ['createdAt' => 'DESC']
        );

        $data = [];

        foreach ($favorites as $favorite) {
            $data[] = [
                'id' => $favorite->getId(),
                'cityName' => $favorite->getCityName(),
                'region' => $favorite->getRegion(),
                'country' => $favorite->getCountry(),
                'latitude' => $favorite->getLatitude(),
                'longitude' => $favorite->getLongitude(),
                'createdAt' => $favorite->getCreatedAt()->format(DATE_ATOM),
            ];
        }

        return $this->json([
            'favorites' => $data,
        ]);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(
        int $id,
        #[CurrentUser] ?User $user,
        FavoriteRepository $favoriteRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        if (!$user) {
            return $this->json([
                'error' => 'Authentication required.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $favorite = $favoriteRepository->find($id);

        if (!$favorite) {
            return $this->json([
                'error' => 'Favorite not found.',
            ], Response::HTTP_NOT_FOUND);
        }

        if ($favorite->getUser() !== $user) {
            return $this->json([
                'error' => 'Access denied.',
            ], Response::HTTP_FORBIDDEN);
        }

        $entityManager->remove($favorite);
        $entityManager->flush();

        return $this->json([
            'message' => 'Favorite deleted successfully.',
        ]);
    }
}
