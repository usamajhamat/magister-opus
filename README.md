# Magister Opus

Online school for advanced learning, professional growth, and **private honorary recognition**.

Tagline: **MASTER WORK. MASTER KNOWLEDGE. MAKE AN IMPACT.**

This MVP follows Sheet 2 of `PHD.numbers`: marketing site, eight recognition courses, application review, certificate PDF, public verify, and a lightweight student portal.

Magister Opus confers honorary / privately conferred recognition. It is **not** a state-accredited university degree. Certificates and public copy say so.

## Stack

Next.js App Router, TypeScript, Tailwind CSS, Prisma (SQLite locally, Postgres-ready), local file uploads, PDF certificates (`pdfkit` + QR), SMTP via env (Hostinger-compatible).

## Requirements

- Node.js 20+
- npm

## Local setup

```bash
cp .env.example .env
npm install
npm run db:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`db:setup` pushes the Prisma schema and seeds the **8 recognition courses**.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Prisma URL. Local default: `file:./dev.db` (relative to `prisma/`) |
| `APP_URL` | Public origin for emails, magic links, and certificate QR codes |
| `AUTH_SECRET` | Signing key for admin and student session cookies |
| `ADMIN_EMAIL` | Env-seeded staff login email (not stored in the database) |
| `ADMIN_PASSWORD` | Env-seeded staff login password |
| `EMAIL_HOST` | SMTP host (Hostinger or other). Leave empty to log emails to the console |
| `EMAIL_PORT` | SMTP port. Default `465` |
| `EMAIL_SECURE` | `true` for implicit TLS (typical on 465) |
| `EMAIL_USER` | SMTP username |
| `EMAIL_PASS` | SMTP password |
| `EMAIL_FROM` | From address. Example: `admissions@magisteropus.site` |
| `ADMIN_NOTIFY_EMAIL` | Inbox for new-application notices. Falls back to `ADMIN_EMAIL` |
| `QUALIFIED_NEXT_STEPS` | Text inserted into the Qualified email `[Instructions]` block |

Copy `.env.example` and fill in real SMTP values before production.

## Default local admin

From `.env.example`:

- Email: `admin@magisteropus.site`
- Password: `changeme`

Sign in at `/admin/login`.

## Seeded recognition courses

1. Leadership and Organizational Excellence
2. Business Leadership and Entrepreneurship
3. Innovation and Strategic Management
4. Global Leadership and Social Impact
5. Executive Leadership and Governance
6. Entrepreneurship and Economic Development
7. Humanitarian Leadership and Community Development
8. Education Leadership and Institutional Development

Each course page uses the Sheet 2 description and an **Apply Now** button.

## Test application flow

1. Open `/programs` or a course page and click **Apply Now**.
2. Submit Full Name, Email, Phone, Country, government ID, Resume/CV, a course, and the truthfulness checkbox.
3. The app creates `MO-00001` (then `MO-00002`, …) with status **Pending Review**.
4. The student receives **Magister Opus — Application Received**. Staff receive a new-application notice at `ADMIN_NOTIFY_EMAIL`.
5. Sign in at `/admin`, open the application, download ID and CV.
6. **Mark as Qualified** sends **Magister Opus — You Are Qualified**. **Mark as Not Qualified** sends a polite decline.
7. On a Qualified record, set progress if you want, then **Mark Completed**.
8. **Issue Certificate** writes a branded PDF (`MO-YYYY-#####`), emails **Magister Opus — Your Certificate Is Ready**, and registers the number for `/verify`.
9. Open `/verify` and enter the certificate number. The QR on the PDF points here.
10. On `/student`, request a magic link with the applicant email. With SMTP unset, the page shows a local portal link. The dashboard shows application status, admin-driven progress, and certificate download.

If SMTP env vars are empty, every email is printed to the server console instead of being sent.

## Routes

| Path | What it is |
| --- | --- |
| `/` | Marketing homepage (Sheet 2 copy) |
| `/about` `/programs` `/honorary` `/admissions` `/faq` `/contact` | Site sections |
| `/faculty` `/research` `/support` | Supporting pages from Sheet 2 |
| `/programs/[slug]` | One of the 8 recognition courses |
| `/apply` | Application form |
| `/verify` | Public certificate check |
| `/student` | Magic-link student portal |
| `/admin` | Staff application list and review |

## Email templates (Sheet 2)

Implemented in `src/lib/email-templates.ts`:

- **Magister Opus — Application Received** (verbatim body)
- **Magister Opus — You Are Qualified** (verbatim body; next steps from `QUALIFIED_NEXT_STEPS`)
- **Magister Opus — Your Certificate Is Ready** (verbatim body plus portal and verify links)
- Polite Not Qualified notice (Sheet 2 required the email, not a full template)
- Admin new-application notice
- Student magic-link message

## Certificates

PDF contents:

- Magister Opus branding and seal placeholder
- Student full name
- Program / course name
- Title: Certificate of Completion
- Date and certificate number `MO-YYYY-#####`
- Authorized signature line
- QR code to `/verify?number=…`
- Honorary / privately conferred wording (not a state-accredited university degree)

Files live in `uploads/certificates/`. ID and CV files live in `uploads/ids/` and `uploads/resumes/`. Those folders are gitignored.

## Postgres later

`prisma/schema.prisma` uses SQLite-safe types only (`String` statuses, no Postgres-only features). To switch:

1. Change `datasource.db.provider` to `"postgresql"`.
2. Set `DATABASE_URL` to a Postgres connection string.
3. Run `npx prisma migrate dev` (or `db push` in a throwaway environment).

## Out of scope (v1)

Payment gateway, full LMS modules, physical plaques, and multi-language. Master's catalog pages are overview-only. The eight recognition courses are the live apply targets.

## Scripts

```bash
npm run dev
npm run build
npm start
npm run db:push
npm run db:seed
npm run db:setup
```
