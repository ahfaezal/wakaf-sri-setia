import { getWakafStats } from "../../../lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getWakafStats();
    return Response.json(stats, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Unable to load wakaf statistics:", error);
    return Response.json(
      { error: "Statistik kutipan tidak dapat dimuatkan." },
      { status: 503 },
    );
  }
}
