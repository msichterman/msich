import { createFromSource } from "fumadocs-core/search/server";
import { notesSource } from "@/lib/source";

export const dynamic = "force-dynamic";

export const { GET } = createFromSource(notesSource);
