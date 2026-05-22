import { i18n } from "@/shared/i18n";

export async function loadTranslations() {
  const [en, uk] = await Promise.all([import("./en.json"), import("./uk.json")]);

  i18n.addResourceBundle("en", "footer", en.default, true, false);
  i18n.addResourceBundle("uk", "footer", uk.default, true, false);
}
