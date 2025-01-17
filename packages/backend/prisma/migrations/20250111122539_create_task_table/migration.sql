-- CreateTable
CREATE TABLE "task" (
    "task_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "task_pkey" PRIMARY KEY ("task_id")
);
