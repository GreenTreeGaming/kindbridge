import "dotenv/config"; 
import mongoose from "mongoose";
import Nonprofit from "@/models/Nonprofit";
import { connectToDatabase } from "@/lib/mongodb";

async function seed() {
  await connectToDatabase();

  const nonprofits = [
    {
      name: "Simpson Food Pantry",
      email: "info@simpsonfoodpantry.org",
      description: "Feeding families and individuals with dignity in South Minneapolis and surrounding areas.",
      address: "2609 Stevens Ave, Minneapolis, MN 55408",
      phone: "612‑874‑7741",
      website: "https://www.simpsonfoodpantry.org",
      needs: ["Nonperishable groceries", "Fresh produce", "Volunteers to stock shelves"],
      verified: true,
    },
    {
      name: "Minnehaha Food Shelf",
      email: "foodshelf@minnehaha.org",
      description: "Provides critical food assistance to residents facing food insecurity in Minneapolis.",
      address: "3701 E 50th Street, Minneapolis, MN 55417",
      phone: "612‑721‑6231",
      website: "https://minnehaha.org",
      needs: ["Canned proteins", "Dairy & produce", "Volunteers"],
      verified: true,
    },
    {
      name: "Women In Need (WIN)",
      email: "info@women‑in‑need.org",
      description: "Largest provider of shelter & supportive housing for homeless families in NYC, focused on women & children.",
      address: "115 W 31st Street, New York, NY 10001",
      phone: "212‑695‑4758",
      website: "https://www.women‑in‑need.org",
      needs: ["Clothing for families", "Children’s items", "Supportive housing donations"],
      verified: true,
    },
    {
      name: "Joyce Uptown Food Shelf",
      email: "joyce@visi.com",
      description: "No‑questions‑asked food pantry in Uptown Minneapolis serving many immigrant and BIPOC families.",
      address: "3041 Fremont Ave S, Minneapolis, MN 55408",
      phone: "612‑825‑4431",
      website: "http://www.joyceuptownfoodshelf.org",
      needs: ["Shelf‑stable foods", "Household items", "Volunteers for distribution"],
      verified: true,
    },
    {
      name: "Groveland Emergency Food Shelf",
      email: "info@grovelandfoodshelf.org",
      description: "Emergency groceries for those in need in Minneapolis’s Stevens Square neighborhood and partner outreach locations.",
      address: "1900 Nicollet Ave Minneapolis, MN 55403",
      phone: "612-871-0277",  
      website: "https://www.grovelandfoodshelf.org",
      needs: ["Food donations", "Volunteer support", "Fundraising for outreach"],
      verified: true,
    },
    {
      name: "Haven Community Food Pantry (Sanctuary Covenant Church)",
      email: "hello@sanctuarycov.org",
      description: "Provides grocery, toiletries and essential supplies to North Minneapolis and neighboring areas.",
      address: "710 W Broadway Ave, Minneapolis, MN 55411",
      phone: "612-489-6001",
      website: "https://sanctuarycov.org/haven-pantry/",
      needs: ["Toiletries", "Nonperishable foods", "Volunteers"],
      verified: true,
    },
    {
      name: "CHESS Foundation NFP",
      email: "info@chesscharities.org",
      description: "Non‑profit providing faith‑based housing and related services to victims of domestic and sexual violence in Chicago.",
      address: "2016 N La Crosse Ave, Chicago, IL 60639",
      phone: "855‑581‑4673",
      website: "https://chesscharities.org",
      needs: ["Men’s & women’s clothing", "Hygiene kits", "Furniture for transitional homes"],
      verified: true,
    },
    {
      name: "Task Force X (LGBTQ+ youth services)",
      email: "773-413-0003",
      description: "Provides wraparound services including housing testing, food & gender‑affirming care for LGBTQ+ youth in Chicago West Side.",
      address: "9 N Cicero Ave, Chicago, IL 60644",
      phone: "773‑413‑0003",
      website: "https://www.taskforcechicago.org",
      needs: ["Volunteers", "Food and snack packs", "Hygiene supplies"],
      verified: true,
    },
    {
      name: "Mercy Home for Boys & Girls",
      email: "312-738-7560", 
      description: "Childcare and residential home for abused, homeless and neglected children in Chicago.",
      address: "1140 W Jackson Blvd, Chicago, IL 60607",
      phone: "info@mercyhome.org",
      website: "https://www.mercyhome.org",
      needs: ["Educational supplies", "Clothing", "Volunteers for mentorship"],
      verified: true,
    },
    {
      name: "The New York Women’s Foundation",
      email: "hello@nywf.org",
      description: "Advances justice for women in NYC through grantmaking and support for direct‑service nonprofits.",
      address: "39 Broadway, 33rd Floor, New York, NY 10006",
      phone: "212‑514‑6993",
      website: "https://www.nywf.org",
      needs: ["Grants for partner agencies", "Corporate partnerships", "Volunteers for events"],
      verified: true,
    }
  ];

  await Nonprofit.insertMany(nonprofits);
  console.log("Seeded nonprofits successfully!");
  process.exit();
}

seed().catch(console.error);
