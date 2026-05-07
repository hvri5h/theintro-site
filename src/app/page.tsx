import {
  PiClipboardTextStroke,
  PiCoffeeCup01Stroke,
  PiEnvelopeDefaultStroke,
} from "@/components/icons/pikaicons";
import { CtaLink } from "@/components/ui/cta-link";
import { Faq } from "@/components/ui/faq";
import { FounderCard } from "@/components/ui/founder-card";
import { RotatingText } from "@/components/ui/rotating-text";
import intros from "@/data/intros.json";
import Image from "next/image";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { CupScatter } from "./cup-scatter";
import { FloatingCup } from "./floating-cup";

const AVATAR_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"]);

async function getAvatars() {
  const dir = path.join(process.cwd(), "public", "avatars");
  const entries = await readdir(dir, { withFileTypes: true });
  const files = entries
    .filter(
      (entry) => entry.isFile() && AVATAR_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
    )
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  return Promise.all(
    files.map(async (name) => {
      const { mtimeMs } = await stat(path.join(dir, name));
      return { name, version: Math.floor(mtimeMs) };
    }),
  );
}

const CTA_CLASSNAME =
  "inline-flex h-16 items-center justify-center rounded-full bg-accent px-10 text-base font-semibold text-accent-foreground shadow-sm transition-[opacity,box-shadow] duration-200 hover:opacity-90 hover:shadow-md";

export default async function Home() {
  const avatars = await getAvatars();

  return (
    <div className="flex flex-1 flex-col">
      <header className="w-full">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-center px-6 py-4 sm:px-10">
          <a href="#" aria-label="The Intro — home" className="inline-flex items-center">
            <Image src="/logo.svg" alt="The Intro" width={115} height={23} priority />
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative flex min-h-[calc(100dvh-72px)] items-start">
          <CupScatter />
          <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-[10vh] pb-12 text-center sm:pt-[14vh]">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/95 py-1 pr-3 pl-1 shadow-sm sm:bg-card/60 sm:backdrop-blur-sm">
                <ul className="flex -space-x-1.5">
                  {avatars.map(({ name, version }) => (
                    <li key={name} className="overflow-hidden rounded-full ring-[1.5px] ring-card">
                      <Image
                        src={`/avatars/${name}?v=${version}`}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 object-cover"
                        priority
                      />
                    </li>
                  ))}
                </ul>
                <span className="text-xs font-medium tracking-wide text-muted">
                  Spots filling fast
                </span>
              </div>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-6xl">
              Meet your next{" "}
              <RotatingText
                text={intros.words}
                duration={3500}
                className="text-accent"
                containerClassName="block"
              />
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-muted sm:text-xl">
              One curated coffee intro a week to someone worth knowing in Melbourne’s tech and
              creative scene.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4">
              <CtaLink href="https://tally.so/r/1AGG8L" className={CTA_CLASSNAME} section="hero">
                Get your first intro
              </CtaLink>
              <p className="text-sm text-muted">
                Takes 2mins · Free for the founding cohort (limited spots available)
              </p>
            </div>
          </div>
        </section>

        <section id="how" className="flex min-h-screen items-center py-24 sm:py-32">
          <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
            <h2 className="text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              How it works
            </h2>
            <ol className="mt-16 grid gap-12 sm:mt-20 sm:grid-cols-3 sm:gap-10">
              <li className="flex flex-col items-center text-center">
                <PiClipboardTextStroke aria-hidden className="h-16 w-16 text-foreground" />
                <h3 className="mt-8 text-2xl font-bold text-foreground">1. Tell us about you</h3>
                <p className="mt-4 max-w-xs text-base leading-7 text-muted">
                  A few questions about you, what you&apos;re excited about, and the kind of person
                  you&apos;d love to meet.
                </p>
              </li>
              <li className="flex flex-col items-center text-center">
                <PiEnvelopeDefaultStroke aria-hidden className="h-16 w-16 text-foreground" />
                <h3 className="mt-8 text-2xl font-bold text-foreground">2. Get an intro</h3>
                <p className="mt-4 max-w-xs text-base leading-7 text-muted">
                  We pick your match and send you an intro explaining why we think you two should
                  meet.
                </p>
              </li>
              <li className="flex flex-col items-center text-center">
                <PiCoffeeCup01Stroke aria-hidden className="h-16 w-16 text-foreground" />
                <h3 className="mt-8 text-2xl font-bold text-foreground">3. Meet for coffee</h3>
                <p className="mt-4 max-w-xs text-base leading-7 text-muted">
                  We suggest a café and day/time, and send a calendar invite. All you need to do is
                  show up.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section id="why" className="flex min-h-screen items-center py-24 sm:py-32">
          <div className="mx-auto w-full max-w-3xl px-6 sm:px-10">
            <h2 className="text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Why we made this
            </h2>
            <div className="mt-16 flex flex-wrap items-start justify-center gap-8 sm:gap-12">
              <FounderCard
                name="Aseem"
                role="Co-founder & Engineer"
                image="/founders/aseem.webp"
                rotate={-2}
              />
              <FounderCard
                name="Harish"
                role="Co-founder & Designer"
                image="/founders/harish.webp"
                rotate={2}
                objectPosition="73% 25.5%"
                scale={1.13}
              />
            </div>
            <div className="mt-16 space-y-6 text-lg leading-8 text-foreground">
              <p>
                Honestly, we (selfishly) want this to exist! We want to meet the most interesting
                people in Melbourne; because the energy from great conversations makes us feel
                alive.
              </p>
              <p>The problem was the standard advice never worked for us.</p>
              <p>
                Networking events were usually loud, superficial and transactional. Reaching out
                directly on something like LinkedIn meant risking being left on seen or rejected.
                Even when we got past that, the logistics killed it. Picking a time, picking a
                place, the back-and-forth, the rescheduling, the slow death of a coffee that never
                quite happens. The friction is small but it&apos;s enough.
              </p>
              <p>We wanted meeting cool people to feel deep, energising and yet effortless.</p>
              <p>
                One person, one table, going deep enough that you both end up saying something you
                didn&apos;t expect to say.
              </p>
              <p>
                Meanwhile Melbourne is a city built for exactly the thing we wanted. Half of it is a
                café. Walk through Fitzroy on a weekday morning and every second table has two
                people leaned in talking. The venue was already there. The only missing piece was
                the introduction and the logistics.
              </p>
              <p>
                So we built TheIntro! One stranger, one coffee, once a week, hand-matched. We pick
                the person, the café, and the time. You just show up.
              </p>
              <p>
                If you&apos;ve also been wanting to meet the most interesting people in this city
                without doing the parts that always made it hard, you&apos;ll fit right in.
              </p>
              <p>
                Looking forward to grabbing coffee soon
                <br />
                <br />- Aseem and Harish
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="flex min-h-screen items-center pt-24 pb-40 sm:pt-32 sm:pb-56">
          <div className="mx-auto w-full max-w-3xl px-6 sm:px-10">
            <h2 className="text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Questions?
            </h2>
            <div className="mt-12 sm:mt-16">
              <Faq />
            </div>
          </div>
        </section>

        <section id="cta" className="bg-foreground py-24 sm:py-32">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center sm:px-10">
            <FloatingCup className="h-auto w-[160px] sm:w-[200px] sm:drop-shadow-[4px_8px_20px_rgba(0,0,0,0.35)]" />
            <h2 className="mt-10 text-4xl font-extrabold tracking-tight text-background sm:text-5xl">
              Ready for an intro?
            </h2>
            <div className="mt-10 flex flex-col items-center gap-4">
              <CtaLink href="https://tally.so/r/1AGG8L" className={CTA_CLASSNAME} section="bottom_cta">
                Get your first intro
              </CtaLink>
              <p className="text-sm text-background/70">
                Limited spots available for the founding cohort
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground">
        <div className="mx-auto w-full max-w-5xl px-6 py-8 text-center text-sm text-background/60 sm:px-10">
          © {new Date().getFullYear()} The Intro
        </div>
      </footer>
    </div>
  );
}
