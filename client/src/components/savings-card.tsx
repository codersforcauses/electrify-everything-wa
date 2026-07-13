import styles from "../styles/components/savings_card.module.css";

export interface SavingCardProp {
  heading: string;
  body: string;
  savings: string;
  data: Record<string, Record<string, number>>;
}

const ROW_DOT_CLASSES = [
  "bg-emerald-500",
  "bg-destructive",
  "bg-foreground",
  "bg-violet-500",
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
    <main className={styles.card}>
      <div
        className={`${styles.leftPanel} rounded-2xl border-2 border-primary bg-card p-6 text-card-foreground`}
      >
        <div>
          <h1 className="mb-3 text-xl font-semibold">{heading}</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {body}
          </p>
        </div>
        <div className="mt-6 rounded-xl bg-amber-100 p-4 text-amber-900">
          <p className="mb-1 text-xs">You could save</p>
          <p className="mb-1 text-2xl font-bold">${savings}</p>
          <p className="text-xs">over 15 years</p>
        </div>
      </div>

      <div
        className={`${styles.rightPanel} rounded-2xl bg-card text-card-foreground`}
      >
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.headerCell}></th>
              {columns.map((col) => (
                <th
                  key={col}
                  className={`${styles.headerCell} border-b border-border`}
                >
                  <div
                    className={`${styles.headerColumnLabel} text-muted-foreground`}
                  >
                    {col}
                  </div>
                  <div
                    className={`${styles.headerColumnTotal} text-foreground`}
                  >
                    ${columnTotal(col).toLocaleString()}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row}>
                <td className={`${styles.rowLabel} text-foreground`}>
                  <span
                    className={`${styles.dot} ${ROW_DOT_CLASSES[i % ROW_DOT_CLASSES.length]}`}
                  />
                  {row}
                </td>
                {columns.map((col) => (
                  <td key={col} className={`${styles.cell} text-foreground`}>
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
