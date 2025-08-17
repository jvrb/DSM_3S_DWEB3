-- CreateTable
CREATE TABLE "public"."telefone" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "pessoaId" INTEGER NOT NULL,

    CONSTRAINT "telefone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "telefone_pessoaId_key" ON "public"."telefone"("pessoaId");

-- AddForeignKey
ALTER TABLE "public"."telefone" ADD CONSTRAINT "telefone_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "public"."pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
