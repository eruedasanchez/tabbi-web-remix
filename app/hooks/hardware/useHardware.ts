import { useState } from "react";
import { useParams } from "react-router";
import { Devices, DevicesAR, DevicesES } from "~/data/data";
import { createSwipeHandlers } from "~/utils";

const SECTIONS = [
  {
    id: "pic1",
    titleKey: "hardware.section.c20.title",
    descriptionKey: "hardware.section.c20.description",
    strongKey: "hardware.section.c20.strong",
    listKeys: [
      "hardware.section.c20.list.first",
      "hardware.section.c20.list.second",
      "hardware.section.c20.list.third",
      "hardware.section.c20.list.fourth",
      "hardware.section.c20.list.fifth",
      "hardware.section.c20.list.sixth",
    ],
  },
  {
    id: "pic2",
    titleKey: "hardware.section.p30.title",
    descriptionKey: "hardware.section.p30.description",
    strongKey: "hardware.section.p30.strong",
    listKeys: [
      "hardware.section.p30.list.first",
      "hardware.section.p30.list.second",
      "hardware.section.p30.list.third",
      "hardware.section.p30.list.fourth",
      "hardware.section.p30.list.fifth",
    ],
  },
  {
    id: "pic3",
    titleKey: "hardware.section.d2s.title",
    descriptionKey: "hardware.section.d2s.description",
    strongKey: "hardware.section.d2s.strong",
    listKeys: [
      "hardware.section.d2s.list.first",
      "hardware.section.d2s.list.second",
      "hardware.section.d2s.list.third",
      "hardware.section.d2s.list.fourth",
    ],
  },
  {
    id: "pic4",
    titleKey: "hardware.section.t2s.title",
    descriptionKey: "hardware.section.t2s.description",
    strongKey: "hardware.section.t2s.strong",
    listKeys: [
      "hardware.section.t2s.list.first",
      "hardware.section.t2s.list.second",
      "hardware.section.t2s.list.third",
      "hardware.section.t2s.list.fourth",
    ],
  },
  {
    id: "pic5",
    descriptionKey: "hardware.section.tablet.description",
    strongKey: "hardware.section.tablet.strong",
    listKeys: [
      "hardware.section.tablet.list.first",
      "hardware.section.tablet.list.second",
      "hardware.section.tablet.list.third",
      "hardware.section.tablet.list.fourth",
      "hardware.section.tablet.list.fifth",
    ],
  },
  {
    id: "pic6",
    titleKey: "hardware.section.k2.title",
    descriptionKey: "hardware.section.k2.description",
    strongKey: "hardware.section.k2.strong",
    listKeys: [
      "hardware.section.k2.list.first",
      "hardware.section.k2.list.second",
      "hardware.section.k2.list.third",
      "hardware.section.k2.list.fourth",
    ],
  },
  {
    id: "pic7",
    descriptionKey: "hardware.section.commander.description",
    strongKey: "hardware.section.commander.strong",
    listKeys: [
      "hardware.section.commander.list.first",
      "hardware.section.commander.list.second",
    ],
  },
];

const useHardware = () => {
  const [activeIndex, setActiveIndex] = useState({
    accessories: 0,
    paid: 0,
  });

  const { locale: currentLocale } = useParams();
  const locale = currentLocale || "es";

  const devices = {
    paid: locale === "es" ? DevicesES : DevicesAR,
    accessories: Devices,
  };

  const getSliderData = (key: "paid" | "accessories") => {
    const items = devices[key];
    const active = activeIndex[key];

    const handleNext = () => {
      setActiveIndex((prev) => ({
        ...prev,
        [key]: (prev[key] + 1) % devices[key].length,
      }));
    };

    const handlePrev = () => {
      setActiveIndex((prev) => ({
        ...prev,
        [key]: prev[key] === 0 ? devices[key].length - 1 : prev[key] - 1,
      }));
    };

    const handleSwipe = createSwipeHandlers({
      onSwipeLeft: handleNext,
      onSwipeRight: handlePrev,
    });

    return { items, active, handleSwipe, handleNext, handlePrev };
  };

  const scrollToFormSection = () => {
    const seccion = document.getElementById("terminals");
    if (seccion) seccion.scrollIntoView({ behavior: "smooth" });
  };

  return {
    SECTIONS,
    getSliderData,
    scrollToFormSection,
  };
};

export default useHardware
