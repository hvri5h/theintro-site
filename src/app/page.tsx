import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import { CupScatter } from "./cup-scatter";
import { FloatingCup } from "./floating-cup";
import { Founders } from "./founders";
import { RotatingText } from "@/components/ui/rotating-text";
import { Faq } from "@/components/ui/faq";
import {
  PiClipboardTextStroke,
  PiCoffeeCup01Stroke,
  PiEnvelopeDefaultStroke,
} from "@/components/icons/pikaicons";
import intros from "@/data/intros.json";
import stepsData from "@/data/steps.json";

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

const STEP_ICONS = {
  clipboard: PiClipboardTextStroke,
  envelope: PiEnvelopeDefaultStroke,
  coffee: PiCoffeeCup01Stroke,
} as const;

type StepIconKey = keyof typeof STEP_ICONS;

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
                  Cohort filling fast
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
              <a href="https://tally.so/r/1AGG8L" className={CTA_CLASSNAME}>
                Apply now
              </a>
              <p className="text-sm text-muted">Limited spots available for the May 2026 cohort.</p>
            </div>
          </div>
        </section>

        <section id="how" className="flex min-h-screen items-center py-24 sm:py-32">
          <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
            <h2 className="text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              How it works
            </h2>
            <ol className="mt-16 grid gap-12 sm:mt-20 sm:grid-cols-3 sm:gap-10">
              {stepsData.steps.map((step, i) => {
                const Icon = STEP_ICONS[step.icon as StepIconKey];
                return (
                  <li key={step.title} className="flex flex-col items-center text-center">
                    <Icon aria-hidden className="h-16 w-16 text-foreground" />
                    <h3 className="mt-8 text-2xl font-bold text-foreground">
                      {i + 1}. {step.title}
                    </h3>
                    <p className="mt-4 max-w-xs text-base leading-7 text-muted">{step.body}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section id="why" className="flex min-h-screen items-center py-24 sm:py-32">
          <div className="mx-auto w-full max-w-3xl px-6 sm:px-10">
            <h2 className="text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Why we made this
            </h2>
            <Founders />
            <div className="mt-16 space-y-6 text-lg leading-8 text-foreground">
              <p>
                In the bustling heart of Melbourne, where coffee culture thrives, a new idea was
                born. The Intro was conceived as a solution for those seeking meaningful connections
                in the tech and creative industries.
              </p>
              <p>
                Imagine receiving a carefully chosen introduction each week to someone intriguing,
                someone who could inspire you or spark a new collaboration. This isn’t about swiping
                through profiles or attending crowded events; it’s about one genuine conversation
                over coffee, at a café of your choice.
              </p>
              <p>
                The concept draws inspiration from the intimate atmosphere of Melbourne’s coffee
                scene, where every cup is an opportunity for connection. As we prepare to launch,
                we’re inviting a select group of curious minds to join our founding cohort. By
                signing up, you’ll receive a personal introduction each week, curated by hand to
                ensure a thoughtful match.
              </p>
              <p>
                This is not just another app; it’s a community built on the belief that the best
                conversations can change the course of a year. Join us as we redefine networking,
                one coffee at a time.
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
              <a href="https://tally.so/r/1AGG8L" className={CTA_CLASSNAME}>
                Apply now
              </a>
              <p className="text-sm text-background/70">
                Limited spots available for the May 2026 cohort.
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
