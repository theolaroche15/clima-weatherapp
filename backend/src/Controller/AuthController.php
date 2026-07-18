<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;

final class AuthController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        ValidatorInterface $validator
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            return $this->json([
                'message' => 'Invalid JSON body.',
            ], 400);
        }

        $email = trim((string) ($data['email'] ?? ''));
        $username = trim((string) ($data['username'] ?? ''));
        $plainPassword = (string) ($data['password'] ?? '');

        $passwordErrors = $validator->validate(
            $plainPassword,
            [
                new Assert\NotBlank(
                    message: 'Password is required.'
                ),
                new Assert\Length(
                    min: 8,
                    max: 4096,
                    minMessage: 'Password must contain at least {{ limit }} characters.',
                    maxMessage: 'Password is too long.'
                ),
            ]
        );

        if (count($passwordErrors) > 0) {
            $errors = [];

            foreach ($passwordErrors as $error) {
                $errors['password'][] = $error->getMessage();
            }

            return $this->json([
                'message' => 'Validation failed.',
                'errors' => $errors,
            ], 422);
        }

        $user = new User();

        $user->setEmail($email);
        $user->setUsername($username);
        $user->setTemperatureUnit('celsius');
        $user->setNotificationsEnabled(false);
        $user->setCreatedAt(new \DateTimeImmutable());
        $userErrors = $validator->validate($user);

        if (count($userErrors) > 0) {
            $errors = [];

            foreach ($userErrors as $error) {
                $errors[$error->getPropertyPath()][] = $error->getMessage();
            }

            return $this->json([
                'message' => 'Validation failed.',
                'errors' => $errors,
            ], 422);
        }

        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plainPassword
        );

        $user->setPassword($hashedPassword);

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json([
            'message' => 'User created successfully.'
        ], 201);
    }

    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function me(#[CurrentUser] ?User $user): JsonResponse
    {
        if ($user === null) {
            return $this->json([
                'message' => 'Not authenticated.',
            ], 401);
        }

        return $this->json([
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'username' => $user->getUsername(),
                'roles' => $user->getRoles(),
                'temperatureUnit' => $user->getTemperatureUnit(),
                'notificationsEnabled' => $user->isNotificationsEnabled(),
            ],
        ]);
    }

    #[Route('/api/me/settings', name: 'api_me_settings_update', methods: ['PATCH'])]
    public function updateSettings(
        #[CurrentUser] ?User $user,
        Request $request,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        if ($user === null) {
            return $this->json([
                'message' => 'Authentication required.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            return $this->json([
                'message' => 'Invalid JSON body.',
            ], Response::HTTP_BAD_REQUEST);
        }

        $temperatureUnit = $data['temperatureUnit'] ?? null;

        if ($temperatureUnit === null) {
            return $this->json([
                'message' => 'Temperature unit is required.',
            ], Response::HTTP_BAD_REQUEST);
        }

        if (!in_array($temperatureUnit, ['celsius', 'fahrenheit'], true)) {
            return $this->json([
                'message' => 'Temperature unit must be celsius or fahrenheit.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user->setTemperatureUnit($temperatureUnit);

        $entityManager->flush();

        return $this->json([
            'message' => 'Settings updated successfully.',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'username' => $user->getUsername(),
                'roles' => $user->getRoles(),
                'temperatureUnit' => $user->getTemperatureUnit(),
                'notificationsEnabled' => $user->isNotificationsEnabled(),
            ],
        ], Response::HTTP_OK);
    }

    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(Security $security): JsonResponse
    {
        $security->logout(false);

        return $this->json([
            'message' => 'Logged out successfully.',
        ]);
    }
}
