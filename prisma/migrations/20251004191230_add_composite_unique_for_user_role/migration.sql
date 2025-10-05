/*
  Warnings:

  - A unique constraint covering the columns `[user_id,role_id]` on the table `users_roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_roles_user_id_role_id_key" ON "public"."users_roles"("user_id", "role_id");
