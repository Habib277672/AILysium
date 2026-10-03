-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'FREE';

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "isFree" BOOLEAN NOT NULL DEFAULT false;
