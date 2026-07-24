<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260723044605 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE weather_alert DROP FOREIGN KEY `FK_3EBA0CC3A76ED395`');
        $this->addSql('DROP TABLE weather_alert');
        $this->addSql('ALTER TABLE user ADD theme VARCHAR(10) DEFAULT \'light\' NOT NULL, DROP notifications_enabled');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE weather_alert (id INT AUTO_INCREMENT NOT NULL, city_name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, alert_type VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, enabled TINYINT NOT NULL, created_at DATETIME NOT NULL, user_id INT NOT NULL, INDEX IDX_3EBA0CC3A76ED395 (user_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE weather_alert ADD CONSTRAINT `FK_3EBA0CC3A76ED395` FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE user ADD notifications_enabled TINYINT NOT NULL, DROP theme');
    }
}
