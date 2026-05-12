import { i18n } from "@/shared/i18n";

export async function loadTranslations() {
  const [en, uk] = await Promise.all([import("./en.json"), import("./uk.json")]);

  i18n.addResourceBundle("en", "science", en.default, true, false);
  i18n.addResourceBundle("uk", "science", uk.default, true, false);
}
