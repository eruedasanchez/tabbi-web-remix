export const scrollToFormSection = () => {
    const section = document.getElementById("form-section")
    if (section) {
        section.scrollIntoView({ behavior: "smooth" })
    }
}