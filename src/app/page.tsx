export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <header className="w-full">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6 sm:px-10">
          <a href="#" className="flex items-center gap-2 text-foreground">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent font-serif text-sm font-semibold text-card">
              i
            </span>
            <span className="text-base font-semibold tracking-tight">
              The Intro
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
            <a href="#who" className="hover:text-foreground">
              Who it&apos;s for
            </a>
            <a
              href="#join"
              className="rounded-full bg-foreground px-4 py-2 text-card hover:bg-accent"
            >
              Get an intro
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-5xl px-6 pt-10 pb-24 sm:px-10 sm:pt-20 sm:pb-32">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl sm:leading-[1.05]">
            Coffee with someone{" "}
            <span className="italic text-accent">interesting.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            The Intro pairs you 1:1 with one curious, thoughtful person nearby
            each week. No swiping, no networking, no group dinners — just a
            45-minute conversation worth showing up for.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#join"
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-card transition-colors hover:bg-accent"
            >
              Get my first intro
            </a>
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
                Founders, writers, designers, scientists, teachers, retirees
                rebuilding their week — anyone who&apos;s decided that a quiet
                hour with a stranger sometimes beats another hour scrolling.
              </p>
            </div>
            <ul className="grid gap-4 self-center text-base text-foreground">
              {[
                "1:1 — never a group, never a dinner with eight strangers",
                "Hand-matched by humans, not an algorithm",
                "One intro a week — easy to actually say yes to",
                "Pause anytime. We won't guilt-trip you.",
              ].map((line) => (
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
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-card/70">
              Drop your email and we&apos;ll send you the intake form. Your
              first match lands in your inbox next Sunday.
            </p>
            <form
              action="https://formsubmit.co/hello@theintro.app"
              method="POST"
              className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="you@yourname.com"
                className="h-12 flex-1 rounded-full border border-card/20 bg-transparent px-5 text-sm text-card placeholder:text-card/40 focus:border-card focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-card transition-colors hover:bg-card hover:text-foreground"
              >
                Join the list
              </button>
            </form>
            <p className="mt-4 text-xs text-card/50">
              We&apos;ll only email you about your matches. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:px-10">
          <p>© {new Date().getFullYear()} The Intro. Made over coffee.</p>
          <div className="flex items-center gap-6">
            <a href="#who" className="hover:text-foreground">
              Who it&apos;s for
            </a>
            <a href="#join" className="hover:text-foreground">
              Get an intro
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
