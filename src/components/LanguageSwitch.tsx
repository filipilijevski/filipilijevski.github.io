import { useTranslation } from "react-i18next";

export default function LanguageSwitch() {
  const { i18n, t } = useTranslation();

  const toggle = () =>
    i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");

  return (
    <button
      onClick={toggle}
      className="btn btn-dark btn-sm ms-2"   
      aria-label="Toggle language"
    >
      {t("Toggle language (EN/FR)")}
    </button>
  );
}
