/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ConversationParticipant` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ConversationParticipant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ConversationParticipant` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `conversationId` VARCHAR(191) NULL;
