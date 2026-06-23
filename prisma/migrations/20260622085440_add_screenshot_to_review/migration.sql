-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "screenshotUrl" TEXT,
ALTER COLUMN "comment" DROP NOT NULL;

