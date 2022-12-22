/*
  Warnings:

  - Added the required column `acceptExchange` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fixedPrice` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Item` ADD COLUMN `acceptExchange` BOOLEAN NOT NULL,
    ADD COLUMN `fixedPrice` BOOLEAN NOT NULL;
