<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column(length: 10)]
    private ?string $temperatureUnit = null;

    #[ORM\Column]
    private ?bool $notificationsEnabled = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, Favorite>
     */
    #[ORM\OneToMany(targetEntity: Favorite::class, mappedBy: 'user')]
    private Collection $favorites;

    /**
     * @var Collection<int, SearchHistory>
     */
    #[ORM\OneToMany(targetEntity: SearchHistory::class, mappedBy: 'user')]
    private Collection $searchHistories;

    /**
     * @var Collection<int, WeatherAlert>
     */
    #[ORM\OneToMany(targetEntity: WeatherAlert::class, mappedBy: 'user')]
    private Collection $weatherAlerts;

    public function __construct()
    {
        $this->favorites = new ArrayCollection();
        $this->searchHistories = new ArrayCollection();
        $this->weatherAlerts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Ensure the session doesn't contain actual password hashes by CRC32C-hashing them, as supported since Symfony 7.3.
     */
    public function __serialize(): array
    {
        $data = (array) $this;
        $data["\0".self::class."\0password"] = hash('crc32c', $this->password);

        return $data;
    }

    #[\Deprecated]
    public function eraseCredentials(): void
    {
        // @deprecated, to be removed when upgrading to Symfony 8
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getTemperatureUnit(): ?string
    {
        return $this->temperatureUnit;
    }

    public function setTemperatureUnit(string $temperatureUnit): static
    {
        $this->temperatureUnit = $temperatureUnit;

        return $this;
    }

    public function isNotificationsEnabled(): ?bool
    {
        return $this->notificationsEnabled;
    }

    public function setNotificationsEnabled(bool $notificationsEnabled): static
    {
        $this->notificationsEnabled = $notificationsEnabled;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection<int, Favorite>
     */
    public function getFavorites(): Collection
    {
        return $this->favorites;
    }

    public function addFavorite(Favorite $favorite): static
    {
        if (!$this->favorites->contains($favorite)) {
            $this->favorites->add($favorite);
            $favorite->setUser($this);
        }

        return $this;
    }

    public function removeFavorite(Favorite $favorite): static
    {
        if ($this->favorites->removeElement($favorite)) {
            // set the owning side to null (unless already changed)
            if ($favorite->getUser() === $this) {
                $favorite->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, SearchHistory>
     */
    public function getSearchHistories(): Collection
    {
        return $this->searchHistories;
    }

    public function addSearchHistory(SearchHistory $searchHistory): static
    {
        if (!$this->searchHistories->contains($searchHistory)) {
            $this->searchHistories->add($searchHistory);
            $searchHistory->setUser($this);
        }

        return $this;
    }

    public function removeSearchHistory(SearchHistory $searchHistory): static
    {
        if ($this->searchHistories->removeElement($searchHistory)) {
            // set the owning side to null (unless already changed)
            if ($searchHistory->getUser() === $this) {
                $searchHistory->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, WeatherAlert>
     */
    public function getWeatherAlerts(): Collection
    {
        return $this->weatherAlerts;
    }

    public function addWeatherAlert(WeatherAlert $weatherAlert): static
    {
        if (!$this->weatherAlerts->contains($weatherAlert)) {
            $this->weatherAlerts->add($weatherAlert);
            $weatherAlert->setUser($this);
        }

        return $this;
    }

    public function removeWeatherAlert(WeatherAlert $weatherAlert): static
    {
        if ($this->weatherAlerts->removeElement($weatherAlert)) {
            // set the owning side to null (unless already changed)
            if ($weatherAlert->getUser() === $this) {
                $weatherAlert->setUser(null);
            }
        }

        return $this;
    }
}
