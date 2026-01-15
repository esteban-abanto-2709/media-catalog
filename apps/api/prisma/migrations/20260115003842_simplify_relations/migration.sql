-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "duration" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "codec" TEXT,
    "mimeType" TEXT,
    "providerUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToVideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TagToVideo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProducerToVideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProducerToVideo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ActorToVideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ActorToVideo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_filename_key" ON "Video"("filename");

-- CreateIndex
CREATE INDEX "Video_filename_idx" ON "Video"("filename");

-- CreateIndex
CREATE INDEX "Video_title_idx" ON "Video"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- CreateIndex
CREATE INDEX "Tag_slug_idx" ON "Tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Producer_name_key" ON "Producer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Producer_slug_key" ON "Producer"("slug");

-- CreateIndex
CREATE INDEX "Producer_slug_idx" ON "Producer"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_name_key" ON "Actor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_slug_key" ON "Actor"("slug");

-- CreateIndex
CREATE INDEX "Actor_slug_idx" ON "Actor"("slug");

-- CreateIndex
CREATE INDEX "_TagToVideo_B_index" ON "_TagToVideo"("B");

-- CreateIndex
CREATE INDEX "_ProducerToVideo_B_index" ON "_ProducerToVideo"("B");

-- CreateIndex
CREATE INDEX "_ActorToVideo_B_index" ON "_ActorToVideo"("B");

-- AddForeignKey
ALTER TABLE "_TagToVideo" ADD CONSTRAINT "_TagToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToVideo" ADD CONSTRAINT "_TagToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProducerToVideo" ADD CONSTRAINT "_ProducerToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProducerToVideo" ADD CONSTRAINT "_ProducerToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToVideo" ADD CONSTRAINT "_ActorToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToVideo" ADD CONSTRAINT "_ActorToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
