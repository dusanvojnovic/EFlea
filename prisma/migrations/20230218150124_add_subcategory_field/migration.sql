/*
  Warnings:

  - Added the required column `subcategory` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Item` ADD COLUMN `subcategory` VARCHAR(191) NOT NULL;
