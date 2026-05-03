import Image from "next/image";

const avatars = ["p1-v6", "p2-v6", "p3-v6", "p4-v8", "p5-v6", "p6-v6"];

const steps = [
  {
    n: "01",
    title: "Tell us about you",
    body: "A thoughtful profile that helps us understand who you'd find interesting to meet.",
  },
  {
    n: "02",
    title: "We make an introduction",
    body: "Someone from Melbourne's tech and creative scene you might not have crossed paths with otherwise.",
  },
  {
    n: "03",
    title: "Meet for coffee",
    body: "Pick a café you both like. No agenda, no pitches — just a real conversation, in real life.",
  },
];

const whoBullets = [
  "Built for people in tech and creative industries",
  "No swiping, no pitches, no networking",
  "Meet at Melbourne's best cafés",
  "The kind of conversation that only happens offline",
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="w-full">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6 sm:px-10">
          <a href="#" className="flex items-center gap-2.5 text-foreground">
            <span
              aria-hidden
              className="grid h-7 w-7 place-items-center rounded-full bg-accent text-sm font-bold text-card"
            >
              i
            </span>
            <span className="text-base font-semibold tracking-tight">
              The Intro
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
            <a href="#how" className="hover:text-foreground">
              How it works
            </a>
            <a href="#who" className="hover:text-foreground">
              Who it&apos;s for
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-3xl px-6 pt-16 pb-24 text-center sm:pt-24 sm:pb-32">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Meet interesting people{" "}
            <span className="italic text-accent">over coffee</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-muted sm:text-xl">
            Melbourne is full of people worth knowing. The Intro is how you
            meet them. We pair you 1-on-1 with curious, thoughtful people,
            for real conversations, in real life, over coffee.
          </p>

          <div className="mt-12 flex justify-center">
            <ul className="flex -space-x-3">
              {avatars.map((p) => (
                <li
                  key={p}
                  className="overflow-hidden rounded-full ring-2 ring-background"
                >
                  <Image
                    src={`/avatars/${p}.jpg`}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 object-cover"
                    priority
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="#join"
              className="inline-flex h-14 items-center justify-center rounded-full bg-accent px-10 text-base font-semibold text-card transition-colors hover:bg-foreground"
            >
              Join The Intro
            </a>
          </div>
        </section>

        <section id="how" className="border-t border-border bg-card/60">
          <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:px-10 sm:py-28">
            <h2 className="text-sm font-medium uppercase tracking-widest text-accent">
              How it works
            </h2>
            <p className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Three steps. One real conversation.
            </p>

            <ol className="mt-12 grid gap-6 sm:grid-cols-3">
              {steps.map((step) => (
                <li
                  key={step.n}
                  className="rounded-2xl border border-border bg-background p-6"
                >
                  <div className="font-mono text-xs text-accent">{step.n}</div>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="who" className="border-t border-border">
          <div className="mx-auto grid w-full max-w-5xl gap-12 px-6 py-20 sm:grid-cols-2 sm:px-10 sm:py-28">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-widest text-accent">
                Who it&apos;s for
              </h2>
              <p className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                People who&apos;d rather be curious than impressive.
              </p>
              <p className="mt-6 text-base leading-7 text-muted">
                Founders, designers, writers, builders, makers — anyone in tech
                or creative industries who&apos;d rather have a real
                conversation than another evening scrolling. Because the real
                magic happens when two people talk and no one expects anything
                from each other.
              </p>
            </div>
            <ul className="grid gap-4 self-center text-base text-foreground">
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

        <section
          id="join"
          className="border-t border-border bg-foreground text-card"
        >
          <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center sm:px-10 sm:py-28">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Your first intro is on us.
            </h2>
            <div className="mt-10 flex justify-center">
              <a
                href="mailto:hello@theintro.app?subject=I%27d%20like%20to%20join%20The%20Intro"
                className="inline-flex h-14 items-center justify-center rounded-full bg-accent px-10 text-base font-semibold text-card transition-colors hover:bg-card hover:text-foreground"
              >
                Join The Intro
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:px-10">
          <p>© {new Date().getFullYear()} The Intro. Made over coffee.</p>
          <div className="flex items-center gap-6">
            <a href="#how" className="hover:text-foreground">
              How it works
            </a>
            <a href="#who" className="hover:text-foreground">
              Who it&apos;s for
            </a>
            <a href="#join" className="hover:text-foreground">
              Join
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
