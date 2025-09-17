class OptionsPage {
  async init() {
    const settings = await chrome.storage.sync.get(null); // Get every key.
    this.customUrlEl = document.querySelector("input[name=customUrl]");
    this.setFormFromSettings(settings);
    document.querySelector("form").addEventListener("input", () => this.onFormChanged());
    this.syncCustomUrlEl();
    // Allow the ESC key to blur the input input. This is a minor usability improvement. Without it,
    // it's a little less clear whether the input value has been registered and saved.
    this.customUrlEl.addEventListener("keydown", (event) => {
      if (event.key == "Escape") {
        this.customUrlEl.blur();
      }
    });
  }

  syncCustomUrlEl() {
    const isCustom = document.querySelector("[name=destinationType]:checked").value == "custom";
    this.customUrlEl.disabled = !isCustom;
  }

  async onFormChanged() {
    await this.saveSettings();
    this.syncCustomUrlEl();
  }

  setFormFromSettings(settings) {
    if (settings.destinationType) {
      const el = document.querySelector(
        `[name=destinationType][value=${settings.destinationType}]`,
      );
      if (el) {
        el.checked = true;
      }
    }

    if (settings.customUrl != null) {
      this.customUrlEl.value = settings.customUrl;
    }
  }

  getSettingsFromForm() {
    const result = {};
    // const keys = ["destinat
    result.destinationType = document.querySelector("[name=destinationType]:checked").value;
    result.customUrl = this.customUrlEl.value;
    return result;
  }

  async saveSettings() {
    const result = this.getSettingsFromForm();
    await chrome.storage.sync.set(result);
  }
}

let page;

document.addEventListener("DOMContentLoaded", async () => {
  page = new OptionsPage();
  await page.init();
});
