-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_by" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "books_id_key" ON "books"("id");
