/*
  Warnings:

  - Added the required column `stdin` to the `TestcaseResults` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestcaseResults" ADD COLUMN     "stdin" TEXT NOT NULL;
