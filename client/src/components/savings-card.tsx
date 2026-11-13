import styles from "@/styles/components/savings_card.module.css";

export interface SavingCardProp {
  heading: string;
  body: string;
  savings: string;
  data: Record<string, Record<string, number>>;
}

// Your theme only defines primary/secondary/muted/accent/destructive — no green or
// purple token, so those two fall back to plain Tailwind colors. Swap in your own
// tokens here if you add them later.
const ROW_DOT_CLASSES = [
  "bg-emerald-500", // no theme equivalent
  "bg-destructive",
  "bg-foreground",
  "bg-violet-500", // no theme equivalent
];

export default function SavingHorizontalCard({
  heading,
  body,
  savings,
  data,
}: SavingCardProp) {
  const columns = Object.keys(data);
  // row labels come from the inner keys — assumes every column has the same set of rows
  const rows = columns.length > 0 ? Object.keys(data[columns[0]]) : [];

  const columnTotal = (col: string) =>
    rows.reduce((sum, row) => sum + (data[col][row] ?? 0), 0);

  return (
    <main className={`${styles.card} mx-auto max-w-4xl font-sans`}>
      {/* left panel */}
      <div
        className={`${styles.leftPanel} rounded-2xl border-2 border-primary bg-card p-5 text-card-foreground sm:p-6 md:p-8`}
      >
        <div>
          <h1 className="mb-3 text-xl font-semibold sm:text-2xl md:text-3xl">
            {heading}
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {body}
          </p>
        </div>
        {/* no "warning"/amber token in the theme, so this uses plain amber rather than a css var */}
        <div className="mt-6 rounded-xl bg-amber-100 p-4 text-amber-900 sm:p-5">
          <p className="mb-1 text-xs sm:text-sm">You could save</p>
          <p className="mb-1 text-2xl font-bold sm:text-3xl md:text-4xl">
            ${savings}
          </p>
          <p className="text-xs sm:text-sm">over 15 years</p>
        </div>
      </div>

      {/* right panel — table replaces the bar chart */}
      <div
        className={`${styles.rightPanel} rounded-2xl bg-card p-5 text-card-foreground sm:p-6 md:p-8`}
      >
        <table className={`${styles.table} min-w-[420px] sm:min-w-0`}>
          <thead>
            <tr>
              <th className="p-2 text-center sm:p-3"></th>
              {columns.map((col) => (
                <th
                  key={col}
                  className="border-b border-border p-2 text-center sm:p-3"
                >
                  <div className="text-xs font-normal text-muted-foreground sm:text-sm">
                    {col}
                  </div>
                  <div className="text-base font-bold text-foreground sm:text-lg md:text-xl">
                    ${columnTotal(col).toLocaleString()}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row}>
                <td
                  className={`${styles.rowLabel} gap-2 whitespace-nowrap p-2 text-sm text-foreground sm:p-3 sm:text-base`}
                >
                  <span
                    className={`${styles.dot} ${ROW_DOT_CLASSES[i % ROW_DOT_CLASSES.length]}`}
                  />
                  {row}
                </td>
                {columns.map((col) => (
                  <td
                    key={col}
                    className="p-2 text-center text-sm text-foreground sm:p-3 sm:text-base"
                  >
                    ${data[col][row].toLocaleString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
