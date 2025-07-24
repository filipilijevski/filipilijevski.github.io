type Theme = {
  pageBg: string;
  cardBg: string;
  cardText: string;
};

type Props = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

export default function ColorThemeControls({ theme, setTheme }: Props) {
  const update = (key: keyof Theme) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setTheme({ ...theme, [key]: e.target.value });

  return (
    <div className="d-flex align-items-center flex-wrap gap-3">
      <label className="d-flex align-items-center gap-1">
        Page 
        <input
          type="color"
          value={theme.pageBg}
          onChange={update("pageBg")}
          style={{ width: 32, height: 32, border: "none" }}
        />
      </label>
      <label className="d-flex align-items-center gap-1">
        Card 
        <input
          type="color"
          value={theme.cardBg}
          onChange={update("cardBg")}
          style={{ width: 32, height: 32, border: "none" }}
        />
      </label>
      <label className="d-flex align-items-center gap-1">
        Text 
        <input
          type="color"
          value={theme.cardText}
          onChange={update("cardText")}
          style={{ width: 32, height: 32, border: "none" }}
        />
      </label>
    </div>
  );
}
