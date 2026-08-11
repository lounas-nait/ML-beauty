-- Add a manual display order to Prestation, backfilled from creation date
ALTER TABLE "Prestation"
  ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;

UPDATE "Prestation" p
SET "order" = sub.rn - 1
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY "createdAt" ASC) AS rn
  FROM "Prestation"
) sub
WHERE p.id = sub.id;
