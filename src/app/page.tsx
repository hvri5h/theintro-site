import Image from "next/image";

const avatars = ["p1", "p2", "p3", "p4", "p5", "p6"];

const faqs = [
  {
    q: "How do I join The Intro?",
    a: "Download the app. Fill out your profile following all the steps. Applications are reviewed daily, and we invite people with personal, thoughtful profiles.",
  },
  {
    q: "Who is The Intro for?",
    a: "People who want to meet someone outside their social bubble. Often in tech or creative fields, working remotely or moving between cities. New to a city, or simply ready to bring new people into their lives.\n\nThey value good conversation. They don't need an agenda. And they know some of the most interesting people are the ones they haven't met yet.",
  },
  {
    q: "How do you choose where to meet for coffee?",
    a: "You and the other person decide together. Once you're connected with another member in the chat, you can suggest places you like or want to try.\n\nAnd if you need ideas, we have a list of the best coffee spots in every city.",
  },
  {
    q: "What's the philosophy?",
    a: "The best things in life start with a conversation.\n\nNot a swipe. Not a pitch. A real conversation, one-on-one, without a script. The kind that only happens offline, when two people sit across the table, with nowhere else to be.\n\nReal connection — the kind that changes how you think, who you become, the life you build — still happens face to face. Over a slow morning. In a city full of people you haven't met yet.\n\nThat's what The Intro is built around. Because life happens offline.",
  },
  {
    q: "Why meet over coffee?",
    a: "Because dinner sounds like a date, and lunch sounds like a work meeting.\n\nCoffee is just coffee. Simple, relaxed, and easy. The kind of setting where meeting someone new feels natural.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="w-full">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6 sm:px-10">
          <a href="#" className="flex items-center gap-2.5 text-foreground">
            <Image
              src="/logo.png"
              alt="The Intro logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg"
              priority
            />
            <span className="text-base font-semibold tracking-tight">
              The Intro
            </span>
          </a>
          <a
            href="#join"
            className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-card hover:bg-accent"
          >
            Join The Intro
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-3xl px-6 pt-12 pb-24 text-center sm:pt-20 sm:pb-32">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/80 sm:text-sm">
            MEMBERS-ONLY{" "}
            <span className="font-serif italic tracking-normal">offline</span>{" "}
            SOCIAL NETWORK
          </p>
          <h1 className="mt-8 text-5xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-7xl">
            Meet interesting people
            <br />
            <span className="font-serif italic font-normal">over coffee</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-foreground/80 sm:text-xl">
            Cranbourne East is full of people worth knowing,
            <br className="hidden sm:block" /> The Intro is how you meet them
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
          <p className="mt-5 text-base text-foreground/70">
            60,800+ members in 34 cities
          </p>

          <div className="mt-10 flex justify-center">
            <a
              href="#join"
              className="inline-flex h-14 items-center justify-center rounded-full bg-accent px-10 text-base font-semibold text-card transition-colors hover:bg-foreground"
            >
              Join The Intro
            </a>
          </div>
        </section>

        <section id="about" className="border-t border-border">
          <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center sm:py-28">
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
              About
            </h2>
            <p className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              The Intro is a members-only{" "}
              <span className="font-serif italic font-normal">
                offline social network
              </span>
            </p>
            <div className="mx-auto mt-8 max-w-xl space-y-5 text-lg leading-8 text-foreground/80">
              <p>
                A place for people in tech and creative industries to meet
                one-on-one in local cafes.
              </p>
              <p>
                No swiping. No pitches. No pressure of dating or networking.
                Just real conversations, in real life, over coffee.
              </p>
              <p>
                Because the real magic happens when two people talk and no one
                expects anything from each other.
              </p>
            </div>
          </div>
        </section>

        <section id="how" className="border-t border-border">
          <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center sm:py-28">
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
              How it works
            </h2>
            <p className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              One{" "}
              <span className="font-serif italic font-normal">
                introduction
              </span>{" "}
              to another member in your city
            </p>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-foreground/80">
              Each day you get one chance — one introduction to a member nearby.
              Say yes and the two of you start planning your coffee.
            </p>
          </div>
        </section>

        <section id="faq" className="border-t border-border">
          <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
            <h2 className="text-center text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
              Questions
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Everything you might want to{" "}
              <span className="font-serif italic font-normal">know</span>
            </p>

            <dl className="mt-14 space-y-12">
              {faqs.map((f) => (
                <div key={f.q}>
                  <dt className="text-xl font-semibold text-foreground sm:text-2xl">
                    {f.q}
                  </dt>
                  <dd className="mt-4 space-y-4 text-base leading-7 text-foreground/80 sm:text-lg sm:leading-8">
                    {f.a.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="join" className="border-t border-border">
          <div className="mx-auto w-full max-w-2xl px-6 py-24 text-center sm:py-32">
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Your first{" "}
              <span className="font-serif italic font-normal">intro</span> is
              waiting
            </h2>
            <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-foreground/80">
              Drop your email and we&apos;ll send the link to download the app
              and start your profile.
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
                className="h-12 flex-1 rounded-full border border-border bg-card px-5 text-base text-foreground placeholder:text-foreground/40 focus:border-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-card transition-colors hover:bg-foreground"
              >
                Join The Intro
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-3 px-6 py-8 text-sm text-foreground/60 sm:flex-row sm:items-center sm:px-10">
          <p>© {new Date().getFullYear()} The Intro. Life happens offline.</p>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-foreground">
              About
            </a>
            <a href="#faq" className="hover:text-foreground">
              FAQ
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
