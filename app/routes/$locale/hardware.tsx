import style from "./styles/hardware.module.css";
import { useNavigation, useParams } from "react-router-dom";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getTranslations } from "~/i18n";
import { Button } from "~/components";
import { DefaultLoader } from "~/components/SkeletonLoader/components";
import {
  DeviceCard,
  DevicesSection,
  PageEnd,
  PageHero,
  PageSection,
} from "~/ui";
import { useWindowSize, useHardware } from "~/hooks";
import Assets from "~/assets/hardware";

const Hardware = () => {
  const navigation = useNavigation();

  const { locale: currentLocale } = useParams();
  const { t } = getTranslations(currentLocale || "es");

  const { width } = useWindowSize();
  const isMobile = width < 900 && width > 0;

  const { SECTIONS, getSliderData, scrollToFormSection } = useHardware();

  const renderSlider = (key: "paid" | "accessories") => {
    const { items, active, handleSwipe, handlePrev, handleNext } =
      getSliderData(key);

    if (!isMobile || items.length === 1) {
      return items.map((item, idx) => (
        <DeviceCard key={idx} {...item} className={style.deviceCard} />
      ));
    }

    return (
      <>
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`${style.slide} ${idx === active ? style.active : style.hidden}`}
            onTouchStart={handleSwipe.start}
            onTouchEnd={handleSwipe.end}
          >
            <DeviceCard {...item} className={style.deviceCard} />
          </div>
        ))}
        <div className={style.buttons}>
          <Button
            className={`${style.btn} ${style.buttonLeft}`}
            onClick={handlePrev}
          />
          <Button
            className={`${style.btn} ${style.buttonRight}`}
            onClick={handleNext}
          />
        </div>
      </>
    );
  };

  if (navigation.state === "loading") return <DefaultLoader />;

  return (
    <main className={style.hardwareContainer}>
      <PageHero
        children={Assets.totem}
        className={style.pageHero}
        title={t("hardware.home.title")}
        text={t("hardware.home.text")}
        cto={t("hardware.home.button")}
        buttonFunction={scrollToFormSection}
      />

      {SECTIONS.map((section) => (
        <PageSection
          key={section.id}
          id={section.id === "pic1" ? "terminals" : section.id}
          alt
          rowReverse={["pic1", "pic3", "pic5", "pic7"].includes(section.id)}
          img={Assets[section.id as keyof typeof Assets]}
          className={style.pageSection}
        >
          <div>
            <strong>{t(section.strongKey)}</strong>
            {section.titleKey && <h3>{t(section.titleKey)}</h3>}
          </div>
          <p>{t(section.descriptionKey)}</p>
          <ul>
            {section.listKeys.map((key, idx) => (
              <li key={idx}>{t(key)}</li>
            ))}
          </ul>
        </PageSection>
      ))}

      <DevicesSection
        title={t("hardware.devices.paid.title")}
        text={t("hardware.devices.paid.text")}
      >
        {renderSlider("paid")}
      </DevicesSection>

      <DevicesSection
        title={t("hardware.devices.accessories.title")}
        text={t("hardware.devices.accessories.text")}
      >
        {renderSlider("accessories")}
      </DevicesSection>

      <PageEnd
        className={style.endBanner}
        text={t("hardware.endBanner.text")}
        cta={t("hardware.endBanner.button")}
      />
    </main>
  );
};

export default Hardware;

export const meta = (context: LoaderFunctionArgs) => {
  const { params } = context;
  const { locale: currentLocale } = params;

  const locale = currentLocale || "es";
  const { t } = getTranslations(locale);

  const pageTitle = t("hardware.title");
  const pageDescription = t("hardware.metaDescription");

  const BASE_URL =
    import.meta.env.VITE_PUBLIC_BASE_URL ||
    "https://tabbi-web-remix-7bfo.vercel.app";

  const canonicalUrl = `${BASE_URL}/${locale}/hardware`;
  const pageImage = `${BASE_URL}/favicon.svg`;

  return [
    { title: pageTitle },
    { name: "description", content: pageDescription },
    { tagName: "link", rel: "canonical", href: canonicalUrl },
    { property: "og:title", content: pageTitle },
    { property: "og:type", content: "article" },
    { property: "og:url", content: canonicalUrl },
    { property: "og:description", content: pageDescription },
    { property: "og:image", content: pageImage },
    { property: "og:locale", content: locale },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@eruedasanchez" },
    { name: "twitter:title", content: pageTitle },
    { name: "twitter:description", content: pageDescription },
    { name: "twitter:image", content: pageImage },
  ];
};
