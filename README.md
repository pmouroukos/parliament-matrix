# Parliament Matrix

**Explore political statements. Compare perspectives. Follow the sources.**

Parliament Matrix is a Greek civic-tech application for exploring documented political statements across parties and policy topics. It brings summaries, quotations, speakers, dates, and source references into one dashboard to make political information easier to access, compare, and check.

The project is politically neutral. It does not endorse parties, recommend a political match, or tell users how to vote.

## Why Parliament Matrix?

Political information is spread across parliamentary records, speeches, publications, and other sources. Understanding what was said, by whom, and when often requires moving between documents with little shared structure.

Parliament Matrix organizes statement records by topic and party. Citizens can narrow the information they see, read a summary alongside the recorded quotation, and follow available links to examine the original context. Its purpose is to support informed exploration, with source checking remaining an essential part of that process.

## Key Features

- **Topic dashboard:** browse policy topics through a sidebar in a Greek-language, responsive interface.
- **Party selection:** show statements from selected parties, restore all parties, and keep at least one party selected.
- **Statement cards:** display party, summary, quotation, speaker, date, subcategory, and source link where available, with messages for missing information.
- **Instant search:** search summaries, quotations, and speaker names with case-insensitive and accent-insensitive Greek matching and whitespace normalization.
- **Subcategory filters:** choose from non-empty subcategories for the active topic; the control is hidden when none exist.
- **Optional date range:** apply inclusive start and end dates, individually or together, with validation for reversed ranges.
- **Chronological sorting:** retain the original order or show newest/oldest statements first. Unknown dates appear last in chronological views.
- **Result counts and reset controls:** see matching statements against the total loaded statements; reset advanced filters without changing the topic or selected parties.
- **Two data modes:** use local mock records or load records from Supabase, with loading, error, and empty-result states.

Filters work together and are applied locally after loading the dataset. Search examines existing records; it does not generate statements or call an external search service.

## Screenshots

> **Placeholder — screenshots to be added.**
> Future screenshots will show the dashboard, filtering controls, and statement cards. No screenshots are included yet.

## Technology Stack

Versions below are the declarations in `package.json`; caret-prefixed entries are version ranges rather than exact installed versions.

- **Next.js:** `16.4.0`, App Router with static export.
- **React / React DOM:** `19.3.0`.
- **TypeScript:** `^5`.
- **Tailwind CSS:** `^4`, with `@tailwindcss/postcss` at `^4.3.3` and `@tailwindcss/turbopack` at `^4`.
- **Supabase JavaScript client:** `^2.117.3`.
- **ESLint:** `^9`, with `eslint-config-next` at `16.4.0`.

## Getting Started

### Prerequisites

- Node.js **20.9 or later**, as required by the project's Next.js version.
- npm and Git.
- A Supabase project with a compatible dataset only if using Supabase mode. Mock mode needs no database credentials.

### 1. Clone and install

```sh
git clone https://github.com/pmouroukos/parliament-matrix.git
cd parliament-matrix
npm ci
```

### 2. Configure the environment

Copy `.env.example` to `.env.local`.

**PowerShell:**

```powershell
Copy-Item .env.example .env.local
```

**macOS / Linux:**

```sh
cp .env.example .env.local
```

For a local demonstration, keep the default configuration:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_DATA_SOURCE=mock
```

For Supabase mode, set `NEXT_PUBLIC_DATA_SOURCE=supabase` and fill in the project URL and public anon key in `.env.local`. Never put a service-role key in a `NEXT_PUBLIC_*` variable: these values are exposed to the browser. Do not commit `.env.local` or private credentials.

The client expects a readable `parliament_data` table. The row mapping uses `id`, `topic`, `party`, `summary`, `exact_quote`, `speaker`, `date`, `source_type`, `source_url`, and `subcategory`; it also declares `page` and `created_at`, which are not displayed. Consult `src/lib/data.ts` for the current mapping. This repository does not include SQL migrations or RLS policies, so Supabase setup is not provisioned automatically.

Only the exact value `supabase` enables database mode; otherwise the application uses mock data. A Supabase configuration or query error is displayed rather than silently falling back to mock data.

Restart the development server after changing environment variables. For a static deployment, rebuild so the public environment values are included in the exported application.

### 3. Run locally

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build and check

```sh
npm run lint
npx tsc --noEmit --incremental false
npm run build
```

The production build exports HTML, JavaScript, CSS, and other assets to `out/`. Serve that directory with a static web server or static hosting provider. Although `npm run start` is defined as `next start`, it is not the serving workflow for the configured static export.

No automated test framework or test script is currently included.

## Data Sources & Transparency

### Mock mode

Mock records live in `src/data/mock.ts`. They are illustrative content, not official parliamentary records or verified statements. The dashboard displays a warning banner and each mock statement carries a placeholder badge. Its example source URLs are not evidence of real statements.

Mock mode is suitable for exploring the interface and developing features. It should not be used to draw conclusions about parties or speakers.

### Supabase mode

The browser reads `parliament_data` in batches of up to 1,000 rows, ordered by `id`, and loads the complete dataset before filtering locally. Topics and parties are derived from the values present in those rows. Records without a topic or party are omitted from the displayed statements.

Cards display the stored summary separately from the stored exact quotation. Neither is generated or independently checked by the application. Available HTTP/HTTPS source links open in a new tab; missing quotations and unavailable links are identified in the interface.

**A source URL alone does not establish verification.** URL validation checks format and protocol, not whether the document is reachable, authentic, or supports the quotation. Users should examine the original source and its surrounding context before relying on a record.

### Current limitations

- There is no per-record verification status, independent review workflow, or documented completeness guarantee.
- Supabase records are not marked as placeholders, but this does not mean they have been verified.
- Coverage depends on the loaded dataset. An absent record does not establish that a party has no position on a topic.
- Source page references and creation timestamps are not surfaced. The current mapping displays `source_type` beneath the speaker rather than a separately modeled speaker role.
- Dates are recognized as ISO dates or timestamps. Missing, invalid, or ambiguous dates are shown as unavailable and excluded when a date restriction is active. Comparisons use the calendar date written in the record without timezone conversion.
- Filter selections are held in local component state and are not yet saved in shareable URLs.

## Project Structure

```text
parliament-matrix/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Dashboard entry point
│   │   ├── layout.tsx             # Metadata, language, and fonts
│   │   └── globals.css            # Global styles and Tailwind theme
│   ├── components/
│   │   ├── Dashboard.tsx          # Dataset loading and UI state
│   │   ├── TopicSidebar.tsx
│   │   ├── PartyFilters.tsx
│   │   ├── StatementFilters.tsx
│   │   └── StatementCard.tsx
│   ├── data/
│   │   ├── mock.ts                # Illustrative dataset
│   │   └── copy.ts                # Placeholder warning
│   ├── lib/
│   │   ├── data.ts                # Loading and row mapping
│   │   ├── supabase.ts            # Supabase client
│   │   └── statement-filters.ts   # Search, dates, filters, and sorting
│   └── types/
│       ├── parliament.ts
│       └── env.d.ts
├── public/                        # Static assets
├── .env.example                   # Environment template
├── next.config.ts                 # Static export configuration
├── package.json
└── README.md
```

## Roadmap

The following are proposed future developments, not implemented features or release commitments:

- [ ] Structured side-by-side comparison by party and subcategory.
- [ ] Shareable filtered views using URL parameters.
- [ ] Explicit source verification status and a review workflow.
- [ ] A timeline of political statements.
- [ ] Better provenance documentation, including document titles, page references, and editorial methodology.

## Contributing

Contributions that improve usability, accessibility, data quality, and transparent sourcing are welcome. Keep changes focused and politically neutral. Read `AGENTS.md` before working on the code, including its guidance about the installed Next.js documentation.

1. Fork the repository if you do not have write access, then clone your fork and follow the setup instructions above.
2. Create a feature branch:

   ```sh
   git switch -c feature/describe-your-change
   ```

3. Make your changes, run lint, TypeScript checks, and the production build, and manually check affected dashboard flows. For filtering changes, cover Greek accents, missing dates, empty subcategories, and combined criteria.
4. Stage only the intended files and commit:

   ```sh
   git add <changed-files>
   git commit -m "Describe the change"
   ```

5. Push your branch to your fork or an authorized remote:

   ```sh
   git push -u origin feature/describe-your-change
   ```

6. Open a pull request against this repository's default branch. Explain the problem, the change, and how you validated it. Include screenshots for visible UI changes when useful.

Do not include credentials, `.env.local`, or generated build output. For data corrections, provide the original source and enough context to assess the change without treating an unverified summary as established fact.

## License

No project license has been specified yet; this repository does not contain a `LICENSE` file. Public repository visibility does not grant an open-source license. Licensing terms remain to be defined by the maintainer.
