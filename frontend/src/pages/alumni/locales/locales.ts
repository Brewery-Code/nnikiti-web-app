import { i18n } from "@/shared/i18n";

export default async function loadTranslations() {
  const [en, uk] = await Promise.all([
    import("./en.json"),
    import("./uk.json"),
  ]);

  i18n.addResourceBundle("en", "graduates", en.default, true, false);
  i18n.addResourceBundle("uk", "graduates", uk.default, true, false);
}
