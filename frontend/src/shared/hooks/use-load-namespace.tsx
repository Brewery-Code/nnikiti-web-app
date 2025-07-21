import { useEffect, useState } from "react";
import i18n from "i18next";

function useLoadNamespace(
  namespace: string,
  loadTranslations: () => Promise<void>
) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      if (!i18n.hasResourceBundle(i18n.language, namespace)) {
        await loadTranslations();
      }
      if (isMounted) setLoaded(true);
    }
    load();

    return () => {
      isMounted = false;
    };
  }, [namespace, loadTranslations]);

  return loaded;
}

export { useLoadNamespace };
