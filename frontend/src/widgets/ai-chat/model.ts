export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}

export function createMessage(role: ChatRole, text: string): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
  };
}

/**
 * Produces an assistant reply.
 *
 * This is a local, rule-based stub so the widget works without a backend.
 * To connect a real AI service, replace the body with a request to your
 * endpoint, e.g.:
 *
 *   const res = await fetch(`${CONFIG.API_BASE_URL}/ai/chat/`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ message: input, lang }),
 *   });
 *   return (await res.json()).reply;
 */
export async function requestAssistantReply(input: string, lang: string): Promise<string> {
  // Simulate network / thinking latency for a natural feel.
  await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 700));

  const uk = lang.startsWith("uk");
  const q = input.toLowerCase();
  const has = (...keys: string[]) => keys.some((k) => q.includes(k));

  if (has("вступ", "подати", "вступити", "admission", "apply", "enroll")) {
    return uk
      ? "Вступ відбувається онлайн через ЄДЕБО. Покрокову інструкцію та посилання на всі документи приймальної комісії дивіться у розділі «Вступникам» → Бакалаврат або Магістратура."
      : "Admission is handled online via EDBO. See “Applicants” → Bachelor's or Master's for a step-by-step guide and links to all admission documents.";
  }
  if (has("контакт", "пошта", "телефон", "contact", "email", "phone")) {
    return uk
      ? "Приймальна комісія: м. Рівне, вул. М. Карнаухова, 53а (7 корпус), ауд. 729. Тел. +38 (0362) 633-222, пошта rc@nuwm.edu.ua. Працюємо пн–пт, 9:00–17:00."
      : "Admissions committee: Rivne, M. Karnaukhova St. 53a (building 7), room 729. Phone +38 (0362) 633-222, email rc@nuwm.edu.ua. Mon–Fri, 9:00–17:00.";
  }
  if (has("магістр", "master")) {
    return uk
      ? "Магістратура триває 1,5 роки, вступ за ЄВІ + ЄФВВ. Деталі — на сторінці «Вступникам → Магістратура»."
      : "The master's program lasts 1.5 years with EVI + EFVV entrance exams. Details on the “Applicants → Master's” page.";
  }
  if (has("бакалавр", "bachelor", "нмт", "nmt")) {
    return uk
      ? "Бакалаврат триває 4 роки, вступ за результатами НМТ. Деталі та перелік предметів — на сторінці «Вступникам → Бакалаврат»."
      : "The bachelor's program lasts 4 years with admission based on NMT results. Details and subjects on the “Applicants → Bachelor's” page.";
  }
  if (has("спеціальн", "програм", "напрям", "program", "specialt")) {
    return uk
      ? "В інституті є спеціальності з розробки ПЗ, комп'ютерних наук, кібербезпеки, інженерії та математики. Повний перелік — у розділі «Вступникам» на сторінці відповідного рівня освіти."
      : "We offer specialties in software development, computer science, cybersecurity, engineering and mathematics. See the full list under “Applicants”.";
  }
  if (has("привіт", "вітаю", "hello", "hi ", "hey")) {
    return uk
      ? "Вітаю! 👋 Я можу підказати щодо вступу, спеціальностей та контактів. Що вас цікавить?"
      : "Hello! 👋 I can help with admission, specialties and contacts. What would you like to know?";
  }

  return uk
    ? "Дякую за запитання! Я можу підказати щодо вступу, спеціальностей та контактів приймальної комісії. Для детальної консультації пишіть на rc@nuwm.edu.ua."
    : "Thanks for your question! I can help with admission, specialties and admissions-committee contacts. For detailed advice email rc@nuwm.edu.ua.";
}
