/* eslint-disable */
/**
 * Generated API.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@0.6.0.
 * To regenerate, run `npx convex codegen`.
 * @module
 */

import type { ApiFromModules } from "convex/api";
import type * as addBoat from "../addBoat";
import type * as addGoat from "../addGoat";
import type * as addNote from "../addNote";
import type * as addQuote from "../addQuote";
import type * as generateData from "../generateData";
import type * as getBoats from "../getBoats";
import type * as getBoatsInTypescript from "../getBoatsInTypescript";
import type * as getBoatsWithIndices from "../getBoatsWithIndices";
import type * as getGoats from "../getGoats";
import type * as getNotes from "../getNotes";
import type * as getQuotes from "../getQuotes";
import type * as helpers from "../helpers";
import type * as storeUser from "../storeUser";
import type * as voteForBoat from "../voteForBoat";
import type * as voteForGoat from "../voteForGoat";
import type * as voteForNote from "../voteForNote";
import type * as voteForQuote from "../voteForQuote";

/**
 * A type describing your app's public Convex API.
 *
 * This `API` type includes information about the arguments and return
 * types of your app's query and mutation functions.
 *
 * This type should be used with type-parameterized classes like
 * `ConvexReactClient` to create app-specific types.
 */
export type API = ApiFromModules<{
  addBoat: typeof addBoat;
  addGoat: typeof addGoat;
  addNote: typeof addNote;
  addQuote: typeof addQuote;
  generateData: typeof generateData;
  getBoats: typeof getBoats;
  getBoatsInTypescript: typeof getBoatsInTypescript;
  getBoatsWithIndices: typeof getBoatsWithIndices;
  getGoats: typeof getGoats;
  getNotes: typeof getNotes;
  getQuotes: typeof getQuotes;
  helpers: typeof helpers;
  storeUser: typeof storeUser;
  voteForBoat: typeof voteForBoat;
  voteForGoat: typeof voteForGoat;
  voteForNote: typeof voteForNote;
  voteForQuote: typeof voteForQuote;
}>;
