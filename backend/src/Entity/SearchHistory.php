<?php

namespace App\Entity;

use App\Repository\SearchHistoryRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SearchHistoryRepository::class)]
class SearchHistory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $cityName = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $searchedAt = null;

    #[ORM\ManyToOne(inversedBy: 'searchHistories')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCityName(): ?string
    {
        return $this->cityName;
    }

    public function setCityName(string $cityName): static
    {
        $this->cityName = $cityName;

        return $this;
    }

    public function getSearchedAt(): ?\DateTimeImmutable
    {
        return $this->searchedAt;
    }

    public function setSearchedAt(\DateTimeImmutable $searchedAt): static
    {
        $this->searchedAt = $searchedAt;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
