-- Alter Prestation table to support promotions and richer display information
ALTER TABLE "Prestation"
  ADD COLUMN "priceLabel" TEXT,
  ADD COLUMN "icon" TEXT,
  ADD COLUMN "bookingUrl" TEXT,
  ADD COLUMN "isPromo" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "promoPrice" DOUBLE PRECISION,
  ADD COLUMN "promoLabel" TEXT;
