import Image from "next/image";
import Link from "next/link";
import {
  brand,
  boxes,
  cadences,
  heroImage,
  money,
  sandwiches,
  stages,
} from "@/lib/mock-data";

const steps = [
  {
    n: "01",
    title: "Parent pre-orders on the web app",
    body: "Customize the sandwich, pick a box, and lock Daily, Weekly (10% off), or Monthly (~19% vs daily). Cutoff is 8:00 pm the night before.",
  },
  {
    n: "02",
    title: "Cloud kitchen + campus kiosk",
    body: "Boxes leave the cloud kitchen in a cooled van. Halloumi and other presses are finished warm at the on-site Food Break Station.",
  },
  {
    n: "03",
    title: "Named drop-box before the bell",
    body: "Runners place insulated class bins 5 minutes before recess. Students pick up from a drop-box labeled with their name — zero queue, under 8 minutes.",
  },
];

const audiences = [
  {
    title: "Parents",
    body: "Save the morning scramble. Full dietary control, allergen flags, pause before 8:00 am on sick days, and auto-renew weekly or monthly.",
  },
  {
    title: "Students",
    body: "No bag from home, no canteen line. A custom Labneh or Jebne sandwich waiting at the drop-box.",
  },
  {
    title: "Schools",
    body: "Health-compliant partner, less canteen chaos, controlled menu, and a facility share on sales.",
  },
];

const faqs = [
  {
    q: "When do I have to order?",
    a: "Pre-order by 8:00 pm the previous day. That cutoff lets the kitchen forecast, pack by class, and hit the recess window.",
  },
  {
    q: "How do Weekly and Monthly discounts work?",
    a: "Weekly is 10% off the daily a la carte rate. Monthly is another 10% off the weekly rate — about 19% cheaper than buying day by day.",
  },
  {
    q: "What if my child is absent?",
    a: "Pause before 8:00 am on that school day. Meal credits roll to future weeks.",
  },
  {
    q: "Is ECE nut-free?",
    a: "Yes. Kindergarten boxes are 100% nut-free, mini-portioned, and use easy-open packaging. Walnut pita and nut mixes are hidden for ECE profiles.",
  },
];

export default function Home() {
  return (
    <div>
      <section>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-sm font-bold tracking-wide text-accent-dark uppercase">
              School A pilot · parent web app
            </p>
            <h1 className="font-display mt-3 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
              Recess, without the queue. Authentic Labneh and Jebne, already waiting.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              {brand.name} is a tech-enabled recess station. Parents order on
              this web app. The kiosk presses sandwiches warm. Students collect
              from a drop-box with their name on it.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/subscribe"
                className="rounded-full bg-accent px-6 py-3 text-center text-sm font-bold text-white hover:bg-accent-dark"
              >
                Choose a box
              </Link>
              <Link
                href="/menu"
                className="rounded-full border border-foreground/15 bg-card px-6 py-3 text-center text-sm font-bold"
              >
                See the sandwiches
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted">{brand.cutoff} · {brand.delivery}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-4 ring-citrus/50">
            <Image
              src={heroImage}
              alt="Fresh vegetables and healthy lunch"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-foreground/10 bg-card/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-3 sm:px-6">
          {steps.map((step) => (
            <div key={step.n}>
              <p className="font-display text-3xl text-accent">{step.n}</p>
              <h2 className="mt-2 text-xl font-bold">{step.title}</h2>
              <p className="mt-2 text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">
          Five healthy sandwiches
        </h2>
        <p className="mt-2 max-w-2xl text-muted">
          Artisanal Lebanese Labneh and Jebne, plus a turkey/chicken club.
          Parents pick daily. ECE profiles hide walnut recipes.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sandwiches.map((s) => (
            <article
              key={s.id}
              className="overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/8"
            >
              <div className="relative aspect-[5/4]">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold">{s.name}</h3>
                <p className="mt-1 text-sm text-muted">{s.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-forest text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            Boxes by age, priced Daily → Weekly → Monthly
          </h2>
          <p className="mt-2 max-w-2xl text-white/80">
            {cadences.map((c) => `${c.name}: ${c.discount}`).join(" · ")}.
            ECE is nut-free. Secondary includes a Power Box with two sandwiches.
          </p>
          <div className="mt-8 space-y-10">
            {stages.map((stage) => (
              <div key={stage.id}>
                <p className="text-sm font-bold tracking-wide text-citrus uppercase">
                  {stage.name} · {stage.ages}
                </p>
                <p className="mt-1 text-sm text-white/75">{stage.note}</p>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {boxes
                    .filter((b) => b.stage === stage.id)
                    .map((box) => (
                      <div
                        key={box.id}
                        className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/15"
                      >
                        <h3 className="text-lg font-bold">{box.name}</h3>
                        <p className="mt-2 font-display text-3xl">
                          {money(box.rates.daily.perDay)}
                          <span className="text-base font-sans font-normal text-white/70">
                            {" "}
                            / day
                          </span>
                        </p>
                        <p className="text-sm text-citrus">
                          Weekly {money(box.rates.weekly.perDay)}/day · Monthly{" "}
                          {money(box.rates.monthly.perDay)}/day
                        </p>
                        <p className="mt-2 text-sm text-white/80">{box.blurb}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/subscribe"
            className="mt-10 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-forest hover:bg-citrus"
          >
            Open the parent app
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {audiences.map((a) => (
            <div key={a.title} className="rounded-3xl bg-card p-6 ring-1 ring-foreground/8">
              <h2 className="text-xl font-bold">{a.title}</h2>
              <p className="mt-2 text-muted">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">Questions</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="rounded-2xl bg-card p-5 ring-1 ring-foreground/8"
            >
              <summary className="cursor-pointer font-bold">{faq.q}</summary>
              <p className="mt-2 text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
