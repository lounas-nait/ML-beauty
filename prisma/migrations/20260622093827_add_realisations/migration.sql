-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateTable
CREATE TABLE "Realisation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Realisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealisationMedia" (
    "id" TEXT NOT NULL,
    "realisationId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL DEFAULT 'IMAGE',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RealisationMedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RealisationMedia" ADD CONSTRAINT "RealisationMedia_realisationId_fkey" FOREIGN KEY ("realisationId") REFERENCES "Realisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

