import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import { CupScatter } from "./cup-scatter";
import { RotatingText } from "@/components/ui/rotating-text";
import intros from "@/data/intros.json";

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

const steps = [
  {
    n: "01",
    title: "Tell us about you",
    body: "A quick profile so we know who you'd find interesting.",
  },
  {
    n: "02",
    title: "Get a weekly intro",
    body: "One curious person, sent to your inbox each week.",
  },
  {
    n: "03",
    title: "Meet for coffee",
    body: "Reply, pick a café, see what happens.",
  },
];

const whoBullets = [
  "Built for people in tech and creative industries",
  "No swiping, no pitches, no networking",
  "Meet at Melbourne's best cafés",
  "The kind of conversation that only happens offline",
];

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
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 py-1 pr-3 pl-1 shadow-sm backdrop-blur-sm">
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
                  44/50 spots available
                </span>
              </div>
            </div>

            <h1 className="mt-10 text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-6xl">
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

            <div className="mt-10 flex justify-center">
              <a
                href="https://tally.so/r/1AGG8L"
                className="inline-flex h-16 items-center justify-center rounded-full bg-accent px-10 text-base font-semibold text-accent-foreground shadow-sm transition-[filter,box-shadow] duration-200 hover:brightness-95 hover:shadow-md"
              >
                Apply for the May cohort
              </a>
            </div>
          </div>
        </section>

        <section id="how" className="hidden">
          <div className="mx-auto w-full max-w-5xl px-6 py-12 text-center sm:px-10 sm:py-16">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              How it works
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              One real connection per week
            </p>

            <ol className="mt-12 grid gap-6 sm:grid-cols-3">
              {steps.map((step) => (
                <li key={step.n} className="rounded-2xl border border-border bg-card p-6">
                  <div className="font-mono text-xs text-accent">{step.n}</div>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="who" className="hidden">
          <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center sm:px-10 sm:py-28">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              Who it&apos;s for
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              People who&apos;d rather be curious than impressive.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted">
              Founders, designers, writers, builders, makers — anyone in tech or creative industries
              who&apos;d rather have a real conversation than another evening scrolling. Because the
              real magic happens when two people talk and no one expects anything from each other.
            </p>
            <ul className="mx-auto mt-10 grid max-w-2xl gap-4 text-left text-base text-foreground sm:grid-cols-2">
              {whoBullets.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="hidden border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-center px-6 py-8 text-sm text-muted sm:px-10">
          <p>© {new Date().getFullYear()} The Intro.</p>
        </div>
      </footer>
    </div>
  );
}
