import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";

export function useContactsData() {
  useLoadNamespace("contacts", loadTranslations);
  const { t } = useTranslation("contacts");

  const administrationData = {
    director: {
      label: t("administration.director"),
      worker: t("administration.directorWorker"),
      email: "p.m.martyniuk@nuwm.edu.ua",
      audience: "124",
      phone: null,
    },
    depDirScienWork: {
      label: t("administration.depDirScienWork"),
      worker: t("administration.depDirScienWorkWorker"),
      email: "o.v.pryshchepa@nuwm.edu.ua",
      audience: "129",
      phone: null,
    },
    depDirEducAndMethWork: {
      label: t("administration.depDirEducAndMethWork"),
      worker: t("administration.depDirEducAndMethWorkWorker"),
      email: "t.iu.babych@nuwm.edu.ua",
      audience: "129",
      phone: null,
    },
    depDirEducWork: {
      label: t("administration.depDirEducWork"),
      worker: t("administration.depDirEducWorkWorker"),
      email: "v.a.gerus@nuwm.edu.ua",
      audience: "129",
      phone: "+380630011222",
    },
  } as const;

  const deaneryData = {
    dailyEducation: {
      label: t("deanery.dailyEducation"),
      worker: t("deanery.dailyEducationWorker"),
      email: "nni-akot@nuwm.edu.ua",
      audience: "129",
      phone: "+380639191104",
    },
    distanceEducation: {
      label: t("deanery.distanceEducation"),
      worker: t("deanery.distanceEducationWorker"),
      email: "n.a.karpan@nuwm.edu.ua",
      audience: "129",
      phone: "+380630011222",
    },
  } as const;

  const locationData = {
    label: t("address"),
    address: t("location.address"),
    link: "#",
    googleMapsEmbedAPI:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2531.493185409262!2d26.253785593679517!3d50.617954402132256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472f13503e023a0b%3A0x4d65c704c32f0238!2z0J3QsNGG0ZbQvtC90LDQu9GM0L3QuNC5INGD0L3RltCy0LXRgNGB0LjRgtC10YIg0LLQvtC00L3QvtCz0L4g0LPQvtGB0L_QvtC00LDRgNGB0YLQstCwINGC0LAg0L_RgNC40YDQvtC00L7QutC-0YDQuNGB0YLRg9Cy0LDQvdC90Y8!5e0!3m2!1suk!2sua!4v1751898481338!5m2!1suk!2sua",
  } as const;

  const socialMediaLinks = {
    instagram: "#",
    telegram: "#",
    tikTok: "#",
    youtube: "#",
    facebook: "#",
  } as const;

  return {
    administrationData,
    deaneryData,
    locationData,
    socialMediaLinks,
  };
}
