import Nonprofit from "@/models/Nonprofit";
import { connectToDatabase } from "@/lib/mongodb";

function normalize(text: string) {
  return text?.toLowerCase().replace(/[^\w\s]/g, "").trim();
}

export async function matchNonprofitsForDonation(title: string, category: string) {
  await connectToDatabase();
  const nonprofits = await Nonprofit.find({}).lean(); // ⚠️ remove published filter for now

  console.log("🔍 Found nonprofits in DB:", nonprofits.length);
  console.log("🔍 Sample nonprofit:", nonprofits[0]);

  const normalizedTitle = normalize(title);
  const normalizedCategory = normalize(category);

  const matches = nonprofits
    .map((np) => {
      const needsArray = Array.isArray(np.needs) ? np.needs : [];
      let score = 0;

      for (const need of needsArray) {
        const n = normalize(need);
        if (!n) continue;
        if (n.includes(normalizedCategory)) score += 3;
        if (n.includes(normalizedTitle)) score += 5;
        for (const word of normalizedTitle.split(" ")) {
          if (word.length > 3 && n.includes(word)) score += 1;
        }
      }

      if (score > 0) console.log(`✅ Match candidate: ${np.name} → score ${score}`);
      return { ...np, matchScore: score };
    })
    .filter((np) => np.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);

  console.log("✅ Final matches:", matches.map((m) => m.name));
  return matches;
}
