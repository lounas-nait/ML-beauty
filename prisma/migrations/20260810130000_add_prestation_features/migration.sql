-- Add a short bullet-point list ("inclus") to Prestation
ALTER TABLE "Prestation"
  ADD COLUMN "features" TEXT[] NOT NULL DEFAULT '{}';
