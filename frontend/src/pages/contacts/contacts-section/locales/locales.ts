import { i18n } from "@/shared/i18n";

export default async function loadTranslations() {
  const [en, uk] = await Promise.all([
    import("./en.json"),
    import("./uk.json"),
  ]);

  i18n.addResourceBundle("en", "contacts", en.default, true, false);
  i18n.addResourceBundle("uk", "contacts", uk.default, true, false);
}
