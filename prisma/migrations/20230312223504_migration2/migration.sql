-- AlterTable
ALTER TABLE `Conversation` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `latestMessageId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Message` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
