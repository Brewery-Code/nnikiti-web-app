import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "../locales";

export function useContactsData() {
  useLoadNamespace("contacts", loadTranslations);
  const { t } = useTranslation("contacts");

  const administrationData = {
    director: {
      label: t("administration.director"),
      worker: t("administration.directorWorker"),
      email: "p.m.martyniuk@nuwm.edu.ua",
      audience: 124,
    },
    depDirScienWork: {
      label: t("administration.depDirScienWork"),
      worker: t("administration.depDirScienWorkWorker"),
      email: "o.v.pryshchepa@nuwm.edu.ua",
      audience: 129,
    },
    depDirEducAndMethWork: {
      label: t("administration.depDirEducAndMethWork"),
      worker: t("administration.depDirEducAndMethWorkWorker"),
      email: "t.iu.babych@nuwm.edu.ua",
      audience: 129,
    },
    depDirEducWork: {
      label: t("administration.depDirEducWork"),
      worker: t("administration.depDirEducWorkWorker"),
      email: "v.a.gerus@nuwm.edu.ua",
      audience: 129,
    },
  } as const;

  const deaneryData = {
    dailyEducation: {
      label: t("deanery.dailyEducation"),
      worker: t("deanery.dailyEducationWorker"),
      email: "nni-akot@nuwm.edu.ua",
      audience: 129,
    },
    distanceEducation: {
      label: t("deanery.distanceEducation"),
      worker: t("deanery.distanceEducationWorker"),
      email: "n.a.karpan@nuwm.edu.ua",
      audience: 129,
    },
  } as const;

  const locationData = {
    label: t("address"),
    address: t("location.address"),
    link: "#",
  } as const;

  return {
    administrationData,
    deaneryData,
    locationData,
  };
}
