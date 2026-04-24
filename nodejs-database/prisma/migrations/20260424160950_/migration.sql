/*
  Warnings:

  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `likes` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`customer_id`, `product_id`);
